import unittest
from src.core.presets import PRESETS, get_preset
from src.core.database import FitNotesDatabase
from src.core.csv_exporter import export_routine_to_csv


class TestPresets(unittest.TestCase):
    def test_all_presets_valid(self):
        for preset_id in PRESETS:
            routine = get_preset(preset_id)
            self.assertIsNotNone(routine.name)
            self.assertGreater(len(routine.sections), 0)

            # Build database with preset
            db = FitNotesDatabase.create_empty()
            r_id = db.add_routine(routine)
            self.assertGreater(r_id, 0)

            # Verify CSV export
            csv_str = export_routine_to_csv(routine)
            self.assertIn("Date,Exercise,Category,Weight (kg)", csv_str)
            self.assertIn(routine.sections[0].name, csv_str)
            db.close()

    def test_invalid_preset(self):
        with self.assertRaises(KeyError):
            get_preset("non_existent_preset_123")


if __name__ == "__main__":
    unittest.main()
