import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion'
import { Globe, ShieldCheck, WifiOff, Infinity as InfinityIcon, Printer } from 'lucide-react'
import { THEME } from '../utils/theme'
import { FloatingGlassCard } from '../components/motion/FloatingGlassCard'
import { SparkleStar } from '../components/motion/SparkleStar'
import { CoffeeIcon, WhatsAppIcon } from '../components/Icons'
import icon from "../../public/icon.png"

export const Scene7_CTA: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  const cameraDrift = interpolate(frame, [0, durationInFrames], [1, 1.025], { extrapolateRight: 'clamp' })

  // Smooth entrance transition matching Scene 1 intro
  const enterTransition = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1)
  })
  const enterOpacity = interpolate(enterTransition, [0, 1], [0, 1])
  const enterBlur = interpolate(enterTransition, [0, 1], [14, 0])
  const enterScale = interpolate(enterTransition, [0, 1], [0.88, 1.0])
  const enterY = interpolate(enterTransition, [0, 1], [24, 0])

  // Expanding shockwave halo matching Scene 1 brand reveal
  const shockwaveScale = interpolate(frame, [4, 46], [0.3, 3.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic)
  })
  const shockwaveOpacity = interpolate(frame, [4, 46], [0.85, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  const logoScale = spring({
    frame: frame - 2,
    fps,
    config: { damping: 14, stiffness: 75, mass: 0.8 }
  })

  const ctaScale = spring({
    frame: frame - 22,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 }
  })

  // Pulsing glow on the CTA button (Matching maqhaa-ad-v3.html @keyframes pu)
  const pulse = (Math.sin(frame * 0.12) + 1) * 0.5
  const haloRing = interpolate(pulse, [0, 1], [4, 22])
  const haloAlpha = interpolate(pulse, [0, 1], [0.28, 0.05])

  // Staggered trust chips
  const t1 = spring({ frame: frame - 35, fps, config: { damping: 16, stiffness: 85, mass: 0.8 } })
  const t2 = spring({ frame: frame - 48, fps, config: { damping: 16, stiffness: 85, mass: 0.8 } })
  const t3 = spring({ frame: frame - 60, fps, config: { damping: 16, stiffness: 85, mass: 0.8 } })
  const t4 = spring({ frame: frame - 72, fps, config: { damping: 16, stiffness: 85, mass: 0.8 } })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 48px',
        position: 'relative',
        textAlign: 'center',
        transform: `scale(${cameraDrift})`,
        overflow: 'hidden',
        fontFamily: THEME.fonts.cairo
      }}
    >
      {/* Expanding Shockwave Ring matching Scene 1 Intro */}
      <div
        style={{
          position: 'absolute',
          top: '28%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 280,
          height: 280,
          borderRadius: 140,
          border: '3px solid #ea580c',
          scale: shockwaveScale,
          opacity: shockwaveOpacity,
          pointerEvents: 'none'
        }}
      />

      {/* Main Content with Intro Fade, Blur & Scale Transition */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: enterOpacity,
          transform: `scale(${enterScale}) translateY(${enterY}px)`,
          filter: `blur(${enterBlur}px)`,
          width: '100%'
        }}
      >
      {/* Brand Shield Lockup */}
      <div
            style={{
            width: 170,
            height: 170,
            borderRadius: 46,
            display: 'grid',
            placeItems: 'center',
            boxShadow: '0 30px 90px rgba(234, 88, 12, 0.6), 0 0 60px rgba(245, 158, 11, 0.4)',
            color: '#ffffff',
            marginBottom: 20,
            position: 'relative'
            }}
        >
            <img src={icon} alt="Icon description" style={{
            height: "100%",
            width: "100%",
            objectFit: "contain"
            }} />
            <div style={{ position: 'absolute', top: -14, right: -14 }}>
            <SparkleStar size={36} color="#ffffff" rotation={frame * 2} />
            </div>
        </div>

      {/* Main Headline */}
      <h1
        style={{
          fontSize: 70,
          fontWeight: 900,
          lineHeight: 1.2,
          margin: 0,
          background: 'linear-gradient(90deg, #ffffff 0%, #fcd9a0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          letterSpacing: '-1px'
        }}
      >
        ابدأ اليوم مع مقهى
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 26,
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.75)',
          maxWidth: 820,
          marginTop: 10,
          marginBottom: 24,
          fontFamily: THEME.fonts.tajawal
        }}
      >
        نظام كاشير وإدارة متكامل يمنح كافيهك الهدوء والسرعة والدقة من أول يوم
      </p>

      {/* Pulsing WhatsApp CTA Button */}
      <div
        style={{
          transform: `scale(${ctaScale})`,
          marginBottom: 24,
          zIndex: 20
        }}
      >
        <div
          style={{
            background: '#ffffff',
            color: THEME.colors.ink,
            fontSize: 34,
            fontWeight: 800,
            padding: '18px 52px',
            borderRadius: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            boxShadow: `0 0 0 ${haloRing}px rgba(255, 255, 255, ${haloAlpha}), 0 25px 60px rgba(0, 0, 0, 0.5)`
          }}
        >
          <span style={{ color: '#25D366' }}>
            <WhatsAppIcon size={38} />
          </span>
          <span>اطلب نسختك على واتساب</span>
        </div>
      </div>

      {/* 4 Trust Feature Satellites */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
          maxWidth: 960,
          width: '100%',
          marginBottom: 20
        }}
      >
        <div style={{ opacity: t1, transform: `translateY(${(1 - t1) * 20}px)` }}>
          <FloatingGlassCard borderColor="rgba(255, 255, 255, 0.2)" padding="12px 14px">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
              <WifiOff size={18} color="#86efac" />
              <span style={{ fontSize: 16, fontWeight: 800, color: '#ffffff' }}>100% أوفلاين</span>
            </div>
          </FloatingGlassCard>
        </div>

        <div style={{ opacity: t2, transform: `translateY(${(1 - t2) * 20}px)` }}>
          <FloatingGlassCard borderColor="rgba(255, 255, 255, 0.2)" padding="12px 14px">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
              <InfinityIcon size={18} color="#fcd34d" />
              <span style={{ fontSize: 16, fontWeight: 800, color: '#ffffff' }}>ترخيص مدى الحياة</span>
            </div>
          </FloatingGlassCard>
        </div>

        <div style={{ opacity: t3, transform: `translateY(${(1 - t3) * 20}px)` }}>
          <FloatingGlassCard borderColor="rgba(255, 255, 255, 0.2)" padding="12px 14px">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
              <Printer size={18} color="#38bdf8" />
              <span style={{ fontSize: 16, fontWeight: 800, color: '#ffffff' }}>طابعات حرارية متعددة</span>
            </div>
          </FloatingGlassCard>
        </div>

        <div style={{ opacity: t4, transform: `translateY(${(1 - t4) * 20}px)` }}>
          <FloatingGlassCard borderColor="rgba(255, 255, 255, 0.2)" padding="12px 14px">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
              <ShieldCheck size={18} color="#c4b5fd" />
              <span style={{ fontSize: 16, fontWeight: 800, color: '#ffffff' }}>دعم فني وتحديثات</span>
            </div>
          </FloatingGlassCard>
        </div>
      </div>

      {/* Official Landing Page Link */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          padding: '8px 26px',
          borderRadius: 30,
          color: THEME.colors.a1,
          fontSize: 22,
          fontWeight: 800
        }}
      >
        <Globe size={18} />
        <span>maqhaa.abdelrahmanashraf.dev</span>
      </div>
      </div>
    </div>
  )
}
