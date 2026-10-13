import React from 'react'
import { useCurrentFrame, interpolate, Easing } from 'remotion'
import { CheckIcon } from '../components/Icons'
import { THEME } from '../utils/theme'

export const Scene7_Pricing: React.FC = () => {
  const frame = useCurrentFrame()

  // Title entrance
  const titleProgress = interpolate(frame, [0, 20], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const titleY = interpolate(titleProgress, [0, 1], [40, 0])
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1])

  // Plan 1 entrance
  const plan1Progress = interpolate(frame, [8, 28], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const plan1Y = interpolate(plan1Progress, [0, 1], [40, 0])
  const plan1Scale = interpolate(plan1Progress, [0, 1], [0.94, 1.0])
  const plan1Opacity = interpolate(plan1Progress, [0, 1], [0, 1])

  // Plan 2 entrance (slightly delayed)
  const plan2Progress = interpolate(frame, [14, 34], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const plan2Y = interpolate(plan2Progress, [0, 1], [40, 0])
  const plan2Scale = interpolate(plan2Progress, [0, 1], [0.94, 1.0])
  const plan2Opacity = interpolate(plan2Progress, [0, 1], [0, 1])

  // Exit transition
  const exitProgress = interpolate(frame, [200, 220], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 120px 150px',
        opacity: exitOpacity,
        fontFamily: THEME.fonts.cairo
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 92,
          fontWeight: 900,
          textAlign: 'center',
          marginBottom: 50,
          color: '#ffffff',
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity
        }}
      >
        باقة تناسب مقهاك
      </div>

      {/* 2 Pricing Cards */}
      <div
        style={{
          display: 'flex',
          gap: 40
        }}
      >
        {/* Basic Plan */}
        <div
          style={{
            width: 600,
            padding: 44,
            background: THEME.colors.whiteA14,
            border: `1px solid ${THEME.colors.whiteA38}`,
            borderRadius: 30,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            transform: `translateY(${plan1Y}px) scale(${plan1Scale})`,
            opacity: plan1Opacity,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)'
          }}
        >
          <h3 style={{ fontSize: 42, fontWeight: 800, color: '#ffffff', marginBottom: 12 }}>
            الباقة الأساسية
          </h3>
          <div
            style={{
              fontSize: 112,
              fontWeight: 900,
              color: '#fcd9a0',
              lineHeight: 1.2,
              marginBottom: 20
            }}
          >
            6000 <small style={{ fontSize: 32, color: 'rgba(255, 255, 255, 0.63)', fontWeight: 600 }}>جنيه</small>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ fontSize: 30, padding: '8px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: '#86efac' }}><CheckIcon size={32} /></span>
              <span>كاشير وطاولات</span>
            </li>
            <li style={{ fontSize: 30, padding: '8px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: '#86efac' }}><CheckIcon size={32} /></span>
              <span>طباعة وورديات</span>
            </li>
            <li style={{ fontSize: 30, padding: '8px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: '#86efac' }}><CheckIcon size={32} /></span>
              <span>تقارير مالية</span>
            </li>
          </ul>
        </div>

        {/* Full Plan (Hot / Popular) */}
        <div
          style={{
            width: 600,
            padding: 44,
            background: THEME.colors.whiteA14,
            border: `2px solid ${THEME.colors.a1}`,
            borderRadius: 30,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            transform: `translateY(${plan2Y}px) scale(${plan2Scale})`,
            opacity: plan2Opacity,
            boxShadow: '0 0 90px rgba(245, 158, 11, 0.3), 0 20px 60px rgba(0, 0, 0, 0.35)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <h3 style={{ fontSize: 42, fontWeight: 800, color: '#ffffff', margin: 0 }}>
              الباقة المتكاملة
            </h3>
            <span
              style={{
                background: THEME.colors.a1,
                color: THEME.colors.ink,
                fontSize: 24,
                fontWeight: 800,
                padding: '4px 18px',
                borderRadius: 30
              }}
            >
              الأكثر شعبية
            </span>
          </div>

          <div
            style={{
              fontSize: 112,
              fontWeight: 900,
              color: '#fcd9a0',
              lineHeight: 1.2,
              marginBottom: 20
            }}
          >
            18000 <small style={{ fontSize: 32, color: 'rgba(255, 255, 255, 0.63)', fontWeight: 600 }}>جنيه</small>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ fontSize: 30, padding: '8px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: '#86efac' }}><CheckIcon size={32} /></span>
              <span>كل ميزات الأساسية</span>
            </li>
            <li style={{ fontSize: 30, padding: '8px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: '#86efac' }}><CheckIcon size={32} /></span>
              <span>مخزون بالوحدات</span>
            </li>
            <li style={{ fontSize: 30, padding: '8px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: '#86efac' }}><CheckIcon size={32} /></span>
              <span>موردون وأوامر شراء</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
