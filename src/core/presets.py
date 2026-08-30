"""
Pre-configured popular workout routines for FitNotes and FitNotes 2.
"""

from typing import Dict, List, Any
from .models import Routine, RoutineSection, RoutineSectionExercise, RoutineSet


def create_set_list(count: int, reps: int = 10, weight: float = 0.0) -> List[RoutineSet]:
    return [
        RoutineSet(metric_weight=weight, reps=reps, sort_order=i)
        for i in range(count)
    ]


def _build_ppl_6day() -> Routine:
    return Routine(
        name="Push Pull Legs (PPL) 6-Day",
        notes="Classic 6-day hypertrophy split. Push A, Pull A, Legs A, Push B, Pull B, Legs B, Rest.",
        sections=[
            RoutineSection(
                name="Push A (Chest & Triceps Focus)",
                sort_order=0,
                exercises=[
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Flat Barbell Bench Press",
                        category_name="Chest",
                        sort_order=0,
                        sets=create_set_list(4, reps=6),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Overhead Press (Barbell)",
                        category_name="Shoulders",
                        sort_order=1,
                        sets=create_set_list(3, reps=8),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Incline Dumbbell Bench Press",
                        category_name="Chest",
                        sort_order=2,
                        sets=create_set_list(3, reps=10),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Side Lateral Raise (Dumbbell)",
                        category_name="Shoulders",
                        sort_order=3,
                        sets=create_set_list(4, reps=12),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Triceps Pushdown (Cable)",
                        category_name="Triceps",
                        sort_order=4,
                        sets=create_set_list(3, reps=12),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Overhead Triceps Extension (Cable)",
                        category_name="Triceps",
                        sort_order=5,
                        sets=create_set_list(3, reps=12),
                    ),
                ],
            ),
            RoutineSection(
                name="Pull A (Back & Biceps Focus)",
                sort_order=1,
                exercises=[
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Conventional Deadlift",
                        category_name="Back",
                        sort_order=0,
                        sets=create_set_list(3, reps=5),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Pull Up",
                        category_name="Back",
                        sort_order=1,
                        sets=create_set_list(3, reps=8),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Seated Cable Row",
                        category_name="Back",
                        sort_order=2,
                        sets=create_set_list(3, reps=10),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Face Pull (Cable)",
                        category_name="Back",
                        sort_order=3,
                        sets=create_set_list(4, reps=15),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Barbell Biceps Curl",
                        category_name="Biceps",
                        sort_order=4,
                        sets=create_set_list(3, reps=10),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Hammer Curl (Dumbbell)",
                        category_name="Biceps",
                        sort_order=5,
                        sets=create_set_list(3, reps=12),
                    ),
                ],
            ),
            RoutineSection(
                name="Legs A (Quad & Calves Focus)",
                sort_order=2,
                exercises=[
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Barbell Back Squat",
                        category_name="Legs",
                        sort_order=0,
                        sets=create_set_list(4, reps=6),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Romanian Deadlift (Barbell)",
                        category_name="Legs",
                        sort_order=1,
                        sets=create_set_list(3, reps=8),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Leg Press",
                        category_name="Legs",
                        sort_order=2,
                        sets=create_set_list(3, reps=10),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Leg Curl (Machine)",
                        category_name="Legs",
                        sort_order=3,
                        sets=create_set_list(3, reps=12),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Standing Calf Raise",
                        category_name="Legs",
                        sort_order=4,
                        sets=create_set_list(4, reps=15),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Hanging Leg Raise",
                        category_name="Abs",
                        sort_order=5,
                        sets=create_set_list(3, reps=12),
                    ),
                ],
            ),
            RoutineSection(
                name="Push B (Shoulders & Chest Volume)",
                sort_order=3,
                exercises=[
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Overhead Press (Barbell)",
                        category_name="Shoulders",
                        sort_order=0,
                        sets=create_set_list(4, reps=6),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Flat Dumbbell Bench Press",
                        category_name="Chest",
                        sort_order=1,
                        sets=create_set_list(3, reps=8),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Dips (Chest)",
                        category_name="Chest",
                        sort_order=2,
                        sets=create_set_list(3, reps=10),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Side Lateral Raise (Cable)",
                        category_name="Shoulders",
                        sort_order=3,
                        sets=create_set_list(4, reps=12),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Skull Crusher (EZ Bar)",
                        category_name="Triceps",
                        sort_order=4,
                        sets=create_set_list(3, reps=10),
                    ),
                ],
            ),
            RoutineSection(
                name="Pull B (Row & Lat Focus)",
                sort_order=4,
                exercises=[
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Barbell Bent-Over Row",
                        category_name="Back",
                        sort_order=0,
                        sets=create_set_list(4, reps=8),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Lat Pulldown (Cable)",
                        category_name="Back",
                        sort_order=1,
                        sets=create_set_list(3, reps=10),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Single-Arm Dumbbell Row",
                        category_name="Back",
                        sort_order=2,
                        sets=create_set_list(3, reps=10),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Rear Delt Flye (Machine)",
                        category_name="Shoulders",
                        sort_order=3,
                        sets=create_set_list(4, reps=15),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Incline Dumbbell Curl",
                        category_name="Biceps",
                        sort_order=4,
                        sets=create_set_list(3, reps=10),
                    ),
                ],
            ),
            RoutineSection(
                name="Legs B (Hamstrings & Glutes Focus)",
                sort_order=5,
                exercises=[
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Barbell Back Squat",
                        category_name="Legs",
                        sort_order=0,
                        sets=create_set_list(3, reps=8),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Hip Thrust (Barbell)",
                        category_name="Legs",
                        sort_order=1,
                        sets=create_set_list(3, reps=10),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Bulgarian Split Squat",
                        category_name="Legs",
                        sort_order=2,
                        sets=create_set_list(3, reps=10),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Leg Extension (Machine)",
                        category_name="Legs",
                        sort_order=3,
                        sets=create_set_list(3, reps=12),
                    ),
                    RoutineSectionExercise(
                        exercise_id=0,
                        exercise_name="Seated Calf Raise",
                        category_name="Legs",
                        sort_order=4,
                        sets=create_set_list(4, reps=15),
                    ),
                ],
            ),
        ],
    )


def _build_arnold_split() -> Routine:
    return Routine(
        name="Arnold Schwarzenegger Split (6-Day)",
        notes="High volume antagonistic superset split: Chest & Back, Shoulders & Arms, Legs & Lower Back.",
        sections=[
            RoutineSection(
                name="Day 1 & 4: Chest & Back",
                sort_order=0,
                exercises=[
                    RoutineSectionExercise(exercise_id=0, exercise_name="Flat Barbell Bench Press", category_name="Chest", sort_order=0, sets=create_set_list(4, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Incline Barbell Bench Press", category_name="Chest", sort_order=1, sets=create_set_list(4, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Barbell Bent-Over Row", category_name="Back", sort_order=2, sets=create_set_list(4, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Pull Up", category_name="Back", sort_order=3, sets=create_set_list(4, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Dips (Chest)", category_name="Chest", sort_order=4, sets=create_set_list(3, 10)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Face Pull (Cable)", category_name="Back", sort_order=5, sets=create_set_list(4, 15)),
                ],
            ),
            RoutineSection(
                name="Day 2 & 5: Shoulders & Arms",
                sort_order=1,
                exercises=[
                    RoutineSectionExercise(exercise_id=0, exercise_name="Overhead Press (Barbell)", category_name="Shoulders", sort_order=0, sets=create_set_list(4, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Side Lateral Raise (Dumbbell)", category_name="Shoulders", sort_order=1, sets=create_set_list(4, 12)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Rear Delt Flye (Dumbbell)", category_name="Shoulders", sort_order=2, sets=create_set_list(4, 12)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Barbell Biceps Curl", category_name="Biceps", sort_order=3, sets=create_set_list(4, 10)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Skull Crusher (EZ Bar)", category_name="Triceps", sort_order=4, sets=create_set_list(4, 10)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Incline Dumbbell Curl", category_name="Biceps", sort_order=5, sets=create_set_list(3, 12)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Triceps Pushdown (Cable)", category_name="Triceps", sort_order=6, sets=create_set_list(3, 12)),
                ],
            ),
            RoutineSection(
                name="Day 3 & 6: Legs & Abs",
                sort_order=2,
                exercises=[
                    RoutineSectionExercise(exercise_id=0, exercise_name="Barbell Back Squat", category_name="Legs", sort_order=0, sets=create_set_list(4, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Romanian Deadlift (Barbell)", category_name="Legs", sort_order=1, sets=create_set_list(4, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Leg Press", category_name="Legs", sort_order=2, sets=create_set_list(3, 10)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Leg Curl (Machine)", category_name="Legs", sort_order=3, sets=create_set_list(3, 12)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Standing Calf Raise", category_name="Legs", sort_order=4, sets=create_set_list(4, 15)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Hanging Leg Raise", category_name="Abs", sort_order=5, sets=create_set_list(3, 15)),
                ],
            ),
        ],
    )


def _build_upper_lower_4day() -> Routine:
    return Routine(
        name="Upper Lower 4-Day Split",
        notes="Balanced 4-day strength and hypertrophy program. Mon: Upper A, Tue: Lower A, Thu: Upper B, Fri: Lower B.",
        sections=[
            RoutineSection(
                name="Upper A (Strength Focus)",
                sort_order=0,
                exercises=[
                    RoutineSectionExercise(exercise_id=0, exercise_name="Flat Barbell Bench Press", category_name="Chest", sort_order=0, sets=create_set_list(4, 5)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Barbell Bent-Over Row", category_name="Back", sort_order=1, sets=create_set_list(4, 5)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Overhead Press (Barbell)", category_name="Shoulders", sort_order=2, sets=create_set_list(3, 6)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Lat Pulldown (Cable)", category_name="Back", sort_order=3, sets=create_set_list(3, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Skull Crusher (EZ Bar)", category_name="Triceps", sort_order=4, sets=create_set_list(3, 10)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Barbell Biceps Curl", category_name="Biceps", sort_order=5, sets=create_set_list(3, 10)),
                ],
            ),
            RoutineSection(
                name="Lower A (Strength Focus)",
                sort_order=1,
                exercises=[
                    RoutineSectionExercise(exercise_id=0, exercise_name="Barbell Back Squat", category_name="Legs", sort_order=0, sets=create_set_list(4, 5)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Romanian Deadlift (Barbell)", category_name="Legs", sort_order=1, sets=create_set_list(3, 6)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Leg Press", category_name="Legs", sort_order=2, sets=create_set_list(3, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Standing Calf Raise", category_name="Legs", sort_order=3, sets=create_set_list(4, 10)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Ab Wheel Rollout", category_name="Abs", sort_order=4, sets=create_set_list(3, 10)),
                ],
            ),
            RoutineSection(
                name="Upper B (Hypertrophy Focus)",
                sort_order=2,
                exercises=[
                    RoutineSectionExercise(exercise_id=0, exercise_name="Incline Dumbbell Bench Press", category_name="Chest", sort_order=0, sets=create_set_list(4, 10)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Seated Cable Row", category_name="Back", sort_order=1, sets=create_set_list(4, 10)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Side Lateral Raise (Dumbbell)", category_name="Shoulders", sort_order=2, sets=create_set_list(4, 12)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Cable Crossover", category_name="Chest", sort_order=3, sets=create_set_list(3, 12)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Incline Dumbbell Curl", category_name="Biceps", sort_order=4, sets=create_set_list(3, 12)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Triceps Pushdown (Cable)", category_name="Triceps", sort_order=5, sets=create_set_list(3, 12)),
                ],
            ),
            RoutineSection(
                name="Lower B (Hypertrophy Focus)",
                sort_order=3,
                exercises=[
                    RoutineSectionExercise(exercise_id=0, exercise_name="Conventional Deadlift", category_name="Back", sort_order=0, sets=create_set_list(3, 5)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Front Squat", category_name="Legs", sort_order=1, sets=create_set_list(3, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Leg Extension (Machine)", category_name="Legs", sort_order=2, sets=create_set_list(3, 12)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Leg Curl (Machine)", category_name="Legs", sort_order=3, sets=create_set_list(3, 12)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Seated Calf Raise", category_name="Legs", sort_order=4, sets=create_set_list(4, 15)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Hanging Leg Raise", category_name="Abs", sort_order=5, sets=create_set_list(3, 12)),
                ],
            ),
        ],
    )


def _build_stronglifts_5x5() -> Routine:
    return Routine(
        name="StrongLifts 5x5 / Linear Progression",
        notes="Simple, effective beginner linear progression. Alternate Workout A and Workout B 3 days per week (e.g. Mon/Wed/Fri).",
        sections=[
            RoutineSection(
                name="Workout A",
                sort_order=0,
                exercises=[
                    RoutineSectionExercise(exercise_id=0, exercise_name="Barbell Back Squat", category_name="Legs", sort_order=0, sets=create_set_list(5, 5)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Flat Barbell Bench Press", category_name="Chest", sort_order=1, sets=create_set_list(5, 5)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Barbell Bent-Over Row", category_name="Back", sort_order=2, sets=create_set_list(5, 5)),
                ],
            ),
            RoutineSection(
                name="Workout B",
                sort_order=1,
                exercises=[
                    RoutineSectionExercise(exercise_id=0, exercise_name="Barbell Back Squat", category_name="Legs", sort_order=0, sets=create_set_list(5, 5)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Overhead Press (Barbell)", category_name="Shoulders", sort_order=1, sets=create_set_list(5, 5)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Conventional Deadlift", category_name="Back", sort_order=2, sets=create_set_list(1, 5)),
                ],
            ),
        ],
    )


def _build_fullbody_3day() -> Routine:
    return Routine(
        name="Full Body 3-Day Program",
        notes="Full body stimulation 3 days per week with optimal recovery (Mon/Wed/Fri).",
        sections=[
            RoutineSection(
                name="Day 1: Full Body A",
                sort_order=0,
                exercises=[
                    RoutineSectionExercise(exercise_id=0, exercise_name="Barbell Back Squat", category_name="Legs", sort_order=0, sets=create_set_list(3, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Flat Barbell Bench Press", category_name="Chest", sort_order=1, sets=create_set_list(3, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Barbell Bent-Over Row", category_name="Back", sort_order=2, sets=create_set_list(3, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Side Lateral Raise (Dumbbell)", category_name="Shoulders", sort_order=3, sets=create_set_list(3, 12)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Barbell Biceps Curl", category_name="Biceps", sort_order=4, sets=create_set_list(3, 10)),
                ],
            ),
            RoutineSection(
                name="Day 2: Full Body B",
                sort_order=1,
                exercises=[
                    RoutineSectionExercise(exercise_id=0, exercise_name="Conventional Deadlift", category_name="Back", sort_order=0, sets=create_set_list(3, 5)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Overhead Press (Barbell)", category_name="Shoulders", sort_order=1, sets=create_set_list(3, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Pull Up", category_name="Back", sort_order=2, sets=create_set_list(3, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Leg Press", category_name="Legs", sort_order=3, sets=create_set_list(3, 10)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Triceps Pushdown (Cable)", category_name="Triceps", sort_order=4, sets=create_set_list(3, 10)),
                ],
            ),
            RoutineSection(
                name="Day 3: Full Body C",
                sort_order=2,
                exercises=[
                    RoutineSectionExercise(exercise_id=0, exercise_name="Front Squat", category_name="Legs", sort_order=0, sets=create_set_list(3, 8)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Incline Dumbbell Bench Press", category_name="Chest", sort_order=1, sets=create_set_list(3, 10)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Seated Cable Row", category_name="Back", sort_order=2, sets=create_set_list(3, 10)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Romanian Deadlift (Barbell)", category_name="Legs", sort_order=3, sets=create_set_list(3, 10)),
                    RoutineSectionExercise(exercise_id=0, exercise_name="Hanging Leg Raise", category_name="Abs", sort_order=4, sets=create_set_list(3, 12)),
                ],
            ),
        ],
    )


PRESETS: Dict[str, Any] = {
    "ppl_6day": {
        "id": "ppl_6day",
        "title": "Push Pull Legs (PPL) 6-Day",
        "days": 6,
        "category": "Hypertrophy / Bodybuilding",
        "description": "High-frequency 6-day split targeting each muscle group twice weekly.",
        "factory": _build_ppl_6day,
    },
    "arnold_split": {
        "id": "arnold_split",
        "title": "Arnold Schwarzenegger Split (6-Day)",
        "days": 6,
        "category": "Bodybuilding / Antagonistic",
        "description": "Classic Golden Era split pairing opposing muscle groups (Chest/Back, Shoulders/Arms, Legs).",
        "factory": _build_arnold_split,
    },
    "upper_lower_4day": {
        "id": "upper_lower_4day",
        "title": "Upper / Lower 4-Day Split",
        "days": 4,
        "category": "Strength & Hypertrophy",
        "description": "Optimally balanced 4-day split alternating heavy strength and hypertrophy days.",
        "factory": _build_upper_lower_4day,
    },
    "stronglifts_5x5": {
        "id": "stronglifts_5x5",
        "title": "StrongLifts 5x5",
        "days": 3,
        "category": "Strength / Beginner Linear Progression",
        "description": "Simple compound movement progression to build foundation barbell strength.",
        "factory": _build_stronglifts_5x5,
    },
    "fullbody_3day": {
        "id": "fullbody_3day",
        "title": "Full Body 3-Day",
        "days": 3,
        "category": "General Fitness / Busy Schedules",
        "description": "Comprehensive full-body routine with 48 hours recovery between workouts.",
        "factory": _build_fullbody_3day,
    },
}


def get_preset(preset_id: str) -> Routine:
    """Returns a newly built Routine instance for a preset ID."""
    preset = PRESETS.get(preset_id)
    if not preset:
        raise KeyError(f"Unknown preset '{preset_id}'. Available: {list(PRESETS.keys())}")
    return preset["factory"]()
