import React from 'react'
import { spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { THEME } from '../utils/theme'
import { RTLText } from './RTLText'

interface ProductCardProps {
  name: string
  category: string
  price: number
  delay?: number
  badge?: string
  accentColor?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  category,
  price,
  delay = 0,
  badge,
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
  const translateY = (1 - progress) * 25

  return (
    <div
      style={{
        transform: `translateY(${translateY}px) scale(${progress})`,
        opacity,
        background: THEME.colors.card,
        border: `1.5px solid ${THEME.colors.cardBorder}`,
        borderRadius: 24,
        padding: '24px 28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: THEME.colors.cardShadow,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {badge && (
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            background: THEME.colors.primarySoftBg,
            border: `1px solid ${THEME.colors.primary}`,
            color: THEME.colors.primary,
            fontSize: 15,
            fontWeight: 800,
            padding: '4px 12px',
            borderRadius: 12,
            fontFamily: THEME.fonts.cairo
          }}
        >
          {badge}
        </div>
      )}

      <div>
        <RTLText style={{ fontSize: 17, color: THEME.colors.textMuted, fontWeight: 600, marginBottom: 6 }}>
          {category}
        </RTLText>
        <RTLText style={{ fontSize: 26, fontWeight: 900, color: THEME.colors.textMain }}>
          {name}
        </RTLText>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
          paddingTop: 16,
          borderTop: '1px solid rgba(0, 0, 0, 0.06)'
        }}
        dir="rtl"
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: 32, fontWeight: 900, color: accentColor, fontFamily: THEME.fonts.cairo }}>
            {price}
          </span>
          <span style={{ fontSize: 18, color: THEME.colors.textMuted, fontWeight: 700, fontFamily: THEME.fonts.cairo }}>
            ج.م
          </span>
        </div>

        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            background: THEME.colors.primarySoftBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: THEME.colors.primary,
            fontWeight: 900,
            fontSize: 22
          }}
        >
          +
        </div>
      </div>
    </div>
  )
}
