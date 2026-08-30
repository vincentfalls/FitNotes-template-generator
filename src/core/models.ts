/**
 * Domain models for FitNotes (Android) and FitNotes 2 (iOS)
 */

export enum ExerciseType {
  WEIGHT_REPS = 1,   // Resistance (Weight & Reps)
  DISTANCE_TIME = 2, // Cardio (Distance & Time)
  REPS_ONLY = 3,     // Bodyweight / Calisthenics
  TIME_ONLY = 4      // Timed Holds
}

export interface Category {
  id?: number;
  name: string;
  colour: string;
  sort_order: number;
}

export interface Exercise {
  id?: number;
  name: string;
  category_id: number;
  category_name?: string;
  exercise_type_id: ExerciseType;
  notes?: string | null;
  weight_increment?: number | null;
  default_graph_id?: number | null;
  default_rest_time?: number | null;
}

export interface RoutineSet {
  id?: number;
  routine_section_exercise_id?: number;
  metric_weight: number;
  reps: number;
  sort_order: number;
  distance: number;
  duration_seconds: number;
  unit: number; // 0: kg, 1: lbs
}

export interface RoutineSectionExercise {
  id?: number;
  routine_section_id?: number;
  exercise_id: number;
  exercise_name?: string;
  category_name?: string;
  sort_order: number;
  sets: RoutineSet[];
}

export interface RoutineSection {
  id?: number;
  routine_id?: number;
  name: string;
  sort_order: number;
  exercises: RoutineSectionExercise[];
}

export interface Routine {
  id?: number;
  name: string;
  notes?: string | null;
  sections: RoutineSection[];
}

export interface FitNotesBackupOverview {
  routineCount: number;
  exerciseCount: number;
  categoryCount: number;
  workoutLogCount: number;
  routines: { id: number; name: string; sectionCount: number }[];
}
