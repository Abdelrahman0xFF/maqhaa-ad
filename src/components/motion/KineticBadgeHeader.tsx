import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { SparkleStar } from './SparkleStar'
import { THEME } from '../../utils/theme'
import { RTLText } from '../RTLText'

export const KineticBadgeHeader: React.FC<{
  badgeIcon?: React.ReactNode
  badgeText: string
  badgeColor?: string
  badgeBg?: string
  title: string
  subtitle?: string
  delay?: number
}> = ({
  badgeIcon,
  badgeText,
  badgeColor = THEME.colors.a1,
  badgeBg = 'rgba(245, 158, 11, 0.15)',
  title,
  subtitle,
  delay = 0
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const badgeSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 }
  })

  const titleSpring = spring({
    frame: frame - delay - 6,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.9 }
  })

  const subtitleSpring = spring({
    frame: frame - delay - 14,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.9 }
  })

  // Blur decay for high-end cinematic focus
  const titleBlur = interpolate(titleSpring, [0, 1], [10, 0])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        zIndex: 20,
        marginBottom: 18
      }}
    >
      {/* 1. Frosted Glass Floating Pill Chip with ✦ Sparkle */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(255, 255, 255, 0.1)',
          border: `1.5px solid ${badgeColor}`,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: `0 8px 30px ${badgeColor}35, 0 0 1px 1px rgba(255, 255, 255, 0.2)`,
          padding: '8px 24px',
          borderRadius: 30,
          opacity: badgeSpring,
          transform: `translateY(${(1 - badgeSpring) * 16}px) scale(${0.9 + badgeSpring * 0.1})`,
          fontFamily: THEME.fonts.cairo,
          marginBottom: 14
        }}
      >
        {badgeIcon || (
          <SparkleStar size={16} color={badgeColor} rotation={frame * 1.5} />
        )}
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '0.2px'
          }}
        >
          {badgeText}
        </span>
      </div>

      {/* 2. Bold Kinetic Title with Gradient Text */}
      <div
        style={{
          opacity: titleSpring,
          transform: `translateY(${(1 - titleSpring) * 20}px)`,
          filter: `blur(${titleBlur}px)`
        }}
      >
        <h2
          style={{
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1.25,
            textAlign: 'center',
            fontFamily: THEME.fonts.cairo,
            background: 'linear-gradient(90deg, #ffffff 0%, #fcd9a0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            margin: 0
          }}
        >
          {title}
        </h2>
      </div>

      {/* 3. High-Contrast Subtitle */}
      {subtitle && (
        <div
          style={{
            opacity: subtitleSpring,
            transform: `translateY(${(1 - subtitleSpring) * 14}px)`,
            marginTop: 8
          }}
        >
          <p
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.75)',
              textAlign: 'center',
              maxWidth: 860,
              fontFamily: THEME.fonts.tajawal,
              margin: 0
            }}
          >
            {subtitle}
          </p>
        </div>
      )}
    </div>
  )
}
