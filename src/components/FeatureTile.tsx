import React from 'react'
import { spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { THEME } from '../utils/theme'
import { RTLText } from './RTLText'

interface FeatureTileProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  delay?: number
  accentColor?: string
}

export const FeatureTile: React.FC<FeatureTileProps> = ({
  title,
  subtitle,
  icon,
  delay = 0,
  accentColor = THEME.colors.primary
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Creamy, smooth spring
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.9 }
  })

  const opacity = Math.min(1, Math.max(0, (frame - delay) / 12))
  const translateY = (1 - progress) * 30

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${progress})`,
        background: THEME.colors.card,
        border: `1.5px solid ${THEME.colors.cardBorder}`,
        borderRadius: 24,
        padding: '28px 26px',
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        boxShadow: THEME.colors.cardShadow,
        direction: 'rtl'
      }}
    >
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: 22,
          background: 'rgba(234, 88, 12, 0.08)',
          border: `1.5px solid ${accentColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accentColor,
          flexShrink: 0
        }}
      >
        {icon}
      </div>

      <div style={{ flex: 1 }}>
        <RTLText style={{ fontSize: 24, fontWeight: 900, color: THEME.colors.textMain, marginBottom: 5 }}>
          {title}
        </RTLText>
        <RTLText style={{ fontSize: 16, fontWeight: 600, color: THEME.colors.textMuted, lineHeight: 1.4 }}>
          {subtitle}
        </RTLText>
      </div>
    </div>
  )
}
