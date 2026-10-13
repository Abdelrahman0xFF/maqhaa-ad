import React from 'react'
import { interpolate, useCurrentFrame, Easing } from 'remotion'

interface AnimatedCounterProps {
  target: number
  start?: number
  startFrame?: number
  durationFrames?: number
  prefix?: string
  suffix?: string
  style?: React.CSSProperties
  decimals?: number
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  start = 0,
  startFrame = 0,
  durationFrames = 45,
  prefix = '',
  suffix = '',
  style,
  decimals = 0
}) => {
  const frame = useCurrentFrame()

  const value = interpolate(frame, [startFrame, startFrame + durationFrames], [start, target], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic)
  })

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-US')

  return (
    <span style={{ fontVariantNumeric: 'tabular-nums', ...style }}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
