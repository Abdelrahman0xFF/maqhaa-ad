import React from 'react'
import { interpolate, useCurrentFrame } from 'remotion'
import { SparkleStar } from './SparkleStar'

export const StudioEnvironment: React.FC<{
  primaryAccent?: string
  glowIntensity?: number
  showSparkles?: boolean
}> = ({
  primaryAccent = '#ea580c',
  glowIntensity = 1,
  showSparkles = true
}) => {
  const frame = useCurrentFrame()

  // Slow ambient drift
  const orb1X = Math.sin(frame / 60) * 40
  const orb1Y = Math.cos(frame / 70) * 30
  const orb2X = Math.cos(frame / 80) * 50
  const orb2Y = Math.sin(frame / 90) * 40
  const pulse = Math.sin(frame / 35) * 0.15 + 0.85

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        background: '#f8fafc'
      }}
    >
      {/* 1. Subtle Precision Engineering Blueprint Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          opacity: 0.9
        }}
      />

      {/* 2. Top Spotlight Light Cone (NeuraFlow signature light beam) */}
      <div
        style={{
          position: 'absolute',
          top: -150,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 1000,
          background: `radial-gradient(ellipse at 50% 0%, ${primaryAccent}22 0%, rgba(99, 102, 241, 0.08) 45%, transparent 75%)`,
          filter: 'blur(80px)',
          opacity: 0.9 * glowIntensity
        }}
      />

      {/* 3. Drifting Ambient Radiant Orbs */}
      <div
        style={{
          position: 'absolute',
          top: 300 + orb1Y,
          right: -80 + orb1X,
          width: 600,
          height: 600,
          borderRadius: 300,
          background: `radial-gradient(circle, ${primaryAccent}18 0%, transparent 70%)`,
          filter: 'blur(110px)',
          opacity: 0.8 * pulse * glowIntensity
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 250 + orb2Y,
          left: -100 + orb2X,
          width: 650,
          height: 650,
          borderRadius: 325,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.75 * pulse * glowIntensity
        }}
      />

      {/* 4. Center Stage Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 750,
          height: 750,
          borderRadius: 375,
          background: `radial-gradient(circle, #ffffff88 0%, ${primaryAccent}10 40%, transparent 70%)`,
          filter: 'blur(70px)',
          opacity: 0.85
        }}
      />

      {/* 5. Shimmering 4-Point Stars (Sparkles) in 3D Space */}
      {showSparkles && (
        <>
          <div style={{ position: 'absolute', top: 180, left: 90 }}>
            <SparkleStar
              size={22}
              color={primaryAccent}
              rotation={frame * 0.8}
              scale={Math.sin(frame / 20) * 0.2 + 0.9}
              opacity={0.65}
            />
          </div>
          <div style={{ position: 'absolute', top: 260, right: 100 }}>
            <SparkleStar
              size={18}
              color="#3b82f6"
              rotation={-frame * 0.6}
              scale={Math.cos(frame / 22) * 0.25 + 0.85}
              opacity={0.55}
            />
          </div>
          <div style={{ position: 'absolute', bottom: 320, right: 80 }}>
            <SparkleStar
              size={24}
              color={primaryAccent}
              rotation={frame * 0.5}
              scale={Math.sin(frame / 25) * 0.2 + 0.9}
              opacity={0.6}
            />
          </div>
          <div style={{ position: 'absolute', bottom: 200, left: 110 }}>
            <SparkleStar
              size={16}
              color="#10b981"
              rotation={-frame * 0.7}
              scale={Math.cos(frame / 18) * 0.2 + 0.8}
              opacity={0.5}
            />
          </div>
        </>
      )}

      {/* Subtle vignette gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent 65%, rgba(15, 23, 42, 0.04) 100%)'
        }}
      />
    </div>
  )
}
