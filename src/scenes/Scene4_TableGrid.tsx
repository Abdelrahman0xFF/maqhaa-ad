import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence, staticFile } from 'remotion'
import { LayoutGrid } from 'lucide-react'
import { THEME } from '../utils/theme'
import { RTLText } from '../components/RTLText'
import { TableTile } from '../components/TableTile'

export const Scene4_TableGrid: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Slow camera drift
  const cameraDrift = interpolate(frame, [0, durationInFrames], [1, 1.025], { extrapolateRight: 'clamp' })

  const enterProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 18, stiffness: 70, mass: 0.9 }
  })

  const exitOpacity = interpolate(frame, [durationInFrames - 25, durationInFrames], [1, 0], { extrapolateLeft: 'clamp' })

  // Highlight table 4 around frame 200
  const isTable4Highlighted = frame > 195

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 48px',
        background: THEME.colors.background,
        opacity: exitOpacity,
        transform: `scale(${cameraDrift})`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Audio: Voiceover & Sound Effects */}
      <Sequence from={10}>
        <Audio src={staticFile('audio/vo/scene4.mp3')} volume={1} />
      </Sequence>
      <Sequence from={5} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={20} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={70} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={120} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={195} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/click.wav')} volume={0.6} />
      </Sequence>

      {/* Header */}
      <div style={{ textAlign: 'center', transform: `scale(${enterProgress})` }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: THEME.colors.accentBlueBg,
            border: `1.5px solid ${THEME.colors.accentBlue}`,
            color: THEME.colors.accentBlue,
            fontSize: 22,
            fontWeight: 800,
            padding: '8px 24px',
            borderRadius: 20,
            fontFamily: THEME.fonts.cairo
          }}
        >
          <LayoutGrid size={22} color={THEME.colors.accentBlue} />
          <span>خريطة الصالة والطاولات</span>
        </div>

        <RTLText
          as="h2"
          style={{
            fontSize: 46,
            fontWeight: 900,
            color: THEME.colors.textMain,
            marginTop: 14,
            textAlign: 'center'
          }}
        >
          إدارة الطاولات بنظرة واحدة
        </RTLText>
      </div>

      {/* Tables Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 18,
          margin: '20px 0'
        }}
      >
        <TableTile id={1} status="occupied" delay={15} />
        <TableTile id={2} status="free" delay={40} />
        <TableTile id={3} status="occupied" delay={65} />
        <TableTile id={4} status="free" delay={90} isHighlighted={isTable4Highlighted} />
        <TableTile id={5} status="free" delay={115} />
        <TableTile id={6} status="occupied" delay={140} />
      </div>

      {/* Bottom Info Pill (Clean Light Mode) */}
      <div
        style={{
          background: '#ffffff',
          border: `1.5px solid ${THEME.colors.cardBorder}`,
          borderRadius: 24,
          padding: '22px 28px',
          boxShadow: THEME.colors.cardShadow,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          direction: 'rtl'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 14, height: 14, borderRadius: 7, background: THEME.colors.success }} />
          <RTLText style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.textMain }}>
            متاحة (حساب مغلق)
          </RTLText>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 14, height: 14, borderRadius: 7, background: THEME.colors.danger }} />
          <RTLText style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.textMain }}>
            مشغولة (طلب مفتوح)
          </RTLText>
        </div>
      </div>
    </div>
  )
}
