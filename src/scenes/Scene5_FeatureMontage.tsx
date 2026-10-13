import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence, staticFile } from 'remotion'
import { WifiOff, Printer, Boxes, BarChart3, Sparkles, Coffee } from 'lucide-react'
import { THEME } from '../utils/theme'
import { RTLText } from '../components/RTLText'
import { FeatureTile } from '../components/FeatureTile'

export const Scene5_FeatureMontage: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Slow camera drift
  const cameraDrift = interpolate(frame, [0, durationInFrames], [1, 1.025], { extrapolateRight: 'clamp' })

  const enterProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 18, stiffness: 70, mass: 0.9 }
  })

  // Exit transition
  const exitOpacity = interpolate(frame, [durationInFrames - 25, durationInFrames], [1, 0], { extrapolateLeft: 'clamp' })

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
        <Audio src={staticFile('audio/vo/scene5.mp3')} volume={1} />
      </Sequence>
      <Sequence from={5} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={15} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={55} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={95} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={135} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.4} />
      </Sequence>

      {/* Header Badge & Title */}
      <div style={{ textAlign: 'center', transform: `scale(${enterProgress})` }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
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
          <Sparkles size={20} color={THEME.colors.primary} />
          <span>منظومة متكاملة بدون تعقيد</span>
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
          كل ما تحتاجه لإدارة كافيهك
        </RTLText>
      </div>

      {/* Feature Tiles List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          margin: '20px 0'
        }}
      >
        <FeatureTile
          title="يعمل 100% بدون إنترنت"
          subtitle="بياناتك محفوظة محلياً بالكامل — لا انقطاع ولا بطء"
          icon={<WifiOff size={32} />}
          accentColor={THEME.colors.success}
          delay={15}
        />

        <FeatureTile
          title="طباعة فواتير وإيصالات فورية"
          subtitle="دعم طابعات USB والشبكة مع كشف تلقائي للطابعات الحرارية"
          icon={<Printer size={32} />}
          accentColor={THEME.colors.accentBlue}
          delay={55}
        />

        <FeatureTile
          title="إدارة المخزون والوصفات"
          subtitle="تتبع دقيق للمكونات وخصم تلقائي للكميات مع كل بيعة"
          icon={<Boxes size={32} />}
          accentColor={THEME.colors.amber}
          delay={95}
        />

        <FeatureTile
          title="تقارير ورديات ومبيعات مفصلة"
          subtitle="تصفية صندوق الكاشير واكتشاف أي عجز مالي بضغطة زر"
          icon={<BarChart3 size={32} />}
          accentColor="#8b5cf6"
          delay={135}
        />
      </div>

      {/* Bottom Reassurance Banner */}
      <div
        style={{
          background: '#ffffff',
          border: `1.5px solid ${THEME.colors.cardBorder}`,
          borderRadius: 24,
          padding: '22px 28px',
          boxShadow: THEME.colors.cardShadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          direction: 'rtl'
        }}
      >
        <Coffee size={20} color={THEME.colors.primary} />
        <RTLText style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.textMuted }}>
          مصمم خصيصاً ليناسب متطلبات السوق المصري والعربي
        </RTLText>
      </div>
    </div>
  )
}
