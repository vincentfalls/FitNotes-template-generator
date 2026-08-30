"""
Intelligent Workout Template Generator.
Generates tailored routines based on goals, days per week, equipment, and experience level.
Designed to interface with rule engines and future on-device AI models.
"""

from enum import Enum
from typing import Optional, List, Dict, Any
from .models import Routine, RoutineSection, RoutineSectionExercise, RoutineSet


class WorkoutGoal(str, Enum):
    HYPERTROPHY = "hypertrophy"
    STRENGTH = "strength"
    GENERAL_FITNESS = "general_fitness"


class ExperienceLevel(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"


class EquipmentType(str, Enum):
    FULL_GYM = "full_gym"
    BARBELL_RACK = "barbell_rack"
    DUMBBELLS_ONLY = "dumbbells_only"
    BODYWEIGHT_ONLY = "bodyweight_only"


def _make_sets(count: int, reps: int, weight: float = 0.0) -> List[RoutineSet]:
    return [RoutineSet(metric_weight=weight, reps=reps, sort_order=i) for i in range(count)]


class SmartWorkoutGenerator:
    """
    Intelligent routine generator based on biomechanics, volume guidelines, and equipment constraints.
    """

    @classmethod
    def generate(
        cls,
        goal: WorkoutGoal = WorkoutGoal.HYPERTROPHY,
        days_per_week: int = 4,
        experience: ExperienceLevel = ExperienceLevel.INTERMEDIATE,
        equipment: EquipmentType = EquipmentType.FULL_GYM,
        focus_area: Optional[str] = None,
        injuries: Optional[List[str]] = None,
        avoid_exercises: Optional[List[str]] = None,
        duration: str = "standard",
    ) -> Routine:
        days = max(2, min(6, days_per_week))
        active_injuries = set(injuries or [])
        avoided = set(avoid_exercises or [])

        # Determine rep targets & set volume based on goal & experience
        if goal == WorkoutGoal.STRENGTH:
            compound_reps = 5
            accessory_reps = 8
            compound_sets = 5 if experience != ExperienceLevel.BEGINNER else 3
            accessory_sets = 3
        elif goal == WorkoutGoal.HYPERTROPHY:
            compound_reps = 8
            accessory_reps = 12
            compound_sets = 4
            accessory_sets = 3 if experience != ExperienceLevel.ADVANCED else 4
        else:  # GENERAL_FITNESS
            compound_reps = 10
            accessory_reps = 15
            compound_sets = 3
            accessory_sets = 3

        injury_str = f" Joint Safeguards: {', '.join(active_injuries)}." if active_injuries else ""

        # Generate split architecture based on days
        routine_name = f"Custom {goal.value.title()} ({days}-Day {equipment.value.replace('_', ' ').title()})"
        routine_notes = (
            f"Generated for {experience.value.title()} level lifter. "
            f"Goal: {goal.value.title()}. Equipment: {equipment.value.replace('_', ' ').title()}.{injury_str}"
        )

        sections: List[RoutineSection] = []

        if days == 2:
            # Full Body A & Full Body B
            sections.append(cls._build_fullbody_day("Day 1: Full Body A", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 1))
            sections.append(cls._build_fullbody_day("Day 2: Full Body B", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 2))

        elif days == 3:
            # Full Body 3x or Push/Pull/Legs
            if experience == ExperienceLevel.BEGINNER or equipment == EquipmentType.DUMBBELLS_ONLY:
                sections.append(cls._build_fullbody_day("Day 1: Full Body A", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 1))
                sections.append(cls._build_fullbody_day("Day 2: Full Body B", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 2))
                sections.append(cls._build_fullbody_day("Day 3: Full Body C", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 3))
            else:
                sections.append(cls._build_push_day("Day 1: Push", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 1))
                sections.append(cls._build_pull_day("Day 2: Pull", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 1))
                sections.append(cls._build_legs_day("Day 3: Legs & Core", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 1))

        elif days == 4:
            # Upper / Lower 4-Day
            sections.append(cls._build_upper_day("Day 1: Upper A", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 1))
            sections.append(cls._build_lower_day("Day 2: Lower A", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 1))
            sections.append(cls._build_upper_day("Day 3: Upper B", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 2))
            sections.append(cls._build_lower_day("Day 4: Lower B", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 2))

        elif days == 5:
            # Upper / Lower / Push / Pull / Legs OR Body Part Split
            sections.append(cls._build_push_day("Day 1: Push (Chest & Triceps Focus)", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 1))
            sections.append(cls._build_pull_day("Day 2: Pull (Back & Biceps Focus)", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 1))
            sections.append(cls._build_legs_day("Day 3: Legs (Quad Focus)", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 1))
            sections.append(cls._build_upper_day("Day 4: Upper Body (Shoulders & Arms)", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 2))
            sections.append(cls._build_lower_day("Day 5: Lower Body & Core (Hamstring Focus)", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 2))

        else:  # days == 6
            # Classic PPL 6-Day
            sections.append(cls._build_push_day("Day 1: Push A", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 1))
            sections.append(cls._build_pull_day("Day 2: Pull A", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 1))
            sections.append(cls._build_legs_day("Day 3: Legs A", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 1))
            sections.append(cls._build_push_day("Day 4: Push B", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 2))
            sections.append(cls._build_pull_day("Day 5: Pull B", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 2))
            sections.append(cls._build_legs_day("Day 6: Legs B", compound_sets, compound_reps, accessory_sets, accessory_reps, equipment, 2))

        # Filter out avoided exercises or apply substitutions if needed
        for sec in sections:
            filtered_exercises = []
            for ex in sec.exercises:
                if ex.exercise_name in avoided:
                    continue
                # Lower back injury filter
                if "lower_back" in active_injuries and ex.exercise_name in ("Conventional Deadlift", "Barbell Back Squat", "Barbell Bent-Over Row", "Standing Dumbbell Shoulder Press", "Ab Wheel Rollout"):
                    continue
                # Shoulder injury filter
                if "shoulder" in active_injuries and ex.exercise_name in ("Overhead Press (Barbell)", "Dips (Chest)", "Seated Dumbbell Shoulder Press", "Standing Dumbbell Shoulder Press", "Pull Up", "Chin Up", "Dumbbell Chest Flye"):
                    continue
                # Elbow injury filter
                if "elbow" in active_injuries and ex.exercise_name in ("Skull Crusher (EZ Bar)", "Barbell Biceps Curl", "Close-Grip Barbell Bench Press", "Dips (Chest)", "Overhead Dumbbell Triceps Extension"):
                    continue
                # Knee injury filter
                if "knee" in active_injuries and ex.exercise_name in ("Barbell Back Squat", "Front Squat", "Bulgarian Split Squat", "Walking Lunge", "Leg Extension (Machine)"):
                    continue
                # Wrist injury filter
                if "wrist" in active_injuries and ex.exercise_name in ("Barbell Biceps Curl", "Close-Grip Barbell Bench Press", "Barbell Bent-Over Row", "Flat Barbell Bench Press", "Incline Barbell Bench Press", "Skull Crusher (EZ Bar)"):
                    continue
                # Neck injury filter
                if "neck" in active_injuries and ex.exercise_name in ("Barbell Back Squat", "Conventional Deadlift", "Overhead Press (Barbell)"):
                    continue
                filtered_exercises.append(ex)
            
            # Limit based on session duration
            max_ex = 4 if duration == "express" else (7 if duration == "extended" else 5)
            sec.exercises = filtered_exercises[:max_ex]

        for idx, sec in enumerate(sections):
            sec.sort_order = idx

        return Routine(name=routine_name, notes=routine_notes, sections=sections)

    @classmethod
    def _build_push_day(cls, name: str, c_sets: int, c_reps: int, a_sets: int, a_reps: int, eq: EquipmentType, variation: int) -> RoutineSection:
        exercises: List[RoutineSectionExercise] = []
        if eq == EquipmentType.FULL_GYM:
            if variation == 1:
                exercises.append(RoutineSectionExercise(0, 0, "Flat Barbell Bench Press", "Chest", _make_sets(c_sets, c_reps)))
                exercises.append(RoutineSectionExercise(0, 1, "Overhead Press (Barbell)", "Shoulders", _make_sets(c_sets, c_reps)))
                exercises.append(RoutineSectionExercise(0, 2, "Incline Dumbbell Bench Press", "Chest", _make_sets(a_sets, a_reps)))
                exercises.append(RoutineSectionExercise(0, 3, "Side Lateral Raise (Cable)", "Shoulders", _make_sets(a_sets, a_reps + 2)))
                exercises.append(RoutineSectionExercise(0, 4, "Triceps Pushdown (Cable)", "Triceps", _make_sets(a_sets, a_reps)))
            else:
                exercises.append(RoutineSectionExercise(0, 0, "Incline Barbell Bench Press", "Chest", _make_sets(c_sets, c_reps)))
                exercises.append(RoutineSectionExercise(0, 1, "Flat Dumbbell Bench Press", "Chest", _make_sets(a_sets, a_reps)))
                exercises.append(RoutineSectionExercise(0, 2, "Dips (Chest)", "Chest", _make_sets(a_sets, a_reps)))
                exercises.append(RoutineSectionExercise(0, 3, "Side Lateral Raise (Dumbbell)", "Shoulders", _make_sets(a_sets, a_reps + 2)))
                exercises.append(RoutineSectionExercise(0, 4, "Skull Crusher (EZ Bar)", "Triceps", _make_sets(a_sets, a_reps)))
        elif eq == EquipmentType.DUMBBELLS_ONLY:
            exercises.append(RoutineSectionExercise(0, 0, "Flat Dumbbell Bench Press", "Chest", _make_sets(c_sets, c_reps)))
            exercises.append(RoutineSectionExercise(0, 1, "Seated Dumbbell Shoulder Press", "Shoulders", _make_sets(c_sets, c_reps)))
            exercises.append(RoutineSectionExercise(0, 2, "Incline Dumbbell Bench Press", "Chest", _make_sets(a_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 3, "Side Lateral Raise (Dumbbell)", "Shoulders", _make_sets(a_sets, a_reps + 2)))
            exercises.append(RoutineSectionExercise(0, 4, "Push Up", "Chest", _make_sets(a_sets, a_reps + 5)))
        else:  # Bodyweight
            exercises.append(RoutineSectionExercise(0, 0, "Push Up", "Chest", _make_sets(4, 15)))
            exercises.append(RoutineSectionExercise(0, 1, "Dips (Chest)", "Chest", _make_sets(4, 10)))
            exercises.append(RoutineSectionExercise(0, 2, "Plank", "Abs", _make_sets(3, 1)))

        return RoutineSection(name=name, exercises=exercises)

    @classmethod
    def _build_pull_day(cls, name: str, c_sets: int, c_reps: int, a_sets: int, a_reps: int, eq: EquipmentType, variation: int) -> RoutineSection:
        exercises: List[RoutineSectionExercise] = []
        if eq == EquipmentType.FULL_GYM:
            if variation == 1:
                exercises.append(RoutineSectionExercise(0, 0, "Conventional Deadlift", "Back", _make_sets(3, 5)))
                exercises.append(RoutineSectionExercise(0, 1, "Pull Up", "Back", _make_sets(c_sets, c_reps)))
                exercises.append(RoutineSectionExercise(0, 2, "Seated Cable Row", "Back", _make_sets(a_sets, a_reps)))
                exercises.append(RoutineSectionExercise(0, 3, "Face Pull (Cable)", "Back", _make_sets(a_sets, a_reps + 3)))
                exercises.append(RoutineSectionExercise(0, 4, "Barbell Biceps Curl", "Biceps", _make_sets(a_sets, a_reps)))
            else:
                exercises.append(RoutineSectionExercise(0, 0, "Barbell Bent-Over Row", "Back", _make_sets(c_sets, c_reps)))
                exercises.append(RoutineSectionExercise(0, 1, "Lat Pulldown (Cable)", "Back", _make_sets(a_sets, a_reps)))
                exercises.append(RoutineSectionExercise(0, 2, "Single-Arm Dumbbell Row", "Back", _make_sets(a_sets, a_reps)))
                exercises.append(RoutineSectionExercise(0, 3, "Rear Delt Flye (Machine)", "Shoulders", _make_sets(a_sets, a_reps + 3)))
                exercises.append(RoutineSectionExercise(0, 4, "Hammer Curl (Dumbbell)", "Biceps", _make_sets(a_sets, a_reps)))
        elif eq == EquipmentType.DUMBBELLS_ONLY:
            exercises.append(RoutineSectionExercise(0, 0, "Single-Arm Dumbbell Row", "Back", _make_sets(c_sets, c_reps)))
            exercises.append(RoutineSectionExercise(0, 1, "Rear Delt Flye (Dumbbell)", "Shoulders", _make_sets(a_sets, a_reps + 2)))
            exercises.append(RoutineSectionExercise(0, 2, "Incline Dumbbell Curl", "Biceps", _make_sets(a_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 3, "Hammer Curl (Dumbbell)", "Biceps", _make_sets(a_sets, a_reps)))
        else:  # Bodyweight
            exercises.append(RoutineSectionExercise(0, 0, "Pull Up", "Back", _make_sets(4, 8)))
            exercises.append(RoutineSectionExercise(0, 1, "Chin Up", "Back", _make_sets(3, 8)))

        return RoutineSection(name=name, exercises=exercises)

    @classmethod
    def _build_legs_day(cls, name: str, c_sets: int, c_reps: int, a_sets: int, a_reps: int, eq: EquipmentType, variation: int) -> RoutineSection:
        exercises: List[RoutineSectionExercise] = []
        if eq in (EquipmentType.FULL_GYM, EquipmentType.BARBELL_RACK):
            if variation == 1:
                exercises.append(RoutineSectionExercise(0, 0, "Barbell Back Squat", "Legs", _make_sets(c_sets, c_reps)))
                exercises.append(RoutineSectionExercise(0, 1, "Romanian Deadlift (Barbell)", "Legs", _make_sets(a_sets, a_reps)))
                exercises.append(RoutineSectionExercise(0, 2, "Leg Press", "Legs", _make_sets(a_sets, a_reps)))
                exercises.append(RoutineSectionExercise(0, 3, "Standing Calf Raise", "Legs", _make_sets(a_sets, a_reps + 3)))
                exercises.append(RoutineSectionExercise(0, 4, "Hanging Leg Raise", "Abs", _make_sets(3, 12)))
            else:
                exercises.append(RoutineSectionExercise(0, 0, "Front Squat", "Legs", _make_sets(c_sets, c_reps)))
                exercises.append(RoutineSectionExercise(0, 1, "Hip Thrust (Barbell)", "Legs", _make_sets(a_sets, a_reps)))
                exercises.append(RoutineSectionExercise(0, 2, "Bulgarian Split Squat", "Legs", _make_sets(a_sets, a_reps)))
                exercises.append(RoutineSectionExercise(0, 3, "Leg Curl (Machine)", "Legs", _make_sets(a_sets, a_reps)))
                exercises.append(RoutineSectionExercise(0, 4, "Ab Wheel Rollout", "Abs", _make_sets(3, 10)))
        else:
            exercises.append(RoutineSectionExercise(0, 0, "Bulgarian Split Squat", "Legs", _make_sets(4, 10)))
            exercises.append(RoutineSectionExercise(0, 1, "Walking Lunge", "Legs", _make_sets(3, 12)))
            exercises.append(RoutineSectionExercise(0, 2, "Standing Calf Raise", "Legs", _make_sets(4, 15)))
            exercises.append(RoutineSectionExercise(0, 3, "Plank", "Abs", _make_sets(3, 1)))

        return RoutineSection(name=name, exercises=exercises)

    @classmethod
    def _build_upper_day(cls, name: str, c_sets: int, c_reps: int, a_sets: int, a_reps: int, eq: EquipmentType, variation: int) -> RoutineSection:
        exercises: List[RoutineSectionExercise] = []
        if variation == 1:
            exercises.append(RoutineSectionExercise(0, 0, "Flat Barbell Bench Press", "Chest", _make_sets(c_sets, c_reps)))
            exercises.append(RoutineSectionExercise(0, 1, "Barbell Bent-Over Row", "Back", _make_sets(c_sets, c_reps)))
            exercises.append(RoutineSectionExercise(0, 2, "Overhead Press (Barbell)", "Shoulders", _make_sets(a_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 3, "Lat Pulldown (Cable)", "Back", _make_sets(a_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 4, "Skull Crusher (EZ Bar)", "Triceps", _make_sets(a_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 5, "Barbell Biceps Curl", "Biceps", _make_sets(a_sets, a_reps)))
        else:
            exercises.append(RoutineSectionExercise(0, 0, "Incline Dumbbell Bench Press", "Chest", _make_sets(c_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 1, "Seated Cable Row", "Back", _make_sets(c_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 2, "Side Lateral Raise (Dumbbell)", "Shoulders", _make_sets(a_sets, a_reps + 2)))
            exercises.append(RoutineSectionExercise(0, 3, "Cable Crossover", "Chest", _make_sets(a_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 4, "Incline Dumbbell Curl", "Biceps", _make_sets(a_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 5, "Triceps Pushdown (Cable)", "Triceps", _make_sets(a_sets, a_reps)))

        return RoutineSection(name=name, exercises=exercises)

    @classmethod
    def _build_lower_day(cls, name: str, c_sets: int, c_reps: int, a_sets: int, a_reps: int, eq: EquipmentType, variation: int) -> RoutineSection:
        exercises: List[RoutineSectionExercise] = []
        if variation == 1:
            exercises.append(RoutineSectionExercise(0, 0, "Barbell Back Squat", "Legs", _make_sets(c_sets, c_reps)))
            exercises.append(RoutineSectionExercise(0, 1, "Romanian Deadlift (Barbell)", "Legs", _make_sets(a_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 2, "Leg Press", "Legs", _make_sets(a_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 3, "Standing Calf Raise", "Legs", _make_sets(a_sets, a_reps + 3)))
            exercises.append(RoutineSectionExercise(0, 4, "Ab Wheel Rollout", "Abs", _make_sets(3, 10)))
        else:
            exercises.append(RoutineSectionExercise(0, 0, "Conventional Deadlift", "Back", _make_sets(3, 5)))
            exercises.append(RoutineSectionExercise(0, 1, "Front Squat", "Legs", _make_sets(c_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 2, "Bulgarian Split Squat", "Legs", _make_sets(a_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 3, "Seated Calf Raise", "Legs", _make_sets(a_sets, a_reps + 3)))
            exercises.append(RoutineSectionExercise(0, 4, "Hanging Leg Raise", "Abs", _make_sets(3, 12)))

        return RoutineSection(name=name, exercises=exercises)

    @classmethod
    def _build_fullbody_day(cls, name: str, c_sets: int, c_reps: int, a_sets: int, a_reps: int, eq: EquipmentType, variation: int) -> RoutineSection:
        exercises: List[RoutineSectionExercise] = []
        if variation == 1:
            exercises.append(RoutineSectionExercise(0, 0, "Barbell Back Squat", "Legs", _make_sets(c_sets, c_reps)))
            exercises.append(RoutineSectionExercise(0, 1, "Flat Barbell Bench Press", "Chest", _make_sets(c_sets, c_reps)))
            exercises.append(RoutineSectionExercise(0, 2, "Barbell Bent-Over Row", "Back", _make_sets(c_sets, c_reps)))
            exercises.append(RoutineSectionExercise(0, 3, "Side Lateral Raise (Dumbbell)", "Shoulders", _make_sets(a_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 4, "Barbell Biceps Curl", "Biceps", _make_sets(a_sets, a_reps)))
        elif variation == 2:
            exercises.append(RoutineSectionExercise(0, 0, "Conventional Deadlift", "Back", _make_sets(3, 5)))
            exercises.append(RoutineSectionExercise(0, 1, "Overhead Press (Barbell)", "Shoulders", _make_sets(c_sets, c_reps)))
            exercises.append(RoutineSectionExercise(0, 2, "Pull Up", "Back", _make_sets(c_sets, c_reps)))
            exercises.append(RoutineSectionExercise(0, 3, "Leg Press", "Legs", _make_sets(a_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 4, "Triceps Pushdown (Cable)", "Triceps", _make_sets(a_sets, a_reps)))
        else:
            exercises.append(RoutineSectionExercise(0, 0, "Front Squat", "Legs", _make_sets(c_sets, c_reps)))
            exercises.append(RoutineSectionExercise(0, 1, "Incline Dumbbell Bench Press", "Chest", _make_sets(a_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 2, "Seated Cable Row", "Back", _make_sets(a_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 3, "Romanian Deadlift (Barbell)", "Legs", _make_sets(a_sets, a_reps)))
            exercises.append(RoutineSectionExercise(0, 4, "Hanging Leg Raise", "Abs", _make_sets(3, 12)))

        return RoutineSection(name=name, exercises=exercises)
