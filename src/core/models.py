"""
Domain models for FitNotes (Android) and FitNotes 2 (iOS).
"""

from __future__ import annotations
from dataclasses import dataclass, field
from enum import IntEnum
from typing import List, Optional, Dict, Any


class ExerciseType(IntEnum):
    WEIGHT_REPS = 1    # Resistance (Weight & Reps)
    DISTANCE_TIME = 2  # Cardio (Distance & Time)
    REPS_ONLY = 3      # Bodyweight / Calisthenics
    TIME_ONLY = 4      # Timed Holds (e.g. Planks)


@dataclass
class Category:
    name: str
    colour: str = "#4CAF50"
    sort_order: int = 0
    id: Optional[int] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "colour": self.colour,
            "sort_order": self.sort_order,
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> Category:
        return cls(
            id=data.get("id"),
            name=data["name"],
            colour=data.get("colour", "#4CAF50"),
            sort_order=data.get("sort_order", 0),
        )


@dataclass
class Exercise:
    name: str
    category_id: int
    exercise_type_id: int = ExerciseType.WEIGHT_REPS
    notes: Optional[str] = None
    weight_increment: Optional[float] = 2.5
    default_graph_id: Optional[int] = 1
    default_rest_time: Optional[int] = 90
    id: Optional[int] = None
    category_name: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "category_id": self.category_id,
            "category_name": self.category_name,
            "exercise_type_id": self.exercise_type_id,
            "notes": self.notes,
            "weight_increment": self.weight_increment,
            "default_graph_id": self.default_graph_id,
            "default_rest_time": self.default_rest_time,
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> Exercise:
        return cls(
            id=data.get("id"),
            name=data["name"],
            category_id=data.get("category_id", 1),
            category_name=data.get("category_name"),
            exercise_type_id=data.get("exercise_type_id", ExerciseType.WEIGHT_REPS),
            notes=data.get("notes"),
            weight_increment=data.get("weight_increment", 2.5),
            default_graph_id=data.get("default_graph_id", 1),
            default_rest_time=data.get("default_rest_time", 90),
        )


@dataclass
class RoutineSet:
    metric_weight: float = 0.0  # in kg (or 0 for bodyweight)
    reps: int = 10
    sort_order: int = 0
    distance: float = 0.0
    duration_seconds: int = 0
    unit: int = 0  # 0: kg, 1: lbs
    id: Optional[int] = None
    routine_section_exercise_id: Optional[int] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "routine_section_exercise_id": self.routine_section_exercise_id,
            "metric_weight": self.metric_weight,
            "reps": self.reps,
            "sort_order": self.sort_order,
            "distance": self.distance,
            "duration_seconds": self.duration_seconds,
            "unit": self.unit,
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> RoutineSet:
        return cls(
            id=data.get("id"),
            routine_section_exercise_id=data.get("routine_section_exercise_id"),
            metric_weight=float(data.get("metric_weight", 0.0)),
            reps=int(data.get("reps", 10)),
            sort_order=int(data.get("sort_order", 0)),
            distance=float(data.get("distance", 0.0)),
            duration_seconds=int(data.get("duration_seconds", 0)),
            unit=int(data.get("unit", 0)),
        )


@dataclass
class RoutineSectionExercise:
    exercise_id: int
    sort_order: int = 0
    exercise_name: Optional[str] = None
    category_name: Optional[str] = None
    sets: List[RoutineSet] = field(default_factory=list)
    id: Optional[int] = None
    routine_section_id: Optional[int] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "routine_section_id": self.routine_section_id,
            "exercise_id": self.exercise_id,
            "exercise_name": self.exercise_name,
            "category_name": self.category_name,
            "sort_order": self.sort_order,
            "sets": [s.to_dict() for s in self.sets],
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> RoutineSectionExercise:
        sets = [RoutineSet.from_dict(s) for s in data.get("sets", [])]
        return cls(
            id=data.get("id"),
            routine_section_id=data.get("routine_section_id"),
            exercise_id=data.get("exercise_id", 0),
            exercise_name=data.get("exercise_name"),
            category_name=data.get("category_name"),
            sort_order=data.get("sort_order", 0),
            sets=sets,
        )


@dataclass
class RoutineSection:
    name: str
    sort_order: int = 0
    exercises: List[RoutineSectionExercise] = field(default_factory=list)
    id: Optional[int] = None
    routine_id: Optional[int] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "routine_id": self.routine_id,
            "name": self.name,
            "sort_order": self.sort_order,
            "exercises": [e.to_dict() for e in self.exercises],
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> RoutineSection:
        exercises = [RoutineSectionExercise.from_dict(e) for e in data.get("exercises", [])]
        return cls(
            id=data.get("id"),
            routine_id=data.get("routine_id"),
            name=data["name"],
            sort_order=data.get("sort_order", 0),
            exercises=exercises,
        )


@dataclass
class Routine:
    name: str
    notes: Optional[str] = None
    sections: List[RoutineSection] = field(default_factory=list)
    id: Optional[int] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "notes": self.notes,
            "sections": [s.to_dict() for s in self.sections],
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> Routine:
        sections = [RoutineSection.from_dict(s) for s in data.get("sections", [])]
        return cls(
            id=data.get("id"),
            name=data["name"],
            notes=data.get("notes"),
            sections=sections,
        )
