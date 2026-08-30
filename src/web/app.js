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

// Smart Wizard Modal Logic
const modalWizard = document.getElementById('modal-wizard');
document.getElementById('btn-smart-wizard').onclick = () => modalWizard.classList.remove('hidden');
document.getElementById('btn-close-wizard').onclick = () => modalWizard.classList.add('hidden');

// Choice Buttons (Goal, Equipment, Experience)
document.querySelectorAll('.choice-btn').forEach(btn => {
  btn.onclick = () => {
    const group = btn.getAttribute('data-group');
    document.querySelectorAll(`.choice-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  };
});

// Days Buttons
document.querySelectorAll('.day-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  };
});

// Generate Smart Routine
document.getElementById('btn-generate-smart').onclick = () => {
  const goal = document.querySelector('.choice-btn[data-group="goal"].active').getAttribute('data-value');
  const days = parseInt(document.querySelector('.day-btn.active').getAttribute('data-days'), 10);
  const equipment = document.querySelector('.choice-btn[data-group="equipment"].active').getAttribute('data-value');
  const experience = document.querySelector('.choice-btn[data-group="experience"].active').getAttribute('data-value');

  let template;
  if (days === 6) template = PRESETS.ppl_6day;
  else if (days === 4) template = PRESETS.upper_lower_4day;
  else if (days === 3 && goal === 'strength') template = PRESETS.stronglifts_5x5;
  else template = PRESETS.fullbody_3day;

  currentRoutine = JSON.parse(JSON.stringify(template));
  currentRoutine.title = `Smart ${goal.toUpperCase()} (${days}-Day ${equipment.replace('_', ' ')})`;
  currentRoutine.notes = `Generated for ${experience} level lifter. Equipment: ${equipment}.`;

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
