import React from 'react'
import { useCurrentFrame, interpolate, Easing } from 'remotion'
import { CoffeeIcon, UpArrowIcon } from '../components/Icons'
import { THEME } from '../utils/theme'

const FULL_TEXT = 'لاتيه بحليب شوفان + إكسترا شوت'

export const Scene2_TypePill: React.FC = () => {
  const frame = useCurrentFrame()

  // Pill entrance transition (cubic-bezier(.2,.8,.2,1))
  const enterProgress = interpolate(frame, [0, 20], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const scale = interpolate(enterProgress, [0, 1], [0.94, 1.0])
  const translateY = interpolate(enterProgress, [0, 1], [40, 0])
  const blur = interpolate(enterProgress, [0, 1], [10, 0])
  const opacity = interpolate(enterProgress, [0, 1], [0, 1])

  // Typing animation
  const typeStartFrame = 16
  const typeDuration = 60
  const charsCount = Math.floor(
    interpolate(frame, [typeStartFrame, typeStartFrame + typeDuration], [0, FULL_TEXT.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    })
  )
  const displayedText = FULL_TEXT.slice(0, charsCount)

  // Blinking cursor
  const cursorBlink = Math.floor(frame / 8) % 2 === 0

  // Exit transition
  const exitProgress = interpolate(frame, [90, 106], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0])
  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.05])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: THEME.fonts.cairo
      }}
    >
      <div
        style={{
          width: 1000,
          padding: '34px 44px',
          borderRadius: 70,
          background: THEME.colors.whiteA14,
          border: `1px solid ${THEME.colors.whiteA38}`,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4), 0 0 1px 1px rgba(255, 255, 255, 0.15)',
          opacity: opacity * exitOpacity,
          transform: `translateY(${translateY}px) scale(${scale * exitScale})`,
          filter: `blur(${blur}px)`
        }}
      >
        {/* Coffee Icon */}
        <div style={{ color: '#fcd9a0', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <CoffeeIcon size={52} />
        </div>

        {/* Typed Text with Blinking Cursor */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            minHeight: 60,
            flex: 1,
            overflow: 'hidden'
          }}
        >
          <span>{displayedText}</span>
          <span
            style={{
              display: 'inline-block',
              width: 4,
              height: 50,
              backgroundColor: '#ffffff',
              marginRight: 8,
              opacity: cursorBlink ? 1 : 0,
              borderRadius: 2
            }}
          />
        </div>

        {/* Up-Arrow Action Button */}
        <div
          style={{
            marginInlineStart: 'auto',
            width: 76,
            height: 76,
            borderRadius: '50%',
            background: '#ffffff',
            color: THEME.colors.ink,
            display: 'grid',
            placeItems: 'center',
            fontSize: 38,
            flexShrink: 0,
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)'
          }}
        >
          <UpArrowIcon size={38} />
        </div>
      </div>
    </div>
  )
}
