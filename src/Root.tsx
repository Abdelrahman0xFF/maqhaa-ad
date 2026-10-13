import React from 'react'
import { Composition } from 'remotion'
import { MaqhaaAd } from './MaqhaaAd'
import { TOTAL_DURATION_FRAMES, FPS } from './utils/timing'

export const Root: React.FC = () => {
  return (
    <>
      {/* Primary 9:16 Vertical Reel format (Instagram, TikTok, YouTube Shorts) */}
      <Composition
        id="MaqhaaAd"
        component={MaqhaaAd}
        durationInFrames={TOTAL_DURATION_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />

      <Composition
        id="MaqhaaAd-Vertical"
        component={MaqhaaAd}
        durationInFrames={TOTAL_DURATION_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* 16:9 Landscape format (Desktop, YouTube, Website Hero - Native 1920x1080 Stage) */}
      <Composition
        id="MaqhaaAdHorizontal"
        component={MaqhaaAd}
        durationInFrames={TOTAL_DURATION_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  )
}
