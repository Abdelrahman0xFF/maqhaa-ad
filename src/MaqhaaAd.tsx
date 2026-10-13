import React from 'react'
import { Sequence, Audio, staticFile } from 'remotion'
import '@fontsource/cairo'
import '@fontsource/cairo/700.css'
import '@fontsource/cairo/900.css'
import '@fontsource/tajawal'
import '@fontsource/tajawal/700.css'

import { TIMING } from './utils/timing'
import { AuroraStage } from './components/motion/AuroraStage'

import { Scene1_LogoIntro } from './scenes/Scene1_LogoIntro'
import { Scene2_CashierDemo } from './scenes/Scene2_CashierDemo'
import { Scene3_TableGrid } from './scenes/Scene3_TableGrid'
import { Scene4_Inventory } from './scenes/Scene4_Inventory'
import { Scene5_Operations } from './scenes/Scene5_Operations'
import { Scene6_Reports } from './scenes/Scene6_Reports'
import { Scene7_CTA } from './scenes/Scene7_CTA'

export const MaqhaaAd: React.FC = () => {
  return (
    <AuroraStage>
      {/* 1. Master Voiceover Track (Human Egyptian VO Actor) */}
      <Audio src={staticFile('audio/actor_vo.mp3')} volume={1} />

      {/* 2. Modern Commercial Tech Soundtrack (clear, uplifting, punchy SaaS groove) */}
      <Audio src={staticFile('audio/bgm.mp3')} volume={0.28} />

      {/* ========================================================= */}
      {/* 3. Synchronized Sound Effects (SFX) Track                */}
      {/* ========================================================= */}
      {/* Scene 1 Kinetic Words SFX */}
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.15} />
      </Sequence>
      <Sequence from={51} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.18} />
      </Sequence>
      <Sequence from={96} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/click.wav')} volume={0.16} />
      </Sequence>
      <Sequence from={120} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/click.wav')} volume={0.16} />
      </Sequence>
      <Sequence from={140} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/click.wav')} volume={0.16} />
      </Sequence>
      <Sequence from={165} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.18} />
      </Sequence>
      <Sequence from={220} durationInFrames={25}>
        <Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.18} />
      </Sequence>
      <Sequence from={250} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.18} />
      </Sequence>
      <Sequence from={280} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/click.wav')} volume={0.16} />
      </Sequence>
      <Sequence from={310} durationInFrames={25}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.22} />
      </Sequence>
      {/* Scene 1 Maqhaa Brand Reveal (frame 370) */}
      <Sequence from={370} durationInFrames={40}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.25} />
        <Audio src={staticFile('audio/sfx/success-chime.wav')} volume={0.20} />
      </Sequence>

      {/* Scene 2 Spanish Latte Click (frame 465 + 52 = 517) */}
      <Sequence from={517} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/click.wav')} volume={0.28} />
      </Sequence>
      {/* Scene 2 Modifier Modal Pop (frame 465 + 75 = 540) */}
      <Sequence from={540} durationInFrames={25}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.22} />
      </Sequence>
      {/* Scene 2 Oat Milk Option Click (frame 465 + 110 = 575) */}
      <Sequence from={575} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/click.wav')} volume={0.24} />
      </Sequence>
      {/* Scene 2 Modal Confirm Save (frame 465 + 170 = 635) */}
      <Sequence from={635} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/click.wav')} volume={0.24} />
      </Sequence>
      {/* Scene 2 Cart Pay Confirm Click (frame 465 + 222 = 687) */}
      <Sequence from={687} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/click.wav')} volume={0.3} />
        <Audio src={staticFile('audio/sfx/cash-register.wav')} volume={0.18} />
      </Sequence>
      {/* Scene 2 3D Thermal Receipt Printer Rollout & Cutter Snap (frame 465 + 235 = 700) */}
      <Sequence from={700} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/thermal-printer.wav')} volume={0.32} />
      </Sequence>

      {/* Scene 3 Table 4 Click (frame 810 + 44 = 854) */}
      <Sequence from={854} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/click.wav')} volume={0.28} />
      </Sequence>
      {/* Scene 3 Order Types Feature Showcase Reveal (frame 810 + 58 = 868) */}
      <Sequence from={868} durationInFrames={35}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.24} />
        <Audio src={staticFile('audio/sfx/success-chime.wav')} volume={0.16} />
      </Sequence>

      {/* Scene 4 Recipe Auto-Deductions (frame 1050 + 32 = 1082) */}
      <Sequence from={1082} durationInFrames={25}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.22} />
      </Sequence>
      {/* Scene 4 Low Stock Alert Pop (frame 1050 + 102 = 1152) */}
      <Sequence from={1152} durationInFrames={25}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.2} />
      </Sequence>

      {/* Scene 5 Shift Settlement Entrance (frame 1285) */}
      <Sequence from={1285} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.18} />
      </Sequence>
      {/* Scene 5 Numpad Typing Clicks: "3", "8", "5", "0" (frames 1285 + 84, 100, 116, 132) */}
      <Sequence from={1369} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/click.wav')} volume={0.22} />
      </Sequence>
      <Sequence from={1385} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/click.wav')} volume={0.22} />
      </Sequence>
      <Sequence from={1401} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/click.wav')} volume={0.22} />
      </Sequence>
      <Sequence from={1417} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/click.wav')} volume={0.22} />
      </Sequence>
      {/* Scene 5 Zero-Discrepancy Match Success Chime (frame 1285 + 148 = 1433) */}
      <Sequence from={1433} durationInFrames={1}>
        <Audio src={staticFile('audio/sfx/success-chime.wav')} volume={0.22} />
      </Sequence>
      {/* Scene 5 Confirm Shift Close Click (frame 1285 + 160 = 1445) */}
      <Sequence from={1445} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/click.wav')} volume={0.28} />
      </Sequence>
      {/* Scene 5 Auto-Backup Toast Pop (frame 1285 + 175 = 1460) */}
      <Sequence from={1460} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.22} />
      </Sequence>

      {/* Scene 6 Analytics Entrance (frame 1530) */}
      <Sequence from={1530} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.2} />
      </Sequence>
      {/* Scene 6 Peak Beacon Highlight (frame 1530 + 55 = 1585) */}
      <Sequence from={1585} durationInFrames={40}>
        <Audio src={staticFile('audio/sfx/success-chime.wav')} volume={0.18} />
      </Sequence>

      {/* Scene 7 Brand Finale Reveal (frame 1755) */}
      <Sequence from={1755} durationInFrames={40}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.25} />
      </Sequence>
      {/* Scene 7 CTA Shimmer Pulse (frame 1755 + 24 = 1779) */}
      <Sequence from={1779} durationInFrames={50}>
        <Audio src={staticFile('audio/sfx/success-chime.wav')} volume={0.2} />
      </Sequence>

      {/* ========================================================= */}
      {/* 4. Visual Scenes Sequences                                */}
      {/* ========================================================= */}

      {/* Scene 1: Problem Hook ➔ Maqhaa Reveal (0.0s - 15.5s) */}
      <Sequence
        from={TIMING.Scene1_LogoIntro.from}
        durationInFrames={TIMING.Scene1_LogoIntro.duration}
        name="Scene 1: Hook & Brand Intro"
      >
        <Scene1_LogoIntro />
      </Sequence>

      {/* Scene 2: Sub-Second POS Cashier Demo & Modifiers (15.5s - 27.0s) */}
      <Sequence
        from={TIMING.Scene2_CashierDemo.from}
        durationInFrames={TIMING.Scene2_CashierDemo.duration}
        name="Scene 2: Sub-Second POS Cashier"
      >
        <Scene2_CashierDemo />
      </Sequence>

      {/* Scene 3: Floor Map, Tables & Order Types (27.0s - 35.0s) */}
      <Sequence
        from={TIMING.Scene3_TableGrid.from}
        durationInFrames={TIMING.Scene3_TableGrid.duration}
        name="Scene 3: Tables & Order Types"
      >
        <Scene3_TableGrid />
      </Sequence>

      {/* Scene 4: Inventory Auto-Deductions, Recipes & Stock Alerts (35.0s - 42.8s) */}
      <Sequence
        from={TIMING.Scene4_Inventory.from}
        durationInFrames={TIMING.Scene4_Inventory.duration}
        name="Scene 4: Inventory & Recipes"
      >
        <Scene4_Inventory />
      </Sequence>

      {/* Scene 5: Operations, Suppliers, Expenses, Staff & Shifts (42.8s - 51.0s) */}
      <Sequence
        from={TIMING.Scene5_Operations.from}
        durationInFrames={TIMING.Scene5_Operations.duration}
        name="Scene 5: Operations & Shifts"
      >
        <Scene5_Operations />
      </Sequence>

      {/* Scene 6: Financial Analytics, Charts & Margins (51.0s - 58.4s) */}
      <Sequence
        from={TIMING.Scene6_Reports.from}
        durationInFrames={TIMING.Scene6_Reports.duration}
        name="Scene 6: Analytics & Reports"
      >
        <Scene6_Reports />
      </Sequence>

      {/* Scene 7: Master Brand Closure, Call To Action & Website (58.4s - 67.0s) */}
      <Sequence
        from={TIMING.Scene7_CTA.from}
        durationInFrames={TIMING.Scene7_CTA.duration}
        name="Scene 7: High-Converting CTA"
      >
        <Scene7_CTA />
      </Sequence>
    </AuroraStage>
  )
}
