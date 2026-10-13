import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence, staticFile } from 'remotion'
import { ShieldCheck, CheckCircle2 } from 'lucide-react'
import { THEME } from '../utils/theme'
import { RTLText } from '../components/RTLText'
import { PricingCard } from '../components/PricingCard'

export const Scene6_Pricing: React.FC = () => {
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
        padding: '70px 48px',
        background: THEME.colors.background,
        opacity: exitOpacity,
        transform: `scale(${cameraDrift})`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Audio: Voiceover & Sound Effects */}
      <Sequence from={10}>
        <Audio src={staticFile('audio/vo/scene6.mp3')} volume={1} />
      </Sequence>
      <Sequence from={5} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={20} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={60} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={150} durationInFrames={40}>
        <Audio src={staticFile('audio/sfx/success-chime.wav')} volume={0.45} />
      </Sequence>

      {/* Header */}
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
          <ShieldCheck size={22} color={THEME.colors.primary} />
          <span>ترخيص دائم مدى الحياة</span>
        </div>

        <RTLText
          as="h2"
          style={{
            fontSize: 44,
            fontWeight: 900,
            color: THEME.colors.textMain,
            marginTop: 14,
            textAlign: 'center'
          }}
        >
          ادفع مرة واحدة — بدون اشتراكات شهرية
        </RTLText>
      </div>

      {/* Pricing Cards Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          margin: '10px 0'
        }}
      >
        <PricingCard
          title="الباقة الاحترافية الكاملة (Pro)"
          price="18,000"
          isPopular={true}
          features={[
            'خريطة طاولات وصالات غير محدودة',
            'إدارة المخزون وتكلفة الوصفات وحساب الهدر',
            'طباعة فواتير فورية وشبكة وطابعات مطبخ KDS',
            'تصفية ورديات وتقارير أرباح مالية متقدمة'
          ]}
          delay={20}
        />

        <PricingCard
          title="الباقة الأساسية (Basic)"
          price="6,000"
          features={[
            'نقطة بيع كاشير سريعة (Takeaway)',
            'يعمل أوفلاين 100% بدون إنترنت',
            'طباعة فواتير حرارية بشعار كافيهك'
          ]}
          delay={60}
        />
      </div>

      {/* Bottom Reassurance Banner */}
      <div
        style={{
          background: '#ffffff',
          border: `1.5px solid ${THEME.colors.cardBorder}`,
          borderRadius: 24,
          padding: '20px 24px',
          boxShadow: THEME.colors.cardShadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          direction: 'rtl'
        }}
      >
        <CheckCircle2 size={20} color={THEME.colors.success} />
        <RTLText style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.success }}>
          ضمان استرداد وتركيب وتدريب مجاني لطاقم عملك
        </RTLText>
      </div>
    </div>
  )
}
