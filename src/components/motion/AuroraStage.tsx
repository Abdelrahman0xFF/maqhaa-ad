import React from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { CAPTIONS, TOTAL_DURATION_FRAMES } from '../../utils/timing'
import { THEME } from '../../utils/theme'

export const AuroraStage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame()
  const { width, height } = useVideoConfig()

  // Responsive scale factor for stage
  const isVertical = height > width
  const scale = isVertical ? width / 1920 : Math.min(width / 1920, height / 1080)

  // Silky smooth continuous drifting of aurora orbs
  const drift1X = Math.sin(frame * 0.015) * 100
  const drift1Y = Math.cos(frame * 0.012) * -70
  const drift2X = Math.cos(frame * 0.018) * 110
  const drift2Y = Math.sin(frame * 0.014) * 80
  const drift3X = Math.sin(frame * 0.02) * -90
  const drift3Y = Math.cos(frame * 0.016) * 60

  // Current caption text based on frame
  const currentCaption = CAPTIONS.find(c => frame >= c.from && frame < c.to)?.text || ''
  const progressPercent = Math.min((frame / TOTAL_DURATION_FRAMES) * 100, 100)

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.colors.base,
        overflow: 'hidden',
        fontFamily: THEME.fonts.cairo,
        color: '#ffffff',
        direction: 'rtl'
      }}
    >
      {/* 1. Aurora Background with 3 Drifting Light Clouds */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Amber / Orange Cloud */}
        <div
          style={{
            position: 'absolute',
            width: 1000,
            height: 700,
            borderRadius: '50%',
            background: THEME.colors.a2,
            left: -200 + drift1X,
            top: (isVertical ? 600 : 380) + drift1Y,
            filter: 'blur(130px)',
            opacity: 0.75
          }}
        />
        {/* Purple Glow Cloud */}
        <div
          style={{
            position: 'absolute',
            width: 900,
            height: 800,
            borderRadius: '50%',
            background: THEME.colors.a3,
            right: -200 + drift2X,
            top: -200 + drift2Y,
            filter: 'blur(130px)',
            opacity: 0.55
          }}
        />
        {/* Golden Honey Cloud */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 500,
            borderRadius: '50%',
            background: THEME.colors.a1,
            left: (isVertical ? 150 : 500) + drift3X,
            bottom: -250 + drift3Y,
            filter: 'blur(130px)',
            opacity: 0.7
          }}
        />
      </div>

      {/* 2. 120px Architectural Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(rgba(255, 255, 255, 0.067) 1px, transparent 1px) 0 0 / 120px 120px,
            linear-gradient(90deg, rgba(255, 255, 255, 0.067) 1px, transparent 1px) 0 0 / 120px 120px
          `,
          pointerEvents: 'none'
        }}
      />

      {/* 3. Watermark at Top Right */}
      <div
        style={{
          position: 'absolute',
          top: isVertical ? 60 : 34,
          right: isVertical ? 60 : 48,
          fontSize: 34,
          fontWeight: 800,
          opacity: 0.72,
          color: '#ffffff',
          letterSpacing: '-0.5px',
          zIndex: 50
        }}
      >
        مقهى
      </div>

      {/* 4. Scaled 1920x1080 Stage Canvas (Always perfectly centered) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 1920,
          height: 1080,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
          direction: 'rtl',
          overflow: 'hidden'
        }}
      >
        {children}
      </div>

      {/* 5. Synchronized Bottom Caption */}
      <div
        style={{
          position: 'absolute',
          bottom: isVertical ? 80 : 48,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: isVertical ? 42 : 38,
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.78)',
          zIndex: 50,
          pointerEvents: 'none'
        }}
      >
        {currentCaption}
      </div>

      {/* 6. Gold Video Progress Line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 6,
          background: THEME.colors.a1,
          width: `${progressPercent}%`,
          zIndex: 60,
          boxShadow: '0 0 12px rgba(245, 158, 11, 0.6)'
        }}
      />
    </AbsoluteFill>
  )
}
