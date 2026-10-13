import React from 'react'
import { useCurrentFrame, interpolate, Easing } from 'remotion'
import { THEME } from '../utils/theme'

const WORDS = ['كاشير', 'طاولات', 'فواتير', 'مخزون']

export const Scene1_KineticWords: React.FC = () => {
  const frame = useCurrentFrame()

  // 4 words across 192 frames (each segment ~48 frames)
  const segmentDuration = 48
  const activeIndex = Math.min(Math.floor(frame / segmentDuration), WORDS.length - 1)
  const localFrame = frame - activeIndex * segmentDuration

  // Word entrance: 0 to 14 frames
  const enterProgress = interpolate(localFrame, [0, 14], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  // Word exit: 36 to 46 frames (except subtle transition for last word)
  const exitProgress = interpolate(localFrame, [36, 46], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  const scale = interpolate(enterProgress, [0, 1], [0.88, 1.0]) * interpolate(exitProgress, [0, 1], [1.0, 1.06])
  const opacity = interpolate(enterProgress, [0, 1], [0, 1]) * interpolate(exitProgress, [0, 1], [1, 0])
  const blur = interpolate(enterProgress, [0, 1], [24, 0]) + interpolate(exitProgress, [0, 1], [0, 18])

  const currentWord = WORDS[activeIndex]

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
        key={currentWord}
        style={{
          fontSize: 230,
          fontWeight: 900,
          letterSpacing: '-2px',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #ffffff 0%, #fcd9a0 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          transform: `scale(${scale})`,
          opacity,
          filter: `blur(${blur}px)`
        }}
      >
        {currentWord}
      </div>
    </div>
  )
}
