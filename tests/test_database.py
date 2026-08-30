import os
import sqlite3
import tempfile
import unittest
from src.core.database import FitNotesDatabase
from src.core.models import Routine, RoutineSection, RoutineSectionExercise, RoutineSet


class TestDatabase(unittest.TestCase):
    def test_create_empty_database(self):
        with tempfile.TemporaryDirectory() as tmp_dir:
            db_path = os.path.join(tmp_dir, "test.fitnotes")
            db = FitNotesDatabase.create_empty(db_path)

            conn = sqlite3.connect(db_path)
            cursor = conn.cursor()
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = {r[0] for r in cursor.fetchall()}

            required_tables = {
                "android_metadata",
                "Category",
                "exercise",
                "Routine",
                "RoutineSection",
                "RoutineSectionExercise",
                "RoutineSectionExerciseSet",
                "training_log",
                "body_tracker",
                "body_tracker_type",
                "settings",
            }
            self.assertTrue(required_tables.issubset(tables))

            self.assertGreaterEqual(len(db.categories), 8)
            cat_names = [c.name for c in db.categories.values()]
            self.assertIn("Chest", cat_names)

            self.assertGreaterEqual(len(db.exercises), 30)
            ex_names = [e.name for e in db.exercises.values()]
            self.assertIn("Flat Barbell Bench Press", ex_names)

            db.close()
            conn.close()

    def test_add_routine_and_inspect(self):
        with tempfile.TemporaryDirectory() as tmp_dir:
            db_path = os.path.join(tmp_dir, "routine_test.fitnotes")
            db = FitNotesDatabase.create_empty(db_path)

            routine = Routine(
                name="Test Upper/Lower",
                notes="A quick 2-day test",
                sections=[
                    RoutineSection(
                        name="Upper Day",
                        sort_order=0,
                        exercises=[
                            RoutineSectionExercise(
                                exercise_id=0,
                                exercise_name="Flat Barbell Bench Press",
                                category_name="Chest",
                                sort_order=0,
                                sets=[
                                    RoutineSet(metric_weight=100.0, reps=5, sort_order=0),
                                    RoutineSet(metric_weight=100.0, reps=5, sort_order=1),
                                ],
                            )
                        ],
                    )
                ],
            )

            r_id = db.add_routine(routine)
            self.assertIsNotNone(r_id)
            self.assertGreater(r_id, 0)

            overview = db.get_overview()
            self.assertEqual(overview["routine_count"], 1)
            self.assertEqual(overview["routines"][0]["name"], "Test Upper/Lower")
            self.assertEqual(overview["routines"][0]["section_count"], 1)
            self.assertEqual(overview["routines"][0]["total_exercises"], 1)

            db.close()


if __name__ == "__main__":
    unittest.main()
