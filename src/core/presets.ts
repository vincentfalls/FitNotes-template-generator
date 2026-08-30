import { Routine, RoutineSection, RoutineSectionExercise, RoutineSet } from './models';

function createSetList(count: number, reps = 10, weight = 0): RoutineSet[] {
  const sets: RoutineSet[] = [];
  for (let i = 0; i < count; i++) {
    sets.push({
      metric_weight: weight,
      reps: reps,
      sort_order: i,
      distance: 0,
      duration_seconds: 0,
      unit: 0,
    });
  }
  return sets;
}

export interface PresetInfo {
  id: string;
  title: string;
  days: number;
  category: string;
  description: string;
  build: () => Routine;
}

export const PRESET_LIBRARY: Record<string, PresetInfo> = {
  ppl_6day: {
    id: 'ppl_6day',
    title: 'Push Pull Legs (PPL) 6-Day',
    days: 6,
    category: 'Hypertrophy / Bodybuilding',
    description: 'High-frequency 6-day split targeting each muscle group twice weekly.',
    build: () => ({
      name: 'Push Pull Legs (PPL) 6-Day',
      notes: 'Classic 6-day hypertrophy split: Push A, Pull A, Legs A, Push B, Pull B, Legs B, Rest.',
      sections: [
        {
          name: 'Push A (Chest & Triceps Focus)',
          sort_order: 0,
          exercises: [
            { exercise_id: 0, exercise_name: 'Flat Barbell Bench Press', category_name: 'Chest', sort_order: 0, sets: createSetList(4, 6) },
            { exercise_id: 0, exercise_name: 'Overhead Press (Barbell)', category_name: 'Shoulders', sort_order: 1, sets: createSetList(3, 8) },
            { exercise_id: 0, exercise_name: 'Incline Dumbbell Bench Press', category_name: 'Chest', sort_order: 2, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Side Lateral Raise (Dumbbell)', category_name: 'Shoulders', sort_order: 3, sets: createSetList(4, 12) },
            { exercise_id: 0, exercise_name: 'Triceps Pushdown (Cable)', category_name: 'Triceps', sort_order: 4, sets: createSetList(3, 12) },
            { exercise_id: 0, exercise_name: 'Overhead Triceps Extension (Cable)', category_name: 'Triceps', sort_order: 5, sets: createSetList(3, 12) },
          ],
        },
        {
          name: 'Pull A (Back & Biceps Focus)',
          sort_order: 1,
          exercises: [
            { exercise_id: 0, exercise_name: 'Conventional Deadlift', category_name: 'Back', sort_order: 0, sets: createSetList(3, 5) },
            { exercise_id: 0, exercise_name: 'Pull Up', category_name: 'Back', sort_order: 1, sets: createSetList(3, 8) },
            { exercise_id: 0, exercise_name: 'Seated Cable Row', category_name: 'Back', sort_order: 2, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Face Pull (Cable)', category_name: 'Back', sort_order: 3, sets: createSetList(4, 15) },
            { exercise_id: 0, exercise_name: 'Barbell Biceps Curl', category_name: 'Biceps', sort_order: 4, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Hammer Curl (Dumbbell)', category_name: 'Biceps', sort_order: 5, sets: createSetList(3, 12) },
          ],
        },
        {
          name: 'Legs A (Quad & Calves Focus)',
          sort_order: 2,
          exercises: [
            { exercise_id: 0, exercise_name: 'Barbell Back Squat', category_name: 'Legs', sort_order: 0, sets: createSetList(4, 6) },
            { exercise_id: 0, exercise_name: 'Romanian Deadlift (Barbell)', category_name: 'Legs', sort_order: 1, sets: createSetList(3, 8) },
            { exercise_id: 0, exercise_name: 'Leg Press', category_name: 'Legs', sort_order: 2, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Leg Curl (Machine)', category_name: 'Legs', sort_order: 3, sets: createSetList(3, 12) },
            { exercise_id: 0, exercise_name: 'Standing Calf Raise', category_name: 'Legs', sort_order: 4, sets: createSetList(4, 15) },
            { exercise_id: 0, exercise_name: 'Hanging Leg Raise', category_name: 'Abs', sort_order: 5, sets: createSetList(3, 12) },
          ],
        },
        {
          name: 'Push B (Shoulders & Chest Volume)',
          sort_order: 3,
          exercises: [
            { exercise_id: 0, exercise_name: 'Overhead Press (Barbell)', category_name: 'Shoulders', sort_order: 0, sets: createSetList(4, 6) },
            { exercise_id: 0, exercise_name: 'Flat Dumbbell Bench Press', category_name: 'Chest', sort_order: 1, sets: createSetList(3, 8) },
            { exercise_id: 0, exercise_name: 'Dips (Chest)', category_name: 'Chest', sort_order: 2, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Side Lateral Raise (Cable)', category_name: 'Shoulders', sort_order: 3, sets: createSetList(4, 12) },
            { exercise_id: 0, exercise_name: 'Skull Crusher (EZ Bar)', category_name: 'Triceps', sort_order: 4, sets: createSetList(3, 10) },
          ],
        },
        {
          name: 'Pull B (Row & Lat Focus)',
          sort_order: 4,
          exercises: [
            { exercise_id: 0, exercise_name: 'Barbell Bent-Over Row', category_name: 'Back', sort_order: 0, sets: createSetList(4, 8) },
            { exercise_id: 0, exercise_name: 'Lat Pulldown (Cable)', category_name: 'Back', sort_order: 1, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Single-Arm Dumbbell Row', category_name: 'Back', sort_order: 2, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Rear Delt Flye (Machine)', category_name: 'Shoulders', sort_order: 3, sets: createSetList(4, 15) },
            { exercise_id: 0, exercise_name: 'Incline Dumbbell Curl', category_name: 'Biceps', sort_order: 4, sets: createSetList(3, 10) },
          ],
        },
        {
          name: 'Legs B (Hamstrings & Glutes Focus)',
          sort_order: 5,
          exercises: [
            { exercise_id: 0, exercise_name: 'Barbell Back Squat', category_name: 'Legs', sort_order: 0, sets: createSetList(3, 8) },
            { exercise_id: 0, exercise_name: 'Hip Thrust (Barbell)', category_name: 'Legs', sort_order: 1, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Bulgarian Split Squat', category_name: 'Legs', sort_order: 2, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Leg Extension (Machine)', category_name: 'Legs', sort_order: 3, sets: createSetList(3, 12) },
            { exercise_id: 0, exercise_name: 'Seated Calf Raise', category_name: 'Legs', sort_order: 4, sets: createSetList(4, 15) },
          ],
        },
      ],
    }),
  },
  arnold_split: {
    id: 'arnold_split',
    title: 'Arnold Schwarzenegger Split (6-Day)',
    days: 6,
    category: 'Bodybuilding / Antagonistic',
    description: 'Classic Golden Era split pairing opposing muscle groups (Chest/Back, Shoulders/Arms, Legs).',
    build: () => ({
      name: 'Arnold Schwarzenegger Split (6-Day)',
      notes: 'High volume antagonistic superset split: Chest & Back, Shoulders & Arms, Legs & Lower Back.',
      sections: [
        {
          name: 'Day 1 & 4: Chest & Back',
          sort_order: 0,
          exercises: [
            { exercise_id: 0, exercise_name: 'Flat Barbell Bench Press', category_name: 'Chest', sort_order: 0, sets: createSetList(4, 8) },
            { exercise_id: 0, exercise_name: 'Incline Barbell Bench Press', category_name: 'Chest', sort_order: 1, sets: createSetList(4, 8) },
            { exercise_id: 0, exercise_name: 'Barbell Bent-Over Row', category_name: 'Back', sort_order: 2, sets: createSetList(4, 8) },
            { exercise_id: 0, exercise_name: 'Pull Up', category_name: 'Back', sort_order: 3, sets: createSetList(4, 8) },
            { exercise_id: 0, exercise_name: 'Dips (Chest)', category_name: 'Chest', sort_order: 4, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Face Pull (Cable)', category_name: 'Back', sort_order: 5, sets: createSetList(4, 15) },
          ],
        },
        {
          name: 'Day 2 & 5: Shoulders & Arms',
          sort_order: 1,
          exercises: [
            { exercise_id: 0, exercise_name: 'Overhead Press (Barbell)', category_name: 'Shoulders', sort_order: 0, sets: createSetList(4, 8) },
            { exercise_id: 0, exercise_name: 'Side Lateral Raise (Dumbbell)', category_name: 'Shoulders', sort_order: 1, sets: createSetList(4, 12) },
            { exercise_id: 0, exercise_name: 'Rear Delt Flye (Dumbbell)', category_name: 'Shoulders', sort_order: 2, sets: createSetList(4, 12) },
            { exercise_id: 0, exercise_name: 'Barbell Biceps Curl', category_name: 'Biceps', sort_order: 3, sets: createSetList(4, 10) },
            { exercise_id: 0, exercise_name: 'Skull Crusher (EZ Bar)', category_name: 'Triceps', sort_order: 4, sets: createSetList(4, 10) },
            { exercise_id: 0, exercise_name: 'Incline Dumbbell Curl', category_name: 'Biceps', sort_order: 5, sets: createSetList(3, 12) },
            { exercise_id: 0, exercise_name: 'Triceps Pushdown (Cable)', category_name: 'Triceps', sort_order: 6, sets: createSetList(3, 12) },
          ],
        },
        {
          name: 'Day 3 & 6: Legs & Abs',
          sort_order: 2,
          exercises: [
            { exercise_id: 0, exercise_name: 'Barbell Back Squat', category_name: 'Legs', sort_order: 0, sets: createSetList(4, 8) },
            { exercise_id: 0, exercise_name: 'Romanian Deadlift (Barbell)', category_name: 'Legs', sort_order: 1, sets: createSetList(4, 8) },
            { exercise_id: 0, exercise_name: 'Leg Press', category_name: 'Legs', sort_order: 2, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Leg Curl (Machine)', category_name: 'Legs', sort_order: 3, sets: createSetList(3, 12) },
            { exercise_id: 0, exercise_name: 'Standing Calf Raise', category_name: 'Legs', sort_order: 4, sets: createSetList(4, 15) },
            { exercise_id: 0, exercise_name: 'Hanging Leg Raise', category_name: 'Abs', sort_order: 5, sets: createSetList(3, 15) },
          ],
        },
      ],
    }),
  },
  upper_lower_4day: {
    id: 'upper_lower_4day',
    title: 'Upper / Lower 4-Day Split',
    days: 4,
    category: 'Strength & Hypertrophy',
    description: 'Optimally balanced 4-day split alternating heavy strength and hypertrophy days.',
    build: () => ({
      name: 'Upper Lower 4-Day Split',
      notes: 'Balanced 4-day strength and hypertrophy program. Mon: Upper A, Tue: Lower A, Thu: Upper B, Fri: Lower B.',
      sections: [
        {
          name: 'Upper A (Strength Focus)',
          sort_order: 0,
          exercises: [
            { exercise_id: 0, exercise_name: 'Flat Barbell Bench Press', category_name: 'Chest', sort_order: 0, sets: createSetList(4, 5) },
            { exercise_id: 0, exercise_name: 'Barbell Bent-Over Row', category_name: 'Back', sort_order: 1, sets: createSetList(4, 5) },
            { exercise_id: 0, exercise_name: 'Overhead Press (Barbell)', category_name: 'Shoulders', sort_order: 2, sets: createSetList(3, 6) },
            { exercise_id: 0, exercise_name: 'Lat Pulldown (Cable)', category_name: 'Back', sort_order: 3, sets: createSetList(3, 8) },
            { exercise_id: 0, exercise_name: 'Skull Crusher (EZ Bar)', category_name: 'Triceps', sort_order: 4, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Barbell Biceps Curl', category_name: 'Biceps', sort_order: 5, sets: createSetList(3, 10) },
          ],
        },
        {
          name: 'Lower A (Strength Focus)',
          sort_order: 1,
          exercises: [
            { exercise_id: 0, exercise_name: 'Barbell Back Squat', category_name: 'Legs', sort_order: 0, sets: createSetList(4, 5) },
            { exercise_id: 0, exercise_name: 'Romanian Deadlift (Barbell)', category_name: 'Legs', sort_order: 1, sets: createSetList(3, 6) },
            { exercise_id: 0, exercise_name: 'Leg Press', category_name: 'Legs', sort_order: 2, sets: createSetList(3, 8) },
            { exercise_id: 0, exercise_name: 'Standing Calf Raise', category_name: 'Legs', sort_order: 3, sets: createSetList(4, 10) },
            { exercise_id: 0, exercise_name: 'Ab Wheel Rollout', category_name: 'Abs', sort_order: 4, sets: createSetList(3, 10) },
          ],
        },
        {
          name: 'Upper B (Hypertrophy Focus)',
          sort_order: 2,
          exercises: [
            { exercise_id: 0, exercise_name: 'Incline Dumbbell Bench Press', category_name: 'Chest', sort_order: 0, sets: createSetList(4, 10) },
            { exercise_id: 0, exercise_name: 'Seated Cable Row', category_name: 'Back', sort_order: 1, sets: createSetList(4, 10) },
            { exercise_id: 0, exercise_name: 'Side Lateral Raise (Dumbbell)', category_name: 'Shoulders', sort_order: 2, sets: createSetList(4, 12) },
            { exercise_id: 0, exercise_name: 'Cable Crossover', category_name: 'Chest', sort_order: 3, sets: createSetList(3, 12) },
            { exercise_id: 0, exercise_name: 'Incline Dumbbell Curl', category_name: 'Biceps', sort_order: 4, sets: createSetList(3, 12) },
            { exercise_id: 0, exercise_name: 'Triceps Pushdown (Cable)', category_name: 'Triceps', sort_order: 5, sets: createSetList(3, 12) },
          ],
        },
        {
          name: 'Lower B (Hypertrophy Focus)',
          sort_order: 3,
          exercises: [
            { exercise_id: 0, exercise_name: 'Conventional Deadlift', category_name: 'Back', sort_order: 0, sets: createSetList(3, 5) },
            { exercise_id: 0, exercise_name: 'Front Squat', category_name: 'Legs', sort_order: 1, sets: createSetList(3, 8) },
            { exercise_id: 0, exercise_name: 'Leg Extension (Machine)', category_name: 'Legs', sort_order: 2, sets: createSetList(3, 12) },
            { exercise_id: 0, exercise_name: 'Leg Curl (Machine)', category_name: 'Legs', sort_order: 3, sets: createSetList(3, 12) },
            { exercise_id: 0, exercise_name: 'Seated Calf Raise', category_name: 'Legs', sort_order: 4, sets: createSetList(4, 15) },
            { exercise_id: 0, exercise_name: 'Hanging Leg Raise', category_name: 'Abs', sort_order: 5, sets: createSetList(3, 12) },
          ],
        },
      ],
    }),
  },
  stronglifts_5x5: {
    id: 'stronglifts_5x5',
    title: 'StrongLifts 5x5',
    days: 3,
    category: 'Strength / Beginner Linear Progression',
    description: 'Simple compound movement progression to build foundation barbell strength.',
    build: () => ({
      name: 'StrongLifts 5x5 / Linear Progression',
      notes: 'Simple, effective beginner linear progression. Alternate Workout A and Workout B 3 days per week (e.g. Mon/Wed/Fri).',
      sections: [
        {
          name: 'Workout A',
          sort_order: 0,
          exercises: [
            { exercise_id: 0, exercise_name: 'Barbell Back Squat', category_name: 'Legs', sort_order: 0, sets: createSetList(5, 5) },
            { exercise_id: 0, exercise_name: 'Flat Barbell Bench Press', category_name: 'Chest', sort_order: 1, sets: createSetList(5, 5) },
            { exercise_id: 0, exercise_name: 'Barbell Bent-Over Row', category_name: 'Back', sort_order: 2, sets: createSetList(5, 5) },
          ],
        },
        {
          name: 'Workout B',
          sort_order: 1,
          exercises: [
            { exercise_id: 0, exercise_name: 'Barbell Back Squat', category_name: 'Legs', sort_order: 0, sets: createSetList(5, 5) },
            { exercise_id: 0, exercise_name: 'Overhead Press (Barbell)', category_name: 'Shoulders', sort_order: 1, sets: createSetList(5, 5) },
            { exercise_id: 0, exercise_name: 'Conventional Deadlift', category_name: 'Back', sort_order: 2, sets: createSetList(1, 5) },
          ],
        },
      ],
    }),
  },
  fullbody_3day: {
    id: 'fullbody_3day',
    title: 'Full Body 3-Day',
    days: 3,
    category: 'General Fitness / Busy Schedules',
    description: 'Comprehensive full-body routine with 48 hours recovery between workouts.',
    build: () => ({
      name: 'Full Body 3-Day Program',
      notes: 'Full body stimulation 3 days per week with optimal recovery (Mon/Wed/Fri).',
      sections: [
        {
          name: 'Day 1: Full Body A',
          sort_order: 0,
          exercises: [
            { exercise_id: 0, exercise_name: 'Barbell Back Squat', category_name: 'Legs', sort_order: 0, sets: createSetList(3, 8) },
            { exercise_id: 0, exercise_name: 'Flat Barbell Bench Press', category_name: 'Chest', sort_order: 1, sets: createSetList(3, 8) },
            { exercise_id: 0, exercise_name: 'Barbell Bent-Over Row', category_name: 'Back', sort_order: 2, sets: createSetList(3, 8) },
            { exercise_id: 0, exercise_name: 'Side Lateral Raise (Dumbbell)', category_name: 'Shoulders', sort_order: 3, sets: createSetList(3, 12) },
            { exercise_id: 0, exercise_name: 'Barbell Biceps Curl', category_name: 'Biceps', sort_order: 4, sets: createSetList(3, 10) },
          ],
        },
        {
          name: 'Day 2: Full Body B',
          sort_order: 1,
          exercises: [
            { exercise_id: 0, exercise_name: 'Conventional Deadlift', category_name: 'Back', sort_order: 0, sets: createSetList(3, 5) },
            { exercise_id: 0, exercise_name: 'Overhead Press (Barbell)', category_name: 'Shoulders', sort_order: 1, sets: createSetList(3, 8) },
            { exercise_id: 0, exercise_name: 'Pull Up', category_name: 'Back', sort_order: 2, sets: createSetList(3, 8) },
            { exercise_id: 0, exercise_name: 'Leg Press', category_name: 'Legs', sort_order: 3, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Triceps Pushdown (Cable)', category_name: 'Triceps', sort_order: 4, sets: createSetList(3, 10) },
          ],
        },
        {
          name: 'Day 3: Full Body C',
          sort_order: 2,
          exercises: [
            { exercise_id: 0, exercise_name: 'Front Squat', category_name: 'Legs', sort_order: 0, sets: createSetList(3, 8) },
            { exercise_id: 0, exercise_name: 'Incline Dumbbell Bench Press', category_name: 'Chest', sort_order: 1, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Seated Cable Row', category_name: 'Back', sort_order: 2, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Romanian Deadlift (Barbell)', category_name: 'Legs', sort_order: 3, sets: createSetList(3, 10) },
            { exercise_id: 0, exercise_name: 'Hanging Leg Raise', category_name: 'Abs', sort_order: 4, sets: createSetList(3, 12) },
          ],
        },
      ],
    }),
  },
};
