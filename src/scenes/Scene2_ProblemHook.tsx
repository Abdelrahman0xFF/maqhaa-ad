import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence, staticFile } from 'remotion'
import { HelpCircle, AlertTriangle, CreditCard } from 'lucide-react'
import { THEME } from '../utils/theme'
import { RTLText } from '../components/RTLText'

export const Scene2_ProblemHook: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Slow camera drift
  const cameraDrift = interpolate(frame, [0, durationInFrames], [1, 1.025], { extrapolateRight: 'clamp' })

  // Staggered entrances aligned with Arabic speech
  const line1Progress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 70, mass: 0.9 }
  })

  const line2Progress = spring({
    frame: frame - 85,
    fps,
    config: { damping: 18, stiffness: 70, mass: 0.9 }
  })

  const line3Progress = spring({
    frame: frame - 180,
    fps,
    config: { damping: 18, stiffness: 70, mass: 0.9 }
  })

  // Exit fade out
  const exitOpacity = interpolate(frame, [durationInFrames - 25, durationInFrames], [1, 0], { extrapolateLeft: 'clamp' })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
        background: THEME.colors.background,
        opacity: exitOpacity,
        textAlign: 'center',
        position: 'relative',
        transform: `scale(${cameraDrift})`,
        overflow: 'hidden'
      }}
    >
      {/* Voiceover & Sound Effects */}
      <Sequence from={10}>
        <Audio src={staticFile('audio/vo/scene2.mp3')} volume={1} />
      </Sequence>
      <Sequence from={5} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={85} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={180} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.5} />
      </Sequence>

      {/* Background warning ambient glow */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: 250,
          background: THEME.colors.danger,
          filter: 'blur(160px)',
          opacity: 0.08,
          pointerEvents: 'none'
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 900 }}>
        {/* Line 1: Question */}
        <div
          style={{
            opacity: Math.min(1, Math.max(0, (frame - 10) / 12)),
            transform: `translateY(${(1 - line1Progress) * 25}px) scale(${line1Progress})`
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: THEME.colors.primarySoftBg,
              border: `1.5px solid ${THEME.colors.primary}`,
              color: THEME.colors.primary,
              fontSize: 22,
              fontWeight: 800,
              padding: '8px 24px',
              borderRadius: 20,
              fontFamily: THEME.fonts.cairo
            }}
          >
            <HelpCircle size={20} color={THEME.colors.primary} />
            <span>السؤال الأهم</span>
          </div>

          <RTLText
            as="h2"
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: THEME.colors.textMain,
              marginTop: 18,
              textAlign: 'center'
            }}
          >
            عندك كافيه أو مطعم؟
          </RTLText>
        </div>

        {/* Line 2: Pain Point 1 */}
        {frame > 80 && (
          <div
            style={{
              opacity: Math.min(1, Math.max(0, (frame - 85) / 12)),
              transform: `translateY(${(1 - line2Progress) * 25}px)`,
              background: '#ffffff',
              border: `1.5px solid ${THEME.colors.danger}`,
              borderRadius: 24,
              padding: '24px 32px',
              boxShadow: '0 10px 25px rgba(220, 38, 38, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              direction: 'rtl'
            }}
          >
            <AlertTriangle size={32} color={THEME.colors.danger} />
            <RTLText
              as="h3"
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: THEME.colors.danger,
                textAlign: 'center',
                lineHeight: 1.3
              }}
            >
              تعبت من بطء السيستم وأعطال النت؟
            </RTLText>
          </div>
        )}

        {/* Line 3: Pain Point 2 */}
        {frame > 175 && (
          <div
            style={{
              opacity: Math.min(1, Math.max(0, (frame - 180) / 12)),
              transform: `translateY(${(1 - line3Progress) * 25}px)`,
              background: '#ffffff',
              border: `1.5px solid ${THEME.colors.cardBorder}`,
              borderRadius: 24,
              padding: '24px 32px',
              boxShadow: THEME.colors.cardShadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              direction: 'rtl'
            }}
          >
            <CreditCard size={30} color={THEME.colors.textMuted} />
            <RTLText
              as="h3"
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: THEME.colors.textMuted,
                textAlign: 'center',
                lineHeight: 1.4
              }}
            >
              واشتراكات البرامج الشهرية اللي ما بتخلصش؟
            </RTLText>
          </div>
        )}
      </div>
    </div>
  )
}
