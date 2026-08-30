/**
 * FitNotes & FitNotes 2 Web Template Generator
 * 100% Client-Side SQLite engine powered by sql.js WebAssembly.
 */

// Exercise Catalog & Categories
const DEFAULT_CATEGORIES = [
  { name: 'Chest', colour: '#E53935', sort_order: 0 },
  { name: 'Back', colour: '#1E88E5', sort_order: 1 },
  { name: 'Legs', colour: '#43A047', sort_order: 2 },
  { name: 'Shoulders', colour: '#FB8C00', sort_order: 3 },
  { name: 'Biceps', colour: '#8E24AA', sort_order: 4 },
  { name: 'Triceps', colour: '#D81B60', sort_order: 5 },
  { name: 'Abs', colour: '#00ACC1', sort_order: 6 },
  { name: 'Cardio', colour: '#3949AB', sort_order: 7 },
  { name: 'Other', colour: '#757575', sort_order: 8 }
];

const DEFAULT_EXERCISES = [
  // Chest
  { name: 'Flat Barbell Bench Press', category: 'Chest', type: 1, inc: 2.5 },
  { name: 'Incline Barbell Bench Press', category: 'Chest', type: 1, inc: 2.5 },
  { name: 'Flat Dumbbell Bench Press', category: 'Chest', type: 1, inc: 2.0 },
  { name: 'Incline Dumbbell Bench Press', category: 'Chest', type: 1, inc: 2.0 },
  { name: 'Dips (Chest)', category: 'Chest', type: 1, inc: 2.5 },
  { name: 'Cable Crossover', category: 'Chest', type: 1, inc: 1.25 },
  { name: 'Pec Deck Machine', category: 'Chest', type: 1, inc: 2.5 },
  { name: 'Push Up', category: 'Chest', type: 3, inc: 0.0 },

  // Back
  { name: 'Conventional Deadlift', category: 'Back', type: 1, inc: 2.5 },
  { name: 'Barbell Bent-Over Row', category: 'Back', type: 1, inc: 2.5 },
  { name: 'Pull Up', category: 'Back', type: 1, inc: 2.5 },
  { name: 'Chin Up', category: 'Back', type: 1, inc: 2.5 },
  { name: 'Lat Pulldown (Cable)', category: 'Back', type: 1, inc: 2.5 },
  { name: 'Seated Cable Row', category: 'Back', type: 1, inc: 2.5 },
  { name: 'Single-Arm Dumbbell Row', category: 'Back', type: 1, inc: 2.0 },
  { name: 'Face Pull (Cable)', category: 'Back', type: 1, inc: 1.25 },

  // Legs
  { name: 'Barbell Back Squat', category: 'Legs', type: 1, inc: 2.5 },
  { name: 'Front Squat', category: 'Legs', type: 1, inc: 2.5 },
  { name: 'Romanian Deadlift (Barbell)', category: 'Legs', type: 1, inc: 2.5 },
  { name: 'Leg Press', category: 'Legs', type: 1, inc: 5.0 },
  { name: 'Bulgarian Split Squat', category: 'Legs', type: 1, inc: 2.0 },
  { name: 'Hip Thrust (Barbell)', category: 'Legs', type: 1, inc: 2.5 },
  { name: 'Leg Extension (Machine)', category: 'Legs', type: 1, inc: 2.5 },
  { name: 'Leg Curl (Machine)', category: 'Legs', type: 1, inc: 2.5 },
  { name: 'Standing Calf Raise', category: 'Legs', type: 1, inc: 2.5 },
  { name: 'Seated Calf Raise', category: 'Legs', type: 1, inc: 2.5 },

  // Shoulders
  { name: 'Overhead Press (Barbell)', category: 'Shoulders', type: 1, inc: 2.5 },
  { name: 'Seated Dumbbell Shoulder Press', category: 'Shoulders', type: 1, inc: 2.0 },
  { name: 'Side Lateral Raise (Dumbbell)', category: 'Shoulders', type: 1, inc: 1.0 },
  { name: 'Side Lateral Raise (Cable)', category: 'Shoulders', type: 1, inc: 1.0 },
  { name: 'Rear Delt Flye (Machine)', category: 'Shoulders', type: 1, inc: 2.5 },
  { name: 'Rear Delt Flye (Dumbbell)', category: 'Shoulders', type: 1, inc: 1.0 },

  // Biceps
  { name: 'Barbell Biceps Curl', category: 'Biceps', type: 1, inc: 2.5 },
  { name: 'Incline Dumbbell Curl', category: 'Biceps', type: 1, inc: 1.0 },
  { name: 'Hammer Curl (Dumbbell)', category: 'Biceps', type: 1, inc: 1.0 },
  { name: 'Preacher Curl (EZ Bar)', category: 'Biceps', type: 1, inc: 2.5 },

  // Triceps
  { name: 'Triceps Pushdown (Cable)', category: 'Triceps', type: 1, inc: 1.25 },
  { name: 'Overhead Triceps Extension (Cable)', category: 'Triceps', type: 1, inc: 1.25 },
  { name: 'Skull Crusher (EZ Bar)', category: 'Triceps', type: 1, inc: 2.5 },
  { name: 'Close-Grip Barbell Bench Press', category: 'Triceps', type: 1, inc: 2.5 },

  // Abs
  { name: 'Hanging Leg Raise', category: 'Abs', type: 3, inc: 0.0 },
  { name: 'Ab Wheel Rollout', category: 'Abs', type: 3, inc: 0.0 },
  { name: 'Plank', category: 'Abs', type: 4, inc: 0.0 }
];

// Presets
const PRESETS = {
  ppl_6day: {
    id: 'ppl_6day',
    title: 'Push Pull Legs (PPL) 6-Day',
    days: 6,
    category: 'Hypertrophy',
    notes: 'Classic 6-day hypertrophy split targeting each muscle group twice weekly.',
    sections: [
      {
        name: 'Push A (Chest & Triceps Focus)',
        exercises: [
          { name: 'Flat Barbell Bench Press', category: 'Chest', sets: 4, reps: 6 },
          { name: 'Overhead Press (Barbell)', category: 'Shoulders', sets: 3, reps: 8 },
          { name: 'Incline Dumbbell Bench Press', category: 'Chest', sets: 3, reps: 10 },
          { name: 'Side Lateral Raise (Dumbbell)', category: 'Shoulders', sets: 4, reps: 12 },
          { name: 'Triceps Pushdown (Cable)', category: 'Triceps', sets: 3, reps: 12 },
          { name: 'Overhead Triceps Extension (Cable)', category: 'Triceps', sets: 3, reps: 12 }
        ]
      },
      {
        name: 'Pull A (Back & Biceps Focus)',
        exercises: [
          { name: 'Conventional Deadlift', category: 'Back', sets: 3, reps: 5 },
          { name: 'Pull Up', category: 'Back', sets: 3, reps: 8 },
          { name: 'Seated Cable Row', category: 'Back', sets: 3, reps: 10 },
          { name: 'Face Pull (Cable)', category: 'Back', sets: 4, reps: 15 },
          { name: 'Barbell Biceps Curl', category: 'Biceps', sets: 3, reps: 10 },
          { name: 'Hammer Curl (Dumbbell)', category: 'Biceps', sets: 3, reps: 12 }
        ]
      },
      {
        name: 'Legs A (Quad & Calves Focus)',
        exercises: [
          { name: 'Barbell Back Squat', category: 'Legs', sets: 4, reps: 6 },
          { name: 'Romanian Deadlift (Barbell)', category: 'Legs', sets: 3, reps: 8 },
          { name: 'Leg Press', category: 'Legs', sets: 3, reps: 10 },
          { name: 'Leg Curl (Machine)', category: 'Legs', sets: 3, reps: 12 },
          { name: 'Standing Calf Raise', category: 'Legs', sets: 4, reps: 15 },
          { name: 'Hanging Leg Raise', category: 'Abs', sets: 3, reps: 12 }
        ]
      },
      {
        name: 'Push B (Shoulders & Chest Volume)',
        exercises: [
          { name: 'Overhead Press (Barbell)', category: 'Shoulders', sets: 4, reps: 6 },
          { name: 'Flat Dumbbell Bench Press', category: 'Chest', sets: 3, reps: 8 },
          { name: 'Dips (Chest)', category: 'Chest', sets: 3, reps: 10 },
          { name: 'Side Lateral Raise (Cable)', category: 'Shoulders', sets: 4, reps: 12 },
          { name: 'Skull Crusher (EZ Bar)', category: 'Triceps', sets: 3, reps: 10 }
        ]
      },
      {
        name: 'Pull B (Row & Lat Focus)',
        exercises: [
          { name: 'Barbell Bent-Over Row', category: 'Back', sets: 4, reps: 8 },
          { name: 'Lat Pulldown (Cable)', category: 'Back', sets: 3, reps: 10 },
          { name: 'Single-Arm Dumbbell Row', category: 'Back', sets: 3, reps: 10 },
          { name: 'Rear Delt Flye (Machine)', category: 'Shoulders', sets: 4, reps: 15 },
          { name: 'Incline Dumbbell Curl', category: 'Biceps', sets: 3, reps: 10 }
        ]
      },
      {
        name: 'Legs B (Hamstrings & Glutes Focus)',
        exercises: [
          { name: 'Barbell Back Squat', category: 'Legs', sets: 3, reps: 8 },
          { name: 'Hip Thrust (Barbell)', category: 'Legs', sets: 3, reps: 10 },
          { name: 'Bulgarian Split Squat', category: 'Legs', sets: 3, reps: 10 },
          { name: 'Leg Extension (Machine)', category: 'Legs', sets: 3, reps: 12 },
          { name: 'Seated Calf Raise', category: 'Legs', sets: 4, reps: 15 }
        ]
      }
    ]
  },
  arnold_split: {
    id: 'arnold_split',
    title: 'Arnold Split (6-Day)',
    days: 6,
    category: 'Bodybuilding',
    notes: 'Classic Golden Era antagonistic split (Chest/Back, Shoulders/Arms, Legs).',
    sections: [
      {
        name: 'Day 1 & 4: Chest & Back',
        exercises: [
          { name: 'Flat Barbell Bench Press', category: 'Chest', sets: 4, reps: 8 },
          { name: 'Incline Barbell Bench Press', category: 'Chest', sets: 4, reps: 8 },
          { name: 'Barbell Bent-Over Row', category: 'Back', sets: 4, reps: 8 },
          { name: 'Pull Up', category: 'Back', sets: 4, reps: 8 },
          { name: 'Dips (Chest)', category: 'Chest', sets: 3, reps: 10 },
          { name: 'Face Pull (Cable)', category: 'Back', sets: 4, reps: 15 }
        ]
      },
      {
        name: 'Day 2 & 5: Shoulders & Arms',
        exercises: [
          { name: 'Overhead Press (Barbell)', category: 'Shoulders', sets: 4, reps: 8 },
          { name: 'Side Lateral Raise (Dumbbell)', category: 'Shoulders', sets: 4, reps: 12 },
          { name: 'Rear Delt Flye (Dumbbell)', category: 'Shoulders', sets: 4, reps: 12 },
          { name: 'Barbell Biceps Curl', category: 'Biceps', sets: 4, reps: 10 },
          { name: 'Skull Crusher (EZ Bar)', category: 'Triceps', sets: 4, reps: 10 },
          { name: 'Incline Dumbbell Curl', category: 'Biceps', sets: 3, reps: 12 }
        ]
      },
      {
        name: 'Day 3 & 6: Legs & Abs',
        exercises: [
          { name: 'Barbell Back Squat', category: 'Legs', sets: 4, reps: 8 },
          { name: 'Romanian Deadlift (Barbell)', category: 'Legs', sets: 4, reps: 8 },
          { name: 'Leg Press', category: 'Legs', sets: 3, reps: 10 },
          { name: 'Leg Curl (Machine)', category: 'Legs', sets: 3, reps: 12 },
          { name: 'Standing Calf Raise', category: 'Legs', sets: 4, reps: 15 }
        ]
      }
    ]
  },
  upper_lower_4day: {
    id: 'upper_lower_4day',
    title: 'Upper / Lower (4-Day)',
    days: 4,
    category: 'Strength & Hypertrophy',
    notes: 'Optimally balanced 4-day split alternating heavy strength and hypertrophy days.',
    sections: [
      {
        name: 'Upper A (Strength Focus)',
        exercises: [
          { name: 'Flat Barbell Bench Press', category: 'Chest', sets: 4, reps: 5 },
          { name: 'Barbell Bent-Over Row', category: 'Back', sets: 4, reps: 5 },
          { name: 'Overhead Press (Barbell)', category: 'Shoulders', sets: 3, reps: 6 },
          { name: 'Lat Pulldown (Cable)', category: 'Back', sets: 3, reps: 8 },
          { name: 'Skull Crusher (EZ Bar)', category: 'Triceps', sets: 3, reps: 10 }
        ]
      },
      {
        name: 'Lower A (Strength Focus)',
        exercises: [
          { name: 'Barbell Back Squat', category: 'Legs', sets: 4, reps: 5 },
          { name: 'Romanian Deadlift (Barbell)', category: 'Legs', sets: 3, reps: 6 },
          { name: 'Leg Press', category: 'Legs', sets: 3, reps: 8 },
          { name: 'Standing Calf Raise', category: 'Legs', sets: 4, reps: 10 },
          { name: 'Ab Wheel Rollout', category: 'Abs', sets: 3, reps: 10 }
        ]
      },
      {
        name: 'Upper B (Hypertrophy Focus)',
        exercises: [
          { name: 'Incline Dumbbell Bench Press', category: 'Chest', sets: 4, reps: 10 },
          { name: 'Seated Cable Row', category: 'Back', sets: 4, reps: 10 },
          { name: 'Side Lateral Raise (Dumbbell)', category: 'Shoulders', sets: 4, reps: 12 },
          { name: 'Incline Dumbbell Curl', category: 'Biceps', sets: 3, reps: 12 },
          { name: 'Triceps Pushdown (Cable)', category: 'Triceps', sets: 3, reps: 12 }
        ]
      },
      {
        name: 'Lower B (Hypertrophy Focus)',
        exercises: [
          { name: 'Conventional Deadlift', category: 'Back', sets: 3, reps: 5 },
          { name: 'Front Squat', category: 'Legs', sets: 3, reps: 8 },
          { name: 'Leg Extension (Machine)', category: 'Legs', sets: 3, reps: 12 },
          { name: 'Leg Curl (Machine)', category: 'Legs', sets: 3, reps: 12 },
          { name: 'Hanging Leg Raise', category: 'Abs', sets: 3, reps: 12 }
        ]
      }
    ]
  },
  stronglifts_5x5: {
    id: 'stronglifts_5x5',
    title: 'StrongLifts 5x5',
    days: 3,
    category: 'Strength',
    notes: 'Simple compound movement linear progression for building raw foundation strength.',
    sections: [
      {
        name: 'Workout A',
        exercises: [
          { name: 'Barbell Back Squat', category: 'Legs', sets: 5, reps: 5 },
          { name: 'Flat Barbell Bench Press', category: 'Chest', sets: 5, reps: 5 },
          { name: 'Barbell Bent-Over Row', category: 'Back', sets: 5, reps: 5 }
        ]
      },
      {
        name: 'Workout B',
        exercises: [
          { name: 'Barbell Back Squat', category: 'Legs', sets: 5, reps: 5 },
          { name: 'Overhead Press (Barbell)', category: 'Shoulders', sets: 5, reps: 5 },
          { name: 'Conventional Deadlift', category: 'Back', sets: 1, reps: 5 }
        ]
      }
    ]
  },
  fullbody_3day: {
    id: 'fullbody_3day',
    title: 'Full Body (3-Day)',
    days: 3,
    category: 'General Fitness',
    notes: 'High-efficiency full body routine with 48 hours recovery between sessions.',
    sections: [
      {
        name: 'Day 1: Full Body A',
        exercises: [
          { name: 'Barbell Back Squat', category: 'Legs', sets: 3, reps: 8 },
          { name: 'Flat Barbell Bench Press', category: 'Chest', sets: 3, reps: 8 },
          { name: 'Barbell Bent-Over Row', category: 'Back', sets: 3, reps: 8 },
          { name: 'Side Lateral Raise (Dumbbell)', category: 'Shoulders', sets: 3, reps: 12 },
          { name: 'Barbell Biceps Curl', category: 'Biceps', sets: 3, reps: 10 }
        ]
      },
      {
        name: 'Day 2: Full Body B',
        exercises: [
          { name: 'Conventional Deadlift', category: 'Back', sets: 3, reps: 5 },
          { name: 'Overhead Press (Barbell)', category: 'Shoulders', sets: 3, reps: 8 },
          { name: 'Pull Up', category: 'Back', sets: 3, reps: 8 },
          { name: 'Leg Press', category: 'Legs', sets: 3, reps: 10 },
          { name: 'Triceps Pushdown (Cable)', category: 'Triceps', sets: 3, reps: 10 }
        ]
      },
      {
        name: 'Day 3: Full Body C',
        exercises: [
          { name: 'Front Squat', category: 'Legs', sets: 3, reps: 8 },
          { name: 'Incline Dumbbell Bench Press', category: 'Chest', sets: 3, reps: 10 },
          { name: 'Seated Cable Row', category: 'Back', sets: 3, reps: 10 },
          { name: 'Romanian Deadlift (Barbell)', category: 'Legs', sets: 3, reps: 10 },
          { name: 'Hanging Leg Raise', category: 'Abs', sets: 3, reps: 12 }
        ]
      }
    ]
  }
};

// Global App State
let currentRoutine = JSON.parse(JSON.stringify(PRESETS.ppl_6day));
let uploadedBackupBuffer = null;
let uploadedBackupFilename = null;
let SQL = null;

// Initialize WebAssembly SQLite Engine
async function initSQLite() {
  try {
    if (typeof initSqlJs === 'function') {
      SQL = await initSqlJs({
        locateFile: file => `https://cdn.jsdelivr.net/npm/sql.js@1.8.0/dist/${file}`
      });
      console.log('SQLite WebAssembly initialized successfully.');
    }
  } catch (err) {
    console.warn('SQLite WASM initialization note:', err);
  }
}

// Category Color Helper
function getCategoryColor(catName) {
  const c = DEFAULT_CATEGORIES.find(cat => cat.name.toLowerCase() === (catName || '').toLowerCase());
  return c ? c.colour : '#3b82f6';
}

// Toast Helper
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3500);
}

// Render Presets in Sidebar
function renderPresets() {
  const list = document.getElementById('preset-list');
  list.innerHTML = '';

  Object.values(PRESETS).forEach(p => {
    const item = document.createElement('div');
    item.className = `preset-item ${currentRoutine.id === p.id ? 'active' : ''}`;
    item.innerHTML = `
      <div>
        <div class="preset-title">${p.title}</div>
        <div class="preset-meta">${p.days} Days • ${p.category}</div>
      </div>
      <span class="badge">${p.days}d</span>
    `;
    item.onclick = () => {
      currentRoutine = JSON.parse(JSON.stringify(p));
      document.getElementById('routine-name').value = currentRoutine.title;
      document.getElementById('routine-notes').value = currentRoutine.notes;
      renderPresets();
      renderRoutineBuilder();
      showToast(`Loaded preset: ${p.title}`);
    };
    list.appendChild(item);
  });
}

// Render Main Routine Builder
function renderRoutineBuilder() {
  const container = document.getElementById('sections-container');
  container.innerHTML = '';

  currentRoutine.sections.forEach((section, sIdx) => {
    const card = document.createElement('div');
    card.className = 'section-card';
    card.innerHTML = `
      <div class="section-header">
        <input type="text" class="section-title-input" value="${section.name}" data-sidx="${sIdx}" />
        <div class="section-actions">
          <button class="btn btn-danger btn-sm" onclick="removeSection(${sIdx})">Remove Day</button>
        </div>
      </div>
      <div class="section-body">
        <div class="exercise-list" id="exercise-list-${sIdx}"></div>
        <div class="section-footer">
          <button class="btn btn-outline btn-sm" onclick="addExerciseToSection(${sIdx})">+ Add Exercise</button>
        </div>
      </div>
    `;
    container.appendChild(card);

    // Section title change handler
    card.querySelector('.section-title-input').onchange = (e) => {
      currentRoutine.sections[sIdx].name = e.target.value;
    };

    // Render exercises for this section
    const exContainer = card.querySelector(`#exercise-list-${sIdx}`);
    section.exercises.forEach((ex, eIdx) => {
      const exItem = document.createElement('div');
      exItem.className = 'exercise-item';

      const catColor = getCategoryColor(ex.category);

      let optionsHtml = '';
      DEFAULT_EXERCISES.forEach(defEx => {
        const selected = defEx.name.toLowerCase() === ex.name.toLowerCase() ? 'selected' : '';
        optionsHtml += `<option value="${defEx.name}" data-cat="${defEx.category}" ${selected}>${defEx.name} (${defEx.category})</option>`;
      });

      exItem.innerHTML = `
        <span class="exercise-num">${eIdx + 1}</span>
        <div class="exercise-select-wrapper">
          <select class="exercise-select" data-sidx="${sIdx}" data-eidx="${eIdx}">
            ${optionsHtml}
          </select>
          <span class="exercise-category-badge" style="background:${catColor}20; color:${catColor};">
            ${ex.category || 'Chest'}
          </span>
        </div>
        <div class="input-pill">
          <label>Sets</label>
          <input type="number" min="1" max="20" value="${ex.sets || 3}" data-sidx="${sIdx}" data-eidx="${eIdx}" class="input-sets" />
        </div>
        <div class="input-pill">
          <label>Reps</label>
          <input type="number" min="1" max="100" value="${ex.reps || 10}" data-sidx="${sIdx}" data-eidx="${eIdx}" class="input-reps" />
        </div>
        <button class="btn-icon" onclick="removeExercise(${sIdx}, ${eIdx})" title="Remove Exercise">✕</button>
      `;

      exContainer.appendChild(exItem);

      // Event listeners
      const select = exItem.querySelector('.exercise-select');
      select.onchange = (e) => {
        const selectedOption = select.options[select.selectedIndex];
        currentRoutine.sections[sIdx].exercises[eIdx].name = e.target.value;
        currentRoutine.sections[sIdx].exercises[eIdx].category = selectedOption.getAttribute('data-cat');
        renderRoutineBuilder();
      };

      exItem.querySelector('.input-sets').onchange = (e) => {
        currentRoutine.sections[sIdx].exercises[eIdx].sets = parseInt(e.target.value, 10) || 3;
      };

      exItem.querySelector('.input-reps').onchange = (e) => {
        currentRoutine.sections[sIdx].exercises[eIdx].reps = parseInt(e.target.value, 10) || 10;
      };
    });
  });
}

// Add/Remove Section & Exercise Helpers
window.removeSection = function(sIdx) {
  if (currentRoutine.sections.length <= 1) {
    showToast('Routines must have at least 1 workout day.');
    return;
  }
  currentRoutine.sections.splice(sIdx, 1);
  renderRoutineBuilder();
};

window.addExerciseToSection = function(sIdx) {
  const def = DEFAULT_EXERCISES[0];
  currentRoutine.sections[sIdx].exercises.push({
    name: def.name,
    category: def.category,
    sets: 3,
    reps: 10
  });
  renderRoutineBuilder();
};

window.removeExercise = function(sIdx, eIdx) {
  currentRoutine.sections[sIdx].exercises.splice(eIdx, 1);
  renderRoutineBuilder();
};

// Add New Section
document.getElementById('btn-add-section').onclick = () => {
  const num = currentRoutine.sections.length + 1;
  currentRoutine.sections.push({
    name: `Day ${num}: Workout`,
    exercises: [
      { name: 'Flat Barbell Bench Press', category: 'Chest', sets: 4, reps: 8 },
      { name: 'Barbell Bent-Over Row', category: 'Back', sets: 4, reps: 8 }
    ]
  });
  renderRoutineBuilder();
  showToast(`Added Day ${num}`);
};

// Routine Meta Inputs
document.getElementById('routine-name').onchange = (e) => {
  currentRoutine.title = e.target.value;
  currentRoutine.id = 'custom_' + Date.now();
};
document.getElementById('routine-notes').onchange = (e) => {
  currentRoutine.notes = e.target.value;
};

// Backup Mode Radio Toggle
const modeFresh = document.getElementById('mode-fresh');
const modeMerge = document.getElementById('mode-merge');
const uploadZone = document.getElementById('upload-zone');

function updateModeView() {
  if (modeMerge.checked) {
    uploadZone.classList.remove('hidden');
  } else {
    uploadZone.classList.add('hidden');
  }
}
modeFresh.onchange = updateModeView;
modeMerge.onchange = updateModeView;

// Drag & Drop Upload
const dropTarget = document.getElementById('drop-target');
const fileInput = document.getElementById('backup-file-input');

dropTarget.onclick = () => fileInput.click();

dropTarget.ondragover = (e) => {
  e.preventDefault();
  dropTarget.classList.add('dragover');
};
dropTarget.ondragleave = () => dropTarget.classList.remove('dragover');

dropTarget.ondrop = (e) => {
  e.preventDefault();
  dropTarget.classList.remove('dragover');
  if (e.dataTransfer.files.length > 0) {
    handleBackupFile(e.dataTransfer.files[0]);
  }
};

fileInput.onchange = (e) => {
  if (e.target.files.length > 0) {
    handleBackupFile(e.target.files[0]);
  }
};

async function handleBackupFile(file) {
  uploadedBackupFilename = file.name;
  const arrayBuffer = await file.arrayBuffer();
  uploadedBackupBuffer = new Uint8Array(arrayBuffer);

  const infoEl = document.getElementById('backup-info');
  const summaryEl = document.getElementById('backup-summary');

  if (SQL) {
    try {
      const db = new SQL.Database(uploadedBackupBuffer);
      let logsCount = 0;
      let routineCount = 0;
      try {
        const resLogs = db.exec("SELECT COUNT(*) FROM training_log;");
        if (resLogs.length > 0) logsCount = resLogs[0].values[0][0];
        const resRoutines = db.exec("SELECT COUNT(*) FROM Routine;");
        if (resRoutines.length > 0) routineCount = resRoutines[0].values[0][0];
      } catch (err) {}

      summaryEl.innerHTML = `<strong>${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB)<br>${logsCount} workout logs • ${routineCount} existing routines`;
    } catch (e) {
      summaryEl.textContent = `${file.name} ready for injection.`;
    }
  } else {
    summaryEl.textContent = `${file.name} ready for injection.`;
  }

  infoEl.classList.remove('hidden');
  showToast(`Loaded backup: ${file.name}`);
}

// Export FitNotes Backup (.fitnotes)
document.getElementById('btn-export-fitnotes').onclick = async () => {
  if (!SQL) {
    showToast('Initializing SQLite Engine... please try again in a second.');
    await initSQLite();
    if (!SQL) {
      alert('SQLite WebAssembly could not load. Please verify internet connection for CDN scripts.');
      return;
    }
  }

  let db;
  const isMerge = modeMerge.checked && uploadedBackupBuffer;

  if (isMerge) {
    try {
      db = new SQL.Database(uploadedBackupBuffer);
      showToast('Merging routine into existing backup...');
    } catch (e) {
      alert('Could not parse existing backup file. Generating fresh backup instead.');
      db = new SQL.Database();
    }
  } else {
    db = new SQL.Database();
  }

  // Schema creation
  db.run(`
    CREATE TABLE IF NOT EXISTS android_metadata (locale TEXT DEFAULT 'en_US');
    CREATE TABLE IF NOT EXISTS Category (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, colour TEXT DEFAULT '#4CAF50', sort_order INTEGER DEFAULT 0);
    CREATE TABLE IF NOT EXISTS exercise (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, category_id INTEGER NOT NULL, exercise_type_id INTEGER DEFAULT 1, notes TEXT, weight_increment REAL DEFAULT 2.5, default_graph_id INTEGER DEFAULT 1, default_rest_time INTEGER DEFAULT 90);
    CREATE TABLE IF NOT EXISTS Routine (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, notes TEXT);
    CREATE TABLE IF NOT EXISTS RoutineSection (id INTEGER PRIMARY KEY AUTOINCREMENT, routine_id INTEGER NOT NULL, name TEXT NOT NULL, sort_order INTEGER DEFAULT 0);
    CREATE TABLE IF NOT EXISTS RoutineSectionExercise (id INTEGER PRIMARY KEY AUTOINCREMENT, routine_section_id INTEGER NOT NULL, exercise_id INTEGER NOT NULL, sort_order INTEGER DEFAULT 0);
    CREATE TABLE IF NOT EXISTS RoutineSectionExerciseSet (id INTEGER PRIMARY KEY AUTOINCREMENT, routine_section_exercise_id INTEGER NOT NULL, metric_weight REAL DEFAULT 0, reps INTEGER DEFAULT 0, sort_order INTEGER DEFAULT 0, distance REAL DEFAULT 0, duration_seconds INTEGER DEFAULT 0, unit INTEGER DEFAULT 0);
    CREATE TABLE IF NOT EXISTS training_log (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, exercise_id INTEGER NOT NULL, metric_weight REAL DEFAULT 0, reps INTEGER DEFAULT 0, metric_distance REAL DEFAULT 0, duration_seconds INTEGER DEFAULT 0, comment TEXT, set_order INTEGER DEFAULT 0, unit INTEGER DEFAULT 0, is_personal_record INTEGER DEFAULT 0);
    CREATE TABLE IF NOT EXISTS body_tracker (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, body_tracker_type_id INTEGER DEFAULT 1, metric_value REAL DEFAULT 0, comment TEXT);
  `);

  // Ensure default categories
  DEFAULT_CATEGORIES.forEach(cat => {
    try {
      db.run("INSERT OR IGNORE INTO Category (name, colour, sort_order) VALUES (?, ?, ?);", [cat.name, cat.colour, cat.sort_order]);
    } catch (e) {}
  });

  // Ensure default exercises
  DEFAULT_EXERCISES.forEach(ex => {
    try {
      const catRes = db.exec("SELECT id FROM Category WHERE LOWER(name) = LOWER(?);", [ex.category]);
      const catId = catRes.length > 0 ? catRes[0].values[0][0] : 1;
      db.run("INSERT OR IGNORE INTO exercise (name, category_id, exercise_type_id, weight_increment, default_graph_id, default_rest_time) VALUES (?, ?, ?, ?, 1, 90);", [ex.name, catId, ex.type, ex.inc]);
    } catch (e) {}
  });

  // Insert Routine
  const routineTitle = document.getElementById('routine-name').value || 'Custom Workout Routine';
  const routineNotes = document.getElementById('routine-notes').value || '';
  db.run("INSERT INTO Routine (name, notes) VALUES (?, ?);", [routineTitle, routineNotes]);
  const routineIdRes = db.exec("SELECT last_insert_rowid();");
  const routineId = routineIdRes[0].values[0][0];

  // Insert Sections, Exercises, Sets
  currentRoutine.sections.forEach((sec, sIdx) => {
    db.run("INSERT INTO RoutineSection (routine_id, name, sort_order) VALUES (?, ?, ?);", [routineId, sec.name, sIdx]);
    const secId = db.exec("SELECT last_insert_rowid();")[0].values[0][0];

    sec.exercises.forEach((rEx, eIdx) => {
      // Find or create exercise
      let exRes = db.exec("SELECT id FROM exercise WHERE LOWER(name) = LOWER(?);", [rEx.name]);
      let exId;
      if (exRes.length > 0) {
        exId = exRes[0].values[0][0];
      } else {
        const catRes = db.exec("SELECT id FROM Category WHERE LOWER(name) = LOWER(?);", [rEx.category || 'Other']);
        const catId = catRes.length > 0 ? catRes[0].values[0][0] : 1;
        db.run("INSERT INTO exercise (name, category_id, exercise_type_id, weight_increment) VALUES (?, ?, 1, 2.5);", [rEx.name, catId]);
        exId = db.exec("SELECT last_insert_rowid();")[0].values[0][0];
      }

      db.run("INSERT INTO RoutineSectionExercise (routine_section_id, exercise_id, sort_order) VALUES (?, ?, ?);", [secId, exId, eIdx]);
      const secExId = db.exec("SELECT last_insert_rowid();")[0].values[0][0];

      const setCount = rEx.sets || 3;
      const repCount = rEx.reps || 10;
      for (let s = 0; s < setCount; s++) {
        db.run("INSERT INTO RoutineSectionExerciseSet (routine_section_exercise_id, metric_weight, reps, sort_order) VALUES (?, 0, ?, ?);", [secExId, repCount, s]);
      }
    });
  });

  // Export binary SQLite database
  const binaryArray = db.export();
  const blob = new Blob([binaryArray], { type: 'application/octet-stream' });
  const filename = isMerge ? `Updated_${uploadedBackupFilename || 'FitNotes_Backup.fitnotes'}` : `${routineTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.fitnotes`;

  downloadBlob(blob, filename);
  showToast(`Downloaded ${filename}! Ready for FitNotes.`);
};

// Export CSV
document.getElementById('btn-export-csv').onclick = () => {
  const rows = [
    ['Date', 'Exercise', 'Category', 'Weight (kg)', 'Weight (lbs)', 'Reps', 'Distance', 'Distance Unit', 'Time', 'Notes', 'Kind']
  ];
  const today = new Date().toISOString().split('T')[0];

  currentRoutine.sections.forEach((sec, sIdx) => {
    sec.exercises.forEach(ex => {
      const sets = ex.sets || 3;
      const reps = ex.reps || 10;
      for (let i = 0; i < sets; i++) {
        rows.push([
          today,
          `"${ex.name.replace(/"/g, '""')}"`,
          `"${ex.category.replace(/"/g, '""')}"`,
          '', '', reps, '', '', '',
          `"${sec.name.replace(/"/g, '""')}"`,
          'Default'
        ]);
      }
    });
  });

  const csvContent = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${currentRoutine.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.csv`);
  showToast('Downloaded CSV template!');
};

// Export JSON
document.getElementById('btn-export-json').onclick = () => {
  const jsonContent = JSON.stringify(currentRoutine, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  downloadBlob(blob, `${currentRoutine.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.json`);
  showToast('Downloaded JSON template!');
};

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ==========================================================================
// Comprehensive Exercise Catalog with Biomechanical Metadata
// ==========================================================================
const EXERCISE_CATALOG = [
  // CHEST
  { name: 'Flat Barbell Bench Press', category: 'Chest', pattern: 'horizontal_push', equipment: 'barbell', jointRisks: ['shoulder', 'wrist'], compound: true },
  { name: 'Incline Barbell Bench Press', category: 'Chest', pattern: 'incline_push', equipment: 'barbell', jointRisks: ['shoulder', 'wrist'], compound: true },
  { name: 'Flat Dumbbell Bench Press', category: 'Chest', pattern: 'horizontal_push', equipment: 'dumbbells', jointRisks: [], compound: true },
  { name: 'Incline Dumbbell Bench Press', category: 'Chest', pattern: 'incline_push', equipment: 'dumbbells', jointRisks: [], compound: true },
  { name: 'Push Up', category: 'Chest', pattern: 'horizontal_push', equipment: 'bodyweight', jointRisks: [], compound: true },
  { name: 'Dips (Chest)', category: 'Chest', pattern: 'dip', equipment: 'dip_station', jointRisks: ['shoulder'], compound: true },
  { name: 'Cable Crossover', category: 'Chest', pattern: 'chest_fly', equipment: 'cables', jointRisks: [], compound: false },
  { name: 'Dumbbell Chest Flye', category: 'Chest', pattern: 'chest_fly', equipment: 'dumbbells', jointRisks: ['shoulder'], compound: false },
  { name: 'Machine Chest Press', category: 'Chest', pattern: 'horizontal_push', equipment: 'machines', jointRisks: [], compound: true },
  { name: 'Landmine Chest Press', category: 'Chest', pattern: 'incline_push', equipment: 'barbell', jointRisks: [], compound: true },

  // SHOULDERS
  { name: 'Overhead Press (Barbell)', category: 'Shoulders', pattern: 'vertical_push', equipment: 'barbell', jointRisks: ['lower_back', 'shoulder', 'wrist', 'neck'], compound: true },
  { name: 'Seated Dumbbell Shoulder Press', category: 'Shoulders', pattern: 'vertical_push', equipment: 'dumbbells', jointRisks: ['shoulder'], compound: true },
  { name: 'Standing Dumbbell Shoulder Press', category: 'Shoulders', pattern: 'vertical_push', equipment: 'dumbbells', jointRisks: ['lower_back', 'shoulder'], compound: true },
  { name: 'Neutral-Grip Dumbbell Press', category: 'Shoulders', pattern: 'vertical_push', equipment: 'dumbbells', jointRisks: [], compound: true },
  { name: 'Side Lateral Raise (Dumbbell)', category: 'Shoulders', pattern: 'lateral_delt', equipment: 'dumbbells', jointRisks: [], compound: false },
  { name: 'Side Lateral Raise (Cable)', category: 'Shoulders', pattern: 'lateral_delt', equipment: 'cables', jointRisks: [], compound: false },
  { name: 'Rear Delt Flye (Dumbbell)', category: 'Shoulders', pattern: 'rear_delt', equipment: 'dumbbells', jointRisks: [], compound: false },
  { name: 'Rear Delt Flye (Machine)', category: 'Shoulders', pattern: 'rear_delt', equipment: 'machines', jointRisks: [], compound: false },
  { name: 'Face Pull (Cable)', category: 'Back', pattern: 'rear_delt', equipment: 'cables', jointRisks: [], compound: false },
  { name: 'Landmine Overhead Press', category: 'Shoulders', pattern: 'vertical_push', equipment: 'barbell', jointRisks: [], compound: true },

  // BACK
  { name: 'Conventional Deadlift', category: 'Back', pattern: 'deadlift', equipment: 'barbell', jointRisks: ['lower_back', 'neck'], compound: true },
  { name: 'Barbell Bent-Over Row', category: 'Back', pattern: 'horizontal_pull', equipment: 'barbell', jointRisks: ['lower_back', 'wrist'], compound: true },
  { name: 'Chest-Supported Dumbbell Row', category: 'Back', pattern: 'horizontal_pull', equipment: 'dumbbells', jointRisks: [], compound: true },
  { name: 'Single-Arm Dumbbell Row', category: 'Back', pattern: 'horizontal_pull', equipment: 'dumbbells', jointRisks: [], compound: true },
  { name: 'Seated Cable Row', category: 'Back', pattern: 'horizontal_pull', equipment: 'cables', jointRisks: [], compound: true },
  { name: 'Lat Pulldown (Cable)', category: 'Back', pattern: 'vertical_pull', equipment: 'cables', jointRisks: [], compound: true },
  { name: 'Pull Up', category: 'Back', pattern: 'vertical_pull', equipment: 'pullup_bar', jointRisks: ['shoulder'], compound: true },
  { name: 'Chin Up', category: 'Back', pattern: 'vertical_pull', equipment: 'pullup_bar', jointRisks: ['shoulder'], compound: true },
  { name: 'T-Bar Row', category: 'Back', pattern: 'horizontal_pull', equipment: 'barbell', jointRisks: ['lower_back'], compound: true },
  { name: 'Hyperextension (Back Extension)', category: 'Back', pattern: 'spinal_extension', equipment: 'machines', jointRisks: [], compound: false },

  // LEGS - QUADS & GLUTES
  { name: 'Barbell Back Squat', category: 'Legs', pattern: 'squat', equipment: 'barbell', jointRisks: ['lower_back', 'knee', 'neck'], compound: true },
  { name: 'Front Squat', category: 'Legs', pattern: 'squat', equipment: 'barbell', jointRisks: ['knee', 'wrist'], compound: true },
  { name: 'Box Squat', category: 'Legs', pattern: 'squat', equipment: 'barbell', jointRisks: ['knee'], compound: true },
  { name: 'Goblet Squat (Dumbbell)', category: 'Legs', pattern: 'squat', equipment: 'dumbbells', jointRisks: [], compound: true },
  { name: 'Bulgarian Split Squat', category: 'Legs', pattern: 'lunge', equipment: 'dumbbells', jointRisks: ['knee'], compound: true },
  { name: 'Leg Press', category: 'Legs', pattern: 'leg_press', equipment: 'machines', jointRisks: [], compound: true },
  { name: 'Walking Lunge', category: 'Legs', pattern: 'lunge', equipment: 'dumbbells', jointRisks: ['knee'], compound: true },
  { name: 'Leg Extension (Machine)', category: 'Legs', pattern: 'quad_iso', equipment: 'machines', jointRisks: ['knee'], compound: false },

  // LEGS - HAMSTRINGS & POSTERIOR
  { name: 'Romanian Deadlift (Barbell)', category: 'Legs', pattern: 'hinge', equipment: 'barbell', jointRisks: ['lower_back'], compound: true },
  { name: 'Dumbbell Romanian Deadlift', category: 'Legs', pattern: 'hinge', equipment: 'dumbbells', jointRisks: [], compound: true },
  { name: 'Hip Thrust (Barbell)', category: 'Legs', pattern: 'hip_thrust', equipment: 'barbell', jointRisks: [], compound: true },
  { name: 'Glute Bridge (Dumbbell)', category: 'Legs', pattern: 'hip_thrust', equipment: 'dumbbells', jointRisks: [], compound: false },
  { name: 'Leg Curl (Machine)', category: 'Legs', pattern: 'hamstring_iso', equipment: 'machines', jointRisks: [], compound: false },
  { name: 'Standing Calf Raise', category: 'Legs', pattern: 'calf', equipment: 'dumbbells', jointRisks: [], compound: false },
  { name: 'Seated Calf Raise', category: 'Legs', pattern: 'calf', equipment: 'machines', jointRisks: [], compound: false },

  // ARMS & ACCESSORIES
  { name: 'Barbell Biceps Curl', category: 'Biceps', pattern: 'bicep_curl', equipment: 'barbell', jointRisks: ['wrist'], compound: false },
  { name: 'EZ Bar Biceps Curl', category: 'Biceps', pattern: 'bicep_curl', equipment: 'barbell', jointRisks: [], compound: false },
  { name: 'Incline Dumbbell Curl', category: 'Biceps', pattern: 'bicep_curl', equipment: 'dumbbells', jointRisks: [], compound: false },
  { name: 'Hammer Curl (Dumbbell)', category: 'Biceps', pattern: 'bicep_curl', equipment: 'dumbbells', jointRisks: [], compound: false },
  { name: 'Cable Biceps Curl', category: 'Biceps', pattern: 'bicep_curl', equipment: 'cables', jointRisks: [], compound: false },
  { name: 'Skull Crusher (EZ Bar)', category: 'Triceps', pattern: 'tricep_ext', equipment: 'barbell', jointRisks: ['elbow', 'wrist'], compound: false },
  { name: 'Triceps Pushdown (Cable)', category: 'Triceps', pattern: 'tricep_ext', equipment: 'cables', jointRisks: [], compound: false },
  { name: 'Overhead Dumbbell Triceps Extension', category: 'Triceps', pattern: 'tricep_ext', equipment: 'dumbbells', jointRisks: ['shoulder'], compound: false },
  { name: 'Close-Grip Barbell Bench Press', category: 'Triceps', pattern: 'tricep_press', equipment: 'barbell', jointRisks: ['wrist'], compound: true },

  // CORE
  { name: 'Hanging Leg Raise', category: 'Abs', pattern: 'abs', equipment: 'pullup_bar', jointRisks: [], compound: false },
  { name: 'Ab Wheel Rollout', category: 'Abs', pattern: 'abs', equipment: 'bodyweight', jointRisks: ['lower_back'], compound: false },
  { name: 'Plank', category: 'Abs', pattern: 'abs', equipment: 'bodyweight', jointRisks: [], compound: false },
  { name: 'Cable Woodchopper', category: 'Abs', pattern: 'abs', equipment: 'cables', jointRisks: [], compound: false },
  { name: 'Cable Crunch', category: 'Abs', pattern: 'abs', equipment: 'cables', jointRisks: [], compound: false }
];

// Equipment presets gear mappings
const EQUIPMENT_PRESETS = {
  full_gym: ['barbell', 'dumbbells', 'bench', 'rack', 'cables', 'pullup_bar', 'dip_station', 'machines'],
  barbell_rack: ['barbell', 'dumbbells', 'bench', 'rack', 'pullup_bar'],
  dumbbells_only: ['dumbbells', 'bench', 'bodyweight'],
  bodyweight_only: ['bodyweight', 'pullup_bar', 'dip_station'],
  kettlebells_bands: ['kettlebell', 'bands', 'bodyweight']
};

// Wizard State Object
const wizardState = {
  currentStep: 1,
  totalSteps: 5,
  days: 4,
  goal: 'hypertrophy',
  experience: 'intermediate',
  duration: 'standard',
  equipmentPreset: 'full_gym',
  gear: new Set(['barbell', 'dumbbells', 'bench', 'rack', 'cables', 'pullup_bar', 'dip_station', 'machines']),
  injuries: new Set(),
  avoidedExercises: new Set(),
  customAvoid: '',
  focus: 'balanced'
};

// Wizard Step Controller
function setWizardStep(step) {
  wizardState.currentStep = Math.max(1, Math.min(5, step));

  // Update step contents visibility
  for (let i = 1; i <= wizardState.totalSteps; i++) {
    const el = document.getElementById(`wizard-step-${i}`);
    if (el) {
      if (i === wizardState.currentStep) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }
  }

  // Update Progress Tracker
  document.querySelectorAll('.wizard-step-item').forEach(item => {
    const stepNum = parseInt(item.getAttribute('data-step'), 10);
    item.classList.remove('active', 'completed');
    if (stepNum === wizardState.currentStep) {
      item.classList.add('active');
    } else if (stepNum < wizardState.currentStep) {
      item.classList.add('completed');
    }
  });

  // Footer Navigation Buttons
  const btnPrev = document.getElementById('btn-wizard-prev');
  const btnNext = document.getElementById('btn-wizard-next');
  const btnGenerate = document.getElementById('btn-generate-smart');

  if (wizardState.currentStep === 1) {
    btnPrev.classList.add('hidden');
  } else {
    btnPrev.classList.remove('hidden');
  }

  if (wizardState.currentStep === wizardState.totalSteps) {
    btnNext.classList.add('hidden');
    btnGenerate.classList.remove('hidden');
    renderWizardSummary();
  } else {
    btnNext.classList.remove('hidden');
    btnGenerate.classList.add('hidden');
  }
}

// Render Review Summary in Step 5
function renderWizardSummary() {
  const container = document.getElementById('summary-preview');
  if (!container) return;

  const goalLabels = {
    hypertrophy: 'Hypertrophy (Muscle Growth)',
    strength: 'Strength & Power',
    general_fitness: 'General Fitness & Health',
    fat_loss: 'Fat Loss & Conditioning'
  };

  const durationLabels = {
    express: 'Express (30-40 min, 3-4 exercises)',
    standard: 'Standard (45-60 min, 5-6 exercises)',
    extended: 'Extended (60-75 min, 7-8 exercises)'
  };

  const gearArray = Array.from(wizardState.gear);
  const injuryArray = Array.from(wizardState.injuries);
  
  // Collect all avoided exercises
  const allAvoided = new Set(wizardState.avoidedExercises);
  const customList = (document.getElementById('custom-avoid-input')?.value || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  customList.forEach(ex => allAvoided.add(ex));

  container.innerHTML = `
    <div class="summary-item">
      <span class="summary-item-label">Schedule & Goal</span>
      <span class="summary-item-value">${wizardState.days} Days/Week • ${goalLabels[wizardState.goal] || wizardState.goal}</span>
    </div>
    <div class="summary-item">
      <span class="summary-item-label">Level & Duration</span>
      <span class="summary-item-value">${wizardState.experience.toUpperCase()} • ${durationLabels[wizardState.duration] || wizardState.duration}</span>
    </div>
    <div class="summary-item">
      <span class="summary-item-label">Equipment Access</span>
      <div class="summary-badge-list">
        ${gearArray.map(g => `<span class="summary-badge">${g.replace('_', ' ')}</span>`).join('')}
      </div>
    </div>
    <div class="summary-item">
      <span class="summary-item-label">Protected Joints / Injuries</span>
      <div class="summary-badge-list">
        ${injuryArray.length > 0 
          ? injuryArray.map(i => `<span class="summary-badge warning">🛡️ ${i.replace('_', ' ')}</span>`).join('')
          : '<span class="summary-badge">None (Full Joint Capacity)</span>'}
      </div>
    </div>
    <div class="summary-item" style="grid-column: 1 / -1;">
      <span class="summary-item-label">Excluded / Avoided Exercises</span>
      <div class="summary-badge-list">
        ${allAvoided.size > 0 
          ? Array.from(allAvoided).map(ex => `<span class="summary-badge danger">❌ ${ex}</span>`).join('')
          : '<span class="summary-badge">None (All exercises allowed)</span>'}
      </div>
    </div>
  `;
}

// Smart Exercise Matcher with Biomechanical Substitution
function pickExercise(pattern, preferredCategory, usedNames) {
  // Collect custom exclusions
  const customList = (document.getElementById('custom-avoid-input')?.value || '')
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);

  const isAvoided = (name) => {
    if (wizardState.avoidedExercises.has(name)) return true;
    const lower = name.toLowerCase();
    return customList.some(excluded => lower.includes(excluded));
  };

  const hasJointConflict = (ex) => {
    return ex.jointRisks.some(risk => wizardState.injuries.has(risk));
  };

  const hasEquipment = (ex) => {
    if (ex.equipment === 'bodyweight') return true;
    return wizardState.gear.has(ex.equipment);
  };

  // Find direct pattern matches
  let candidates = EXERCISE_CATALOG.filter(ex => {
    if (usedNames.has(ex.name)) return false;
    if (pattern && ex.pattern !== pattern) return false;
    if (preferredCategory && ex.category !== preferredCategory && !pattern) return false;
    if (!hasEquipment(ex)) return false;
    if (hasJointConflict(ex)) return false;
    if (isAvoided(ex.name)) return false;
    return true;
  });

  if (candidates.length > 0) {
    const chosen = candidates[0];
    usedNames.add(chosen.name);
    return chosen;
  }

  // Fallback 1: Relax pattern, match category only with safety & gear constraints
  if (preferredCategory) {
    candidates = EXERCISE_CATALOG.filter(ex => {
      if (usedNames.has(ex.name)) return false;
      if (ex.category !== preferredCategory) return false;
      if (!hasEquipment(ex)) return false;
      if (hasJointConflict(ex)) return false;
      if (isAvoided(ex.name)) return false;
      return true;
    });
    if (candidates.length > 0) {
      const chosen = candidates[0];
      usedNames.add(chosen.name);
      return chosen;
    }
  }

  // Fallback 2: Any safe exercise with available equipment
  candidates = EXERCISE_CATALOG.filter(ex => {
    if (usedNames.has(ex.name)) return false;
    if (!hasEquipment(ex)) return false;
    if (hasJointConflict(ex)) return false;
    if (isAvoided(ex.name)) return false;
    return true;
  });

  if (candidates.length > 0) {
    const chosen = candidates[0];
    usedNames.add(chosen.name);
    return chosen;
  }

  // Last-ditch safe bodyweight default
  const defaultEx = { name: 'Push Up', category: 'Chest', compound: true };
  usedNames.add(defaultEx.name);
  return defaultEx;
}

// Generate Sets based on Goal, Experience, and Compound vs Isolation
function generateSets(isCompound) {
  let setsCount = 3;
  let repsCount = 10;

  if (wizardState.goal === 'strength') {
    if (isCompound) {
      setsCount = wizardState.experience === 'beginner' ? 3 : 5;
      repsCount = 5;
    } else {
      setsCount = 3;
      repsCount = 8;
    }
  } else if (wizardState.goal === 'hypertrophy') {
    if (isCompound) {
      setsCount = 4;
      repsCount = 8;
    } else {
      setsCount = wizardState.experience === 'advanced' ? 4 : 3;
      repsCount = 12;
    }
  } else if (wizardState.goal === 'fat_loss') {
    setsCount = 3;
    repsCount = isCompound ? 12 : 15;
  } else { // general_fitness
    setsCount = 3;
    repsCount = isCompound ? 10 : 12;
  }

  const sets = [];
  for (let i = 0; i < setsCount; i++) {
    sets.push({ metric_weight: 0, reps: repsCount });
  }
  return sets;
}

// Modal open/close bindings
const modalWizard = document.getElementById('modal-wizard');
document.getElementById('btn-smart-wizard').onclick = () => {
  setWizardStep(1);
  modalWizard.classList.remove('hidden');
};
document.getElementById('btn-close-wizard').onclick = () => modalWizard.classList.add('hidden');

// Step Navigation Buttons
document.getElementById('btn-wizard-next').onclick = () => {
  setWizardStep(wizardState.currentStep + 1);
};
document.getElementById('btn-wizard-prev').onclick = () => {
  setWizardStep(wizardState.currentStep - 1);
};

// Progress bar item click navigation
document.querySelectorAll('.wizard-step-item').forEach(item => {
  item.onclick = () => {
    const step = parseInt(item.getAttribute('data-step'), 10);
    setWizardStep(step);
  };
});

// Days buttons in Step 1
document.querySelectorAll('.day-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    wizardState.days = parseInt(btn.getAttribute('data-days'), 10);
  };
});

// Choice buttons (Goal, Experience, Duration, Equipment Profile, Focus)
document.querySelectorAll('.choice-btn').forEach(btn => {
  btn.onclick = () => {
    const group = btn.getAttribute('data-group');
    const val = btn.getAttribute('data-value');
    document.querySelectorAll(`.choice-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (group === 'goal') wizardState.goal = val;
    if (group === 'experience') wizardState.experience = val;
    if (group === 'duration') wizardState.duration = val;
    if (group === 'focus') wizardState.focus = val;

    if (group === 'equipment') {
      wizardState.equipmentPreset = val;
      const presetGears = EQUIPMENT_PRESETS[val] || ['dumbbells', 'bodyweight'];
      wizardState.gear = new Set(presetGears);

      // Sync checkbox chips in step 2
      document.querySelectorAll('#gear-chips .chip-item').forEach(chip => {
        const input = chip.querySelector('input');
        if (presetGears.includes(input.value)) {
          input.checked = true;
          chip.classList.add('active');
        } else {
          input.checked = false;
          chip.classList.remove('active');
        }
      });
    }
  };
});

// Gear Checkboxes in Step 2
document.querySelectorAll('#gear-chips .chip-item').forEach(chip => {
  const input = chip.querySelector('input');
  chip.onclick = (e) => {
    if (e.target !== input) {
      input.checked = !input.checked;
    }
    if (input.checked) {
      chip.classList.add('active');
      wizardState.gear.add(input.value);
    } else {
      chip.classList.remove('active');
      wizardState.gear.delete(input.value);
    }
  };
});

// Injury Cards in Step 3
document.querySelectorAll('.injury-card').forEach(card => {
  card.onclick = () => {
    const injury = card.getAttribute('data-injury');
    if (card.classList.contains('active')) {
      card.classList.remove('active');
      wizardState.injuries.delete(injury);
    } else {
      card.classList.add('active');
      wizardState.injuries.add(injury);
    }
  };
});

// Avoid Exercise Chips in Step 4
document.querySelectorAll('.avoid-chip').forEach(chip => {
  chip.onclick = () => {
    const exName = chip.getAttribute('data-exercise');
    if (chip.classList.contains('active')) {
      chip.classList.remove('active');
      wizardState.avoidedExercises.delete(exName);
    } else {
      chip.classList.add('active');
      wizardState.avoidedExercises.add(exName);
    }
  };
});

// Main Smart Routine Generation Handler
document.getElementById('btn-generate-smart').onclick = () => {
  const days = wizardState.days;
  const maxExercisesPerDay = wizardState.duration === 'express' ? 4 : (wizardState.duration === 'extended' ? 7 : 5);

  const sections = [];

  const createDay = (dayName, targetPatterns) => {
    const usedInDay = new Set();
    const exercises = [];

    // Slice patterns to fit duration
    const selectedPatterns = targetPatterns.slice(0, maxExercisesPerDay);

    selectedPatterns.forEach(patternInfo => {
      const match = pickExercise(patternInfo.pattern, patternInfo.category, usedInDay);
      exercises.push({
        name: match.name,
        category: match.category,
        sets: generateSets(match.compound).length,
        reps: generateSets(match.compound)[0].reps
      });
    });

    return { name: dayName, exercises };
  };

  // Define split layouts with movement pattern assignments
  if (days === 2) {
    sections.push(createDay('Day 1: Full Body A', [
      { pattern: 'squat', category: 'Legs' },
      { pattern: 'horizontal_push', category: 'Chest' },
      { pattern: 'horizontal_pull', category: 'Back' },
      { pattern: 'vertical_push', category: 'Shoulders' },
      { pattern: 'bicep_curl', category: 'Biceps' },
      { pattern: 'abs', category: 'Abs' }
    ]));
    sections.push(createDay('Day 2: Full Body B', [
      { pattern: 'hinge', category: 'Legs' },
      { pattern: 'incline_push', category: 'Chest' },
      { pattern: 'vertical_pull', category: 'Back' },
      { pattern: 'lateral_delt', category: 'Shoulders' },
      { pattern: 'tricep_ext', category: 'Triceps' },
      { pattern: 'calf', category: 'Legs' }
    ]));
  } else if (days === 3) {
    if (wizardState.goal === 'strength' || wizardState.experience === 'beginner') {
      sections.push(createDay('Day 1: Full Body (Squat Focus)', [
        { pattern: 'squat', category: 'Legs' },
        { pattern: 'horizontal_push', category: 'Chest' },
        { pattern: 'horizontal_pull', category: 'Back' },
        { pattern: 'lateral_delt', category: 'Shoulders' },
        { pattern: 'bicep_curl', category: 'Biceps' }
      ]));
      sections.push(createDay('Day 2: Full Body (Deadlift/Hinge Focus)', [
        { pattern: 'deadlift', category: 'Back' },
        { pattern: 'vertical_push', category: 'Shoulders' },
        { pattern: 'vertical_pull', category: 'Back' },
        { pattern: 'leg_press', category: 'Legs' },
        { pattern: 'tricep_ext', category: 'Triceps' }
      ]));
      sections.push(createDay('Day 3: Full Body (Hypertrophy Focus)', [
        { pattern: 'lunge', category: 'Legs' },
        { pattern: 'incline_push', category: 'Chest' },
        { pattern: 'horizontal_pull', category: 'Back' },
        { pattern: 'rear_delt', category: 'Shoulders' },
        { pattern: 'abs', category: 'Abs' }
      ]));
    } else {
      sections.push(createDay('Day 1: Push (Chest, Shoulders, Triceps)', [
        { pattern: 'horizontal_push', category: 'Chest' },
        { pattern: 'vertical_push', category: 'Shoulders' },
        { pattern: 'incline_push', category: 'Chest' },
        { pattern: 'lateral_delt', category: 'Shoulders' },
        { pattern: 'tricep_ext', category: 'Triceps' }
      ]));
      sections.push(createDay('Day 2: Pull (Back, Rear Delts, Biceps)', [
        { pattern: 'vertical_pull', category: 'Back' },
        { pattern: 'horizontal_pull', category: 'Back' },
        { pattern: 'rear_delt', category: 'Shoulders' },
        { pattern: 'bicep_curl', category: 'Biceps' },
        { pattern: 'abs', category: 'Abs' }
      ]));
      sections.push(createDay('Day 3: Legs & Lower Body', [
        { pattern: 'squat', category: 'Legs' },
        { pattern: 'hinge', category: 'Legs' },
        { pattern: 'lunge', category: 'Legs' },
        { pattern: 'calf', category: 'Legs' },
        { pattern: 'abs', category: 'Abs' }
      ]));
    }
  } else if (days === 4) {
    sections.push(createDay('Day 1: Upper A (Strength Focus)', [
      { pattern: 'horizontal_push', category: 'Chest' },
      { pattern: 'horizontal_pull', category: 'Back' },
      { pattern: 'vertical_push', category: 'Shoulders' },
      { pattern: 'vertical_pull', category: 'Back' },
      { pattern: 'tricep_ext', category: 'Triceps' }
    ]));
    sections.push(createDay('Day 2: Lower A (Quad Focus)', [
      { pattern: 'squat', category: 'Legs' },
      { pattern: 'hinge', category: 'Legs' },
      { pattern: 'leg_press', category: 'Legs' },
      { pattern: 'calf', category: 'Legs' },
      { pattern: 'abs', category: 'Abs' }
    ]));
    sections.push(createDay('Day 3: Upper B (Hypertrophy Focus)', [
      { pattern: 'incline_push', category: 'Chest' },
      { pattern: 'horizontal_pull', category: 'Back' },
      { pattern: 'lateral_delt', category: 'Shoulders' },
      { pattern: 'chest_fly', category: 'Chest' },
      { pattern: 'bicep_curl', category: 'Biceps' },
      { pattern: 'tricep_ext', category: 'Triceps' }
    ]));
    sections.push(createDay('Day 4: Lower B (Hamstring & Glute Focus)', [
      { pattern: 'deadlift', category: 'Back' },
      { pattern: 'lunge', category: 'Legs' },
      { pattern: 'hip_thrust', category: 'Legs' },
      { pattern: 'calf', category: 'Legs' },
      { pattern: 'abs', category: 'Abs' }
    ]));
  } else if (days === 5) {
    sections.push(createDay('Day 1: Push (Chest & Shoulders Focus)', [
      { pattern: 'horizontal_push', category: 'Chest' },
      { pattern: 'vertical_push', category: 'Shoulders' },
      { pattern: 'incline_push', category: 'Chest' },
      { pattern: 'lateral_delt', category: 'Shoulders' },
      { pattern: 'tricep_ext', category: 'Triceps' }
    ]));
    sections.push(createDay('Day 2: Pull (Back & Biceps Focus)', [
      { pattern: 'vertical_pull', category: 'Back' },
      { pattern: 'horizontal_pull', category: 'Back' },
      { pattern: 'rear_delt', category: 'Shoulders' },
      { pattern: 'bicep_curl', category: 'Biceps' },
      { pattern: 'abs', category: 'Abs' }
    ]));
    sections.push(createDay('Day 3: Legs (Quad Focus)', [
      { pattern: 'squat', category: 'Legs' },
      { pattern: 'leg_press', category: 'Legs' },
      { pattern: 'lunge', category: 'Legs' },
      { pattern: 'calf', category: 'Legs' }
    ]));
    sections.push(createDay('Day 4: Upper Body (Arms & Delts Priority)', [
      { pattern: 'incline_push', category: 'Chest' },
      { pattern: 'horizontal_pull', category: 'Back' },
      { pattern: 'lateral_delt', category: 'Shoulders' },
      { pattern: 'bicep_curl', category: 'Biceps' },
      { pattern: 'tricep_ext', category: 'Triceps' }
    ]));
    sections.push(createDay('Day 5: Lower Body & Core (Posterior Focus)', [
      { pattern: 'hinge', category: 'Legs' },
      { pattern: 'hip_thrust', category: 'Legs' },
      { pattern: 'calf', category: 'Legs' },
      { pattern: 'abs', category: 'Abs' }
    ]));
  } else { // 6 Days Push/Pull/Legs
    sections.push(createDay('Day 1: Push A (Heavy Compound)', [
      { pattern: 'horizontal_push', category: 'Chest' },
      { pattern: 'vertical_push', category: 'Shoulders' },
      { pattern: 'incline_push', category: 'Chest' },
      { pattern: 'lateral_delt', category: 'Shoulders' },
      { pattern: 'tricep_ext', category: 'Triceps' }
    ]));
    sections.push(createDay('Day 2: Pull A (Heavy Compound)', [
      { pattern: 'deadlift', category: 'Back' },
      { pattern: 'vertical_pull', category: 'Back' },
      { pattern: 'horizontal_pull', category: 'Back' },
      { pattern: 'rear_delt', category: 'Shoulders' },
      { pattern: 'bicep_curl', category: 'Biceps' }
    ]));
    sections.push(createDay('Day 3: Legs A (Quad Dominant)', [
      { pattern: 'squat', category: 'Legs' },
      { pattern: 'leg_press', category: 'Legs' },
      { pattern: 'lunge', category: 'Legs' },
      { pattern: 'calf', category: 'Legs' },
      { pattern: 'abs', category: 'Abs' }
    ]));
    sections.push(createDay('Day 4: Push B (Hypertrophy & Pump)', [
      { pattern: 'incline_push', category: 'Chest' },
      { pattern: 'chest_fly', category: 'Chest' },
      { pattern: 'lateral_delt', category: 'Shoulders' },
      { pattern: 'tricep_ext', category: 'Triceps' },
      { pattern: 'abs', category: 'Abs' }
    ]));
    sections.push(createDay('Day 5: Pull B (Hypertrophy & Width)', [
      { pattern: 'vertical_pull', category: 'Back' },
      { pattern: 'horizontal_pull', category: 'Back' },
      { pattern: 'rear_delt', category: 'Shoulders' },
      { pattern: 'bicep_curl', category: 'Biceps' },
      { pattern: 'abs', category: 'Abs' }
    ]));
    sections.push(createDay('Day 6: Legs B (Hamstring & Glute Focus)', [
      { pattern: 'hinge', category: 'Legs' },
      { pattern: 'hip_thrust', category: 'Legs' },
      { pattern: 'lunge', category: 'Legs' },
      { pattern: 'calf', category: 'Legs' }
    ]));
  }

  const injuryNote = wizardState.injuries.size > 0 
    ? ` Joint Safeguards: ${Array.from(wizardState.injuries).join(', ')}.` 
    : '';

  currentRoutine = {
    id: `smart_${Date.now()}`,
    title: `Custom ${wizardState.goal.toUpperCase()} (${days}-Day ${wizardState.equipmentPreset.replace('_', ' ')})`,
    days: days,
    category: wizardState.goal.charAt(0).toUpperCase() + wizardState.goal.slice(1),
    notes: `Tailored for ${wizardState.experience} lifter.${injuryNote} Equipment: ${wizardState.equipmentPreset}.`,
    sections: sections
  };

  document.getElementById('routine-name').value = currentRoutine.title;
  document.getElementById('routine-notes').value = currentRoutine.notes;

  renderPresets();
  renderRoutineBuilder();
  modalWizard.classList.add('hidden');
  showToast(`✨ Generated ${currentRoutine.title}!`);
};

// Restore Guide Modal Logic
const modalGuide = document.getElementById('modal-guide');
document.getElementById('btn-restore-guide').onclick = () => modalGuide.classList.remove('hidden');
document.getElementById('btn-close-guide').onclick = () => modalGuide.classList.add('hidden');

const tabIos = document.getElementById('tab-btn-ios');
const tabAndroid = document.getElementById('tab-btn-android');
const contentIos = document.getElementById('tab-content-ios');
const contentAndroid = document.getElementById('tab-content-android');

tabIos.onclick = () => {
  tabIos.classList.add('active');
  tabAndroid.classList.remove('active');
  contentIos.classList.remove('hidden');
  contentAndroid.classList.add('hidden');
};

tabAndroid.onclick = () => {
  tabAndroid.classList.add('active');
  tabIos.classList.remove('active');
  contentAndroid.classList.remove('hidden');
  contentIos.classList.add('hidden');
};

// Initialize Application
initSQLite();
renderPresets();
renderRoutineBuilder();
