import os
import sqlite3
import tempfile
import unittest
from src.core.database import FitNotesDatabase
from src.core.models import Routine, RoutineSection, RoutineSectionExercise, RoutineSet
from src.core.presets import get_preset


class TestMerger(unittest.TestCase):
    def test_merge_routine_preserves_existing_data(self):
        with tempfile.TemporaryDirectory() as tmp_dir:
            backup_path = os.path.join(tmp_dir, "User_Original_Backup.fitnotes")
            db = FitNotesDatabase.create_empty(backup_path)

            # Add an existing original routine
            orig_routine = Routine(
                name="User Old Workout",
                notes="Pre-existing user routine",
                sections=[
                    RoutineSection(
                        name="Leg Day Original",
                        sort_order=0,
                        exercises=[
                            RoutineSectionExercise(
                                exercise_id=0,
                                exercise_name="Barbell Back Squat",
                                category_name="Legs",
                                sort_order=0,
                                sets=[RoutineSet(metric_weight=140.0, reps=5, sort_order=0)],
                            )
                        ],
                    )
                ],
            )
            db.add_routine(orig_routine)

            # Insert a fake workout log
            ex_id = db.ensure_exercise("Barbell Back Squat", "Legs")
            db.conn.execute(
                """
                INSERT INTO training_log (date, exercise_id, metric_weight, reps, comment, is_personal_record)
                VALUES ('2026-08-15', ?, 140.0, 5, 'Heavy PR!', 1);
                """,
                (ex_id,),
            )
            db.conn.commit()
            db.close()

            # Merge new routine (PPL) into the backup
            new_ppl = get_preset("ppl_6day")
            merged_output_path = os.path.join(tmp_dir, "Merged_Backup.fitnotes")

            merger = FitNotesDatabase()
            merger.merge_routine_into_backup(
                backup_path=backup_path,
                routine=new_ppl,
                output_path=merged_output_path,
            )

            # Inspect the merged database
            merged_db = FitNotesDatabase(merged_output_path)
            merged_db.load_from_file(merged_output_path)
            overview = merged_db.get_overview()

            # Assertions
            self.assertEqual(overview["workout_log_count"], 1)  # Workout log preserved!
            self.assertEqual(overview["routine_count"], 2)      # Both routines exist!

            routine_names = [r["name"] for r in overview["routines"]]
            self.assertIn("User Old Workout", routine_names)
            self.assertIn("Push Pull Legs (PPL) 6-Day", routine_names)

            # Check training log content
            cursor = merged_db.conn.cursor()
            cursor.execute("SELECT * FROM training_log;")
            log = cursor.fetchone()
            self.assertEqual(log["date"], "2026-08-15")
            self.assertEqual(log["metric_weight"], 140.0)
            self.assertEqual(log["is_personal_record"], 1)
            self.assertEqual(log["comment"], "Heavy PR!")

            merged_db.close()


if __name__ == "__main__":
    unittest.main()
