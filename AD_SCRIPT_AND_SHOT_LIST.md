# AD_SCRIPT_AND_SHOT_LIST.md — Maqhaa POS Promotional Explainer Video

> **Creative Direction**: Calm, confident, high-craft SaaS explainer ad (in the style of **Linear**, **Notion**, and **Arc Browser**).  
> **Target Audience**: Egyptian and Arab café owners, managers, and specialty coffee founders.  
> **Total Target Duration**: **68 Seconds** (Paced for clarity at ~130 WPM).  
> **Master Resolution**: 4K UHD (3840×2160) @ 60 FPS | Aspect Ratio: 16:9 (with 9:16 safe title margins for Instagram Reels / TikTok / YouTube Shorts).  
> **Official Landing Page / CTA**: [https://maqhaa.abdelrahmanashraf.dev/](https://maqhaa.abdelrahmanashraf.dev/)

---

## 🎬 Narrative Flow Overview

```
[0:00 - 0:10] Beat 1: The Problem & Opening Float  ──► Chaos vs. Total Calm
[0:10 - 0:24] Beat 2: Frictionless POS Checkout     ──► Sub-second Order Flow & Thermal Receipt
[0:24 - 0:35] Beat 3: Visual Floor & Tables Grid    ──► Effortless Dining Hospitality
[0:35 - 0:47] Beat 4: Business Intelligence         ──► Clear Margins & Real-time Trends
[0:47 - 0:58] Beat 5: Stress-Free Shift Settlement  ──► Zero-Variance Reconciled Drawer
[0:58 - 1:08] Beat 6: 100% Offline Promise & CTA    ──► Lifetime Ownership & Trial Link
```

---

## 📽️ Shot-by-Shot Script & Storyboard

### Beat 1: The Opening — Morning Float & Total Calm (0:00 – 0:10 | Duration: 10s)

- **Concept**: Contrast the frantic reality of café rush hours with the quiet, effortless precision of Maqhaa.
- **Exact Screen**: [LoginPage.jsx](file:///D:/vs-code/offline-maqhaa/src/renderer/src/pages/LoginPage.jsx) transitioning into [OpenShiftPage.jsx](file:///D:/vs-code/offline-maqhaa/src/renderer/src/pages/OpenShiftPage.jsx).
- **On-Screen Action to Record**:
  1. Camera slowly dollies in on the clean login screen with the warm amber coffee cup icon and _"مرحباً بك في مقهى"_.
  2. Smooth cursor clicks the numpad: `1` – `2` – `3` – `4`. Pin dots scale up crisply.
  3. Screen transitions seamlessly into Shift Opening.
  4. Cashier inputs initial drawer cash float (`500 ج.م`), clicks "بدء الوردية".
- **On-Screen Typography**:
  - `Built for the rush. Designed for calm.`
  - _(Arabic subtitle: مُصمم لساعات الذروة. بهدوء واحتراف.)_
- **Voiceover (English)**:
  > _"Running a busy café shouldn't mean wrestling with slow systems, dropped connections, or end-of-day cash confusion."_
- **Voiceover Alternative (Arabic)**:
  > _"إدارة كافيه في أوقات الذروة مش لازم تكون فوضى... ولا انتظار لنظام بطيء، أو أعطال إنترنت، أو لخبطة في تقفيل الحسابات."_
- **Audio & Sound Design**:
  - Gentle, rhythmic ambient lo-fi synth pad starts.
  - Crisp, tactile keyboard / switch click sound effects on numpad taps.

---

### Beat 2: The POS Core — Sub-Second Checkout (0:10 – 0:24 | Duration: 14s)

- **Concept**: Showcase raw ordering speed. Zero stutter, instant modifier options, tactile multi-currency payment.
- **Exact Screen**: [POSPage.jsx](file:///D:/vs-code/offline-maqhaa/src/renderer/src/pages/POSPage.jsx) (Takeaway mode).
- **On-Screen Action to Record**:
  1. Wide view of the POS menu grid with crisp drink cards (Iced Spanish Latte, Flat White, V60).
  2. Single click on "سبانش لاتيه بارد": [ModifierModal.jsx](file:///D:/vs-code/offline-maqhaa/src/renderer/src/components/pos/ModifierModal.jsx) pops up smoothly with blurred backdrop.
  3. Toggle "حليب شوفان" (+20 EGP) and "شوت إضافي" (+25 EGP). Hit Enter.
  4. Add "كرواسون فستق" to the cart sidebar. Total recalculates instantly (`200 ج.م`).
  5. Press F2 or click "تأكيد الدفع" -> [PaymentModal.jsx](file:///D:/vs-code/offline-maqhaa/src/renderer/src/components/pos/PaymentModal.jsx) opens.
  6. Tap `2` – `0` – `0` on numpad. Green change pill illuminates: `الباقي: 25 ج.م`. Press Enter.
  7. Thermal receipt modal ([ReceiptModal.jsx](file:///D:/vs-code/offline-maqhaa/src/renderer/src/components/pos/ReceiptModal.jsx)) displays in pixel-perfect Arabic typography.
- **On-Screen Typography**:
  - `Sub-second checkout. Zero lag.`
  - _(Arabic subtitle: طلبات في ثوانٍ معدودة. استجابة فورية.)_
- **Voiceover (English)**:
  > _"Meet Maqhaa: an offline-first POS that moves as fast as your baristas. Add items, customize modifiers, and settle payments in seconds."_
- **Voiceover Alternative (Arabic)**:
  > _"نظام 'مقهى' بيتحرك بنفس سرعة فريقك. تسجيل الطلبات، الإضافات المخصصة، والدفع في ثوانٍ — بدون أي تأخير."_
- **Audio & Sound Design**:
  - Snappy, responsive mouse click SFX.
  - Soft, satisfying paper receipt print / tear sound effect at 0:23.

---

### Beat 3: Floor Flow — Visual Dining & Table Management (0:24 – 0:35 | Duration: 11s)

- **Concept**: Demonstrate flexible floor hospitality. Dine-in tables, open running tabs, zero lost orders.
- **Exact Screen**: [POSPage.jsx](file:///D:/vs-code/offline-maqhaa/src/renderer/src/pages/POSPage.jsx) (`TablesGrid` view).
- **On-Screen Action to Record**:
  1. Transition to the interactive floor grid with numbered tables.
  2. 4 tables are red badge (`مشغولة` - Occupied) with running order counters; remaining tables are clean white (`متاحة` - Free).
  3. Cursor clicks "طاولة 4": the running order immediately populates the cart sidebar.
  4. Cashier adds 1 Iced Flat White and clicks "حفظ للطاولة" (Hold Order).
  5. Table status updates instantly.
- **On-Screen Typography**:
  - `Visual floor control. Total hospitality clarity.`
  - _(Arabic subtitle: تحكم مرن بالطاولات والصالة بنظرة واحدة.)_
- **Voiceover (English)**:
  > _"Effortlessly manage dine-in tables, open tabs, and takeaway orders — without missing a beat or losing a ticket."_
- **Voiceover Alternative (Arabic)**:
  > _"إدارة مرنة للصالة، الطاولات المفتوحة، والتيك أواي. كل طاولة وحسابها تحت عينك طول الوقت."_
- **Audio & Sound Design**:
  - Calm background music swells slightly.
  - Subtle interface chime on order save.

---

### Beat 4: Financial Intelligence — Margin Clarity at a Glance (0:35 – 0:47 | Duration: 12s)

- **Concept**: Empower café owners with Notion/Linear-grade dashboards. Know your exact net profit, ingredient costs, and top items.
- **Exact Screen**: [ReportsPage.jsx](file:///D:/vs-code/offline-maqhaa/src/renderer/src/pages/ReportsPage.jsx) & [AnalyticsPage.jsx](file:///D:/vs-code/offline-maqhaa/src/renderer/src/pages/AnalyticsPage.jsx).
- **On-Screen Action to Record**:
  1. Camera glides over the 4 Stat Cards: Net Sales (`48,650 ج.م`), Expenses (`12,400 ج.م`), Net Profit (`36,250 ج.م`), Total Orders (`284`).
  2. Hover over [DailyTrendChart.jsx](file:///D:/vs-code/offline-maqhaa/src/renderer/src/components/reports/DailyTrendChart.jsx): interactive frosted tooltip displays revenue vs expenses breakdown across the week.
  3. Smooth pan to the Expenses donut chart and Top-Selling Items ranked leaderboard.
  4. Quick click on the "PDF" button displays the clean executive financial summary.
- **On-Screen Typography**:
  - `Real-time analytics. Clear margins.`
  - _(Arabic subtitle: أرباحك ومصروفاتك بأرقام واضحة ومباشرة.)_
- **Voiceover (English)**:
  > _"Get complete visibility into daily profits, ingredient costs, and top-performing staff — with instant reports that make sense at a glance."_
- **Voiceover Alternative (Arabic)**:
  > _"رؤية مالية واضحة لأرباحك اليومية، تكاليف التشغيل، والأصناف الأكثر مبيعاً — بتقارير دقيقة جاهزة للطباعة."_
- **Audio & Sound Design**:
  - Soft UI hover blips on chart interaction.

---

### Beat 5: Cash Reconciliation — The Stress-Free Close (0:47 – 0:58 | Duration: 11s)

- **Concept**: Eliminate the dreaded end-of-shift handover disputes. Every pound accounted for, backed up automatically.
- **Exact Screen**: [CloseShiftPage.jsx](file:///D:/vs-code/offline-maqhaa/src/renderer/src/pages/CloseShiftPage.jsx).
- **On-Screen Action to Record**:
  1. Side-by-side view: Opening Float + Cash Sales + Card Sales + Mobile Wallets − Expenses = Expected Balance (`3,850 ج.م`).
  2. Cashier counts physical drawer cash, enters `3850` on the numpad.
  3. Green badge appears: `تطابق تام — بدون عجز`.
  4. Cashier clicks "إنهاء الوردية": thermal shift report modal pops up, and a subtle toast notification confirms: `تم حفظ النسخة الاحتياطية تلقائياً`.
- **On-Screen Typography**:
  - `Balanced drawer. Automatic backup. Every shift.`
  - _(Arabic subtitle: تقفيل عهدة بدون عجز. ونسخ احتياطي تلقائي.)_
- **Voiceover (English)**:
  > _"At closing, reconcile your drawer down to the last pound. Zero guesswork. Zero discrepancies. And your entire database backed up automatically."_
- **Voiceover Alternative (Arabic)**:
  > _"وفي نهاية اليوم، تقفيل الوردية بدون أي اختلاف. الحسابات متطابقة بالقرش، والنسخة الاحتياطية بتتحفظ تلقائياً."_
- **Audio & Sound Design**:
  - Distinct positive confirmation chime on zero-variance match.

---

### Beat 6: The Promise & CTA — 100% Offline Ownership (0:58 – 1:08 | Duration: 10s)

- **Concept**: Final reassurance: no cloud downtime, no endless subscriptions, local data ownership. Clear website CTA.
- **Exact Screen**: [ActivationAdmin.jsx](file:///D:/vs-code/offline-maqhaa/src/renderer/src/components/admin/ActivationAdmin.jsx) with "مفعل مدى الحياة" badge, zooming out to elegant branding slate.
- **On-Screen Action to Record**:
  1. Macro zoom on the emerald green badge: `مفعل مدى الحياة — باقة مقهى الكاملة`.
  2. Camera transitions to a clean software mockup layout beside a sleek thermal printer.
  3. Fade into the minimalist final title card:
     - **Logo**: Maqhaa (مقهى)
     - **Headline**: نظام إدارة ونقاط بيع الكافيهات الحديثة
     - **Features**: 100% أوفلاين • ترخيص مدى الحياة • دعم فني متواصل
     - **Website CTA**: `maqhaa.abdelrahmanashraf.dev`
- **On-Screen Typography**:
  - `100% Offline. Zero Subscriptions. Try it today.`
  - `maqhaa.abdelrahmanashraf.dev`
- **Voiceover (English)**:
  > _"100% offline. No cloud downtime. No surprise subscription fees. Experience the calm of Maqhaa today at maqhaa.abdelrahmanashraf.dev."_
- **Voiceover Alternative (Arabic)**:
  > _"شغال أوفلاين بالكامل، بدون توقف وبدون اشتراكات معقدة. اكتشف هدوء وسرعة 'مقهى' اليوم عبر maqhaa.abdelrahmanashraf.dev."_
- **Audio & Sound Design**:
  - Music resolves gracefully on a warm, resolved piano chord.
  - Final branding chime.

---

## 🛠️ Premiere Pro Editing & Production Guidelines

1. **Screen Capture Settings**:
   - Software: OBS Studio or NVIDIA ShadowPlay.
   - Canvas: 3840×2160 (4K), 60 FPS, Bitrate: 45–60 Mbps (CBR/CQP 16).
   - Display Scaling: Set Windows scale to 125% or 150% so UI text is large, legible, and crisp on mobile screens.
2. **Timeline Structure in Premiere Pro**:
   - Master Sequence: 3840×2160, 29.97 or 60.0 fps.
   - Pacing: 6 distinct beats matched to musical downbeats.
   - Scale/Zoom Motion: Use subtle anchor-point push-ins (e.g., 100% to 108% scale over 4 seconds) to give screen recordings cinematic dimension.
   - Motion Blur: Add 180° shutter motion blur to cursor movements (via After Effects or Premiere Transform effect) for buttery motion.
3. **Color & Contrast**:
   - Rec.709 color space.
   - Slightly boost saturation on Maqhaa's amber primary accent (`#ea580c`) and emerald green badges.
4. **Export Presets**:
   - **Hero Web (16:9)**: 4K H.265 / ProRes 422 for landing page embed.
   - **Social Cutdown (9:16)**: 2160×3840 vertical crop centered on active UI cards for TikTok, Reels, and YouTube Shorts.
