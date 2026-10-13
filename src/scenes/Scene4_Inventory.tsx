import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { Boxes, Coffee, AlertTriangle, ArrowDownRight, PackageCheck } from 'lucide-react'
import { THEME } from '../utils/theme'
import { KineticBadgeHeader } from '../components/motion/KineticBadgeHeader'
import { FloatingGlassCard } from '../components/motion/FloatingGlassCard'

export const Scene4_Inventory: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  const cameraDrift = interpolate(frame, [0, durationInFrames], [1, 1.02], { extrapolateRight: 'clamp' })
  const enterWindow = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 80, mass: 0.9 } })

  // Live Recipe Auto-deduction animation (frame 30 - 85)
  const isDeductPhase = frame >= 30
  const deductSpring = spring({ frame: frame - 32, fps, config: { damping: 14, stiffness: 85, mass: 0.8 } })
  const deductFloatY = interpolate(frame, [30, 85], [0, -20], { extrapolateRight: 'clamp' })

  // Floating Low Stock Alert popup (frame 100 - 235)
  const isAlertPhase = frame >= 100
  const alertSpring = spring({ frame: frame - 102, fps, config: { damping: 14, stiffness: 80, mass: 0.8 } })

  // Stock bean & milk progress bars shrinking dynamically
  const beanStockWidth = interpolate(frame, [35, 80], [78, 62], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const milkStockWidth = interpolate(frame, [35, 80], [45, 28], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

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
        badgeIcon={<Boxes size={18} color={THEME.colors.a1} />}
        badgeText="المخزون والوصفات الذكية | Smart Stock & Recipes"
        badgeColor={THEME.colors.a1}
        title="خصم تلقائي للخامات مع كل طلب ومتابعة التوالف"
        subtitle="ربط لحظي بين مبيعات الكاشير والمخزون بالجرام لتحديد تكلفة كل كوب بدقة"
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
             إدارة المخزون وحركة الخامات
            </em>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 15, fontWeight: 700, color: '#16a34a' }}>
              <PackageCheck size={18} />
              <span>ربط تلقائي بوصفات المنيو</span>
            </div>
          </div>

          {/* Stock Dashboard Body */}
          <div style={{ padding: '24px 30px', display: 'flex', gap: 24, flex: 1 }}>
            {/* Left Column: Live Recipe Link */}
            <div
              style={{
                width: 440,
                background: '#fcfaf6',
                border: `1px solid ${THEME.colors.line}`,
                borderRadius: 18,
                padding: '22px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(234, 88, 12, 0.15)', display: 'grid', placeItems: 'center', color: THEME.colors.brand }}>
                    <Coffee size={24} />
                  </div>
                  <div>
                    <b style={{ fontSize: 22, display: 'block' }}>وصفة سبانش لاتيه </b>
                  </div>
                </div>

                <div style={{ fontSize: 16, fontWeight: 800, color: THEME.colors.mut, marginBottom: 12 }}>
                  المكونات المربوطة بالطلب:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#ffffff', borderRadius: 12, border: `1px solid ${THEME.colors.line}` }}>
                    <span style={{ fontWeight: 800 }}>بن برازيلي محمص</span>
                    <span style={{ fontWeight: 900, color: THEME.colors.brand }}>18 جرام</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#ffffff', borderRadius: 12, border: `1px solid ${THEME.colors.line}` }}>
                    <span style={{ fontWeight: 800 }}>حليب شوفان كامل</span>
                    <span style={{ fontWeight: 900, color: THEME.colors.brand }}>200 مل</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#ffffff', borderRadius: 12, border: `1px solid ${THEME.colors.line}` }}>
                    <span style={{ fontWeight: 800 }}>صوص حليب مكثف</span>
                    <span style={{ fontWeight: 900, color: THEME.colors.brand }}>30 مل</span>
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(22, 163, 74, 0.1)', border: '1px solid rgba(22, 163, 74, 0.3)', borderRadius: 14, padding: '12px 16px', color: '#16a34a', fontSize: 15, fontWeight: 700 }}>
                ✓ يتم الخصم فورياً بالجرام عند إتمام الفاتورة
              </div>
            </div>

            {/* Right Column: Inventory Items Table & Levels */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontSize: 22, fontWeight: 900 }}>أرصدة الخامات والمكونات الحالية:</div>

              {/* Item 1: Espresso Beans */}
              <div style={{ padding: '16px 20px', borderRadius: 16, border: `1px solid ${THEME.colors.line}`, background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div>
                    <span style={{ fontSize: 20, fontWeight: 900 }}>بن برازيلي فاخر </span>
                    <span style={{ fontSize: 14, color: THEME.colors.mut, marginRight: 12 }}>الوحدة: كجم</span>
                  </div>
                  <span style={{ fontSize: 22, fontWeight: 900, color: THEME.colors.brand }}>
                    {interpolate(beanStockWidth, [62, 78], [12.4, 15.6]).toFixed(1)} كجم
                  </span>
                </div>
                {/* Progress Bar */}
                <div style={{ height: 10, borderRadius: 5, background: '#f4efe7', overflow: 'hidden' }}>
                  <div style={{ width: `${beanStockWidth}%`, height: '100%', background: THEME.colors.brand, borderRadius: 5, transition: 'width 0.3s ease' }} />
                </div>
              </div>

              {/* Item 2: Oat Milk */}
              <div style={{ padding: '16px 20px', borderRadius: 16, border: `1px solid ${milkStockWidth < 30 ? '#dc2626' : THEME.colors.line}`, background: milkStockWidth < 30 ? 'rgba(220, 38, 38, 0.02)' : '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div>
                    <span style={{ fontSize: 20, fontWeight: 900 }}>حليب شوفان </span>
                    <span style={{ fontSize: 14, color: THEME.colors.mut, marginRight: 12 }}>الوحدة: لتر</span>
                  </div>
                  <span style={{ fontSize: 22, fontWeight: 900, color: milkStockWidth < 30 ? '#dc2626' : THEME.colors.ink }}>
                    {interpolate(milkStockWidth, [28, 45], [2.8, 4.5]).toFixed(1)} لتر
                  </span>
                </div>
                {/* Progress Bar */}
                <div style={{ height: 10, borderRadius: 5, background: '#f4efe7', overflow: 'hidden' }}>
                  <div style={{ width: `${milkStockWidth}%`, height: '100%', background: milkStockWidth < 30 ? '#dc2626' : '#16a34a', borderRadius: 5, transition: 'width 0.3s ease' }} />
                </div>
              </div>

              {/* Item 3: Milk Syrup */}
              <div style={{ padding: '16px 20px', borderRadius: 16, border: `1px solid ${THEME.colors.line}`, background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div>
                    <span style={{ fontSize: 20, fontWeight: 900 }}>سيرب حليب مكثف محلي </span>
                    <span style={{ fontSize: 14, color: THEME.colors.mut, marginRight: 12 }}>الوحدة: لتر</span>
                  </div>
                  <span style={{ fontSize: 22, fontWeight: 900, color: THEME.colors.brand }}>8.2 لتر</span>
                </div>
                <div style={{ height: 10, borderRadius: 5, background: '#f4efe7', overflow: 'hidden' }}>
                  <div style={{ width: '68%', height: '100%', background: THEME.colors.brand, borderRadius: 5 }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Recipe Deduction Toast (Focused over the Recipe column) */}
        {isDeductPhase && (
          <div
            style={{
              position: 'absolute',
              top: 140,
              right: 48,
              zIndex: 60,
              transform: `translateY(${deductFloatY}px) scale(${deductSpring})`,
              opacity: deductSpring,
              direction: 'rtl'
            }}
          >
            <div
              style={{
                background: '#ffffff',
                border: '2px solid #ea580c',
                borderRadius: 20,
                padding: '16px 26px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(234, 88, 12, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 16
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 15,
                  background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#ffffff',
                  boxShadow: '0 8px 20px rgba(234, 88, 12, 0.4)'
                }}
              >
                <ArrowDownRight size={28} />
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#ea580c' }}>خصم خامات لحظي من الوصفة:</div>
                <div style={{ fontSize: 16, color: THEME.colors.ink, fontWeight: 900, marginTop: 4 }}>
                  -18g بن برازيلي • -200ml حليب شوفان
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Low Stock Warning Alert Card */}
        {isAlertPhase && (
          <div
            style={{
              position: 'absolute',
              bottom: 44,
              left: 48,
              zIndex: 60,
              transform: `scale(${alertSpring})`,
              opacity: alertSpring,
              direction: 'rtl'
            }}
          >
            <div
              style={{
                background: '#ffffff',
                border: '2px solid #dc2626',
                borderRadius: 20,
                padding: '16px 26px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(220, 38, 38, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 16
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 15,
                  background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#ffffff',
                  boxShadow: '0 8px 20px rgba(220, 38, 38, 0.4)'
                }}
              >
                <AlertTriangle size={28} />
              </div>
              <div>
                <div style={{ fontSize: 19, fontWeight: 900, color: '#dc2626' }}>تنبيه وصول للحد الأدنى (Low Stock)</div>
                <div style={{ fontSize: 15, color: THEME.colors.ink, fontWeight: 800, marginTop: 3 }}>
                  حليب شوفان: المتبقي 2.8 لتر فقط • إعادة الطلب موصى بها
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
