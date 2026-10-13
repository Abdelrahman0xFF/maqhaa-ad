import React from 'react'
import { spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { THEME } from '../utils/theme'

interface TableTileProps {
  id: number
  status: 'occupied' | 'free'
  delay?: number
  isHighlighted?: boolean
}

export const TableTile: React.FC<TableTileProps> = ({
  id,
  status,
  delay = 0,
  isHighlighted = false
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Smooth fluid spring
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.9 }
  })

  const isOccupied = status === 'occupied'
  const baseColor = isOccupied ? THEME.colors.danger : THEME.colors.success
  const bgColor = isOccupied ? THEME.colors.dangerBg : THEME.colors.successBg

  // Subtle pulsing glow for occupied tables
  const pulse = Math.sin((frame - delay) / 10) * 0.08 + 1

  return (
    <div
      style={{
        transform: `scale(${progress * (isHighlighted ? 1.06 : 1)})`,
        background: isHighlighted ? 'rgba(234, 88, 12, 0.08)' : THEME.colors.card,
        border: `2px solid ${isHighlighted ? THEME.colors.primary : THEME.colors.cardBorder}`,
        borderRadius: 24,
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        boxShadow: isHighlighted
          ? '0 12px 35px rgba(234, 88, 12, 0.25)'
          : isOccupied
          ? '0 10px 25px rgba(220, 38, 38, 0.1)'
          : THEME.colors.cardShadow,
        fontFamily: THEME.fonts.cairo
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 27,
          background: bgColor,
          border: `1.5px solid ${baseColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          fontWeight: 900,
          color: baseColor
        }}
      >
        {id}
      </div>

      <div style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.textMain }}>
        طاولة {id}
      </div>

      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          padding: '4px 14px',
          borderRadius: 12,
          background: bgColor,
          color: baseColor
        }}
      >
        {isOccupied ? 'مشغولة (طلب مفتوح)' : 'متاحة (حساب مغلق)'}
      </div>
    </div>
  )
}
