# TASKS.md — Maqhaa POS Promotional Ad Production Checklist

A living checklist tracking all phases of the SaaS explainer ad production.

---

## 📋 Campaign Milestones

### Phase 1: Research & Discovery

- [x] Complete UI and feature inventory across all 12 major screen areas
- [x] Analyze RTL Arabic typography, styling tokens, and interaction flows
- [x] Identify key demo-worthy visual moments for camera capture

### Phase 2: Creative & Technical Foundation

- [x] Author 68-second dual-language SaaS explainer script (English & Arabic VO)
- [x] Define shot list with exact screen interactions, durations, and camera moves
- [x] Author Premiere Pro editorial guidelines (sound design, pacing, 4K recording)
- [x] Curate realistic Egyptian specialty coffee demo seed data blueprint

### Phase 3: Project Documentation in Video Workspace

- [x] `AGENTS.md` created in video workspace
- [x] `TASKS.md` created in video workspace
- [x] `AD_SCRIPT_AND_SHOT_LIST.md` created in video workspace
- [x] `UI_POLISH_NOTES.md` created in video workspace
- [x] `DEMO_SEED_DATA.md` created in video workspace

### Phase 4: Video-Layer Visual Polish & Preparation

- [x] Document post-production framing, macro crops, and spotlight overlays in `UI_POLISH_NOTES.md`
- [x] Confirm strict code freeze on `offline-maqhaa/src` (zero source code edits)
- [ ] Run seed script (`node scripts/seed-demo-data.mjs`) in `offline-maqhaa` to populate realistic data before capture

### Phase 5: Recording & Post-Production

- [ ] Record Screen 1: Login PIN entry & Shift opening float
- [ ] Record Screen 2: POS takeaway order, modifier selection, and payment confirmation
- [ ] Record Screen 3: Interactive tables grid and active table bill loading
- [ ] Record Screen 4: Financial reports dashboard, interactive Recharts graphs, PDF export
- [ ] Record Screen 5: Shift closing reconciliation and auto-backup trigger
- [ ] Record Screen 6: Lifetime offline license badge and closing logo slate
- [ ] Record audio voiceover (English and/or Arabic)
- [ ] Premiere Pro assembly: audio sync, macro zooms, cursor smoothing, sound effects
- [ ] Export master 16:9 4K and 9:16 vertical social cutdowns

### Phase 6: Remotion Programmatic Motion Graphics Reel
- [x] Configure Remotion workspace with React 19, Lucide, and Cairo/Tajawal Arabic fonts
- [x] Build motion graphics design system & reusable widgets (`ProductCard`, `TableTile`, `FeatureTile`, `PricingCard`, `AnimatedCounter`, `RTLText`)
- [x] Implement Scene 1: Logo Intro & brand tagline (Frames 0–60)
- [x] Implement Scene 2: Problem Hook — slow systems & recurring subscriptions (Frames 55–150)
- [x] Implement Scene 3: POS Cashier Demo & instant F2 checkout counter (Frames 145–300)
- [x] Implement Scene 4: Interactive Floor Map & table status (Frames 295–420)
- [x] Implement Scene 5: Core Value Montage — offline, thermal printing, recipes, shifts (Frames 415–545)
- [x] Implement Scene 6: Lifetime Pricing — Pro 18,000 EGP vs Basic 6,000 EGP with no monthly fees (Frames 540–665)
- [x] Implement Scene 7: Final CTA — logo pulse, CTA button, and official site link (Frames 660–780)
- [x] Integrate master timeline in `src/MaqhaaAd.tsx` and dual compositions in `src/Root.tsx`
- [x] Verify test renders and preview (All 7 scenes successfully rendered to PNG still frames in `out/`)

### Phase 7: Polish Enhancements (Light Theme, Audio & Smooth Pacing)
- [x] Redesigned to SaaS Light Theme (`#f8fafc` background, pure `#ffffff` cards, crisp `#0f172a` text, soft shadows)
- [x] Generated high-fidelity UI Sound Effects (`whoosh.wav`, `pop.wav`, `cash-register.wav`, `click.wav`, `success-chime.wav`)
- [x] Added Arabic Voiceovers across all 7 scenes (`audio/vo/scene1.mp3` through `scene7.mp3`)
- [x] Synthesized warm ambient lo-fi background music track (`audio/bgm.mp3`)
- [x] Upgraded motion physics to smooth fluid springs (damping: 18, stiffness: 70, mass: 0.9) with continuous cinematic camera drift
- [x] Expanded ad duration from 26s to 79.5s (2385 frames @ 30 FPS) for comfortable, relaxed SaaS pacing
- [x] Verified and rendered all 7 Light Theme scene preview frames (`out/light_scene1.png` to `out/light_scene7.png`)

### Phase 8: Icon Standardization & Authentic Egyptian Voiceover
- [x] Replaced 100% of emojis across all components and scenes with crisp Lucide React icons (`HelpCircle`, `AlertTriangle`, `CreditCard`, `Zap`, `CheckCircle2`, `LayoutGrid`, `Sparkles`, `Coffee`, `ShieldCheck`, `Star`, `Check`)
- [x] Switched to native Egyptian Arabic voice (Microsoft Hoda) with natural colloquial café/business phrasing
- [x] Applied studio vocal mastering via ffmpeg (warm low-end EQ, clarity presence, dynamic normalization)
- [x] Aligned timeline markers to 81.43s total duration (2443 frames @ 30 FPS)
- [x] Verified and rendered all 7 final scene frames in `out/final_scene*.png`

### Phase 9: ElevenLabs Voiceover Pipeline Integration
- [x] Installed official `elevenlabs` Python SDK (v2.71.0) with websockets and HTTPX support
- [x] Created automated pipeline `scripts/generate_elevenlabs_vo.py` using `eleven_multilingual_v2` model with stability tuning (0.65) and similarity boost (0.85)
- [x] Built automatic timeline recalculation logic in the script that syncs `src/utils/timing.ts` immediately upon audio generation
- [x] Created voice discovery tool `scripts/list_elevenlabs_voices.py` to inspect available Egyptian/Arabic voices
- [x] Added `npm run vo:elevenlabs` and `npm run vo:voices` shortcuts to `package.json`

### Phase 10: Human Actor Voiceover Mastery & 1:1 Remotion Synchronization
- [x] Sourced user-provided human actor voiceover recording (`voice_over.mpeg`)
- [x] Studio-mastered audio via ffmpeg: repaired header timing, applied -16 LUFS EBU R128 loudness normalization, 75Hz high-pass filter, warm vocal EQ, and subtle de-hiss (`public/audio/actor_vo.mp3`)
- [x] Transcribed Arabic voiceover word-for-word and segmented into 7 thematic scenes based on natural speech pauses
- [x] Re-architected Remotion timeline in `src/utils/timing.ts` to exact 67.00s (2010 frames @ 30 FPS)
- [x] Rebuilt all 7 motion graphic scenes in SaaS Light Theme (`#f8fafc`, `#ffffff`, `#ea580c` accents) with 100% Lucide icons and fluid spring dynamics:
  - **Scene 1**: The Morning Café Rush (orders, cash, stock, shifts) ➔ Maqhaa All-in-One reveal
  - **Scene 2**: Sub-second POS Cashier, modifiers ("سكر زيادة", "حليب شوفان"), and multi-payment ("كاش", "فيزا", "آجل")
  - **Scene 3**: Interactive Hall & Tables Grid (6 live tables) with Dine-in, Takeaway, and Delivery order pills
  - **Scene 4**: Automatic inventory deduction, recipe unit costing, and low stock warnings
  - **Scene 5**: Operations management: Suppliers & purchases, daily expenses, role permissions, and shift settlement
  - **Scene 6**: Real-time sales analytics, weekly revenue chart, net profit margin, and zero cash discrepancy
  - **Scene 7**: Hero brand closure, pulsing CTA button, website card (`maqhaa.abdelrahmanashraf.dev`), and offline reassurance badges
- [x] Rendered and verified all 7 scene stills in `out/actor_s*.png` with zero compile or runtime errors

### Phase 11: Real Maqhaa UI + Inspiration Styling & Tactile Cursor Fusion
- [x] Infused dark aurora background, glassmorphism, and Cairo 900 typography inspired by `maqhaa-ad-v3.html` while preserving full original Maqhaa UI functionality across all 7 scenes.
- [x] Fixed cursor drift by placing pointer coordinate container inside window coordinates with deterministic centering on Spanish Latte, Oat Milk modal toggle, and Table 4.
- [x] Implemented tactile click physics: expanding amber ripple ring (`#f59e0b`, scale `0.3 -> 1.4`), instant card depression (`scale(0.97)`), and butter-smooth cubic-bezier camera glides (`cubic-bezier(0.2, 0.8, 0.2, 1)`).
- [x] Verified all 7 scene stills (`ui_s1_rush.png` to `ui_s7_cta.png`).
- [x] Rendered master vertical MP4 video (`out/maqhaa-ad-vertical.mp4`, 34.6 MB, 67.0s @ 30 FPS, 2010 frames) with 100% audio sync to human voiceover actor and ducked BGM/SFX.
