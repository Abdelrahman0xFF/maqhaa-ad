import React from 'react'
import { useCurrentFrame, interpolate, Easing } from 'remotion'
import {
  WifiOffIcon,
  InfinityIcon,
  LockIcon,
  BoxIcon,
  PrinterIcon,
  ChartIcon
} from '../components/Icons'
import { THEME } from '../utils/theme'

const FEATURES = [
  {
    title: 'بدون إنترنت',
    subtitle: 'يشتغل بالكامل على جهازك',
    icon: <WifiOffIcon size={46} />
  },
  {
    title: 'بدون اشتراك شهري',
    subtitle: 'امتلكه مرة واحدة',
    icon: <InfinityIcon size={46} />
  },
  {
    title: 'حماية بـ PIN',
    subtitle: 'صلاحيات وسجل حركات',
    icon: <LockIcon size={46} />
  },
  {
    title: 'مخزون تلقائي',
    subtitle: 'خصم وتنبيهات نفاد',
    icon: <BoxIcon size={46} />
  },
  {
    title: 'طابعات متعددة',
    subtitle: 'مطبخ · باريستا · كاشير',
    icon: <PrinterIcon size={46} />
  },
  {
    title: 'ورديات وتقارير',
    subtitle: 'تابع مبيعاتك لحظة بلحظة',
    icon: <ChartIcon size={46} />
  }
]

export const Scene6_BentoFeatures: React.FC = () => {
  const frame = useCurrentFrame()

  // Title entrance
  const titleProgress = interpolate(frame, [0, 20], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const titleY = interpolate(titleProgress, [0, 1], [40, 0])
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1])

  // Exit transition
  const exitProgress = interpolate(frame, [225, 245], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 120px 150px',
        opacity: exitOpacity,
        fontFamily: THEME.fonts.cairo
      }}
    >
      {/* Section Title */}
      <div
        style={{
          fontSize: 92,
          fontWeight: 900,
          textAlign: 'center',
          marginBottom: 50,
          color: '#ffffff',
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity
        }}
      >
        كل اللي محتاجه… على جهازك
      </div>

      {/* Bento Grid (3 columns x 2 rows, 520px cards) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 520px)',
          gap: 26
        }}
      >
        {FEATURES.map((feat, i) => {
          const cardEnter = interpolate(frame, [6 + i * 4, 26 + i * 4], [0, 1], {
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          })
          const cardY = interpolate(cardEnter, [0, 1], [40, 0])
          const cardScale = interpolate(cardEnter, [0, 1], [0.94, 1.0])
          const cardOpacity = interpolate(cardEnter, [0, 1], [0, 1])

          return (
            <div
              key={feat.title}
              style={{
                padding: 38,
                background: THEME.colors.whiteA14,
                border: `1px solid ${THEME.colors.whiteA38}`,
                borderRadius: 30,
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                transform: `translateY(${cardY}px) scale(${cardScale})`,
                opacity: cardOpacity,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
            >
              {/* Gradient Icon Container */}
              <div
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: 22,
                  background: `linear-gradient(145deg, ${THEME.colors.a1}, ${THEME.colors.a2})`,
                  display: 'grid',
                  placeItems: 'center',
                  color: '#ffffff',
                  marginBottom: 18,
                  boxShadow: '0 12px 30px rgba(234, 88, 12, 0.35)'
                }}
              >
                {feat.icon}
              </div>

              {/* Title & Subtitle */}
              <b style={{ display: 'block', fontSize: 42, fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
                {feat.title}
              </b>
              <span style={{ fontSize: 27, color: 'rgba(255, 255, 255, 0.72)' }}>
                {feat.subtitle}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
