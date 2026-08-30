# 🏋️ FitNotes & FitNotes 2 Template Generator

> Modern workout template generator, custom routine builder, and non-destructive backup merger for **FitNotes (Android)** and **FitNotes 2 (iOS)**.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/)
[![Status: Production Ready](https://img.shields.io/badge/status-production_ready-success.svg)]()

---

## 🌟 Features

- 📱 **Dual Platform Compatibility**: Full native compatibility with **FitNotes (Android)** and **FitNotes 2 (iOS)**.
- ⚡ **100% Client-Side Privacy**: Runs completely in your browser via SQLite WebAssembly (`sql.js`). No workout data leaves your device.
- 🛡️ **Non-Destructive Backup Merger**: Safely injects new workout routines into your existing `FitNotes_Backup.fitnotes` file without losing your workout logs, PRs, or body tracking data.
- 📦 **Rich Preset Library**:
  - **Push Pull Legs (PPL)** (6-Day & 3-Day variations)
  - **Arnold Schwarzenegger Split** (Chest/Back, Shoulders/Arms, Legs)
  - **Upper / Lower 4-Day Split**
  - **StrongLifts 5x5 / Starting Strength**
  - **Full Body 3-Day**
- 🧠 **Smart Workout Generator**: Intelligent routine generator customized by goal (Hypertrophy, Strength, General Fitness), days per week (2–6), experience level, and equipment.
- 📄 **Multi-Format Export**: Download directly as `.fitnotes` (SQLite database backup), `.csv` (FitNotes import format), or `.json` template.
- 💻 **Python CLI & Developer API**: Full CLI for batch generation, inspection, and pipeline automation.

---

## 🚀 Quick Start (Web App)

1. Launch the local web server:
   ```bash
   python3 -m http.server 8080 --directory src/web
   ```
2. Open [http://localhost:8080](http://localhost:8080) in your browser.
3. Select a preset or design your custom routine with the Visual Routine Builder.
4. Click **"Download .fitnotes Backup"** and restore it in FitNotes on iOS or Android!

---

## 🛠️ CLI Usage

```bash
# List all built-in workout presets
python3 -m src.cli.main list-presets

# Generate a fresh .fitnotes database from preset
python3 -m src.cli.main generate --preset ppl_6day --output my_ppl.fitnotes

# Generate a tailored smart routine
python3 -m src.cli.main smart-generate --goal hypertrophy --days 4 --equipment full_gym --output smart_4day.fitnotes

# Inspect an existing backup file
python3 -m src.cli.main inspect FitNotes_Backup.fitnotes

# Safely inject a new routine into an existing user backup without data loss
python3 -m src.cli.main inject --input FitNotes_Backup.fitnotes --preset arnold_split --output Updated_Backup.fitnotes

# Export routine as FitNotes CSV
python3 -m src.cli.main export-csv --preset upper_lower_4day --output upper_lower.csv
```

---

## 📖 Documentation & Guides

- 📲 **[How to Restore on iOS & Android](docs/RESTORE_GUIDE.md)**: Step-by-step restore instructions with screenshots and tips.
- 📐 **[Database Schema Reference](docs/SCHEMA.md)**: Full SQLite schema breakdown for Android & iOS FitNotes.
- 🏗️ **[System Architecture](docs/ARCHITECTURE.md)**: Modular design and future mobile roadmap.
- 🧠 **[On-Device AI Roadmap](docs/ON_DEVICE_AI.md)**: Design specification for Apple Intelligence / CoreML (iOS) and Gemini Nano / AICore (Android).

---

## 🧪 Testing

Run the automated test suite:
```bash
python3 -m unittest discover -s tests -v
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
