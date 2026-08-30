import { Routine } from './models';

export function exportRoutineToCSV(routine: Routine, startDate?: string, daysGap = 1): string {
  const rows: string[][] = [
    ['Date', 'Exercise', 'Category', 'Weight (kg)', 'Weight (lbs)', 'Reps', 'Distance', 'Distance Unit', 'Time', 'Notes', 'Kind']
  ];

  const baseDate = startDate ? new Date(startDate) : new Date();

  routine.sections.forEach((section, secIdx) => {
    const workoutDate = new Date(baseDate);
    workoutDate.setDate(workoutDate.getDate() + (secIdx * daysGap));
    const dateStr = workoutDate.toISOString().split('T')[0];

    section.exercises.forEach((rEx) => {
      const exName = rEx.exercise_name || 'Exercise';
      const catName = rEx.category_name || 'Other';

      rEx.sets.forEach((s) => {
        const kg = s.metric_weight > 0 ? s.metric_weight.toString() : '';
        const lbs = s.metric_weight > 0 ? (s.metric_weight * 2.20462).toFixed(1) : '';
        const reps = s.reps > 0 ? s.reps.toString() : '';
        const dist = s.distance > 0 ? s.distance.toString() : '';
        const distUnit = s.distance > 0 ? 'km' : '';
        const time = s.duration_seconds > 0
          ? `${Math.floor(s.duration_seconds / 60)}:${(s.duration_seconds % 60).toString().padStart(2, '0')}`
          : '';

        rows.push([
          dateStr,
          `"${exName.replace(/"/g, '""')}"`,
          `"${catName.replace(/"/g, '""')}"`,
          kg,
          lbs,
          reps,
          dist,
          distUnit,
          time,
          `"${section.name.replace(/"/g, '""')}"`,
          'Default'
        ]);
      });
    });
  });

  return rows.map(r => r.join(',')).join('\n');
}
