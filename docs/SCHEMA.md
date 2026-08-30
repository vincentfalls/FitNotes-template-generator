# FitNotes SQLite Schema Specification

This document specifies the exact SQLite schema required for compatibility with **FitNotes (Android)** and **FitNotes 2 (iOS)** backup files (`.fitnotes`).

---

## Tables

### 1. `android_metadata`
Stores the database locale. Required for Android SQLite compatibility.
```sql
CREATE TABLE android_metadata (
    locale TEXT DEFAULT 'en_US'
);
```

### 2. `Category`
Stores muscle groups / categories.
```sql
CREATE TABLE Category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    colour TEXT DEFAULT '#4CAF50',
    sort_order INTEGER DEFAULT 0
);
```

### 3. `exercise`
Stores the catalog of available exercises.
```sql
CREATE TABLE exercise (
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
```
- `exercise_type_id`:
  - `1`: Resistance (Weight & Reps)
  - `2`: Cardio (Distance & Time)
  - `3`: Reps Only (Bodyweight / Calisthenics)
  - `4`: Time Only (Holds / Planks)

### 4. `Routine`
Master routine / workout program definition.
```sql
CREATE TABLE Routine (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    notes TEXT
);
```

### 5. `RoutineSection`
Days or sub-sections within a routine (e.g. "Push Day", "Day 1 - Chest").
```sql
CREATE TABLE RoutineSection (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    routine_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    FOREIGN KEY (routine_id) REFERENCES Routine(id) ON DELETE CASCADE
);
```

### 6. `RoutineSectionExercise`
Mapping of exercises inside a routine section.
```sql
CREATE TABLE RoutineSectionExercise (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    routine_section_id INTEGER NOT NULL,
    exercise_id INTEGER NOT NULL,
    sort_order INTEGER DEFAULT 0,
    FOREIGN KEY (routine_section_id) REFERENCES RoutineSection(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercise(id)
);
```

### 7. `RoutineSectionExerciseSet`
Target sets configured for a given routine exercise.
```sql
CREATE TABLE RoutineSectionExerciseSet (
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
```

### 8. `training_log`
Historical logged workout entries and PR tracking.
```sql
CREATE TABLE training_log (
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
```

### 9. `body_tracker`
Body measurements (weight, body fat %, etc.).
```sql
CREATE TABLE body_tracker (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    body_tracker_type_id INTEGER DEFAULT 1,
    metric_value REAL DEFAULT 0,
    comment TEXT
);
```
