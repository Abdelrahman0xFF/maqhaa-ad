import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import {
  Lock,
  CheckCircle2,
  Database,
  Coins,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  Printer,
  Sparkles
} from 'lucide-react'
import { THEME } from '../utils/theme'
import { KineticBadgeHeader } from '../components/motion/KineticBadgeHeader'
import { AnimatedPointer } from '../components/motion/AnimatedPointer'

export const Scene5_Operations: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Camera drift
  const cameraDrift = interpolate(frame, [0, durationInFrames], [1, 1.02], { extrapolateRight: 'clamp' })
  const enterWindow = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 80, mass: 0.9 } })

  // -------------------------------------------------------------
  // Script Breakdown (Duration: 245 frames / ~8.1s)
  // VO: "إدارة الموردين، المصروفات، وتقفيل ورديات بدون عجز"
  // Beat 1 (0-75): Operations overview (Suppliers + Expenses logged)
  // Beat 2 (75-155): Closing shift calculation & numpad typing (3850 EGP)
  // Beat 3 (155-245): Zero-discrepancy match confirmed + Auto backup toast
  // -------------------------------------------------------------

  // Staggered badges for Part 1 (Suppliers & Expenses)
  const supplierBadgeSpring = spring({ frame: frame - 16, fps, config: { damping: 14, stiffness: 90, mass: 0.8 } })
  const expenseBadgeSpring = spring({ frame: frame - 38, fps, config: { damping: 14, stiffness: 90, mass: 0.8 } })

  // Numpad typing simulation (starts frame 80)
  // Types: "3" at 84, "8" at 100, "5" at 116, "0" at 132
  let typedBalance = ''
  if (frame >= 132) typedBalance = '3,850'
  else if (frame >= 116) typedBalance = '385'
  else if (frame >= 100) typedBalance = '38'
  else if (frame >= 84) typedBalance = '3'

  // Match confirmation state (Frame 145 onwards)
  const isMatched = frame >= 148
  const matchSpring = spring({ frame: frame - 148, fps, config: { damping: 14, stiffness: 85, mass: 0.8 } })

  // Shift report / auto backup toast (Frame 175 onwards)
  const isBackupActive = frame >= 175
  const backupSpring = spring({ frame: frame - 175, fps, config: { damping: 14, stiffness: 85, mass: 0.8 } })

  // Animated cursor targeting "إنهاء الوردية" confirm button at frame 160
  let curX = 500
  let curY = 600
  let curOpacity = 0
  let isClicking = false
  let ripScale = 0.3
  let ripOpacity = 0

  if (frame >= 135 && frame < 155) {
    curOpacity = interpolate(frame, [135, 145], [0, 1])
    const p = interpolate(frame, [138, 155], [0, 1], { extrapolateRight: 'clamp' })
    curX = interpolate(p, [0, 1], [650, 1000])
    curY = interpolate(p, [0, 1], [450, 650])
  } else if (frame >= 155 && frame < 172) {
    curX = 1000
    curY = 650
    curOpacity = 1
    if (frame >= 158 && frame <= 170) {
      isClicking = true
      const rp = interpolate(frame, [158, 170], [0, 1])
      ripScale = interpolate(rp, [0, 1], [0.3, 1.4])
      ripOpacity = interpolate(rp, [0, 1], [1, 0])
    }
  } else if (frame >= 172 && frame < 188) {
    curX = 1000
    curY = 650
    curOpacity = interpolate(frame, [172, 188], [1, 0])
  }

  // Kinetic Header Copy
  let headerBadge = 'إدارة العمليات والتشغيل | Operations & Finance'
  let headerTitle = 'إدارة الموردين، المصروفات، وتقفيل ورديات بدون عجز'
  let headerSubtitle = 'تسجيل مباشر لفواتير الموردين والمصروفات مع مطابقة فورية للنقدية'
  let badgeColor = '#16a34a'

  if (frame >= 120) {
    headerBadge = 'تسوية مالية ذكية | Zero-Discrepancy Shift'
    headerTitle = 'تقفيل الوردية بالقرش مع نسخ احتياطي تلقائي'
    headerSubtitle = 'حسابات دقيقة بدون أي تضارب — أمان كامل للبيانات وأرشفة فورية'
  }

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
        badgeIcon={<ShieldCheck size={18} color={badgeColor} />}
        badgeText={headerBadge}
        badgeColor={badgeColor}
        title={headerTitle}
        subtitle={headerSubtitle}
      />

      {/* 2. Desktop Window Rig */}
      <div
        style={{
          width: 1380,
          height: 720,
          position: 'relative',
          borderRadius: 24,
          background: '#0b0b0d',
          padding: 12,
          boxShadow: '0 50px 120px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.15)',
          transform: `scale(0.9)`,
          opacity: enterWindow
        }}
      >
        {/* Window Content */}
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
              مقهى | إنهاء الوردية وتسوية الخزينة (Shift Settlement)
            </em>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 14, fontWeight: 800, color: '#16a34a' }}>
              <Database size={16} />
              <span>قاعدة بيانات SQLite محلية مشفرة</span>
            </div>
          </div>

          {/* Real Close Shift Workspace Layout */}
          <div style={{ padding: '26px 34px', display: 'flex', gap: 32, flex: 1 }}>
            
            {/* RIGHT SIDE: Real Shift Breakdown Financial Ledger */}
            <div style={{ flex: 1.15, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Top Shift Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 16,
                      background: 'rgba(239, 68, 68, 0.12)',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#dc2626'
                    }}
                  >
                    <Lock size={26} />
                  </div>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: THEME.colors.ink }}>
                      إنهاء الوردية ومطابقة الدرج
                    </div>
                    <div style={{ fontSize: 13.5, color: THEME.colors.mut, marginTop: 2 }}>
                      الوردية المسائية • الكاشير: أحمد مصطفى (PIN: 1024)
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    fontSize: 13,
                    fontWeight: 800,
                    padding: '6px 14px',
                    borderRadius: 20
                  }}
                >
                  العملة: ج.م (EGP)
                </div>
              </div>

              {/* Exact Financial Breakdown Table matching CloseShiftPage.jsx */}
              <div
                style={{
                  background: '#fcfaf6',
                  borderRadius: 18,
                  border: `1px solid ${THEME.colors.line}`,
                  padding: '18px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 15, color: THEME.colors.mut, fontWeight: 700 }}>الرصيد الافتتاحي:</span>
                  <span style={{ fontSize: 17, fontWeight: 900 }}>500.00 ج.م</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 15, color: THEME.colors.mut, fontWeight: 700 }}>المبيعات النقدية (Cash):</span>
                  <span style={{ fontSize: 17, fontWeight: 900, color: '#16a34a' }}>+ 3,770.00 ج.م</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 15, color: THEME.colors.mut, fontWeight: 700 }}>مبيعات البطاقة والمحافظ:</span>
                  <span style={{ fontSize: 17, fontWeight: 900, color: '#0284c7' }}>1,840.00 ج.م</span>
                </div>

                {/* Live Expense Deduction Row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(239, 68, 68, 0.05)',
                    padding: '8px 12px',
                    borderRadius: 10,
                    border: '1px solid rgba(239, 68, 68, 0.15)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <TrendingDown size={16} color="#dc2626" />
                    <span style={{ fontSize: 14.5, color: '#dc2626', fontWeight: 800 }}>
                      المصروفات النقدية المسجلة:
                    </span>
                  </div>
                  <span style={{ fontSize: 17, fontWeight: 900, color: '#dc2626' }}>- 420.00 ج.م</span>
                </div>

                <div style={{ height: 1, background: THEME.colors.line, margin: '4px 0' }} />

                {/* Expected Cash in Drawer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 16, fontWeight: 900, color: THEME.colors.ink }}>
                      الرصيد المتوقع بالدرج:
                    </span>
                    <div style={{ fontSize: 12, color: THEME.colors.mut }}>
                      (افتتاحي + كاش − مصروفات)
                    </div>
                  </div>
                  <span style={{ fontSize: 24, fontWeight: 900, color: THEME.colors.brand }}>
                    3,850.00 ج.م
                  </span>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div style={{ display: 'flex', gap: 14, marginTop: 'auto' }}>
                <div
                  style={{
                    flex: 1,
                    background: isMatched ? '#16a34a' : '#dc2626',
                    color: '#ffffff',
                    padding: '14px 20px',
                    borderRadius: 14,
                    fontSize: 18,
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    boxShadow: isMatched ? '0 10px 25px rgba(22, 163, 74, 0.35)' : 'none',
                    transform: `scale(${isClicking ? 0.96 : 1})`,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <CheckCircle2 size={20} />
                  <span>{isMatched ? 'إنهاء الوردية والمطابقة' : 'تسوية النقدية'}</span>
                </div>
                <div
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    padding: '14px 24px',
                    borderRadius: 14,
                    fontSize: 16,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  إلغاء
                </div>
              </div>
            </div>

            {/* LEFT SIDE: Realistic Cash Counting Numpad & Variance Matcher */}
            <div
              style={{
                flex: 0.85,
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 22,
                padding: '24px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 800, color: THEME.colors.mut, marginBottom: 4 }}>
                النقدية الفعلية بالدرج (العد الفعلي)
              </div>

              {/* Huge Numpad Display Screen */}
              <div
                style={{
                  width: '100%',
                  background: isMatched ? 'rgba(22, 163, 74, 0.08)' : '#f8fafc',
                  border: `2px solid ${isMatched ? '#16a34a' : '#e2e8f0'}`,
                  borderRadius: 16,
                  padding: '14px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                  transition: 'all 0.2s ease'
                }}
              >
                <span
                  style={{
                    fontSize: 34,
                    fontWeight: 900,
                    color: isMatched ? '#16a34a' : '#0f172a',
                    fontFamily: THEME.fonts.cairo,
                    letterSpacing: '1px'
                  }}
                >
                  {typedBalance || '0'}
                </span>
                <span style={{ fontSize: 16, fontWeight: 900, color: THEME.colors.mut }}>
                  ج.م
                </span>
              </div>

              {/* Zero-Discrepancy Match Banner */}
              {isMatched && (
                <div
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                    color: '#ffffff',
                    borderRadius: 14,
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                    transform: `scale(${matchSpring})`,
                    opacity: matchSpring,
                    boxShadow: '0 8px 20px rgba(22, 163, 74, 0.35)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle2 size={20} />
                    <span style={{ fontSize: 15, fontWeight: 900 }}>تطابق تام — بدون أي عجز</span>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 900, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 8 }}>
                    الفارق: 0.00 ج.م ✓
                  </span>
                </div>
              )}

              {/* 3x4 Numpad Keypad */}
              <div
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 10,
                  flex: 1
                }}
              >
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => {
                  const isTypedKey =
                    (k === '3' && frame >= 82 && frame < 96) ||
                    (k === '8' && frame >= 98 && frame < 112) ||
                    (k === '5' && frame >= 114 && frame < 128) ||
                    (k === '0' && frame >= 130 && frame < 144)

                  return (
                    <div
                      key={k}
                      style={{
                        background: isTypedKey ? THEME.colors.brand : '#f8fafc',
                        color: isTypedKey ? '#ffffff' : '#1e293b',
                        border: '1px solid #e2e8f0',
                        borderRadius: 12,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 20,
                        fontWeight: 900,
                        transform: `scale(${isTypedKey ? 0.94 : 1})`,
                        transition: 'all 0.1s ease'
                      }}
                    >
                      {k}
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Floating Auto-Backup Success Toast matching CloseShiftPage.jsx */}
        {isBackupActive && (
          <div
            style={{
              position: 'absolute',
              top: 76,
              left: 48,
              zIndex: 70,
              transform: `scale(${backupSpring})`,
              opacity: backupSpring,
              direction: 'rtl'
            }}
          >
            <div
              style={{
                background: '#ffffff',
                border: '2px solid #16a34a',
                borderRadius: 20,
                padding: '14px 22px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 35px rgba(22, 163, 74, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 14
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#ffffff',
                  boxShadow: '0 6px 16px rgba(22, 163, 74, 0.35)'
                }}
              >
                <Database size={24} />
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 900, color: '#16a34a' }}>
                  تم حفظ النسخة الاحتياطية تلقائياً
                </div>
                <div style={{ fontSize: 13.5, color: '#64748b', fontWeight: 800, marginTop: 2 }}>
                  أرشفة فورية في: %APPDATA%\Maqhaa\Backups
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Animated Mouse Cursor for Shift Confirmation */}
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
  )
}
