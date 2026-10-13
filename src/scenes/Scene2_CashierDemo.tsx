import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import {
  Coffee,
  SlidersHorizontal,
  CreditCard,
  Banknote,
  Wallet,
  ShoppingBag,
  Search,
  CheckCircle2,
  Sparkles,
  Globe
} from 'lucide-react'
import { THEME } from '../utils/theme'
import { KineticBadgeHeader } from '../components/motion/KineticBadgeHeader'
import { FloatingGlassCard } from '../components/motion/FloatingGlassCard'
import { AnimatedPointer } from '../components/motion/AnimatedPointer'
import { ThermalReceiptPrint } from '../components/motion/ThermalReceiptPrint'
import { Printer3DModel } from '../components/motion/Printer3DModel'

export const Scene2_CashierDemo: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Slow continuous camera drift
  const cameraDrift = interpolate(frame, [0, durationInFrames], [1, 1.02], { extrapolateRight: 'clamp' })

  // Phase breakdown across 345 frames:
  // Phase 1 (Item selection): frames 0 to 75
  // Phase 2 (ModifierModal): frames 75 to 186 (closes right after confirm button click)
  // Intermezzo: cursor glides across clear POS to Cart Confirm button (frames 186 to 235)
  // Phase 3 (3D Thermal Printer & Receipt Rollout): frames 235 to 345 (triggered by confirm click)
  const isModifierPhase = frame >= 75 && frame < 186
  const isPaymentPhase = frame >= 235

  // Header texts based on phase
  let headerBadge = 'نقطة البيع السريعة | High-Speed POS'
  let headerTitle = 'تسجيل طلبات وتخصيص إضافات في ثوانٍ'
  let headerSubtitle = 'شاشة كاشير فائقة الاستجابة مصممة لضغط طوابير الكافيهات والمطاعم'
  let badgeColor = THEME.colors.a1

  if (isPaymentPhase) {
    headerBadge = 'طباعة حرارية فورية'
    headerTitle = 'إصدار الفاتورة فورياً عبر طابعة الكاشير'
    headerSubtitle = 'طباعة سريعة مع التفاصيل الكاملة ورابط المعاينة الإلكترونية'
    badgeColor = '#16a34a'
  } else if (isModifierPhase) {
    headerBadge = 'تخصيص الإضافات واللغات'
    headerTitle = 'تخصيص الإضافات والملاحظات بلمسة واحدة'
    headerSubtitle = 'دعم كامل للغة العربية والإنجليزية وخيارات التحضير لكل عميل'
    badgeColor = THEME.colors.a2
  }

  // Smooth entrance springs
  const enterWindow = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 80, mass: 0.9 } })
  const modifierSpring = spring({ frame: frame - 75, fps, config: { damping: 14, stiffness: 85, mass: 0.8 } })
  const paymentSpring = spring({ frame: frame - 235, fps, config: { damping: 14, stiffness: 85, mass: 0.8 } })

  // =========================================================================
  // Deterministic Cursor Coordinates INSIDE Window (Window width: 1380, height: 750)
  // Target 1: Spanish Latte card (lat: X = 1110, Y = 280 in RTL)
  // Target 2: Oat Milk checkbox inside ModifierModal (X = 540, Y = 410)
  // Target 3: Modal Save button (X = 690, Y = 560)
  // Target 4: Payment Confirm / Visa Button (X = 220, Y = 680)
  // =========================================================================

  let curX = 1200
  let curY = 400
  let curOpacity = 0
  let isClicking = false
  let ripScale = 0.3
  let ripOpacity = 0

  if (frame < 18) {
    curOpacity = 0
  } else if (frame < 32) {
    // Fade in
    curOpacity = interpolate(frame, [18, 32], [0, 1])
    curX = 1200
    curY = 400
  } else if (frame < 52) {
    // Glide to Spanish Latte card
    curOpacity = 1
    const p = interpolate(frame, [32, 52], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    })
    curX = interpolate(p, [0, 1], [1200, 1110])
    curY = interpolate(p, [0, 1], [400, 280])
  } else if (frame < 75) {
    // Click Spanish Latte (frame 52 to 66)
    curOpacity = 1
    curX = 1110
    curY = 280
    if (frame >= 52 && frame <= 66) {
      isClicking = true
      const rp = interpolate(frame, [52, 66], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
      ripScale = interpolate(rp, [0, 1], [0.3, 1.4])
      ripOpacity = interpolate(rp, [0, 1], [1, 0])
    }
  } else if (frame < 110) {
    // Glide to Oat Milk modifier option inside modal
    curOpacity = 1
    const p = interpolate(frame, [80, 110], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    })
    curX = interpolate(p, [0, 1], [1110, 540])
    curY = interpolate(p, [0, 1], [280, 340])
  } else if (frame < 140) {
    // Click Oat Milk (frame 110 to 124)
    curOpacity = 1
    curX = 540
    curY = 340
    if (frame >= 110 && frame <= 124) {
      isClicking = true
      const rp = interpolate(frame, [110, 124], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
      ripScale = interpolate(rp, [0, 1], [0.3, 1.4])
      ripOpacity = interpolate(rp, [0, 1], [1, 0])
    }
  } else if (frame < 170) {
    // Glide to "حفظ الإضافات" button in modal
    curOpacity = 1
    const p = interpolate(frame, [140, 170], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    })
    curX = interpolate(p, [0, 1], [540, 690])
    curY = interpolate(p, [0, 1], [340, 510])
  } else if (frame < 186) {
    // Click Save Button in modal (frame 170 to 184)
    curOpacity = 1
    curX = 690
    curY = 510
    if (frame >= 170 && frame <= 184) {
      isClicking = true
      const rp = interpolate(frame, [170, 184], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
      ripScale = interpolate(rp, [0, 1], [0.3, 1.4])
      ripOpacity = interpolate(rp, [0, 1], [1, 0])
    }
  } else if (frame < 222) {
    // Glide across clear POS from Save button (modal disappeared) to Cart Confirm Pay button
    curOpacity = 1
    const p = interpolate(frame, [186, 222], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    })
    curX = interpolate(p, [0, 1], [690, 220])
    curY = interpolate(p, [0, 1], [510, 680])
  } else if (frame < 255) {
    // Click "تأكيد الدفع" button in Cart (frames 222 to 236) then fade out as printer appears
    curOpacity = interpolate(frame, [238, 255], [1, 0])
    curX = 220
    curY = 680
    if (frame >= 222 && frame <= 236) {
      isClicking = true
      const rp = interpolate(frame, [222, 236], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
      ripScale = interpolate(rp, [0, 1], [0.3, 1.4])
      ripOpacity = interpolate(rp, [0, 1], [1, 0])
    }
  } else {
    curOpacity = 0
  }

  // Card hit states
  const isLatteHit = frame >= 52 && frame <= 68
  const isOatMilkChecked = frame >= 110
  const isOatMilkHit = frame >= 110 && frame <= 126
  const isSaveBtnHit = frame >= 170 && frame <= 186
  const isPayBtnHit = frame >= 222

  // Receipt rollout progress starting right as 3D printer appears (frame 235)
  const receiptRollProgress = spring({
    frame: frame - 235,
    fps,
    config: { damping: 15, stiffness: 60, mass: 0.9 }
  })

  // Exit transition
  const exitOpacity = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp'
  })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exitOpacity,
        transform: `scale(${cameraDrift})`,
        padding: '20px 40px',
        overflow: 'hidden',
        fontFamily: THEME.fonts.cairo
      }}
    >
      {/* 1. Kinetic Header */}
      <KineticBadgeHeader
        badgeIcon={<Coffee size={18} color={badgeColor} />}
        badgeText={headerBadge}
        badgeColor={badgeColor}
        title={headerTitle}
        subtitle={headerSubtitle}
      />

      {/* 2. Desktop POS Window Rig */}
      <div
        style={{
          width: 1380,
          height: 750,
          position: 'relative',
          borderRadius: 24,
          background: '#0b0b0d',
          padding: 12,
          boxShadow: '0 50px 120px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.15)',
          transform: `scale(0.9)`,
          transformOrigin: '50% 0%',
          opacity: enterWindow
        }}
      >
        {/* Inner Desktop Window */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 16,
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            direction: 'rtl',
            color: THEME.colors.ink,
            position: 'relative'
          }}
        >
          {/* Titlebar */}
          <div
            style={{
              height: 52,
              background: '#fcfaf6',
              borderBottom: `1px solid ${THEME.colors.line}`,
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
              gap: 12,
              color: THEME.colors.mut
            }}
          >
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ width: 13, height: 13, borderRadius: '50%', background: '#ff5f56' }} />
              <span style={{ width: 13, height: 13, borderRadius: '50%', background: '#ffbd2e' }} />
              <span style={{ width: 13, height: 13, borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <em style={{ marginInlineStart: 'auto', fontStyle: 'normal', color: THEME.colors.ink, fontWeight: 800 }}>
              مقهى | شاشة الكاشير السريعة (POS)
            </em>
            <span
              style={{
                background: 'rgba(234, 88, 12, 0.12)',
                color: THEME.colors.brand,
                fontSize: 15,
                fontWeight: 700,
                padding: '3px 12px',
                borderRadius: 20
              }}
            >
              تيك اواي • فاتورة #1042
            </span>
          </div>

          {/* Window Body: Menu (Right) + Cart (Left) */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 440px', minHeight: 0 }}>
            {/* Menu Area */}
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Category Bar */}
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div
                  style={{
                    padding: '6px 20px',
                    borderRadius: 30,
                    background: THEME.colors.ink,
                    color: '#ffffff',
                    fontSize: 20,
                    fontWeight: 700
                  }}
                >
                  الكل
                </div>
                <div
                  style={{
                    padding: '6px 20px',
                    borderRadius: 30,
                    background: 'rgba(234, 88, 12, 0.12)',
                    color: THEME.colors.brand,
                    fontSize: 20,
                    fontWeight: 800,
                    border: `1px solid ${THEME.colors.brand}`
                  }}
                >
                  قهوة مختصة
                </div>
                <div
                  style={{
                    padding: '6px 20px',
                    borderRadius: 30,
                    background: '#f4efe7',
                    color: THEME.colors.mut,
                    fontSize: 20,
                    fontWeight: 600
                  }}
                >
                  مشروبات باردة
                </div>
                <div
                  style={{
                    padding: '6px 20px',
                    borderRadius: 30,
                    background: '#f4efe7',
                    color: THEME.colors.mut,
                    fontSize: 20,
                    fontWeight: 600
                  }}
                >
                  مخبوزات
                </div>

                <div
                  style={{
                    marginInlineStart: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#f4efe7',
                    padding: '6px 14px',
                    borderRadius: 20,
                    fontSize: 16,
                    color: THEME.colors.mut
                  }}
                >
                  <Search size={16} />
                  <span>بحث سريع (F3)</span>
                </div>
              </div>

              {/* 2x2 Menu Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                {/* Spanish Latte (Target 1) */}
                <div
                  style={{
                    border: `2px solid ${isLatteHit || frame > 66 ? THEME.colors.brand : THEME.colors.line}`,
                    borderRadius: 18,
                    padding: '18px 20px',
                    background: isLatteHit || frame > 66 ? THEME.colors.brand2 : '#ffffff',
                    transform: `scale(${isLatteHit ? 1.03 : 1})`,
                    boxShadow: isLatteHit ? '0 10px 25px rgba(234, 88, 12, 0.3)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        background: 'rgba(234, 88, 12, 0.15)',
                        color: THEME.colors.brand,
                        display: 'grid',
                        placeItems: 'center'
                      }}
                    >
                      <Coffee size={28} />
                    </div>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: THEME.colors.brand,
                        background: '#ffffff',
                        padding: '3px 10px',
                        borderRadius: 12,
                        border: `1px solid ${THEME.colors.line}`
                      }}
                    >
                      إضافات متوفرة
                    </span>
                  </div>
                  <b style={{ display: 'block', fontSize: 28, marginTop: 10 }}>سبانش لاتيه بارد</b>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                    <small style={{ fontSize: 22, color: THEME.colors.brand, fontWeight: 800 }}>90 ج.م</small>
                    <span style={{ fontSize: 13, color: THEME.colors.mut }}>قهوة مختصة</span>
                  </div>
                </div>

                {/* Flat White */}
                <div
                  style={{
                    border: `1px solid ${THEME.colors.line}`,
                    borderRadius: 18,
                    padding: '18px 20px',
                    background: '#ffffff'
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: 'rgba(234, 88, 12, 0.15)',
                      color: THEME.colors.brand,
                      display: 'grid',
                      placeItems: 'center'
                    }}
                  >
                    <Coffee size={28} />
                  </div>
                  <b style={{ display: 'block', fontSize: 28, marginTop: 10 }}>فلات وايت دبل</b>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                    <small style={{ fontSize: 22, color: THEME.colors.brand, fontWeight: 800 }}>75 ج.م</small>
                    <span style={{ fontSize: 13, color: THEME.colors.mut }}>قهوة مختصة</span>
                  </div>
                </div>

                {/* Butter Croissant */}
                <div
                  style={{
                    border: `1px solid ${THEME.colors.line}`,
                    borderRadius: 18,
                    padding: '18px 20px',
                    background: '#ffffff'
                  }}
                >
                  <b style={{ display: 'block', fontSize: 28 }}>كرواسون زبدة فرنسي</b>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                    <small style={{ fontSize: 22, color: THEME.colors.brand, fontWeight: 800 }}>65 ج.م</small>
                    <span style={{ fontSize: 13, color: THEME.colors.mut }}>مخبوزات طازجة</span>
                  </div>
                </div>

                {/* V60 Ethiopian */}
                <div
                  style={{
                    border: `1px solid ${THEME.colors.line}`,
                    borderRadius: 18,
                    padding: '18px 20px',
                    background: '#ffffff'
                  }}
                >
                  <b style={{ display: 'block', fontSize: 28 }}>V60 إثيوبي فاخر</b>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                    <small style={{ fontSize: 22, color: THEME.colors.brand, fontWeight: 800 }}>95 ج.م</small>
                    <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 700 }}>متوفر 18 شوت</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Panel (Left in RTL) */}
            <div
              style={{
                borderInlineEnd: `1px solid ${THEME.colors.line}`,
                background: '#fcfaf6',
                padding: '20px 22px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 30, fontWeight: 900, margin: 0 }}>الفاتورة الحالية</h3>
                <span
                  style={{
                    background: 'rgba(234, 88, 12, 0.12)',
                    color: THEME.colors.brand,
                    fontSize: 14,
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: 14
                  }}
                >
                  {frame > 60 ? 'صنفان' : 'صنف واحد'}
                </span>
              </div>

              {/* Cart Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                {/* Item 1: Spanish Latte */}
                {frame > 55 && (
                  <div
                    style={{
                      padding: 12,
                      background: '#ffffff',
                      border: `1px solid ${THEME.colors.line}`,
                      borderRadius: 14
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 800 }}>
                      <span>سبانش لاتيه بارد</span>
                      <span>{isOatMilkChecked ? '110.00' : '90.00'}</span>
                    </div>
                    {isOatMilkChecked && (
                      <div style={{ fontSize: 14, color: THEME.colors.brand, fontWeight: 700, marginTop: 4 }}>
                        + حليب شوفان (+20 ج.م) • سكر مظبوط
                      </div>
                    )}
                  </div>
                )}

                {/* Item 2: Butter Croissant */}
                <div
                  style={{
                    padding: 12,
                    background: '#ffffff',
                    border: `1px solid ${THEME.colors.line}`,
                    borderRadius: 14
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 800 }}>
                    <span>كرواسون زبدة فرنسي</span>
                    <span>65.00</span>
                  </div>
                </div>
              </div>

              {/* Cart Totals */}
              <div style={{ marginTop: 'auto', borderTop: `1px dashed ${THEME.colors.line}`, paddingTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, color: THEME.colors.mut }}>
                  <span>المجموع:</span>
                  <span>{frame > 55 ? (isOatMilkChecked ? '175.00' : '155.00') : '65.00'} ج.م</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, color: THEME.colors.mut, margin: '4px 0' }}>
                  <span>الضريبة (14%):</span>
                  <span>+{frame > 55 ? (isOatMilkChecked ? '24.50' : '21.70') : '9.10'} ج.م</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 34,
                    fontWeight: 900,
                    color: THEME.colors.ok,
                    marginTop: 6
                  }}
                >
                  <span>الإجمالي:</span>
                  <span>{frame > 55 ? (isOatMilkChecked ? '199.50' : '176.70') : '74.10'} ج.م</span>
                </div>
              </div>

              {/* Pay Button */}
              <div
                style={{
                  marginTop: 14,
                  background: isPayBtnHit ? THEME.colors.ok : THEME.colors.ink,
                  color: '#ffffff',
                  fontSize: 26,
                  fontWeight: 900,
                  padding: 14,
                  borderRadius: 16,
                  textAlign: 'center',
                  transform: `scale(${isPayBtnHit ? 1.04 : 1})`,
                  boxShadow: isPayBtnHit ? '0 12px 30px rgba(22, 163, 74, 0.4)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                تأكيد الدفع (F2)
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* OVERLAY: ModifierModal (Phase 2, frames 75 to 220)        */}
          {/* ======================================================== */}
          {isModifierPhase && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(11, 11, 13, 0.65)',
                backdropFilter: 'blur(10px)',
                display: 'grid',
                placeItems: 'center',
                zIndex: 40,
                opacity: modifierSpring
              }}
            >
              <div
                style={{
                  width: 680,
                  background: '#ffffff',
                  borderRadius: 22,
                  boxShadow: '0 40px 100px rgba(0, 0, 0, 0.5)',
                  overflow: 'hidden',
                  transform: `scale(${modifierSpring})`,
                  border: `2px solid ${THEME.colors.brand}`
                }}
              >
                {/* Modal Title */}
                <div
                  style={{
                    padding: '18px 24px',
                    background: '#fcfaf6',
                    borderBottom: `1px solid ${THEME.colors.line}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <SlidersHorizontal size={22} color={THEME.colors.brand} />
                    <span style={{ fontSize: 24, fontWeight: 900 }}>تخصيص الإضافات: سبانش لاتيه بارد</span>
                  </div>
                  <div
                    style={{
                      background: 'rgba(37, 99, 235, 0.1)',
                      color: '#2563eb',
                      padding: '4px 12px',
                      borderRadius: 16,
                      fontSize: 14,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Globe size={14} />
                    <span>عربي / English</span>
                  </div>
                </div>

                {/* Modifiers Options */}
                <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: THEME.colors.mut }}>
                    اختر نوع الحليب والإضافات المطلوبة:
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                    {/* Option 1: Extra Sugar */}
                    <div
                      style={{
                        padding: '14px 16px',
                        borderRadius: 14,
                        border: `1px solid ${THEME.colors.line}`,
                        background: '#fcfaf6',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ fontSize: 18, fontWeight: 700 }}>سكر مظبوط (Sugar)</span>
                      <span style={{ fontSize: 14, color: '#16a34a', fontWeight: 800 }}>مجاني</span>
                    </div>

                    {/* Option 2: Oat Milk (Target 2) */}
                    <div
                      style={{
                        padding: '14px 16px',
                        borderRadius: 14,
                        border: `2px solid ${isOatMilkChecked ? THEME.colors.brand : THEME.colors.line}`,
                        background: isOatMilkChecked ? THEME.colors.brand2 : '#ffffff',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transform: `scale(${isOatMilkHit ? 1.04 : 1})`,
                        boxShadow: isOatMilkHit ? '0 8px 20px rgba(234, 88, 12, 0.3)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ fontSize: 18, fontWeight: 800 }}>حليب شوفان (Oat Milk)</span>
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 800,
                          color: THEME.colors.brand,
                          background: '#ffffff',
                          padding: '2px 8px',
                          borderRadius: 10
                        }}
                      >
                        +20 ج.م
                      </span>
                    </div>

                    {/* Option 3: Extra Shot */}
                    <div
                      style={{
                        padding: '14px 16px',
                        borderRadius: 14,
                        border: `1px solid ${THEME.colors.line}`,
                        background: '#fcfaf6',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ fontSize: 18, fontWeight: 700 }}>إكسترا شوت (Extra Shot)</span>
                      <span style={{ fontSize: 14, color: THEME.colors.mut, fontWeight: 700 }}>+25 ج.م</span>
                    </div>

                    {/* Option 4: Caramel Drizzle */}
                    <div
                      style={{
                        padding: '14px 16px',
                        borderRadius: 14,
                        border: `1px solid ${THEME.colors.line}`,
                        background: '#fcfaf6',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ fontSize: 18, fontWeight: 700 }}>صوص كراميل (Caramel)</span>
                      <span style={{ fontSize: 14, color: THEME.colors.mut, fontWeight: 700 }}>+15 ج.م</span>
                    </div>
                  </div>

                  {/* Save Button (Target 3) */}
                  <div
                    style={{
                      marginTop: 8,
                      background: THEME.colors.brand,
                      color: '#ffffff',
                      fontSize: 22,
                      fontWeight: 900,
                      padding: '14px 0',
                      borderRadius: 14,
                      textAlign: 'center',
                      transform: `scale(${isSaveBtnHit ? 1.03 : 1})`,
                      boxShadow: isSaveBtnHit ? '0 10px 25px rgba(234, 88, 12, 0.4)' : 'none'
                    }}
                  >
                    حفظ الإضافات وإضافة للفاتورة (Enter)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* OVERLAY: 3D Thermal Receipt Printer Model (Phase 3)      */}
          {/* ======================================================== */}
          {isPaymentPhase && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
                opacity: paymentSpring,
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  transform: `scale(${interpolate(paymentSpring, [0, 1], [0.85, 1.05])})`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Printer3DModel
                  printProgress={receiptRollProgress}
                  orderNumber="#1042"
                  total={199.5}
                />
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* Exactly Positioned Mouse Pointer inside Window Container  */}
          {/* ======================================================== */}
          <AnimatedPointer
            x={curX}
            y={curY}
            isClicking={isClicking}
            rippleScale={ripScale}
            rippleOpacity={ripOpacity}
            opacity={curOpacity}
          />
        </div>
      </div>
    </div>
  )
}
