import React from 'react'

export const AnimatedPointer: React.FC<{
  x: number
  y: number
  isClicking?: boolean
  rippleScale?: number
  rippleOpacity?: number
  label?: string
  opacity?: number
}> = ({
  x,
  y,
  isClicking = false,
  rippleScale,
  rippleOpacity,
  label,
  opacity = 1
}) => {
  // If explicit ripple values aren't passed, fall back to isClicking
  const showRipple = rippleOpacity !== undefined ? rippleOpacity > 0 : isClicking
  const rScale = rippleScale !== undefined ? rippleScale : 1.2
  const rOp = rippleOpacity !== undefined ? rippleOpacity : 0.8

  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        pointerEvents: 'none',
        zIndex: 100,
        opacity,
        transform: `translate(-4px, -2px) scale(${isClicking ? 0.9 : 1})`,
        filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.45))',
        transition: 'transform 0.08s ease'
      }}
    >
      {/* Tactile expanding ripple ring (Matching maqhaa-ad-v3.html #cur.rip) */}
      {showRipple && (
        <div
          style={{
            position: 'absolute',
            top: 6,
            left: 6,
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '4px solid #f59e0b',
            transform: `translate(-50%, -50%) scale(${rScale})`,
            opacity: rOp,
            boxShadow: '0 0 16px rgba(245, 158, 11, 0.5)',
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Vector Cursor from inspiration */}
      <svg width="42" height="42" viewBox="0 0 24 24">
        <path
          d="M4 2l16 9-7 2-3 7z"
          fill="#ffffff"
          stroke="#1c1917"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>

      {/* Optional micro label */}
      {label && (
        <div
          style={{
            position: 'absolute',
            top: 26,
            left: 22,
            background: 'rgba(28, 25, 23, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 800,
            padding: '3px 12px',
            borderRadius: 20,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(8px)'
          }}
        >
          {label}
        </div>
      )}
    </div>
  )
}
