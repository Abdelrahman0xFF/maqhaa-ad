import React from 'react'
import { useCurrentFrame, interpolate, Easing } from 'remotion'
import { CoffeeIcon, JuiceIcon, CakeIcon, CursorSvg } from '../components/Icons'
import { THEME } from '../utils/theme'

export const Scene3_LaptopPOS: React.FC = () => {
  const frame = useCurrentFrame()

  // 1. Entrance of Laptop Shell
  const enterProgress = interpolate(frame, [0, 24], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const lapEnterScale = interpolate(enterProgress, [0, 1], [0.94, 1.0])
  const lapEnterY = interpolate(enterProgress, [0, 1], [40, 0])
  const lapEnterOpacity = interpolate(enterProgress, [0, 1], [0, 1])
  const lapEnterBlur = interpolate(enterProgress, [0, 1], [10, 0])

  // 2. Cursor Coordinates & Motion (Inside .win coordinate system: width 1468, height 808)
  // Target 1: p1 Latte (974, 232)
  // Target 2: p5 Crepe Nutella (658, 430)
  // Target 3: pay Button (240, 748)

  let curX = 1120
  let curY = 320
  let curOpacity = 0

  if (frame < 30) {
    curOpacity = 0
  } else if (frame < 45) {
    // Fade in
    curOpacity = interpolate(frame, [30, 45], [0, 1])
    curX = 1120
    curY = 320
  } else if (frame < 70) {
    // Glide to Latte (p1)
    curOpacity = 1
    const p = interpolate(frame, [45, 70], [0, 1], { easing: Easing.bezier(0.5, 0, 0.2, 1) })
    curX = interpolate(p, [0, 1], [1120, 974])
    curY = interpolate(p, [0, 1], [320, 232])
  } else if (frame < 120) {
    // Rest on Latte (click at 70)
    curOpacity = 1
    curX = 974
    curY = 232
  } else if (frame < 155) {
    // Glide to Crepe Nutella (p5)
    curOpacity = 1
    const p = interpolate(frame, [120, 155], [0, 1], { easing: Easing.bezier(0.5, 0, 0.2, 1) })
    curX = interpolate(p, [0, 1], [974, 658])
    curY = interpolate(p, [0, 1], [232, 430])
  } else if (frame < 210) {
    // Rest on Crepe (click at 155)
    curOpacity = 1
    curX = 658
    curY = 430
  } else if (frame < 255) {
    // Glide to Pay button (pay)
    curOpacity = 1
    const p = interpolate(frame, [210, 255], [0, 1], { easing: Easing.bezier(0.5, 0, 0.2, 1) })
    curX = interpolate(p, [0, 1], [658, 240])
    curY = interpolate(p, [0, 1], [430, 748])
  } else if (frame < 275) {
    // Rest on Pay (click at 255) and fade out
    curOpacity = interpolate(frame, [260, 275], [1, 0])
    curX = 240
    curY = 748
  } else {
    curOpacity = 0
  }

  // Click Reactions
  const isP1Hit = frame >= 70 && frame < 85
  const isP5Hit = frame >= 155 && frame < 170
  const isPayHit = frame >= 255

  // Ripple Pulses
  const rip1Progress = interpolate(frame, [70, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const rip1Active = frame >= 70 && frame < 85

  const rip2Progress = interpolate(frame, [155, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const rip2Active = frame >= 155 && frame < 170

  const rip3Progress = interpolate(frame, [255, 270], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const rip3Active = frame >= 255 && frame < 270

  // Active ripple properties
  let ripScale = 0.3
  let ripOpacity = 0
  if (rip1Active) {
    ripScale = interpolate(rip1Progress, [0, 1], [0.3, 1.4])
    ripOpacity = interpolate(rip1Progress, [0, 1], [1, 0])
  } else if (rip2Active) {
    ripScale = interpolate(rip2Progress, [0, 1], [0.3, 1.4])
    ripOpacity = interpolate(rip2Progress, [0, 1], [1, 0])
  } else if (rip3Active) {
    ripScale = interpolate(rip3Progress, [0, 1], [0.3, 1.4])
    ripOpacity = interpolate(rip3Progress, [0, 1], [1, 0])
  }

  // Cart Rows
  const r0Enter = interpolate(frame, [70, 86], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const r1Enter = interpolate(frame, [155, 171], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  // Dynamic Money Counters
  let subtotal = 0
  let tax = 0
  let total = 0

  if (frame < 70) {
    subtotal = 0
    tax = 0
    total = 0
  } else if (frame < 155) {
    const p = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    subtotal = p * 140
    tax = p * 19.6
    total = p * 159.6
  } else {
    const p = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    subtotal = 140 + p * 60
    tax = 19.6 + p * 8.4
    total = 159.6 + p * 68.4
  }

  // Macro Camera Zoom into Checkout / Pay
  const zoomProgress = interpolate(frame, [260, 320], [0, 1], {
    easing: Easing.bezier(0.6, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const lapZoomScale = interpolate(zoomProgress, [0, 1], [1.0, 1.45])

  // Exit transition
  const exitProgress = interpolate(frame, [400, 420], [0, 1], {
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
        paddingTop: 40,
        opacity: lapEnterOpacity * exitOpacity,
        fontFamily: THEME.fonts.cairo
      }}
    >
      {/* Laptop Rig */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `translateY(${lapEnterY}px) scale(${lapEnterScale * lapZoomScale})`,
          transformOrigin: '85% 80%',
          filter: `blur(${lapEnterBlur}px)`
        }}
      >
        {/* Screen Chassis */}
        <div
          style={{
            width: 1500,
            height: 840,
            background: '#0b0b0d',
            borderRadius: '30px 30px 8px 8px',
            padding: 16,
            boxShadow: '0 60px 140px rgba(0, 0, 0, 0.65), 0 0 0 2px rgba(255, 255, 255, 0.13)',
            position: 'relative'
          }}
        >
          {/* OS Window */}
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#ffffff',
              borderRadius: 16,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              color: THEME.colors.ink,
              position: 'relative',
              direction: 'rtl'
            }}
          >
            {/* Window Title Bar */}
            <div
              style={{
                height: 54,
                borderBottom: `1px solid ${THEME.colors.line}`,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '0 22px',
                background: '#fcfaf6',
                fontSize: 22,
                color: THEME.colors.mut
              }}
            >
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#ff5f56' }} />
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#ffbd2e' }} />
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#27c93f' }} />
              </div>
              <em style={{ marginInlineStart: 'auto', fontStyle: 'normal', color: THEME.colors.ink, fontWeight: 700 }}>
                مقهى | Maqhaa
              </em>
              <span
                style={{
                  background: 'rgba(234, 88, 12, 0.12)',
                  color: THEME.colors.brand,
                  fontSize: 16,
                  fontWeight: 700,
                  padding: '3px 12px',
                  borderRadius: 20
                }}
              >
                تيك اواي
              </span>
            </div>

            {/* Application Main Stage */}
            <div
              style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '1fr 480px',
                minHeight: 0
              }}
            >
              {/* Product Grid Area (Right in RTL) */}
              <div style={{ padding: '24px 30px', display: 'flex', flexDirection: 'column' }}>
                {/* Tabs */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                  <div
                    style={{
                      padding: '7px 24px',
                      borderRadius: 40,
                      background: THEME.colors.ink,
                      color: '#ffffff',
                      fontSize: 24,
                      fontWeight: 700
                    }}
                  >
                    الكل
                  </div>
                  <div
                    style={{
                      padding: '7px 24px',
                      borderRadius: 40,
                      background: '#f4efe7',
                      color: THEME.colors.mut,
                      fontSize: 24,
                      fontWeight: 600
                    }}
                  >
                    مشروبات ساخنة
                  </div>
                  <div
                    style={{
                      padding: '7px 24px',
                      borderRadius: 40,
                      background: '#f4efe7',
                      color: THEME.colors.mut,
                      fontSize: 24,
                      fontWeight: 600
                    }}
                  >
                    عصائر
                  </div>
                  <div
                    style={{
                      padding: '7px 24px',
                      borderRadius: 40,
                      background: '#f4efe7',
                      color: THEME.colors.mut,
                      fontSize: 24,
                      fontWeight: 600
                    }}
                  >
                    حلويات
                  </div>
                </div>

                {/* 3x2 Products Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 18
                  }}
                >
                  {/* p0: Espresso */}
                  <div
                    style={{
                      border: `1px solid ${THEME.colors.line}`,
                      borderRadius: 18,
                      padding: 20,
                      background: '#ffffff'
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 16,
                        background: THEME.colors.brand2,
                        color: THEME.colors.brand,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 34,
                        marginBottom: 10
                      }}
                    >
                      <CoffeeIcon size={34} />
                    </div>
                    <b style={{ display: 'block', fontSize: 32 }}>إسبريسو</b>
                    <small style={{ fontSize: 24, color: THEME.colors.brand, fontWeight: 700 }}>30 ج.م</small>
                  </div>

                  {/* p1: Latte (Clicked!) */}
                  <div
                    style={{
                      border: `1px solid ${isP1Hit ? THEME.colors.brand : THEME.colors.line}`,
                      borderRadius: 18,
                      padding: 20,
                      background: isP1Hit ? THEME.colors.brand2 : '#ffffff',
                      transform: `scale(${isP1Hit ? 1.04 : 1})`,
                      boxShadow: isP1Hit ? '0 12px 28px rgba(234, 88, 12, 0.25)' : 'none',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 16,
                        background: THEME.colors.brand2,
                        color: THEME.colors.brand,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 34,
                        marginBottom: 10
                      }}
                    >
                      <CoffeeIcon size={34} />
                    </div>
                    <b style={{ display: 'block', fontSize: 32 }}>لاتيه</b>
                    <small style={{ fontSize: 24, color: THEME.colors.brand, fontWeight: 700 }}>45 ج.م</small>
                  </div>

                  {/* p2: Cappuccino */}
                  <div
                    style={{
                      border: `1px solid ${THEME.colors.line}`,
                      borderRadius: 18,
                      padding: 20,
                      background: '#ffffff'
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 16,
                        background: THEME.colors.brand2,
                        color: THEME.colors.brand,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 34,
                        marginBottom: 10
                      }}
                    >
                      <CoffeeIcon size={34} />
                    </div>
                    <b style={{ display: 'block', fontSize: 32 }}>كابتشينو</b>
                    <small style={{ fontSize: 24, color: THEME.colors.brand, fontWeight: 700 }}>40 ج.م</small>
                  </div>

                  {/* p3: Mocha */}
                  <div
                    style={{
                      border: `1px solid ${THEME.colors.line}`,
                      borderRadius: 18,
                      padding: 20,
                      background: '#ffffff'
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 16,
                        background: THEME.colors.brand2,
                        color: THEME.colors.brand,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 34,
                        marginBottom: 10
                      }}
                    >
                      <CoffeeIcon size={34} />
                    </div>
                    <b style={{ display: 'block', fontSize: 32 }}>موكا</b>
                    <small style={{ fontSize: 24, color: THEME.colors.brand, fontWeight: 700 }}>55 ج.م</small>
                  </div>

                  {/* p4: Orange Juice */}
                  <div
                    style={{
                      border: `1px solid ${THEME.colors.line}`,
                      borderRadius: 18,
                      padding: 20,
                      background: '#ffffff'
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 16,
                        background: THEME.colors.brand2,
                        color: THEME.colors.brand,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 34,
                        marginBottom: 10
                      }}
                    >
                      <JuiceIcon size={34} />
                    </div>
                    <b style={{ display: 'block', fontSize: 32 }}>عصير برتقال</b>
                    <small style={{ fontSize: 24, color: THEME.colors.brand, fontWeight: 700 }}>35 ج.م</small>
                  </div>

                  {/* p5: Nutella Crepe (Clicked!) */}
                  <div
                    style={{
                      border: `1px solid ${isP5Hit ? THEME.colors.brand : THEME.colors.line}`,
                      borderRadius: 18,
                      padding: 20,
                      background: isP5Hit ? THEME.colors.brand2 : '#ffffff',
                      transform: `scale(${isP5Hit ? 1.04 : 1})`,
                      boxShadow: isP5Hit ? '0 12px 28px rgba(234, 88, 12, 0.25)' : 'none',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 16,
                        background: THEME.colors.brand2,
                        color: THEME.colors.brand,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 34,
                        marginBottom: 10
                      }}
                    >
                      <CakeIcon size={34} />
                    </div>
                    <b style={{ display: 'block', fontSize: 32 }}>كريب نوتيلا</b>
                    <small style={{ fontSize: 24, color: THEME.colors.brand, fontWeight: 700 }}>60 ج.م</small>
                  </div>
                </div>
              </div>

              {/* Cart Sidebar (Left in RTL) */}
              <div
                style={{
                  borderInlineEnd: `1px solid ${THEME.colors.line}`,
                  background: '#fcfaf6',
                  padding: 26,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <h3 style={{ fontSize: 34, marginBottom: 12, fontWeight: 800 }}>الفاتورة</h3>

                {/* Row 0: Latte */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 28,
                    padding: '10px 0',
                    borderBottom: `1px dashed ${THEME.colors.line}`,
                    opacity: r0Enter,
                    transform: `translateY(${interpolate(r0Enter, [0, 1], [14, 0])}px)`
                  }}
                >
                  <div>
                    لاتيه ×2
                    <small style={{ display: 'block', fontSize: 21, color: THEME.colors.mut }}>
                      حليب شوفان + إكسترا شوت
                    </small>
                  </div>
                  <div style={{ fontWeight: 700 }}>140</div>
                </div>

                {/* Row 1: Nutella Crepe */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 28,
                    padding: '10px 0',
                    borderBottom: `1px dashed ${THEME.colors.line}`,
                    opacity: r1Enter,
                    transform: `translateY(${interpolate(r1Enter, [0, 1], [14, 0])}px)`
                  }}
                >
                  <div>كريب نوتيلا ×1</div>
                  <div style={{ fontWeight: 700 }}>60</div>
                </div>

                {/* Totals Section */}
                <div style={{ marginTop: 'auto', fontSize: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span>المجموع:</span>
                    <span style={{ fontWeight: 700 }}>{subtotal.toFixed(2)}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '4px 0',
                      color: THEME.colors.mut
                    }}
                  >
                    <span>الضريبة (14%):</span>
                    <span>+{tax.toFixed(2)}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '6px 0',
                      fontSize: 50,
                      fontWeight: 900,
                      color: THEME.colors.ok
                    }}
                  >
                    <span>الإجمالي:</span>
                    <span>{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Pay Button */}
                <div
                  style={{
                    marginTop: 10,
                    background: isPayHit ? THEME.colors.ok : THEME.colors.ink,
                    color: '#ffffff',
                    borderRadius: 16,
                    textAlign: 'center',
                    fontSize: 34,
                    fontWeight: 800,
                    padding: 14,
                    transform: `scale(${isPayHit ? 1.03 : 1})`,
                    boxShadow: isPayHit ? '0 10px 30px rgba(22, 163, 74, 0.4)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  ادفع الآن
                </div>
              </div>
            </div>

            {/* Exactly Positioned Mouse Pointer inside .win */}
            <div
              style={{
                position: 'absolute',
                left: curX,
                top: curY,
                zIndex: 60,
                opacity: curOpacity,
                transform: 'translate(-8px, -6px)',
                filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4))',
                pointerEvents: 'none'
              }}
            >
              <CursorSvg size={46} />

              {/* Click Ripple Circle */}
              {ripOpacity > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: `4px solid ${THEME.colors.a1}`,
                    transform: `translate(-50%, -50%) scale(${ripScale})`,
                    opacity: ripOpacity,
                    pointerEvents: 'none'
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* MacBook Base */}
        <div
          style={{
            width: 1700,
            height: 26,
            background: 'linear-gradient(#cfcfd4, #8d8d93)',
            borderRadius: '0 0 40px 40px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
          }}
        />
      </div>
    </div>
  )
}
