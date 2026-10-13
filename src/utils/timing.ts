export const FPS = 30

export const TIMING = {
  Scene1_LogoIntro: { from: 0, duration: 465 },        // 0.0s - 15.5s (Rush Hook 0-7.2s ➔ Maqhaa Reveal 7.2-15.5s)
  Scene2_CashierDemo: { from: 465, duration: 345 },     // 15.5s - 27.0s (POS Products ➔ Modifiers ➔ Payments)
  Scene3_TableGrid: { from: 810, duration: 240 },       // 27.0s - 35.0s (Floor Plan ➔ Available/Occupied ➔ Order Types)
  Scene4_Inventory: { from: 1050, duration: 235 },      // 35.0s - 42.8s (Recipe Auto-deductions ➔ Stock Bar ➔ Low Stock Alert)
  Scene5_Operations: { from: 1285, duration: 245 },     // 42.8s - 51.0s (Suppliers ➔ Expenses ➔ PIN Roles ➔ Reconciled Shift)
  Scene6_Reports: { from: 1530, duration: 225 },        // 51.0s - 58.4s (Analytics ➔ Revenue Curve ➔ Metric Counters)
  Scene7_CTA: { from: 1755, duration: 255 }             // 58.4s - 67.0s (Brand Lockup ➔ Lifetime License ➔ WhatsApp CTA)
}

export const CAPTIONS = [
  { from: 0, to: 220, text: 'كل يوم في الكافيه: طلبات كتير.. حسابات.. مخزون.. وكمان ورديات!' },
  { from: 220, to: 370, text: 'بس تخيل معايا إن كل ده.. تقدر تديره من مكان واحد بس!' },
  { from: 370, to: 465, text: 'مع مقهى — إدارة الكافيه بقت أسهل وأسرع' },
  { from: 465, to: 810, text: 'تسجيل طلبات وتخصيص إضافات في ثوانٍ معدودة' },
  { from: 810, to: 1050, text: 'تحكم كامل في الصالة والطاولات في لمحة واحدة' },
  { from: 1050, to: 1285, text: 'خصم خامات تلقائي بالجرام وتنبيهات نفاد المخزون' },
  { from: 1285, to: 1530, text: 'إدارة الموردين، المصروفات، وتقفيل ورديات بدون عجز' },
  { from: 1530, to: 1755, text: 'تقارير مالية ورسوم بيانية ذكية لمتابعة مبيعاتك لحظة بلحظة' },
  { from: 1755, to: 2010, text: 'مقهى — 100% أوفلاين. اطلب نسختك على واتساب.' }
]

export const TOTAL_DURATION_FRAMES = 2010 // 67.0 seconds @ 30 FPS
