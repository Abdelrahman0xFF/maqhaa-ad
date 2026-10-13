import React from 'react'

export const FloatingGlassCard: React.FC<{
  children: React.ReactNode
  elevationZ?: number
  glowColor?: string
  borderColor?: string
  borderRadius?: number
  padding?: string | number
  style?: React.CSSProperties
}> = ({
  children,
  elevationZ = 40,
  glowColor = 'rgba(234, 88, 12, 0.25)',
  borderColor = 'rgba(255, 255, 255, 0.25)',
  borderRadius = 26,
  padding = '22px 28px',
  style = {}
}) => {
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.09)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${borderColor}`,
        borderRadius,
        padding,
        boxShadow: `
          0 ${elevationZ * 0.8}px ${elevationZ * 1.5}px rgba(0, 0, 0, 0.4),
          0 0 40px -5px ${glowColor},
          inset 0 1px 0 rgba(255, 255, 255, 0.25)
        `,
        transform: `translateZ(${elevationZ}px)`,
        transformStyle: 'preserve-3d',
        position: 'relative',
        color: '#ffffff',
        ...style
      }}
    >
      {children}
    </div>
  )
}
