"""
Command Line Interface (CLI) for FitNotes & FitNotes 2 Template Generator.
"""

import argparse
import sys
import json
from typing import List
from src.core.database import FitNotesDatabase
from src.core.models import Routine
from src.core.presets import PRESETS, get_preset
from src.core.smart_generator import (
    SmartWorkoutGenerator,
    WorkoutGoal,
    ExperienceLevel,
    EquipmentType,
)
from src.core.csv_exporter import export_routine_to_csv


def cmd_list_presets(args):
    print("=" * 70)
    print(f"{'ID':<18} | {'DAYS':<4} | {'NAME':<32} | {'CATEGORY'}")
    print("-" * 70)
    for p_id, p in PRESETS.items():
        print(f"{p_id:<18} | {p['days']:<4} | {p['title'][:32]:<32} | {p['category']}")
    print("=" * 70)


def cmd_generate(args):
    print(f"[*] Generating template from preset: {args.preset}...")
    routine = get_preset(args.preset)
    db = FitNotesDatabase.create_empty()
    db.add_routine(routine)
    out_file = args.output or f"{args.preset}.fitnotes"
    db.export_to_file(out_file)
    print(f"[✓] Successfully generated '{out_file}' with routine: '{routine.name}' ({len(routine.sections)} sections).")


def cmd_smart_generate(args):
    print(f"[*] Generating intelligent routine: Goal={args.goal}, Days={args.days}, Equipment={args.equipment}...")
    routine = SmartWorkoutGenerator.generate(
        goal=WorkoutGoal(args.goal),
        days_per_week=args.days,
        experience=ExperienceLevel(args.experience),
        equipment=EquipmentType(args.equipment),
    )
    db = FitNotesDatabase.create_empty()
    db.add_routine(routine)
    out_file = args.output or "smart_routine.fitnotes"
    db.export_to_file(out_file)
    print(f"[✓] Successfully generated '{out_file}' with routine: '{routine.name}' ({len(routine.sections)} sections).")


def cmd_inspect(args):
    print(f"[*] Inspecting database: {args.file}...")
    db = FitNotesDatabase(args.file)
    db.load_from_file(args.file)
    overview = db.get_overview()
    print("=" * 50)
    print(f"FitNotes Database Overview: {args.file}")
    print("=" * 50)
    print(f"  Categories:   {overview['category_count']}")
    print(f"  Exercises:    {overview['exercise_count']}")
    print(f"  Workout Logs: {overview['workout_log_count']}")
    print(f"  Routines:     {overview['routine_count']}")
    print("-" * 50)
    for r in overview["routines"]:
        print(f"  • Routine #{r['id']}: {r['name']} ({r['section_count']} days/sections, {r['total_exercises']} exercises)")
    print("=" * 50)
    db.close()


def cmd_inject(args):
    print(f"[*] Injecting routine into backup: {args.input}...")
    if args.preset:
        routine = get_preset(args.preset)
    elif args.json_file:
        with open(args.json_file, "r") as f:
            data = json.load(f)
            routine = Routine.from_dict(data)
    else:
        print("[!] Error: Either --preset or --json-file must be provided.")
        sys.exit(1)

    out_file = args.output or args.input
    db = FitNotesDatabase()
    db.merge_routine_into_backup(backup_path=args.input, routine=routine, output_path=out_file)
    print(f"[✓] Successfully merged routine '{routine.name}' into '{out_file}' without touching existing logs!")


def cmd_csv(args):
    routine = get_preset(args.preset)
    csv_content = export_routine_to_csv(routine, start_date=args.start_date)
    out_file = args.output or f"{args.preset}.csv"
    with open(out_file, "w") as f:
        f.write(csv_content)
    print(f"[✓] Successfully exported '{out_file}' (FitNotes CSV format).")


def cmd_export_json(args):
    routine = get_preset(args.preset)
    out_file = args.output or f"{args.preset}.json"
    with open(out_file, "w") as f:
        json.dump(routine.to_dict(), f, indent=2)
    print(f"[✓] Successfully exported JSON template to '{out_file}'.")


def main():
    parser = argparse.ArgumentParser(
        description="FitNotes & FitNotes 2 Template Generator CLI (Android & iOS)"
    )
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # list-presets
    subparsers.add_parser("list-presets", help="List all available workout routine presets")

    # generate
    gen_parser = subparsers.add_parser("generate", help="Generate a fresh .fitnotes database from preset")
    gen_parser.add_argument("--preset", "-p", required=True, choices=list(PRESETS.keys()), help="Preset ID")
    gen_parser.add_argument("--output", "-o", help="Output .fitnotes file path")

    # smart-generate
    smart_parser = subparsers.add_parser("smart-generate", help="Generate an intelligent custom routine")
    smart_parser.add_argument("--goal", choices=["hypertrophy", "strength", "general_fitness"], default="hypertrophy")
    smart_parser.add_argument("--days", type=int, choices=[2, 3, 4, 5, 6], default=4)
    smart_parser.add_argument("--experience", choices=["beginner", "intermediate", "advanced"], default="intermediate")
    smart_parser.add_argument("--equipment", choices=["full_gym", "barbell_rack", "dumbbells_only", "bodyweight_only"], default="full_gym")
    smart_parser.add_argument("--output", "-o", help="Output .fitnotes file path")

    # inspect
    insp_parser = subparsers.add_parser("inspect", help="Inspect an existing .fitnotes backup file")
    insp_parser.add_argument("file", help="Path to .fitnotes file")

    # inject
    inj_parser = subparsers.add_parser("inject", help="Safely inject a routine into an existing user backup")
    inj_parser.add_argument("--input", "-i", required=True, help="Existing user FitNotes_Backup.fitnotes")
    inj_parser.add_argument("--preset", "-p", choices=list(PRESETS.keys()), help="Preset ID to inject")
    inj_parser.add_argument("--json-file", "-j", help="Custom JSON template file")
    inj_parser.add_argument("--output", "-o", help="Output file (default overwrites or updates input)")

    # csv
    csv_parser = subparsers.add_parser("export-csv", help="Export routine to FitNotes CSV format")
    csv_parser.add_argument("--preset", "-p", required=True, choices=list(PRESETS.keys()))
    csv_parser.add_argument("--start-date", help="Start date (YYYY-MM-DD)")
    csv_parser.add_argument("--output", "-o", help="Output CSV file path")

    # json
    json_parser = subparsers.add_parser("export-json", help="Export routine as JSON template")
    json_parser.add_argument("--preset", "-p", required=True, choices=list(PRESETS.keys()))
    json_parser.add_argument("--output", "-o", help="Output JSON file path")

    args = parser.parse_args()

    if args.command == "list-presets":
        cmd_list_presets(args)
    elif args.command == "generate":
        cmd_generate(args)
    elif args.command == "smart-generate":
        cmd_smart_generate(args)
    elif args.command == "inspect":
        cmd_inspect(args)
    elif args.command == "inject":
        cmd_inject(args)
    elif args.command == "export-csv":
        cmd_csv(args)
    elif args.command == "export-json":
        cmd_export_json(args)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
