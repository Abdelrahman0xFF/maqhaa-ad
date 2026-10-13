import React from 'react'
import { useCurrentFrame, interpolate, Easing } from 'remotion'
import { CoffeeIcon, WhatsAppIcon } from '../components/Icons'
import { THEME } from '../utils/theme'

export const Scene8_CTA: React.FC = () => {
  const frame = useCurrentFrame()

  // Logo entrance
  const logoProgress = interpolate(frame, [0, 22], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const logoY = interpolate(logoProgress, [0, 1], [40, 0])
  const logoScale = interpolate(logoProgress, [0, 1], [0.85, 1.0])
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1])

  // Headline entrance
  const headProgress = interpolate(frame, [10, 30], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const headY = interpolate(headProgress, [0, 1], [40, 0])
  const headOpacity = interpolate(headProgress, [0, 1], [0, 1])

  // Subtitle entrance
  const subProgress = interpolate(frame, [20, 38], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const subY = interpolate(subProgress, [0, 1], [30, 0])
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1])

  // Button entrance
  const btnProgress = interpolate(frame, [30, 50], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const btnY = interpolate(btnProgress, [0, 1], [30, 0])
  const btnScale = interpolate(btnProgress, [0, 1], [0.88, 1.0])
  const btnOpacity = interpolate(btnProgress, [0, 1], [0, 1])

  // Continuous pulsating halo
  const pulse = (Math.sin(frame * 0.12) + 1) * 0.5 // 0 to 1
  const haloRing = interpolate(pulse, [0, 1], [4, 24])
  const haloAlpha = interpolate(pulse, [0, 1], [0.25, 0.05])

  // URL pill entrance
  const urlProgress = interpolate(frame, [45, 65], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const urlOpacity = interpolate(urlProgress, [0, 1], [0, 1])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: THEME.fonts.cairo
      }}
    >
      {/* Brand Gradient Logo */}
      <div
        style={{
          width: 170,
          height: 170,
          borderRadius: 46,
          background: `linear-gradient(145deg, ${THEME.colors.a1}, ${THEME.colors.a2})`,
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 30px 90px rgba(234, 88, 12, 0.45)',
          color: '#ffffff',
          transform: `translateY(${logoY}px) scale(${logoScale})`,
          opacity: logoOpacity
        }}
      >
        <CoffeeIcon size={96} />
      </div>

      {/* Main Headline */}
      <div
        style={{
          fontSize: 140,
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '-1px',
          marginTop: 26,
          transform: `translateY(${headY}px)`,
          opacity: headOpacity
        }}
      >
        ابدأ اليوم.
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 44,
          color: 'rgba(255, 255, 255, 0.75)',
          fontWeight: 600,
          margin: '12px 0 0 0',
          transform: `translateY(${subY}px)`,
          opacity: subOpacity
        }}
      >
        نظام كاشير وإدارة للكافيهات والمطاعم
      </p>

      {/* Pulsing WhatsApp Button */}
      <div
        style={{
          marginTop: 36,
          background: '#ffffff',
          color: THEME.colors.ink,
          fontSize: 44,
          fontWeight: 800,
          padding: '20px 56px',
          borderRadius: 60,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          boxShadow: `0 0 0 ${haloRing}px rgba(255, 255, 255, ${haloAlpha}), 0 25px 60px rgba(0, 0, 0, 0.4)`,
          transform: `translateY(${btnY}px) scale(${btnScale})`,
          opacity: btnOpacity
        }}
      >
        <span style={{ color: '#25D366' }}>
          <WhatsAppIcon size={46} />
        </span>
        <span>اطلب نسختك على واتساب</span>
      </div>

      {/* Official Landing Page URL */}
      <div
        style={{
          marginTop: 24,
          fontSize: 28,
          fontWeight: 700,
          color: THEME.colors.a1,
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          padding: '8px 24px',
          borderRadius: 40,
          opacity: urlOpacity
        }}
      >
        maqhaa.abdelrahmanashraf.dev
      </div>
    </div>
  )
}
