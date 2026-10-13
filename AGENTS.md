# AGENTS.md — Video Workspace & Ad Campaign Contributor Guide

Welcome! This guide outlines the project context, design philosophy, technical architecture, and editorial guidelines for anyone working on promotional and explainer video assets for **Maqhaa POS (مقهى)**.

---

## 1. Project Context & Ecosystem

- **Product**: **Maqhaa (مقهى)** — An offline-first, high-performance desktop POS and operations management system tailored specifically for cafés, specialty coffee shops, and restaurants in Egypt and the Arab world.
- **Underlying Codebase Location**: `D:\vs-code\offline-maqhaa`
- **Application Tech Stack**:
  - **Desktop Shell**: Electron 39 (`electron-vite`)
  - **UI Layer**: React 19, Tailwind CSS 4, Zustand 5, Lucide Icons (`lucide-react`)
  - **Typography**: `@fontsource/tajawal` (UI body) & `@fontsource/cairo` (headings & receipts)
  - **Database**: Local SQLite via `better-sqlite3` located at `%APPDATA%\Maqhaa\maqhaa.db`
  - **Charts**: Recharts 3.9
  - **Hardware Integration**: Thermal ESC/POS receipt printer (USB, SMB, TCP/IP network), barcode scanners, cash drawers
  - **Licensing**: Hardware-bound offline AES-256-GCM encrypted license key validation (`activation.js`)
- **Landing Page & Web Ecosystem**:
  - **Official Landing Page**: [https://maqhaa.abdelrahmanashraf.dev/](https://maqhaa.abdelrahmanashraf.dev/)
  - **Relationship**: The landing page is the central conversion hub and the primary Call to Action (CTA) of the ad video. The URL is also printed directly at the footer of every thermal customer receipt.

---

## 2. Promotional Ad Creative Direction

The goal of this workspace is to produce the creative and structural materials for a **SaaS-style explainer ad**:

- **Reference Tone & Aesthetics**:
  - **Calm, confident, software-company craft**: Inspired by explainer videos from **Linear**, **Notion**, and **Arc Browser**.
  - **Not an infomercial**: Avoid frantic motion, loud cartoon sounds, or hyperactive cuts. Instead, rely on tactile mechanical keystroke sounds, smooth camera glides, high-contrast dark/light mode balance, and deliberate sub-second UI interactions.
  - **Target Audience**: Egyptian and Arab coffee shop owners, specialty café founders, and restaurant managers who value operational reliability, speed, and clean numbers.
- **Key Differentiators to Highlight**:
  1. **100% Offline-First Reliability**: Never stops working when internet drops. No cloud downtime.
  2. **Sub-Second Cashier Speed**: Minimal clicks, keyboard shortcuts (F1, F2), tactile numpad, instant modifier customization.
  3. **Arabic RTL Ergonomics**: Natural, polished right-to-left layout designed natively for Arabic speakers.
  4. **Zero-Discrepancy Shift Settlement**: Automated cash reconciliation with variance detection and automatic database backups.
  5. **No Cloud Subscription Lock-in**: Lifetime license model with local data ownership.

---

## 3. Video Editing & Asset Workflow

- **Final Assembler**: Adobe Premiere Pro (hand-edited).
- **Deliverables Stored in this Workspace**:
  - `AD_SCRIPT_AND_SHOT_LIST.md`: Full 6-beat, 68-second dual-language script (English & Arabic), on-screen typography, recording instructions, and audio cues.
  - `UI_POLISH_NOTES.md`: Screen-by-screen inventory, demo-worthy features, and code polish diffs.
  - `DEMO_SEED_DATA.md`: Realistic Egyptian specialty café menu, 7-day sales trends, shifts, and inventory alerts.
  - `TASKS.md`: Living checklist tracking progress from script to final video export.

---

## 4. UI Polish & Recording Conventions

1. **Strict Production Code Freeze**: **Do NOT edit or alter any source code in `D:\vs-code\offline-maqhaa\src`**. The real application is feature-complete and locked.
2. **Video-Only Polish**: All visual enhancement (macro zooms, spotlight overlays, cursor smoothing, sound effects) is achieved in the **video editing workspace** (Adobe Premiere Pro / Remotion).
3. **Screen Capture Standards**:
   - Record at **4K resolution (3840×2160) at 60 FPS** for butter-smooth UI pans and macro zooms.
   - Use a clean system cursor (high-DPI, subtle highlight if desired).
   - Ensure the app is loaded with the realistic seed data from `DEMO_SEED_DATA.md` before screen recording.
