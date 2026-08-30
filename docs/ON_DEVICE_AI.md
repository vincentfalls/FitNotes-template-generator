# On-Device Intelligence Architecture Specification

## Vision
As this project transitions from a Web Application into native iOS and Android applications, it will feature **On-Device Intelligence** that operates 100% locally with zero cloud latency and complete user privacy.

---

## 1. Platform-Specific AI Engines

### iOS (Apple Intelligence & CoreML)
- **Engine**: Apple Foundation Models, CoreML execution pipeline, or quantized Small Language Models (e.g. Gemma 2B / Llama 3.2 3B via MLX Swift or llama.cpp Swift bindings).
- **Hardware Acceleration**: Apple Neural Engine (ANE) via CoreML and Metal Performance Shaders (MPS).
- **Privacy Guarantee**: Operates completely offline within the app sandbox.

### Android (Google AICore & Gemini Nano)
- **Engine**: Google AICore (Gemini Nano) on supported Android devices, or MediaPipe LLM Inference (running Gemma 2B / Qwen 2.5 3B).
- **Hardware Acceleration**: Qualcomm NPU, Google TPU (Tensor), and Arm Mali/Adreno GPU via NNAPI / OpenCL.
- **Privacy Guarantee**: Zero network egress required for workout recommendation and log analysis.

---

## 2. On-Device AI Capabilities

### A. Intelligent Workout Plan Generator
Generates personalized routines formatted directly into our structured JSON Routine Schema:
- Input: User constraints (days per week, injuries/limitations, equipment available, target muscle groups, current training volume).
- Output: Validated `Routine` JSON schema with sections, exercises, and set/rep progression.

### B. Adaptive Progressive Overload Engine
Analyzes historical performance in `training_log`:
- Calculates estimated 1RM trends, volume load (kg x reps x sets), and rate of progression.
- Suggests weekly microcycle adjustments (e.g. +2.5kg on bench press, or +1 rep on accessory movements).
- Flags excessive fatigue or plateaus and recommends deload microcycles.

### C. Natural Language Injury & Substitution Assistant
- User: *"My right shoulder is pinching during overhead barbell press. What can I swap in?"*
- AI: Automatically searches the exercise catalog, identifies biomechanically friendly alternatives (e.g. Landmine Press, Neutral Grip Incline DB Press), and updates the routine section in the database.

---

## 3. Structured JSON Schema for LLM Output

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "FitNotesRoutine",
  "type": "object",
  "required": ["name", "sections"],
  "properties": {
    "name": { "type": "string" },
    "notes": { "type": "string" },
    "sections": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["name", "exercises"],
        "properties": {
          "name": { "type": "string" },
          "exercises": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["exercise_name", "category_name", "sets"],
              "properties": {
                "exercise_name": { "type": "string" },
                "category_name": { "type": "string" },
                "sets": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": ["reps"],
                    "properties": {
                      "reps": { "type": "integer" },
                      "metric_weight": { "type": "number" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```
