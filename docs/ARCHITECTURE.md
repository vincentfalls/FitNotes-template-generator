# FitNotes Template Generator Architecture

## Overview
The **FitNotes Template Generator** provides an end-to-end toolchain to design, customize, and generate workout routines directly into SQLite `.fitnotes` database backup files and CSV imports compatible with **FitNotes (Android)** and **FitNotes 2 (iOS)**.

```
┌─────────────────────────────────────────────────────────────┐
│                       Presentation Layer                    │
├──────────────────────────────┬──────────────────────────────┤
│  Web Application (Browser)   │      Python CLI & Scripts    │
│  - 100% Client-Side Privacy  │      - Automated batching    │
│  - SQL.js / WASM Engine      │      - CI/CD integrations    │
│  - Visual Routine Builder    │      - Headless generation   │
└──────────────┬───────────────┴──────────────┬───────────────┘
               │                              │
               ▼                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Domain & Core Engine                      │
├─────────────────────────────────────────────────────────────┤
│  • Models (Routine, Section, Exercise, Set, Category)       │
│  • Smart Workout Generator (Goal, Experience, Equipment)    │
│  • Preset Catalog (PPL, Arnold Split, Upper/Lower, etc.)    │
│  • CSV Exporter (FitNotes 1 & 2 format compliant)           │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 SQLite Engine & Merger                      │
├─────────────────────────────────────────────────────────────┤
│  • Clean Schema Generator (android_metadata, Routine, etc.) │
│  • Non-Destructive Backup Merger (Preserves History & PRs)  │
│  • Foreign Key Integrity & Indexing                         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     Target Platform                         │
├──────────────────────────────┬──────────────────────────────┤
│      FitNotes (Android)      │      FitNotes 2 (iOS)        │
│   (Google Drive / Storage)   │   (iCloud Drive / Files)     │
└──────────────────────────────┴──────────────────────────────┘
```

---

## 3-Phase Roadmap

### Phase 1: Web Application & CLI (Current)
- Web UI running client-side with WebAssembly SQLite (`sql.js`).
- Python CLI for command-line power users and local automation.
- Safe backup merging and fresh backup generation.

### Phase 2: Native Mobile Apps (iOS & Android)
- Native or cross-platform mobile frontends (Swift / SwiftUI on iOS, Kotlin / Jetpack Compose on Android, or React Native / Flutter).
- Native SQLite database engine (e.g. GRDB.swift on iOS, Room / SQLite on Android).
- Direct file association: "Open with FitNotes Template Generator" to inspect and modify `.fitnotes` files directly from mobile Files / Downloads.

### Phase 3: On-Device Intelligence Engine
- Native on-device models:
  - **iOS**: Apple Intelligence / CoreML / Foundation Models.
  - **Android**: Gemini Nano / Google AICore / MediaPipe LLM Inference.
- Local capabilities:
  - Contextual progressive overload calculator based on historical logged RPE, weights, and fatigue.
  - Conversational workout adjustments (e.g. "I have a shoulder impingement, substitute overhead press").
  - Autonomous deload and microcycle generation without internet connection or cloud data transfer.
