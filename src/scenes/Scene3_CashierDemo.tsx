import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence, staticFile } from 'remotion'
import { Zap, CreditCard, CheckCircle2 } from 'lucide-react'
import { THEME } from '../utils/theme'
import { RTLText } from '../components/RTLText'
import { ProductCard } from '../components/ProductCard'
import { AnimatedCounter } from '../components/AnimatedCounter'

export const Scene3_CashierDemo: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Slow camera drift
  const cameraDrift = interpolate(frame, [0, durationInFrames], [1, 1.025], { extrapolateRight: 'clamp' })

  // Entrance
  const enterProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 18, stiffness: 70, mass: 0.9 }
  })

  // F2 Payment button pulse trigger around frame 270
  const isPaid = frame > 270
  const payPulse = isPaid ? Math.sin((frame - 270) / 6) * 0.05 + 1 : 1

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
        <Audio src={staticFile('audio/vo/scene3.mp3')} volume={1} />
      </Sequence>
      <Sequence from={5} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={25} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={65} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={105} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={145} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.4} />
      </Sequence>
      {/* Checkout chime */}
      <Sequence from={270} durationInFrames={40}>
        <Audio src={staticFile('audio/sfx/cash-register.wav')} volume={0.7} />
      </Sequence>

      {/* Header Badge & Title */}
      <div style={{ textAlign: 'center', transform: `scale(${enterProgress})` }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: THEME.colors.successBg,
            border: `1.5px solid ${THEME.colors.success}`,
            color: THEME.colors.success,
            fontSize: 22,
            fontWeight: 800,
            padding: '8px 24px',
            borderRadius: 20,
            fontFamily: THEME.fonts.cairo
          }}
        >
          <Zap size={20} color={THEME.colors.success} fill={THEME.colors.success} />
          <span>أوفلاين 100% بدون نت</span>
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
          كاشير فائق السرعة في ثوانٍ
        </RTLText>
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 18,
          margin: '20px 0'
        }}
      >
        <ProductCard
          name="سبانش لاتيه بارد"
          category="قهوة مختصة"
          price={90}
          delay={25}
          badge="الأكثر طلباً"
        />
        <ProductCard
          name="فلات وايت دبل"
          category="قهوة مختصة"
          price={75}
          delay={65}
        />
        <ProductCard
          name="كرواسون فستق"
          category="مخبوزات"
          price={85}
          delay={105}
        />
        <ProductCard
          name="V60 إثيوبي"
          category="قهوة مقطرة"
          price={85}
          delay={145}
        />
      </div>

      {/* Floating Invoice Summary (Clean Light Mode) */}
      <div
        style={{
          background: '#ffffff',
          border: `2px solid ${THEME.colors.primary}`,
          borderRadius: 28,
          padding: '24px 32px',
          boxShadow: THEME.colors.cardElevatedShadow,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          direction: 'rtl'
        }}
      >
        <div>
          <RTLText style={{ fontSize: 18, color: THEME.colors.textMuted, fontWeight: 700 }}>
            إجمالي الفاتورة الحالية:
          </RTLText>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
            <AnimatedCounter
              target={335}
              start={0}
              startFrame={140}
              durationFrames={100}
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: THEME.colors.primary,
                fontFamily: THEME.fonts.cairo
              }}
            />
            <span style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.textMuted, fontFamily: THEME.fonts.cairo }}>
              ج.م
            </span>
          </div>
        </div>

        <div
          style={{
            transform: `scale(${payPulse})`,
            background: isPaid ? THEME.colors.success : THEME.colors.primaryGradient,
            color: '#ffffff',
            padding: '16px 34px',
            borderRadius: 20,
            fontSize: 22,
            fontWeight: 900,
            fontFamily: THEME.fonts.cairo,
            boxShadow: isPaid
              ? '0 8px 25px rgba(5, 150, 105, 0.4)'
              : '0 8px 25px rgba(234, 88, 12, 0.35)',
            transition: 'background 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}
        >
          {isPaid ? (
            <>
              <CheckCircle2 size={24} color="#ffffff" />
              <span>تم الدفع بنجاح</span>
            </>
          ) : (
            <>
              <span>دفع فوري (F2)</span>
              <CreditCard size={22} color="#ffffff" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
