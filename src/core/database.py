"""
FitNotes SQLite Database Engine & Merger.
Handles loading, inspecting, creating, and non-destructive merging of workout routines
for FitNotes (Android) and FitNotes 2 (iOS).
"""

from __future__ import annotations
import os
import sqlite3
import json
from typing import List, Dict, Tuple, Optional, Any
from .models import (
    Category,
    Exercise,
    ExerciseType,
    Routine,
    RoutineSection,
    RoutineSectionExercise,
    RoutineSet,
)

# Standard default categories matching FitNotes default catalog
DEFAULT_CATEGORIES = [
    ("Chest", "#E53935", 0),       # Red
    ("Back", "#1E88E5", 1),        # Blue
    ("Legs", "#43A047", 2),        # Green
    ("Shoulders", "#FB8C00", 3),   # Orange
    ("Biceps", "#8E24AA", 4),      # Purple
    ("Triceps", "#D81B60", 5),     # Pink
    ("Abs", "#00ACC1", 6),         # Cyan
    ("Cardio", "#3949AB", 7),      # Indigo
    ("Other", "#757575", 8),       # Grey
]

# Standard default exercises catalog
DEFAULT_EXERCISES = [
    # Chest
    ("Flat Barbell Bench Press", "Chest", ExerciseType.WEIGHT_REPS, 2.5),
    ("Incline Barbell Bench Press", "Chest", ExerciseType.WEIGHT_REPS, 2.5),
    ("Flat Dumbbell Bench Press", "Chest", ExerciseType.WEIGHT_REPS, 2.0),
    ("Incline Dumbbell Bench Press", "Chest", ExerciseType.WEIGHT_REPS, 2.0),
    ("Dips (Chest)", "Chest", ExerciseType.WEIGHT_REPS, 2.5),
    ("Cable Crossover", "Chest", ExerciseType.WEIGHT_REPS, 1.25),
    ("Pec Deck Machine", "Chest", ExerciseType.WEIGHT_REPS, 2.5),
    ("Push Up", "Chest", ExerciseType.REPS_ONLY, 0.0),

    # Back
    ("Conventional Deadlift", "Back", ExerciseType.WEIGHT_REPS, 2.5),
    ("Barbell Bent-Over Row", "Back", ExerciseType.WEIGHT_REPS, 2.5),
    ("Pull Up", "Back", ExerciseType.WEIGHT_REPS, 2.5),
    ("Chin Up", "Back", ExerciseType.WEIGHT_REPS, 2.5),
    ("Lat Pulldown (Cable)", "Back", ExerciseType.WEIGHT_REPS, 2.5),
    ("Seated Cable Row", "Back", ExerciseType.WEIGHT_REPS, 2.5),
    ("Single-Arm Dumbbell Row", "Back", ExerciseType.WEIGHT_REPS, 2.0),
    ("T-Bar Row", "Back", ExerciseType.WEIGHT_REPS, 2.5),
    ("Face Pull (Cable)", "Back", ExerciseType.WEIGHT_REPS, 1.25),

    # Legs
    ("Barbell Back Squat", "Legs", ExerciseType.WEIGHT_REPS, 2.5),
    ("Front Squat", "Legs", ExerciseType.WEIGHT_REPS, 2.5),
    ("Romanian Deadlift (Barbell)", "Legs", ExerciseType.WEIGHT_REPS, 2.5),
    ("Leg Press", "Legs", ExerciseType.WEIGHT_REPS, 5.0),
    ("Leg Extension (Machine)", "Legs", ExerciseType.WEIGHT_REPS, 2.5),
    ("Leg Curl (Machine)", "Legs", ExerciseType.WEIGHT_REPS, 2.5),
    ("Standing Calf Raise", "Legs", ExerciseType.WEIGHT_REPS, 2.5),
    ("Seated Calf Raise", "Legs", ExerciseType.WEIGHT_REPS, 2.5),
    ("Walking Lunge", "Legs", ExerciseType.WEIGHT_REPS, 2.0),
    ("Bulgarian Split Squat", "Legs", ExerciseType.WEIGHT_REPS, 2.0),
    ("Hip Thrust (Barbell)", "Legs", ExerciseType.WEIGHT_REPS, 2.5),

    # Shoulders
    ("Overhead Press (Barbell)", "Shoulders", ExerciseType.WEIGHT_REPS, 2.5),
    ("Seated Dumbbell Shoulder Press", "Shoulders", ExerciseType.WEIGHT_REPS, 2.0),
    ("Side Lateral Raise (Dumbbell)", "Shoulders", ExerciseType.WEIGHT_REPS, 1.0),
    ("Side Lateral Raise (Cable)", "Shoulders", ExerciseType.WEIGHT_REPS, 1.0),
    ("Rear Delt Flye (Dumbbell)", "Shoulders", ExerciseType.WEIGHT_REPS, 1.0),
    ("Rear Delt Flye (Machine)", "Shoulders", ExerciseType.WEIGHT_REPS, 2.5),
    ("Barbell Shrug", "Shoulders", ExerciseType.WEIGHT_REPS, 2.5),
    ("Dumbbell Shrug", "Shoulders", ExerciseType.WEIGHT_REPS, 2.0),

    # Biceps
    ("Barbell Biceps Curl", "Biceps", ExerciseType.WEIGHT_REPS, 2.5),
    ("Dumbbell Biceps Curl", "Biceps", ExerciseType.WEIGHT_REPS, 1.0),
    ("Incline Dumbbell Curl", "Biceps", ExerciseType.WEIGHT_REPS, 1.0),
    ("Hammer Curl (Dumbbell)", "Biceps", ExerciseType.WEIGHT_REPS, 1.0),
    ("Preacher Curl (EZ Bar)", "Biceps", ExerciseType.WEIGHT_REPS, 2.5),
    ("Cable Biceps Curl", "Biceps", ExerciseType.WEIGHT_REPS, 1.25),

    # Triceps
    ("Triceps Pushdown (Cable)", "Triceps", ExerciseType.WEIGHT_REPS, 1.25),
    ("Overhead Triceps Extension (Cable)", "Triceps", ExerciseType.WEIGHT_REPS, 1.25),
    ("Skull Crusher (EZ Bar)", "Triceps", ExerciseType.WEIGHT_REPS, 2.5),
    ("Close-Grip Barbell Bench Press", "Triceps", ExerciseType.WEIGHT_REPS, 2.5),
    ("Dips (Triceps)", "Triceps", ExerciseType.WEIGHT_REPS, 2.5),

    # Abs
    ("Hanging Leg Raise", "Abs", ExerciseType.REPS_ONLY, 0.0),
    ("Ab Wheel Rollout", "Abs", ExerciseType.REPS_ONLY, 0.0),
    ("Cable Crunch", "Abs", ExerciseType.WEIGHT_REPS, 2.5),
    ("Plank", "Abs", ExerciseType.TIME_ONLY, 0.0),

    # Cardio
    ("Treadmill Running", "Cardio", ExerciseType.DISTANCE_TIME, 0.0),
    ("Stationary Bike", "Cardio", ExerciseType.DISTANCE_TIME, 0.0),
    ("Rowing Machine", "Cardio", ExerciseType.DISTANCE_TIME, 0.0),
]


class FitNotesDatabase:
    """
    Reader, writer, and merger for FitNotes SQLite database files.
    """

    def __init__(self, filepath: Optional[str] = None):
        self.filepath = filepath
        self.conn: Optional[sqlite3.Connection] = None
        self.categories: Dict[int, Category] = {}
        self.exercises: Dict[int, Exercise] = {}
        self.routines: Dict[int, Routine] = {}

    def connect(self, filepath: Optional[str] = None) -> sqlite3.Connection:
        target = filepath or self.filepath or ":memory:"
        self.conn = sqlite3.connect(target)
        self.conn.execute("PRAGMA foreign_keys = ON;")
        self.conn.row_factory = sqlite3.Row
        return self.conn

    def close(self):
        if self.conn:
            self.conn.close()
            self.conn = None

    @classmethod
    def create_empty(cls, filepath: Optional[str] = None) -> FitNotesDatabase:
        """
        Creates a fresh FitNotes SQLite database initialized with all required tables,
        indexes, default categories, default exercises, and android metadata.
        """
        db = cls(filepath)
        conn = db.connect(filepath)
        cursor = conn.cursor()

        # 1. Android Metadata
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS android_metadata (
                locale TEXT DEFAULT 'en_US'
            );
        """)
        cursor.execute("INSERT INTO android_metadata (locale) VALUES ('en_US');")

        # 2. Category Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS Category (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                colour TEXT DEFAULT '#4CAF50',
                sort_order INTEGER DEFAULT 0
            );
        """)

        # 3. Exercise Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS exercise (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                category_id INTEGER NOT NULL,
                exercise_type_id INTEGER DEFAULT 1,
                notes TEXT,
                weight_increment REAL DEFAULT 2.5,
                default_graph_id INTEGER DEFAULT 1,
                default_rest_time INTEGER DEFAULT 90,
                FOREIGN KEY (category_id) REFERENCES Category(id)
            );
        """)

        # 4. Routine Tables
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS Routine (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                notes TEXT
            );
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS RoutineSection (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                routine_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                sort_order INTEGER DEFAULT 0,
                FOREIGN KEY (routine_id) REFERENCES Routine(id) ON DELETE CASCADE
            );
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS RoutineSectionExercise (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                routine_section_id INTEGER NOT NULL,
                exercise_id INTEGER NOT NULL,
                sort_order INTEGER DEFAULT 0,
                FOREIGN KEY (routine_section_id) REFERENCES RoutineSection(id) ON DELETE CASCADE,
                FOREIGN KEY (exercise_id) REFERENCES exercise(id)
            );
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS RoutineSectionExerciseSet (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                routine_section_exercise_id INTEGER NOT NULL,
                metric_weight REAL DEFAULT 0,
                reps INTEGER DEFAULT 0,
                sort_order INTEGER DEFAULT 0,
                distance REAL DEFAULT 0,
                duration_seconds INTEGER DEFAULT 0,
                unit INTEGER DEFAULT 0,
                FOREIGN KEY (routine_section_exercise_id) REFERENCES RoutineSectionExercise(id) ON DELETE CASCADE
            );
        """)

        # 5. Training Log Table (Workout History)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS training_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                exercise_id INTEGER NOT NULL,
                metric_weight REAL DEFAULT 0,
                reps INTEGER DEFAULT 0,
                metric_distance REAL DEFAULT 0,
                duration_seconds INTEGER DEFAULT 0,
                comment TEXT,
                set_order INTEGER DEFAULT 0,
                unit INTEGER DEFAULT 0,
                is_personal_record INTEGER DEFAULT 0,
                FOREIGN KEY (exercise_id) REFERENCES exercise(id)
            );
        """)

        # 6. Body Tracker / Measurements Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS body_tracker (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                body_tracker_type_id INTEGER DEFAULT 1,
                metric_value REAL DEFAULT 0,
                comment TEXT
            );
        """)

        # Populate Default Categories
        for name, colour, order in DEFAULT_CATEGORIES:
            cursor.execute(
                "INSERT INTO Category (name, colour, sort_order) VALUES (?, ?, ?);",
                (name, colour, order),
            )

        # Build category name to id mapping
        cat_map = {}
        for row in cursor.execute("SELECT id, name FROM Category;"):
            cat_map[row["name"].lower()] = row["id"]

        # Populate Default Exercises
        for name, cat_name, ex_type, increment in DEFAULT_EXERCISES:
            cat_id = cat_map.get(cat_name.lower(), 1)
            cursor.execute(
                """
                INSERT INTO exercise (name, category_id, exercise_type_id, weight_increment, default_graph_id, default_rest_time)
                VALUES (?, ?, ?, ?, 1, 90);
                """,
                (name, cat_id, int(ex_type), increment),
            )

        conn.commit()
        db.load_cache()
        return db

    def load_from_file(self, filepath: str) -> None:
        """Loads and parses an existing .fitnotes backup file into cache."""
        self.filepath = filepath
        self.connect(filepath)
        self.load_cache()

    def load_cache(self) -> None:
        """Loads categories, exercises, and routines into memory."""
        if not self.conn:
            return
        cursor = self.conn.cursor()

        # Load categories
        self.categories.clear()
        try:
            for row in cursor.execute("SELECT id, name, colour, sort_order FROM Category ORDER BY sort_order, id;"):
                cat = Category(
                    id=row["id"],
                    name=row["name"],
                    colour=row["colour"] or "#4CAF50",
                    sort_order=row["sort_order"] or 0,
                )
                self.categories[cat.id] = cat
        except sqlite3.OperationalError:
            pass

        # Load exercises
        self.exercises.clear()
        try:
            for row in cursor.execute("SELECT id, name, category_id, exercise_type_id, notes, weight_increment, default_graph_id, default_rest_time FROM exercise ORDER BY name;"):
                cat_name = self.categories.get(row["category_id"]).name if row["category_id"] in self.categories else None
                ex = Exercise(
                    id=row["id"],
                    name=row["name"],
                    category_id=row["category_id"],
                    category_name=cat_name,
                    exercise_type_id=row["exercise_type_id"] or 1,
                    notes=row["notes"],
                    weight_increment=row["weight_increment"] or 2.5,
                    default_graph_id=row["default_graph_id"] or 1,
                    default_rest_time=row["default_rest_time"] or 90,
                )
                self.exercises[ex.id] = ex
        except sqlite3.OperationalError:
            pass

        # Load routines
        self.routines.clear()
        try:
            for r_row in cursor.execute("SELECT id, name, notes FROM Routine ORDER BY id;"):
                routine = Routine(
                    id=r_row["id"],
                    name=r_row["name"],
                    notes=r_row["notes"],
                    sections=[],
                )

                sec_cursor = self.conn.cursor()
                for s_row in sec_cursor.execute("SELECT id, name, sort_order FROM RoutineSection WHERE routine_id = ? ORDER BY sort_order, id;", (routine.id,)):
                    section = RoutineSection(
                        id=s_row["id"],
                        routine_id=routine.id,
                        name=s_row["name"],
                        sort_order=s_row["sort_order"] or 0,
                        exercises=[],
                    )

                    ex_cursor = self.conn.cursor()
                    for re_row in ex_cursor.execute("SELECT id, exercise_id, sort_order FROM RoutineSectionExercise WHERE routine_section_id = ? ORDER BY sort_order, id;", (section.id,)):
                        ex_obj = self.exercises.get(re_row["exercise_id"])
                        sec_ex = RoutineSectionExercise(
                            id=re_row["id"],
                            routine_section_id=section.id,
                            exercise_id=re_row["exercise_id"],
                            exercise_name=ex_obj.name if ex_obj else f"Exercise #{re_row['exercise_id']}",
                            category_name=ex_obj.category_name if ex_obj else None,
                            sort_order=re_row["sort_order"] or 0,
                            sets=[],
                        )

                        set_cursor = self.conn.cursor()
                        for set_row in set_cursor.execute("SELECT id, metric_weight, reps, sort_order, distance, duration_seconds, unit FROM RoutineSectionExerciseSet WHERE routine_section_exercise_id = ? ORDER BY sort_order, id;", (sec_ex.id,)):
                            r_set = RoutineSet(
                                id=set_row["id"],
                                routine_section_exercise_id=sec_ex.id,
                                metric_weight=set_row["metric_weight"] or 0.0,
                                reps=set_row["reps"] or 0,
                                sort_order=set_row["sort_order"] or 0,
                                distance=set_row["distance"] or 0.0,
                                duration_seconds=set_row["duration_seconds"] or 0,
                                unit=set_row["unit"] or 0,
                            )
                            sec_ex.sets.append(r_set)

                        section.exercises.append(sec_ex)

                    routine.sections.append(section)

                self.routines[routine.id] = routine
        except sqlite3.OperationalError:
            pass

    def get_overview(self) -> Dict[str, Any]:
        """Returns statistical overview of the database."""
        if not self.conn:
            return {}
        cursor = self.conn.cursor()
        log_count = 0
        try:
            cursor.execute("SELECT COUNT(*) as count FROM training_log;")
            log_count = cursor.fetchone()["count"]
        except sqlite3.OperationalError:
            pass

        return {
            "routine_count": len(self.routines),
            "exercise_count": len(self.exercises),
            "category_count": len(self.categories),
            "workout_log_count": log_count,
            "routines": [
                {
                    "id": r.id,
                    "name": r.name,
                    "section_count": len(r.sections),
                    "total_exercises": sum(len(s.exercises) for s in r.sections),
                }
                for r in self.routines.values()
            ],
        }

    def ensure_category(self, name: str, colour: str = "#4CAF50") -> int:
        """Finds existing category or creates a new one, returning category ID."""
        for cat in self.categories.values():
            if cat.name.strip().lower() == name.strip().lower():
                return cat.id

        cursor = self.conn.cursor()
        max_sort = max([c.sort_order for c in self.categories.values()], default=0) + 1
        cursor.execute(
            "INSERT INTO Category (name, colour, sort_order) VALUES (?, ?, ?);",
            (name.strip(), colour, max_sort),
        )
        cat_id = cursor.lastrowid
        new_cat = Category(id=cat_id, name=name.strip(), colour=colour, sort_order=max_sort)
        self.categories[cat_id] = new_cat
        return cat_id

    def ensure_exercise(
        self,
        name: str,
        category_name: str = "Other",
        exercise_type_id: int = ExerciseType.WEIGHT_REPS,
        increment: float = 2.5,
    ) -> int:
        """Finds existing exercise or creates a new one, returning exercise ID."""
        for ex in self.exercises.values():
            if ex.name.strip().lower() == name.strip().lower():
                return ex.id

        cat_id = self.ensure_category(category_name)
        cursor = self.conn.cursor()
        cursor.execute(
            """
            INSERT INTO exercise (name, category_id, exercise_type_id, weight_increment, default_graph_id, default_rest_time)
            VALUES (?, ?, ?, ?, 1, 90);
            """,
            (name.strip(), cat_id, exercise_type_id, increment),
        )
        ex_id = cursor.lastrowid
        new_ex = Exercise(
            id=ex_id,
            name=name.strip(),
            category_id=cat_id,
            category_name=category_name,
            exercise_type_id=exercise_type_id,
            weight_increment=increment,
        )
        self.exercises[ex_id] = new_ex
        return ex_id

    def add_routine(self, routine: Routine) -> int:
        """
        Safely inserts a complete Routine hierarchy (Routine -> Sections -> Exercises -> Sets)
        into the database without modifying any existing data.
        """
        cursor = self.conn.cursor()

        # Insert Routine
        cursor.execute(
            "INSERT INTO Routine (name, notes) VALUES (?, ?);",
            (routine.name, routine.notes or ""),
        )
        routine_id = cursor.lastrowid
        routine.id = routine_id

        # Insert Sections
        for sec_idx, section in enumerate(routine.sections):
            cursor.execute(
                "INSERT INTO RoutineSection (routine_id, name, sort_order) VALUES (?, ?, ?);",
                (routine_id, section.name, section.sort_order if section.sort_order else sec_idx),
            )
            section_id = cursor.lastrowid
            section.id = section_id
            section.routine_id = routine_id

            # Insert Exercises
            for ex_idx, r_ex in enumerate(section.exercises):
                # Ensure exercise exists or resolve ID by name
                exercise_id = r_ex.exercise_id
                if not exercise_id or exercise_id not in self.exercises:
                    exercise_name = r_ex.exercise_name or f"Exercise {ex_idx+1}"
                    cat_name = r_ex.category_name or "Other"
                    exercise_id = self.ensure_exercise(exercise_name, cat_name)

                cursor.execute(
                    "INSERT INTO RoutineSectionExercise (routine_section_id, exercise_id, sort_order) VALUES (?, ?, ?);",
                    (section_id, exercise_id, r_ex.sort_order if r_ex.sort_order else ex_idx),
                )
                sec_ex_id = cursor.lastrowid
                r_ex.id = sec_ex_id
                r_ex.routine_section_id = section_id
                r_ex.exercise_id = exercise_id

                # Insert Sets
                for set_idx, r_set in enumerate(r_ex.sets):
                    cursor.execute(
                        """
                        INSERT INTO RoutineSectionExerciseSet (
                            routine_section_exercise_id, metric_weight, reps, sort_order, distance, duration_seconds, unit
                        ) VALUES (?, ?, ?, ?, ?, ?, ?);
                        """,
                        (
                            sec_ex_id,
                            r_set.metric_weight,
                            r_set.reps,
                            r_set.sort_order if r_set.sort_order else set_idx,
                            r_set.distance,
                            r_set.duration_seconds,
                            r_set.unit,
                        ),
                    )
                    r_set.id = cursor.lastrowid
                    r_set.routine_section_exercise_id = sec_ex_id

        self.conn.commit()
        self.routines[routine_id] = routine
        return routine_id

    def merge_routine_into_backup(
        self,
        backup_path: str,
        routine: Routine,
        output_path: Optional[str] = None,
    ) -> str:
        """
        Loads an existing user backup file, injects the routine non-destructively,
        and saves it to output_path (or overwrites if output_path is None).
        """
        import shutil

        dest_path = output_path or backup_path
        if backup_path != dest_path:
            shutil.copyfile(backup_path, dest_path)

        # Open destination database
        db = FitNotesDatabase(dest_path)
        db.connect(dest_path)
        db.load_cache()

        # Inject routine
        db.add_routine(routine)
        db.close()
        return dest_path

    def export_to_file(self, target_filepath: str) -> None:
        """Exports the SQLite database to a given file path."""
        if not self.conn:
            raise RuntimeError("Database connection not open.")
        self.conn.commit()

        # If in-memory, backup to destination
        if self.filepath == ":memory:" or not self.filepath:
            target_conn = sqlite3.connect(target_filepath)
            self.conn.backup(target_conn)
            target_conn.close()
        elif self.filepath != target_filepath:
            import shutil
            shutil.copyfile(self.filepath, target_filepath)
