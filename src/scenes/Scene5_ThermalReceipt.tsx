import React from 'react'
import { useCurrentFrame, interpolate, Easing } from 'remotion'
import { THEME } from '../utils/theme'

export const Scene5_ThermalReceipt: React.FC = () => {
  const frame = useCurrentFrame()

  // Scene Entrance
  const enterProgress = interpolate(frame, [0, 24], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const textX = interpolate(enterProgress, [0, 1], [40, 0])
  const textOpacity = interpolate(enterProgress, [0, 1], [0, 1])

  // Thermal Paper Rollout (clip-path unrolling down)
  const rollProgress = interpolate(frame, [10, 95], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const clipInsetBottom = (1 - rollProgress) * 100

  // Scene Exit
  const exitProgress = interpolate(frame, [210, 230], [0, 1], {
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 130,
        background: 'linear-gradient(160deg, #f7f1e8, #efe6d8)',
        opacity: enterProgress * exitOpacity,
        fontFamily: THEME.fonts.cairo,
        direction: 'rtl'
      }}
    >
      {/* 1. Realistic Thermal Receipt Paper */}
      <div
        style={{
          width: 520,
          background: '#ffffff',
          color: THEME.colors.ink,
          padding: '40px 36px',
          fontSize: 28,
          lineHeight: 1.6,
          borderRadius: '8px 8px 0 0',
          boxShadow: '0 50px 110px rgba(124, 74, 26, 0.35), 0 0 0 1px rgba(0,0,0,0.06)',
          clipPath: `inset(0% 0% ${clipInsetBottom}% 0%)`,
          position: 'relative'
        }}
      >
        <h4 style={{ textAlign: 'center', fontSize: 42, fontWeight: 900, marginBottom: 6 }}>
          مقهى | Maqhaa
        </h4>
        <div style={{ textAlign: 'center', fontSize: 18, color: THEME.colors.mut, marginBottom: 8 }}>
          رقم الفاتورة: #1042 • كاشير 1
        </div>

        <div style={{ borderTop: '2px dashed #cfc6b8', margin: '14px 0' }} />

        {/* Items */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
          <span>لاتيه ×2</span>
          <span style={{ fontWeight: 700 }}>140.00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
          <span>كريب نوتيلا ×1</span>
          <span style={{ fontWeight: 700 }}>60.00</span>
        </div>

        <div style={{ borderTop: '2px dashed #cfc6b8', margin: '14px 0' }} />

        {/* Subtotal & Tax */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
          <span style={{ color: THEME.colors.mut }}>المجموع</span>
          <span>200.00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
          <span style={{ color: THEME.colors.mut }}>الضريبة 14%</span>
          <span>+28.00</span>
        </div>

        <div style={{ borderTop: '2px dashed #cfc6b8', margin: '14px 0' }} />

        {/* Grand Total */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 42,
            fontWeight: 900,
            color: THEME.colors.ok,
            padding: '6px 0'
          }}
        >
          <span>الإجمالي</span>
          <span>228.00 ج.م</span>
        </div>

        <div style={{ textAlign: 'center', fontSize: 18, color: THEME.colors.mut, marginTop: 12 }}>
          شكراً لزيارتكم! • maqhaa.abdelrahmanashraf.dev
        </div>

        {/* Sawtooth / Zigzag Bottom Edge */}
        <div
          style={{
            position: 'absolute',
            bottom: -10,
            left: 0,
            right: 0,
            height: 10,
            background:
              'radial-gradient(circle, transparent, transparent 50%, #ffffff 50%, #ffffff 100%) -7px -2px / 16px 16px repeat-x'
          }}
        />
      </div>

      {/* 2. Headline Typography */}
      <div
        style={{
          textAlign: 'right',
          fontSize: 110,
          fontWeight: 900,
          lineHeight: 1.25,
          color: THEME.colors.ink,
          transform: `translateX(${textX}px)`,
          opacity: textOpacity
        }}
      >
        فاتورة حرارية
        <br />
        <span style={{ color: THEME.colors.brand }}>80 مم. فورًا.</span>
      </div>
    </div>
  )
}
