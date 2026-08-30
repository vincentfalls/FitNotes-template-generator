import unittest
from src.core.smart_generator import (
    SmartWorkoutGenerator,
    WorkoutGoal,
    ExperienceLevel,
    EquipmentType,
)
from src.core.database import FitNotesDatabase


class TestSmartGenerator(unittest.TestCase):
    def test_smart_generator_variations(self):
        # Test 3-day full body dumbbells
        r1 = SmartWorkoutGenerator.generate(
            goal=WorkoutGoal.GENERAL_FITNESS,
            days_per_week=3,
            experience=ExperienceLevel.BEGINNER,
            equipment=EquipmentType.DUMBBELLS_ONLY,
        )
        self.assertEqual(len(r1.sections), 3)

        # Test 5-day strength full gym
        r2 = SmartWorkoutGenerator.generate(
            goal=WorkoutGoal.STRENGTH,
            days_per_week=5,
            experience=ExperienceLevel.ADVANCED,
            equipment=EquipmentType.FULL_GYM,
        )
        self.assertEqual(len(r2.sections), 5)

        # Test 4-day with lower back injury and avoided exercises
        r3 = SmartWorkoutGenerator.generate(
            goal=WorkoutGoal.HYPERTROPHY,
            days_per_week=4,
            experience=ExperienceLevel.INTERMEDIATE,
            equipment=EquipmentType.FULL_GYM,
            injuries=["lower_back"],
            avoid_exercises=["Flat Barbell Bench Press"],
            duration="express",
        )
        self.assertEqual(len(r3.sections), 4)
        for sec in r3.sections:
            self.assertLessEqual(len(sec.exercises), 4)
            for ex in sec.exercises:
                self.assertNotIn(ex.exercise_name, ["Conventional Deadlift", "Barbell Back Squat", "Flat Barbell Bench Press"])

        # Test 6-day with elbow injury
        r4 = SmartWorkoutGenerator.generate(
            goal=WorkoutGoal.HYPERTROPHY,
            days_per_week=6,
            experience=ExperienceLevel.INTERMEDIATE,
            equipment=EquipmentType.FULL_GYM,
            injuries=["elbow"],
        )
        self.assertEqual(len(r4.sections), 6)
        for sec in r4.sections:
            for ex in sec.exercises:
                self.assertNotIn(ex.exercise_name, ["Skull Crusher (EZ Bar)", "Barbell Biceps Curl", "Close-Grip Barbell Bench Press", "Dips (Chest)"])

        # Insert into database
        db = FitNotesDatabase.create_empty()
        r_id = db.add_routine(r3)
        self.assertGreater(r_id, 0)
        db.close()


if __name__ == "__main__":
    unittest.main()
