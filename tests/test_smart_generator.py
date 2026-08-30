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

        # Insert into database
        db = FitNotesDatabase.create_empty()
        r_id = db.add_routine(r2)
        self.assertGreater(r_id, 0)
        db.close()


if __name__ == "__main__":
    unittest.main()
