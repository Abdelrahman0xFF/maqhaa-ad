import React from 'react'
import { spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { Star, Check, CheckCircle2 } from 'lucide-react'
import { THEME } from '../utils/theme'
import { RTLText } from './RTLText'

interface PricingCardProps {
  title: string
  price: string
  period?: string
  features: string[]
  isPopular?: boolean
  delay?: number
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period = 'مدى الحياة',
  features,
  isPopular = false,
  delay = 0
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Fluid spring
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.9 }
  })

  const opacity = Math.min(1, Math.max(0, (frame - delay) / 12))
  const translateY = (1 - progress) * 35

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${progress * (isPopular ? 1.03 : 1)})`,
        background: isPopular ? '#fffdfb' : THEME.colors.card,
        border: `2px solid ${isPopular ? THEME.colors.primary : THEME.colors.cardBorder}`,
        borderRadius: 28,
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isPopular
          ? '0 20px 45px -5px rgba(234, 88, 12, 0.18), 0 8px 16px -4px rgba(234, 88, 12, 0.1)'
          : THEME.colors.cardShadow,
        position: 'relative',
        overflow: 'hidden'
      }}
      dir="rtl"
    >
      {isPopular && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            background: THEME.colors.primaryGradient,
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 900,
            padding: '6px 16px',
            borderRadius: 16,
            fontFamily: THEME.fonts.cairo,
            boxShadow: '0 4px 15px rgba(234, 88, 12, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <Star size={15} fill="#ffffff" color="#ffffff" />
          <span>الأكثر طلباً</span>
        </div>
      )}

      <RTLText style={{ fontSize: 24, fontWeight: 900, color: THEME.colors.textMain, marginBottom: 12 }}>
        {title}
      </RTLText>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 46, fontWeight: 900, color: isPopular ? THEME.colors.primary : THEME.colors.textMain, fontFamily: THEME.fonts.cairo }}>
          {price}
        </span>
        <span style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.textMuted, fontFamily: THEME.fonts.cairo }}>
          ج.م
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, fontWeight: 700, color: THEME.colors.success, marginBottom: 24, fontFamily: THEME.fonts.cairo }}>
        <CheckCircle2 size={18} color={THEME.colors.success} />
        <span>دفع مرة واحدة — {period}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto' }}>
        {features.map((feat, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                background: THEME.colors.primarySoftBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Check size={14} color={THEME.colors.primary} strokeWidth={3} />
            </div>
            <span style={{ color: THEME.colors.textMain, fontSize: 16, fontWeight: 600, fontFamily: THEME.fonts.cairo }}>
              {feat}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
