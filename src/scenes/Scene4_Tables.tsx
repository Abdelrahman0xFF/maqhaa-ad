import React from 'react'
import { useCurrentFrame, interpolate, Easing } from 'remotion'
import { CursorSvg } from '../components/Icons'
import { THEME } from '../utils/theme'

const TABLES = [
  { id: 1, label: 'طاولة 1', initialStatus: 'busy' },
  { id: 2, label: 'طاولة 2', initialStatus: 'free', clickable: true },
  { id: 3, label: 'طاولة 3', initialStatus: 'busy' },
  { id: 4, label: 'طاولة 4', initialStatus: 'free' },
  { id: 5, label: 'طاولة 5', initialStatus: 'free' },
  { id: 6, label: 'طاولة 6', initialStatus: 'busy' }
]

export const Scene4_Tables: React.FC = () => {
  const frame = useCurrentFrame()

  // Title entrance
  const titleProgress = interpolate(frame, [0, 20], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const titleY = interpolate(titleProgress, [0, 1], [40, 0])
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1])

  // Cursor coordinates (Relative to stage: Table 2 center is at 960, 480)
  const clickFrame = 72
  let curX = 1100
  let curY = 600
  let curOpacity = 0

  if (frame < 25) {
    curOpacity = 0
  } else if (frame < 40) {
    curOpacity = interpolate(frame, [25, 40], [0, 1])
    curX = 1100
    curY = 600
  } else if (frame < clickFrame) {
    curOpacity = 1
    const p = interpolate(frame, [40, clickFrame], [0, 1], {
      easing: Easing.bezier(0.5, 0, 0.2, 1)
    })
    curX = interpolate(p, [0, 1], [1100, 960])
    curY = interpolate(p, [0, 1], [600, 480])
  } else if (frame < clickFrame + 25) {
    curOpacity = interpolate(frame, [clickFrame + 15, clickFrame + 25], [1, 0])
    curX = 960
    curY = 480
  } else {
    curOpacity = 0
  }

  // Click ripple
  const ripActive = frame >= clickFrame && frame < clickFrame + 18
  const ripProgress = interpolate(frame, [clickFrame, clickFrame + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const ripScale = interpolate(ripProgress, [0, 1], [0.3, 1.4])
  const ripOpacity = interpolate(ripProgress, [0, 1], [1, 0])

  // Table 2 Status Flip
  const isTable2Busy = frame >= clickFrame
  const table2Hit = frame >= clickFrame && frame < clickFrame + 14

  // Exit transition
  const exitProgress = interpolate(frame, [215, 235], [0, 1], {
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
        كل طاولة… في لمحة
      </div>

      {/* Tables Grid (3 columns x 2 rows, 330px cards) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 330px)',
          gap: 26,
          position: 'relative'
        }}
      >
        {TABLES.map((t, i) => {
          const cardEnter = interpolate(frame, [5 + i * 4, 25 + i * 4], [0, 1], {
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          })
          const cardY = interpolate(cardEnter, [0, 1], [40, 0])
          const cardScale = interpolate(cardEnter, [0, 1], [0.94, 1.0])
          const cardOpacity = interpolate(cardEnter, [0, 1], [0, 1])

          const isBusy = t.id === 2 ? isTable2Busy : t.initialStatus === 'busy'
          const isHit = t.id === 2 && table2Hit

          return (
            <div
              key={t.id}
              style={{
                padding: 30,
                textAlign: 'center',
                background: THEME.colors.whiteA14,
                border: `1px solid ${isHit ? THEME.colors.a1 : THEME.colors.whiteA38}`,
                borderRadius: 30,
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                transform: `translateY(${cardY}px) scale(${cardScale * (isHit ? 1.05 : 1)})`,
                opacity: cardOpacity,
                boxShadow: isHit
                  ? '0 20px 50px rgba(245, 158, 11, 0.35)'
                  : '0 20px 50px rgba(0, 0, 0, 0.3)',
                transition: 'border 0.2s, box-shadow 0.2s'
              }}
            >
              <div style={{ fontSize: 100, fontWeight: 900, lineHeight: 1 }}>{t.id}</div>
              <p style={{ fontSize: 28, color: 'rgba(255, 255, 255, 0.69)', margin: '4px 0 12px' }}>
                {t.label}
              </p>
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 24px',
                  borderRadius: 30,
                  fontSize: 28,
                  fontWeight: 700,
                  background: isBusy ? 'rgba(220, 38, 38, 0.25)' : 'rgba(22, 163, 74, 0.25)',
                  color: isBusy ? '#fca5a5' : '#86efac',
                  border: isBusy ? '1px solid rgba(220, 38, 38, 0.4)' : '1px solid rgba(22, 163, 74, 0.4)',
                  transition: 'all 0.3s'
                }}
              >
                {isBusy ? 'مشغولة' : 'متاحة'}
              </span>
            </div>
          )
        })}
      </div>

      {/* Floating Animated Cursor */}
      <div
        style={{
          position: 'absolute',
          left: curX,
          top: curY,
          zIndex: 60,
          opacity: curOpacity,
          transform: 'translate(-8px, -6px)',
          filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5))',
          pointerEvents: 'none'
        }}
      >
        <CursorSvg size={46} />

        {/* Ripple */}
        {ripActive && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: `4px solid ${THEME.colors.a1}`,
              transform: `translate(-50%, -50%) scale(${ripScale})`,
              opacity: ripOpacity,
              pointerEvents: 'none'
            }}
          />
        )}
      </div>
    </div>
  )
}
