import React from 'react'
import { useCurrentFrame, interpolate, Easing } from 'remotion'
import { CoffeeIcon } from '../components/Icons'
import { THEME } from '../utils/theme'

export const Scene0_Intro: React.FC = () => {
  const frame = useCurrentFrame()

  // Logo pop transition
  const logoProgress = interpolate(frame, [0, 22], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const logoScale = interpolate(logoProgress, [0, 1], [0.85, 1])
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1])
  const logoBlur = interpolate(logoProgress, [0, 1], [10, 0])
  const logoY = interpolate(logoProgress, [0, 1], [40, 0])

  // Title entrance delayed
  const titleProgress = interpolate(frame, [8, 30], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const titleScale = interpolate(titleProgress, [0, 1], [0.92, 1])
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1])
  const titleBlur = interpolate(titleProgress, [0, 1], [10, 0])
  const titleY = interpolate(titleProgress, [0, 1], [30, 0])

  // Smooth exit fade out into scene 1
  const exitOpacity = interpolate(frame, [72, 88], [1, 0], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exitOpacity,
        fontFamily: THEME.fonts.cairo
      }}
    >
      {/* Brand Gradient Logo */}
      <div
        style={{
          width: 170,
          height: 170,
          borderRadius: 46,
          background: `linear-gradient(145deg, ${THEME.colors.a1}, ${THEME.colors.a2})`,
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 30px 90px rgba(234, 88, 12, 0.45), 0 0 40px rgba(245, 158, 11, 0.3)',
          opacity: logoOpacity,
          transform: `translateY(${logoY}px) scale(${logoScale})`,
          filter: `blur(${logoBlur}px)`,
          color: '#ffffff'
        }}
      >
        <CoffeeIcon size={96} />
      </div>

      {/* Brand Title */}
      <div
        style={{
          fontSize: 150,
          fontWeight: 900,
          lineHeight: 1.2,
          textAlign: 'center',
          letterSpacing: '-1px',
          marginTop: 30,
          color: '#ffffff',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          filter: `blur(${titleBlur}px)`
        }}
      >
        مقهى
      </div>
    </div>
  )
}
