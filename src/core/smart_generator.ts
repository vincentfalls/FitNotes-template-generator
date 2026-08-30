import { Routine, RoutineSection, RoutineSectionExercise, RoutineSet } from './models';

export type WorkoutGoal = 'hypertrophy' | 'strength' | 'general_fitness';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type EquipmentType = 'full_gym' | 'barbell_rack' | 'dumbbells_only' | 'bodyweight_only';

function makeSets(count: number, reps: number, weight = 0): RoutineSet[] {
  return Array.from({ length: count }, (_, i) => ({
    metric_weight: weight,
    reps: reps,
    sort_order: i,
    distance: 0,
    duration_seconds: 0,
    unit: 0,
  }));
}

export class SmartWorkoutGenerator {
  static generate(params: {
    goal?: WorkoutGoal;
    daysPerWeek?: number;
    experience?: ExperienceLevel;
    equipment?: EquipmentType;
    focusArea?: string;
  }): Routine {
    const goal = params.goal || 'hypertrophy';
    const days = Math.max(2, Math.min(6, params.daysPerWeek || 4));
    const experience = params.experience || 'intermediate';
    const equipment = params.equipment || 'full_gym';

    let compoundReps = 8;
    let accessoryReps = 12;
    let compoundSets = 4;
    let accessorySets = 3;

    if (goal === 'strength') {
      compoundReps = 5;
      accessoryReps = 8;
      compoundSets = experience === 'beginner' ? 3 : 5;
      accessorySets = 3;
    } else if (goal === 'general_fitness') {
      compoundReps = 10;
      accessoryReps = 15;
      compoundSets = 3;
      accessorySets = 3;
    } else {
      compoundSets = 4;
      accessorySets = experience === 'advanced' ? 4 : 3;
    }

    const titleGoal = goal.charAt(0).toUpperCase() + goal.slice(1).replace('_', ' ');
    const titleEq = equipment.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
    const routineName = `Smart ${titleGoal} (${days}-Day ${titleEq})`;
    const routineNotes = `Generated for ${experience} level. Goal: ${titleGoal}. Equipment: ${titleEq}.`;

    const sections: RoutineSection[] = [];

    if (days === 2) {
      sections.push(this.buildFullbodyDay('Day 1: Full Body A', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 1));
      sections.push(this.buildFullbodyDay('Day 2: Full Body B', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 2));
    } else if (days === 3) {
      if (experience === 'beginner' || equipment === 'dumbbells_only') {
        sections.push(this.buildFullbodyDay('Day 1: Full Body A', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 1));
        sections.push(this.buildFullbodyDay('Day 2: Full Body B', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 2));
        sections.push(this.buildFullbodyDay('Day 3: Full Body C', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 3));
      } else {
        sections.push(this.buildPushDay('Day 1: Push', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 1));
        sections.push(this.buildPullDay('Day 2: Pull', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 1));
        sections.push(this.buildLegsDay('Day 3: Legs & Core', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 1));
      }
    } else if (days === 4) {
      sections.push(this.buildUpperDay('Day 1: Upper A', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 1));
      sections.push(this.buildLowerDay('Day 2: Lower A', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 1));
      sections.push(this.buildUpperDay('Day 3: Upper B', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 2));
      sections.push(this.buildLowerDay('Day 4: Lower B', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 2));
    } else if (days === 5) {
      sections.push(this.buildPushDay('Day 1: Push (Chest & Triceps)', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 1));
      sections.push(this.buildPullDay('Day 2: Pull (Back & Biceps)', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 1));
      sections.push(this.buildLegsDay('Day 3: Legs (Quad Focus)', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 1));
      sections.push(this.buildUpperDay('Day 4: Upper (Shoulders & Arms)', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 2));
      sections.push(this.buildLowerDay('Day 5: Lower & Core (Hamstring Focus)', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 2));
    } else {
      sections.push(this.buildPushDay('Day 1: Push A', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 1));
      sections.push(this.buildPullDay('Day 2: Pull A', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 1));
      sections.push(this.buildLegsDay('Day 3: Legs A', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 1));
      sections.push(this.buildPushDay('Day 4: Push B', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 2));
      sections.push(this.buildPullDay('Day 5: Pull B', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 2));
      sections.push(this.buildLegsDay('Day 6: Legs B', compoundSets, compoundReps, accessorySets, accessoryReps, equipment, 2));
    }

    sections.forEach((s, idx) => (s.sort_order = idx));
    return { name: routineName, notes: routineNotes, sections };
  }

  private static buildPushDay(name: string, cSets: number, cReps: number, aSets: number, aReps: number, eq: EquipmentType, variation: number): RoutineSection {
    const exercises: RoutineSectionExercise[] = [];
    if (eq === 'full_gym') {
      if (variation === 1) {
        exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Flat Barbell Bench Press', category_name: 'Chest', sets: makeSets(cSets, cReps) });
        exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Overhead Press (Barbell)', category_name: 'Shoulders', sets: makeSets(cSets, cReps) });
        exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Incline Dumbbell Bench Press', category_name: 'Chest', sets: makeSets(aSets, aReps) });
        exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Side Lateral Raise (Cable)', category_name: 'Shoulders', sets: makeSets(aSets, aReps + 2) });
        exercises.push({ exercise_id: 0, sort_order: 4, exercise_name: 'Triceps Pushdown (Cable)', category_name: 'Triceps', sets: makeSets(aSets, aReps) });
      } else {
        exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Incline Barbell Bench Press', category_name: 'Chest', sets: makeSets(cSets, cReps) });
        exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Flat Dumbbell Bench Press', category_name: 'Chest', sets: makeSets(aSets, aReps) });
        exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Dips (Chest)', category_name: 'Chest', sets: makeSets(aSets, aReps) });
        exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Side Lateral Raise (Dumbbell)', category_name: 'Shoulders', sets: makeSets(aSets, aReps + 2) });
        exercises.push({ exercise_id: 0, sort_order: 4, exercise_name: 'Skull Crusher (EZ Bar)', category_name: 'Triceps', sets: makeSets(aSets, aReps) });
      }
    } else if (eq === 'dumbbells_only') {
      exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Flat Dumbbell Bench Press', category_name: 'Chest', sets: makeSets(cSets, cReps) });
      exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Seated Dumbbell Shoulder Press', category_name: 'Shoulders', sets: makeSets(cSets, cReps) });
      exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Incline Dumbbell Bench Press', category_name: 'Chest', sets: makeSets(aSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Side Lateral Raise (Dumbbell)', category_name: 'Shoulders', sets: makeSets(aSets, aReps + 2) });
      exercises.push({ exercise_id: 0, sort_order: 4, exercise_name: 'Push Up', category_name: 'Chest', sets: makeSets(aSets, aReps + 5) });
    } else {
      exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Push Up', category_name: 'Chest', sets: makeSets(4, 15) });
      exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Dips (Chest)', category_name: 'Chest', sets: makeSets(4, 10) });
      exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Plank', category_name: 'Abs', sets: makeSets(3, 1) });
    }
    return { name, sort_order: 0, exercises };
  }

  private static buildPullDay(name: string, cSets: number, cReps: number, aSets: number, aReps: number, eq: EquipmentType, variation: number): RoutineSection {
    const exercises: RoutineSectionExercise[] = [];
    if (eq === 'full_gym') {
      if (variation === 1) {
        exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Conventional Deadlift', category_name: 'Back', sets: makeSets(3, 5) });
        exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Pull Up', category_name: 'Back', sets: makeSets(cSets, cReps) });
        exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Seated Cable Row', category_name: 'Back', sets: makeSets(aSets, aReps) });
        exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Face Pull (Cable)', category_name: 'Back', sets: makeSets(aSets, aReps + 3) });
        exercises.push({ exercise_id: 0, sort_order: 4, exercise_name: 'Barbell Biceps Curl', category_name: 'Biceps', sets: makeSets(aSets, aReps) });
      } else {
        exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Barbell Bent-Over Row', category_name: 'Back', sets: makeSets(cSets, cReps) });
        exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Lat Pulldown (Cable)', category_name: 'Back', sets: makeSets(aSets, aReps) });
        exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Single-Arm Dumbbell Row', category_name: 'Back', sets: makeSets(aSets, aReps) });
        exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Rear Delt Flye (Machine)', category_name: 'Shoulders', sets: makeSets(aSets, aReps + 3) });
        exercises.push({ exercise_id: 0, sort_order: 4, exercise_name: 'Hammer Curl (Dumbbell)', category_name: 'Biceps', sets: makeSets(aSets, aReps) });
      }
    } else if (eq === 'dumbbells_only') {
      exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Single-Arm Dumbbell Row', category_name: 'Back', sets: makeSets(cSets, cReps) });
      exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Rear Delt Flye (Dumbbell)', category_name: 'Shoulders', sets: makeSets(aSets, aReps + 2) });
      exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Incline Dumbbell Curl', category_name: 'Biceps', sets: makeSets(aSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Hammer Curl (Dumbbell)', category_name: 'Biceps', sets: makeSets(aSets, aReps) });
    } else {
      exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Pull Up', category_name: 'Back', sets: makeSets(4, 8) });
      exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Chin Up', category_name: 'Back', sets: makeSets(3, 8) });
    }
    return { name, sort_order: 0, exercises };
  }

  private static buildLegsDay(name: string, cSets: number, cReps: number, aSets: number, aReps: number, eq: EquipmentType, variation: number): RoutineSection {
    const exercises: RoutineSectionExercise[] = [];
    if (eq === 'full_gym' || eq === 'barbell_rack') {
      if (variation === 1) {
        exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Barbell Back Squat', category_name: 'Legs', sets: makeSets(cSets, cReps) });
        exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Romanian Deadlift (Barbell)', category_name: 'Legs', sets: makeSets(aSets, aReps) });
        exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Leg Press', category_name: 'Legs', sets: makeSets(aSets, aReps) });
        exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Standing Calf Raise', category_name: 'Legs', sets: makeSets(aSets, aReps + 3) });
        exercises.push({ exercise_id: 0, sort_order: 4, exercise_name: 'Hanging Leg Raise', category_name: 'Abs', sets: makeSets(3, 12) });
      } else {
        exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Front Squat', category_name: 'Legs', sets: makeSets(cSets, cReps) });
        exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Hip Thrust (Barbell)', category_name: 'Legs', sets: makeSets(aSets, aReps) });
        exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Bulgarian Split Squat', category_name: 'Legs', sets: makeSets(aSets, aReps) });
        exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Leg Curl (Machine)', category_name: 'Legs', sets: makeSets(aSets, aReps) });
        exercises.push({ exercise_id: 0, sort_order: 4, exercise_name: 'Ab Wheel Rollout', category_name: 'Abs', sets: makeSets(3, 10) });
      }
    } else {
      exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Bulgarian Split Squat', category_name: 'Legs', sets: makeSets(4, 10) });
      exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Walking Lunge', category_name: 'Legs', sets: makeSets(3, 12) });
      exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Standing Calf Raise', category_name: 'Legs', sets: makeSets(4, 15) });
      exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Plank', category_name: 'Abs', sets: makeSets(3, 1) });
    }
    return { name, sort_order: 0, exercises };
  }

  private static buildUpperDay(name: string, cSets: number, cReps: number, aSets: number, aReps: number, eq: EquipmentType, variation: number): RoutineSection {
    const exercises: RoutineSectionExercise[] = [];
    if (variation === 1) {
      exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Flat Barbell Bench Press', category_name: 'Chest', sets: makeSets(cSets, cReps) });
      exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Barbell Bent-Over Row', category_name: 'Back', sets: makeSets(cSets, cReps) });
      exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Overhead Press (Barbell)', category_name: 'Shoulders', sets: makeSets(aSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Lat Pulldown (Cable)', category_name: 'Back', sets: makeSets(aSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 4, exercise_name: 'Skull Crusher (EZ Bar)', category_name: 'Triceps', sets: makeSets(aSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 5, exercise_name: 'Barbell Biceps Curl', category_name: 'Biceps', sets: makeSets(aSets, aReps) });
    } else {
      exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Incline Dumbbell Bench Press', category_name: 'Chest', sets: makeSets(cSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Seated Cable Row', category_name: 'Back', sets: makeSets(cSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Side Lateral Raise (Dumbbell)', category_name: 'Shoulders', sets: makeSets(aSets, aReps + 2) });
      exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Cable Crossover', category_name: 'Chest', sets: makeSets(aSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 4, exercise_name: 'Incline Dumbbell Curl', category_name: 'Biceps', sets: makeSets(aSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 5, exercise_name: 'Triceps Pushdown (Cable)', category_name: 'Triceps', sets: makeSets(aSets, aReps) });
    }
    return { name, sort_order: 0, exercises };
  }

  private static buildLowerDay(name: string, cSets: number, cReps: number, aSets: number, aReps: number, eq: EquipmentType, variation: number): RoutineSection {
    const exercises: RoutineSectionExercise[] = [];
    if (variation === 1) {
      exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Barbell Back Squat', category_name: 'Legs', sets: makeSets(cSets, cReps) });
      exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Romanian Deadlift (Barbell)', category_name: 'Legs', sets: makeSets(aSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Leg Press', category_name: 'Legs', sets: makeSets(aSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Standing Calf Raise', category_name: 'Legs', sets: makeSets(aSets, aReps + 3) });
      exercises.push({ exercise_id: 0, sort_order: 4, exercise_name: 'Ab Wheel Rollout', category_name: 'Abs', sets: makeSets(3, 10) });
    } else {
      exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Conventional Deadlift', category_name: 'Back', sets: makeSets(3, 5) });
      exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Front Squat', category_name: 'Legs', sets: makeSets(cSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Bulgarian Split Squat', category_name: 'Legs', sets: makeSets(aSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Seated Calf Raise', category_name: 'Legs', sets: makeSets(aSets, aReps + 3) });
      exercises.push({ exercise_id: 0, sort_order: 4, exercise_name: 'Hanging Leg Raise', category_name: 'Abs', sets: makeSets(3, 12) });
    }
    return { name, sort_order: 0, exercises };
  }

  private static buildFullbodyDay(name: string, cSets: number, cReps: number, aSets: number, aReps: number, eq: EquipmentType, variation: number): RoutineSection {
    const exercises: RoutineSectionExercise[] = [];
    if (variation === 1) {
      exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Barbell Back Squat', category_name: 'Legs', sets: makeSets(cSets, cReps) });
      exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Flat Barbell Bench Press', category_name: 'Chest', sets: makeSets(cSets, cReps) });
      exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Barbell Bent-Over Row', category_name: 'Back', sets: makeSets(cSets, cReps) });
      exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Side Lateral Raise (Dumbbell)', category_name: 'Shoulders', sets: makeSets(aSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 4, exercise_name: 'Barbell Biceps Curl', category_name: 'Biceps', sets: makeSets(aSets, aReps) });
    } else if (variation === 2) {
      exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Conventional Deadlift', category_name: 'Back', sets: makeSets(3, 5) });
      exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Overhead Press (Barbell)', category_name: 'Shoulders', sets: makeSets(cSets, cReps) });
      exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Pull Up', category_name: 'Back', sets: makeSets(cSets, cReps) });
      exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Leg Press', category_name: 'Legs', sets: makeSets(aSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 4, exercise_name: 'Triceps Pushdown (Cable)', category_name: 'Triceps', sets: makeSets(aSets, aReps) });
    } else {
      exercises.push({ exercise_id: 0, sort_order: 0, exercise_name: 'Front Squat', category_name: 'Legs', sets: makeSets(cSets, cReps) });
      exercises.push({ exercise_id: 0, sort_order: 1, exercise_name: 'Incline Dumbbell Bench Press', category_name: 'Chest', sets: makeSets(aSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 2, exercise_name: 'Seated Cable Row', category_name: 'Back', sets: makeSets(aSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 3, exercise_name: 'Romanian Deadlift (Barbell)', category_name: 'Legs', sets: makeSets(aSets, aReps) });
      exercises.push({ exercise_id: 0, sort_order: 4, exercise_name: 'Hanging Leg Raise', category_name: 'Abs', sets: makeSets(3, 12) });
    }
    return { name, sort_order: 0, exercises };
  }
}
