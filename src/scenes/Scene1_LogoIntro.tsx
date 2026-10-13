import React from 'react'
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion'
import { WifiOff, Zap, Infinity } from 'lucide-react'
import { THEME } from '../utils/theme'
import { FloatingGlassCard } from '../components/motion/FloatingGlassCard'
import { SparkleStar } from '../components/motion/SparkleStar'
import icon from "../../public/icon.png"

interface KineticWord {
  text: string
  start: number
  end: number
  fontSize?: number
  glowColor?: string
}

const WORDS: KineticWord[] = [
  { text: 'كل يوم', start: 0, end: 51, fontSize: 220, glowColor: 'rgba(245, 158, 11, 0.4)' },
  { text: 'طلبات كتير', start: 51, end: 96, fontSize: 195, glowColor: 'rgba(239, 68, 68, 0.45)' },
  { text: 'زحمة', start: 96, end: 120, fontSize: 230, glowColor: 'rgba(245, 158, 11, 0.4)' },
  { text: 'حسابات', start: 120, end: 140, fontSize: 230, glowColor: 'rgba(168, 85, 247, 0.4)' },
  { text: 'مخزون', start: 140, end: 165, fontSize: 230, glowColor: 'rgba(234, 88, 12, 0.5)' },
  { text: 'ورديات', start: 165, end: 220, fontSize: 230, glowColor: 'rgba(239, 68, 68, 0.45)' },
  { text: 'تخيل معايا', start: 220, end: 250, fontSize: 220, glowColor: 'rgba(168, 85, 247, 0.4)' },
  { text: 'كل ده؟', start: 250, end: 280, fontSize: 220, glowColor: 'rgba(245, 158, 11, 0.45)' },
  { text: 'تقدر تديره', start: 280, end: 310, fontSize: 200, glowColor: 'rgba(234, 88, 12, 0.5)' },
  { text: 'مكان واحد!', start: 310, end: 370, fontSize: 200, glowColor: 'rgba(234, 88, 12, 0.5)' }
]

export const Scene1_LogoIntro: React.FC = () => {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()

  // Slow continuous subtle camera drift across the scene
  const cameraDrift = interpolate(frame, [0, durationInFrames], [1, 1.025], { extrapolateRight: 'clamp' })

  // Brand Reveal timing (cross-fading smoothly from frame 366)
  const isBrandRevealActive = frame >= 366
  const isWordsActive = frame < 376

  // Brand entrance with ultra-smooth cubic bezier easing
  const brandEntrance = interpolate(frame, [366, 386], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1)
  })
  const brandScale = interpolate(brandEntrance, [0, 1], [0.86, 1.0])
  const brandOpacity = interpolate(brandEntrance, [0, 1], [0, 1])
  const brandBlur = interpolate(brandEntrance, [0, 1], [14, 0])
  const brandY = interpolate(brandEntrance, [0, 1], [30, 0])

  // Staggered satellite arrivals with smooth easing
  const sat1Progress = interpolate(frame, [380, 400], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1)
  })
  const sat2Progress = interpolate(frame, [390, 410], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1)
  })
  const sat3Progress = interpolate(frame, [400, 420], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1)
  })

  // Expanding shockwave halo at brand reveal (frame 370)
  const shockwaveScale = interpolate(frame, [370, 425], [0.2, 3.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic)
  })
  const shockwaveOpacity = interpolate(frame, [370, 425], [0.85, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  // Exit transition
  const exitOpacity = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp'
  })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exitOpacity,
        position: 'relative',
        transform: `scale(${cameraDrift})`,
        padding: '0 48px',
        overflow: 'hidden',
        fontFamily: THEME.fonts.cairo
      }}
    >
      {/* ============================================================ */}
      {/* PART 1: KINETIC TYPOGRAPHY SYNCED WITH VO (0.0s - 12.0s)    */}
      {/* ============================================================ */}
      {isWordsActive && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}
        >
          {WORDS.map((w, idx) => {
            // Give each word a 6-frame cross-dissolve overlap
            const isActive = frame >= w.start && frame < w.end + 6
            if (!isActive) return null

            // 1. Entrance easing (10 frames)
            const enterProgress = interpolate(frame, [w.start, w.start + 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1)
            })
            const enterScale = interpolate(enterProgress, [0, 1], [0.90, 1.0])
            const enterY = interpolate(enterProgress, [0, 1], [25, 0])
            const enterBlur = interpolate(enterProgress, [0, 1], [14, 0])
            const enterOpacity = interpolate(enterProgress, [0, 1], [0, 1])

            // 2. Continuous organic subtle drift during active life
            const driftScale = interpolate(frame, [w.start, w.end], [1.0, 1.03], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp'
            })
            const driftY = interpolate(frame, [w.start, w.end], [0, -6], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp'
            })

            // 3. Smooth exit cross-dissolve & lift (8 frames)
            const exitProgress = interpolate(frame, [w.end - 4, w.end + 6], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.4, 0, 0.2, 1)
            })
            const exitScale = interpolate(exitProgress, [0, 1], [1.0, 1.06])
            const exitY = interpolate(exitProgress, [0, 1], [0, -22])
            const exitBlur = interpolate(exitProgress, [0, 1], [0, 14])
            const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0])

            const finalScale = enterScale * driftScale * exitScale
            const finalY = enterY + driftY + exitY
            const finalBlur = Math.max(enterBlur, exitBlur)
            const finalOpacity = enterOpacity * exitOpacity

            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  textAlign: 'center',
                  transform: `translate3d(0, ${finalY}px, 0) scale(${finalScale})`,
                  filter: finalBlur > 0.5 ? `blur(${finalBlur.toFixed(1)}px)` : undefined,
                  opacity: finalOpacity,
                  fontSize: w.fontSize || 220,
                  fontWeight: 900,
                  lineHeight: 1.15,
                  letterSpacing: '-2px',
                  background: 'linear-gradient(90deg, #ffffff 10%, #fcd9a0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: `0 20px 90px ${w.glowColor || 'rgba(245, 158, 11, 0.4)'}`,
                  direction: 'rtl',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                  willChange: 'transform, opacity, filter'
                }}
              >
                {w.text}
              </div>
            )
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* PART 2: THE MAQHAA BRAND HERO REVEAL (12.0s - 15.5s)        */}
      {/* ============================================================ */}
      {isBrandRevealActive && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            maxWidth: 1040,
            zIndex: 10,
            position: 'relative',
            opacity: brandOpacity,
            transform: `translate3d(0, ${brandY}px, 0) scale(${brandScale})`,
            filter: brandBlur > 0.5 ? `blur(${brandBlur.toFixed(1)}px)` : undefined,
            willChange: 'transform, opacity, filter'
          }}
        >
          {/* Expanding shockwave halo */}
          <div
            style={{
              position: 'absolute',
              top: '25%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 320,
              height: 320,
              borderRadius: 160,
              border: '3px solid #ea580c',
              scale: shockwaveScale,
              opacity: shockwaveOpacity,
              pointerEvents: 'none'
            }}
          />

          {/* Main Brand Logo Lockup */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 24
            }}
          >
            {/* Gradient Brand Icon */}
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

            {/* Giant Brand Name */}
            <div
              style={{
                fontSize: 130,
                fontWeight: 900,
                lineHeight: 1.1,
                background: 'linear-gradient(90deg, #ffffff 15%, #fcd9a0 85%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 20px 80px rgba(245, 158, 11, 0.5)',
                direction: 'rtl'
              }}
            >
              مقهى
            </div>

            {/* Subtitle Badge */}
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: 'rgba(255, 255, 255, 0.85)',
                marginTop: 6,
                direction: 'rtl'
              }}
            >
              نظام كاشير وإدارة متكامل للكافيهات
            </div>
          </div>

          {/* 3 Satellite Glass Pills */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
              width: '100%',
              maxWidth: 960,
              marginTop: 10
            }}
          >
            <div
              style={{
                opacity: sat1Progress,
                transform: `translate3d(0, ${(1 - sat1Progress) * 20}px, 0)`
              }}
            >
              <FloatingGlassCard
                borderColor="rgba(22, 163, 74, 0.45)"
                glowColor="rgba(22, 163, 74, 0.3)"
                padding="16px 20px"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, direction: 'rtl' }}>
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      background: 'rgba(22, 163, 74, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#86efac'
                    }}
                  >
                    <WifiOff size={24} />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#ffffff' }}>100% أوفلاين</div>
                    <div style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.65)' }}>شغال بدون إنترنت تماماً</div>
                  </div>
                </div>
              </FloatingGlassCard>
            </div>

            <div
              style={{
                opacity: sat2Progress,
                transform: `translate3d(0, ${(1 - sat2Progress) * 20}px, 0)`
              }}
            >
              <FloatingGlassCard
                borderColor="rgba(245, 158, 11, 0.45)"
                glowColor="rgba(245, 158, 11, 0.3)"
                padding="16px 20px"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, direction: 'rtl' }}>
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      background: 'rgba(245, 158, 11, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fcd34d'
                    }}
                  >
                    <Zap size={24} />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#ffffff' }}>سرعة استجابة فائقة</div>
                    <div style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.65)' }}>تسجيل طلبات بأجزاء الثانية</div>
                  </div>
                </div>
              </FloatingGlassCard>
            </div>

            <div
              style={{
                opacity: sat3Progress,
                transform: `translate3d(0, ${(1 - sat3Progress) * 20}px, 0)`
              }}
            >
              <FloatingGlassCard
                borderColor="rgba(124, 58, 237, 0.45)"
                glowColor="rgba(124, 58, 237, 0.3)"
                padding="16px 20px"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, direction: 'rtl' }}>
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      background: 'rgba(124, 58, 237, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#c4b5fd'
                    }}
                  >
                    <Infinity size={24} />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#ffffff' }}>ترخيص مدى الحياة</div>
                    <div style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.65)' }}>امتلكه مرة واحدة للأبد</div>
                  </div>
                </div>
              </FloatingGlassCard>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
