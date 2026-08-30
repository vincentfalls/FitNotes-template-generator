"""
FitNotes CSV Exporter.
Exports routines into FitNotes & FitNotes 2 compatible CSV format for scheduled logs or template importing.
"""

import csv
import io
from datetime import datetime, timedelta
from typing import Optional
from .models import Routine


def export_routine_to_csv(
    routine: Routine,
    start_date: Optional[str] = None,
    days_gap: int = 1,
    unit: str = "kg",
) -> str:
    """
    Exports a Routine object into FitNotes-compliant CSV format.
    Format compatible with both Android FitNotes and iOS FitNotes 2.
    """
    output = io.StringIO()
    writer = csv.writer(output)

    # Standard FitNotes 2 / Android compatible CSV header
    writer.writerow([
        "Date",
        "Exercise",
        "Category",
        "Weight (kg)",
        "Weight (lbs)",
        "Reps",
        "Distance",
        "Distance Unit",
        "Time",
        "Notes",
        "Kind",
    ])

    cur_date = datetime.strptime(start_date, "%Y-%m-%d") if start_date else datetime.now()

    for sec_idx, section in enumerate(routine.sections):
        date_str = (cur_date + timedelta(days=sec_idx * days_gap)).strftime("%Y-%m-%d")

        for r_ex in section.exercises:
            ex_name = r_ex.exercise_name or "Exercise"
            cat_name = r_ex.category_name or "Other"

            for s in r_ex.sets:
                weight_kg = s.metric_weight if s.metric_weight > 0 else ""
                weight_lbs = round(s.metric_weight * 2.20462, 1) if s.metric_weight > 0 else ""
                reps = s.reps if s.reps > 0 else ""
                dist = s.distance if s.distance > 0 else ""
                dist_unit = "km" if s.distance > 0 else ""
                time_str = f"{s.duration_seconds // 60}:{s.duration_seconds % 60:02d}" if s.duration_seconds > 0 else ""
                notes = section.name

                writer.writerow([
                    date_str,
                    ex_name,
                    cat_name,
                    weight_kg,
                    weight_lbs,
                    reps,
                    dist,
                    dist_unit,
                    time_str,
                    notes,
                    "Default",
                ])

    return output.getvalue()
