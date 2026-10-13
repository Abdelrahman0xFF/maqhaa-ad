import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { Store, ShoppingBag, Truck, LayoutGrid, CheckCircle2, Users, ArrowRight, Sparkles, Zap } from 'lucide-react'
import { THEME } from '../utils/theme'
import { KineticBadgeHeader } from '../components/motion/KineticBadgeHeader'
import { AnimatedPointer } from '../components/motion/AnimatedPointer'

const TABLES = [
  { id: 1, name: 'طاولة 1', initialStatus: 'busy', guests: 3, total: '240 ج.م' },
  { id: 2, name: 'طاولة 2', initialStatus: 'free', guests: 0, total: '—' },
  { id: 3, name: 'طاولة 3', initialStatus: 'busy', guests: 2, total: '165 ج.م' },
  { id: 4, name: 'طاولة 4', initialStatus: 'free', guests: 4, total: '320 ج.م', isTarget: true },
  { id: 5, name: 'طاولة 5', initialStatus: 'free', guests: 0, total: '—' },
  { id: 6, name: 'طاولة 6', initialStatus: 'busy', guests: 5, total: '410 ج.م' }
]

export const Scene3_TableGrid: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Camera drift
  const cameraDrift = interpolate(frame, [0, durationInFrames], [1, 1.02], { extrapolateRight: 'clamp' })

  // Entrance spring
  const enterWindow = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 80, mass: 0.9 } })

  // Cursor & click interaction on Table 4 (at frame 40 to 56)
  const clickTableFrame = 44
  const isTable4Hit = frame >= clickTableFrame && frame <= clickTableFrame + 14

  // Modal open state: triggered right after table click (opens at frame 58)
  const isModalOpen = frame >= 58
  const modalSpring = spring({ frame: frame - 58, fps, config: { damping: 14, stiffness: 85, mass: 0.8 } })

  // Background blur when modal opens
  const bgBlur = interpolate(modalSpring, [0, 1], [0, 12])

  // Order types feature badge entrance springs inside modal (staggered reveal)
  const card1Spring = spring({ frame: frame - 66, fps, config: { damping: 14, stiffness: 95, mass: 0.8 } })
  const card2Spring = spring({ frame: frame - 76, fps, config: { damping: 14, stiffness: 95, mass: 0.8 } })
  const card3Spring = spring({ frame: frame - 86, fps, config: { damping: 14, stiffness: 95, mass: 0.8 } })

  // Pulse animation for feature availability indicators
  const pulseLoop = Math.sin((frame / 8) * Math.PI) * 0.5 + 0.5

  // Window size: width: 1380, height: 720
  // Target 1: Table 4 (Row 2, Column 1 rightmost in RTL): X = 1110, Y = 460
  // Target 2: Dine-in Card inside Modal: X = 1000, Y = 360
  let curX = 1250
  let curY = 580
  let curOpacity = 0
  let isClicking = false
  let ripScale = 0.3
  let ripOpacity = 0

  if (frame < 12) {
    curOpacity = 0
  } else if (frame < 26) {
    curOpacity = interpolate(frame, [12, 26], [0, 1])
    curX = 1250
    curY = 580
  } else if (frame < clickTableFrame) {
    // Glide to Table 4
    curOpacity = 1
    const p = interpolate(frame, [26, clickTableFrame], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    })
    curX = interpolate(p, [0, 1], [1250, 1110])
    curY = interpolate(p, [0, 1], [580, 460])
  } else if (frame < 64) {
    // Click Table 4
    curX = 1110
    curY = 460
    curOpacity = 1
    if (frame >= clickTableFrame && frame <= clickTableFrame + 14) {
      isClicking = true
      const rp = interpolate(frame, [clickTableFrame, clickTableFrame + 14], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      })
      ripScale = interpolate(rp, [0, 1], [0.3, 1.4])
      ripOpacity = interpolate(rp, [0, 1], [1, 0])
    }
  } else if (frame < 80) {
    // Fade out cursor gracefully after table click as the feature badges reveal
    curX = 1110
    curY = 460
    curOpacity = interpolate(frame, [64, 80], [1, 0])
  } else {
    curOpacity = 0
  }

  // Header copy
  let headerBadge = 'إدارة الصالة والطاولات | Smart Floor Plan'
  let headerTitle = 'متابعة فورية للمتاح والمشغول بنظرة واحدة'
  let headerSubtitle = 'إدارة ذكية للصالة والطلبات المفتوحة والتيك أواي والتوصيل'
  let badgeColor = '#0284c7'

  if (isModalOpen) {
    headerBadge = 'مرونة تشغيلية كاملة | Operational Modes'
    headerTitle = '٣ انواع بيع تدعم كل سيناريوهات العمل'
    headerSubtitle = 'صالة، تيك أواي، وتوصيل'
    badgeColor = THEME.colors.brand
  }

  // Exit transition
  const exitOpacity = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
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
        transform: `scale(${cameraDrift})`,
        padding: '20px 40px',
        overflow: 'hidden',
        fontFamily: THEME.fonts.cairo
      }}
    >
      {/* 1. Kinetic Header */}
      <KineticBadgeHeader
        badgeIcon={<LayoutGrid size={18} color={badgeColor} />}
        badgeText={headerBadge}
        badgeColor={badgeColor}
        title={headerTitle}
        subtitle={headerSubtitle}
      />

      {/* 2. Desktop Window Rig */}
      <div
        style={{
          width: 1380,
          height: 720,
          position: 'relative',
          borderRadius: 24,
          background: '#0b0b0d',
          padding: 12,
          boxShadow: '0 50px 120px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.15)',
          transform: `scale(0.9)`,
          opacity: enterWindow
        }}
      >
        {/* Window Content */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 16,
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            direction: 'rtl',
            color: THEME.colors.ink,
            position: 'relative'
          }}
        >
          {/* Titlebar */}
          <div
            style={{
              height: 52,
              background: '#fcfaf6',
              borderBottom: `1px solid ${THEME.colors.line}`,
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
              gap: 12,
              color: THEME.colors.mut
            }}
          >
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ width: 13, height: 13, borderRadius: '50%', background: '#ff5f56' }} />
              <span style={{ width: 13, height: 13, borderRadius: '50%', background: '#ffbd2e' }} />
              <span style={{ width: 13, height: 13, borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <em style={{ marginInlineStart: 'auto', fontStyle: 'normal', color: THEME.colors.ink, fontWeight: 800 }}>
              مقهى | خريطة الصالة وإدارة الطلبات
            </em>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontSize: 15, fontWeight: 700 }}>
              <span style={{ color: '#16a34a' }}>🟢 متاحة: 3</span>
              <span style={{ color: '#dc2626' }}>🔴 مشغولة: 3</span>
            </div>
          </div>

          {/* Floor Map Body (Blur applied smoothly when modal is active) */}
          <div
            style={{
              padding: '24px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              flex: 1,
              filter: isModalOpen ? `blur(${bgBlur}px)` : 'none',
              transform: isModalOpen ? 'scale(0.985)' : 'none',
              transition: 'filter 0.2s ease, transform 0.2s ease'
            }}
          >
            {/* Floor Tabs */}
            <div style={{ display: 'flex', gap: 12 }}>
              <div
                style={{
                  background: THEME.colors.ink,
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: 18,
                  padding: '8px 26px',
                  borderRadius: 30
                }}
              >
                الصالة الرئيسية (6 طاولات)
              </div>
              <div
                style={{
                  background: '#f4efe7',
                  color: THEME.colors.mut,
                  fontWeight: 600,
                  fontSize: 18,
                  padding: '8px 26px',
                  borderRadius: 30
                }}
              >
                التراس الخارجي (4 طاولات)
              </div>
            </div>

            {/* 3x2 Table Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, flex: 1 }}>
              {TABLES.map((t) => {
                const isBusy = t.initialStatus === 'busy'
                const isHit = t.isTarget && isTable4Hit

                return (
                  <div
                    key={t.id}
                    style={{
                      border: `2px solid ${isHit ? THEME.colors.brand : isBusy ? 'rgba(220, 38, 38, 0.25)' : 'rgba(22, 163, 74, 0.25)'}`,
                      borderRadius: 18,
                      padding: '20px 24px',
                      background: isHit ? THEME.colors.brand2 : isBusy ? 'rgba(220, 38, 38, 0.03)' : 'rgba(22, 163, 74, 0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transform: `scale(${isHit ? 1.04 : 1})`,
                      boxShadow: isHit ? '0 12px 30px rgba(234, 88, 12, 0.3)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 26, fontWeight: 900 }}>{t.name}</span>
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 800,
                          padding: '4px 14px',
                          borderRadius: 20,
                          background: isBusy ? 'rgba(220, 38, 38, 0.15)' : 'rgba(22, 163, 74, 0.15)',
                          color: isBusy ? '#dc2626' : '#16a34a'
                        }}
                      >
                        {isBusy ? 'مشغولة' : 'متاحة'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                      <span style={{ fontSize: 16, color: THEME.colors.mut }}>
                        {isBusy ? (t.isTarget ? '4 أفراد' : `${t.guests} أفراد`) : 'جاهزة للضيوف'}
                      </span>
                      <span style={{ fontSize: 20, fontWeight: 900, color: isBusy ? THEME.colors.brand : THEME.colors.mut }}>
                        {isBusy ? (t.isTarget ? '320.00 ج.م' : t.total) : '—'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ======================================================== */}
          {/* SPECIAL ORDER TYPES FEATURE SHOWCASE (Inside Window)      */}
          {/* ======================================================== */}
          {isModalOpen && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(11, 15, 25, 0.72)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 40,
                opacity: modalSpring
              }}
            >
              <div
                style={{
                  width: 1040,
                  background: 'rgba(255, 255, 255, 0.96)',
                  borderRadius: 28,
                  boxShadow: '0 40px 100px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.4)',
                  overflow: 'hidden',
                  transform: `scale(${interpolate(modalSpring, [0, 1], [0.94, 1])})`,
                  direction: 'rtl'
                }}
              >
                {/* Showcase Header Banner */}
                <div
                  style={{
                    padding: '22px 32px',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                        background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
                        display: 'grid',
                        placeItems: 'center',
                        color: '#ffffff',
                        boxShadow: '0 8px 20px rgba(234, 88, 12, 0.4)'
                      }}
                    >
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: '#ffffff', letterSpacing: '-0.3px' }}>
                        قنوات وأنماط البيع المتاحة في مقهى
                      </div>
                      <div style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.7)', marginTop: 2 }}>
                        نظام متكامل يدير كل سيناريوهات العمل من شاشة واحدة
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.12)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                        padding: '6px 14px',
                        borderRadius: 20,
                        fontSize: 13,
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                      }}
                    >
                      <Zap size={14} color="#facc15" />
                      <span>ميزة تشغيلية مدمجة</span>
                    </div>
                  </div>
                </div>

                {/* 3 Prominent Feature Showcase Badges / Cards */}
                <div style={{ padding: '30px 32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                  
                  {/* Feature 1: طلبات صالة (Dine-in) */}
                  <div
                    style={{
                      background: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)',
                      borderRadius: 22,
                      padding: '26px 22px',
                      border: '2px solid #bae6fd',
                      boxShadow: '0 12px 30px rgba(2, 132, 199, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 14,
                      transform: `translateY(${(1 - card1Spring) * 28}px)`,
                      opacity: card1Spring,
                      position: 'relative'
                    }}
                  >
                    {/* Top Status Pill */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 16,
                          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                          display: 'grid',
                          placeItems: 'center',
                          color: '#ffffff',
                          boxShadow: '0 8px 18px rgba(2, 132, 199, 0.25)'
                        }}
                      >
                        <Store size={28} />
                      </div>
                      <div
                        style={{
                          background: 'rgba(2, 132, 199, 0.12)',
                          color: '#0284c7',
                          border: '1px solid rgba(2, 132, 199, 0.25)',
                          fontSize: 12,
                          fontWeight: 900,
                          padding: '4px 10px',
                          borderRadius: 20,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0284c7' }} />
                        <span>متاح ومفعل</span>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: 23, fontWeight: 900, color: THEME.colors.ink }}>
                        طلبات صالة
                      </div>
                      <div style={{ fontSize: 13, color: '#0284c7', fontWeight: 800, marginTop: 2 }} dir="ltr">
                        Dine-in Orders
                      </div>
                      <div style={{ fontSize: 13.5, color: '#64748b', marginTop: 8, lineHeight: 1.5 }}>
                        إدارة جلسات العملاء، فتح شيكات متعددة للطاولة، وتوزيع الطلبات على أقسام المطبخ.
                      </div>
                    </div>

                    {/* Feature Highlights Pills */}
                    <div style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div
                        style={{
                          background: 'rgba(2, 132, 199, 0.08)',
                          color: '#0369a1',
                          padding: '6px 12px',
                          borderRadius: 10,
                          fontSize: 12.5,
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        <CheckCircle2 size={14} color="#0284c7" />
                        <span>حجز فوري وربط الكاشير</span>
                      </div>
                      <div
                        style={{
                          background: 'rgba(2, 132, 199, 0.08)',
                          color: '#0369a1',
                          padding: '6px 12px',
                          borderRadius: 10,
                          fontSize: 12.5,
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        <CheckCircle2 size={14} color="#0284c7" />
                        <span>تقسيم فواتير الطاولة</span>
                      </div>
                    </div>
                  </div>

                  {/* Feature 2: تيك أواي سريع (Takeaway) */}
                  <div
                    style={{
                      background: 'linear-gradient(180deg, #fffbeb 0%, #ffffff 100%)',
                      borderRadius: 22,
                      padding: '26px 22px',
                      border: '2px solid #fde68a',
                      boxShadow: '0 12px 30px rgba(217, 119, 6, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 14,
                      transform: `translateY(${(1 - card2Spring) * 28}px)`,
                      opacity: card2Spring,
                      position: 'relative'
                    }}
                  >
                    {/* Top Status Pill */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 16,
                          background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                          display: 'grid',
                          placeItems: 'center',
                          color: '#ffffff',
                          boxShadow: '0 8px 18px rgba(217, 119, 6, 0.25)'
                        }}
                      >
                        <ShoppingBag size={28} />
                      </div>
                      <div
                        style={{
                          background: 'rgba(217, 119, 6, 0.12)',
                          color: '#d97706',
                          border: '1px solid rgba(217, 119, 6, 0.25)',
                          fontSize: 12,
                          fontWeight: 900,
                          padding: '4px 10px',
                          borderRadius: 20,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d97706' }} />
                        <span>متاح ومفعل</span>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: 23, fontWeight: 900, color: THEME.colors.ink }}>
                        تيك أواي سريع
                      </div>
                      <div style={{ fontSize: 13, color: '#d97706', fontWeight: 800, marginTop: 2 }} dir="ltr">
                        Takeaway Orders
                      </div>
                      <div style={{ fontSize: 13.5, color: '#64748b', marginTop: 8, lineHeight: 1.5 }}>
                        استلام مباشر من الكاونتر، إصدار فوري لأرقام النداء، وسرعة قصوى في أوقات الذروة.
                      </div>
                    </div>

                    {/* Feature Highlights Pills */}
                    <div style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div
                        style={{
                          background: 'rgba(217, 119, 6, 0.08)',
                          color: '#b45309',
                          padding: '6px 12px',
                          borderRadius: 10,
                          fontSize: 12.5,
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        <CheckCircle2 size={14} color="#d97706" />
                        <span>طباعة رقم النداء فوراً</span>
                      </div>
                      <div
                        style={{
                          background: 'rgba(217, 119, 6, 0.08)',
                          color: '#b45309',
                          padding: '6px 12px',
                          borderRadius: 10,
                          fontSize: 12.5,
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        <CheckCircle2 size={14} color="#d97706" />
                        <span>تجاوز الطاولات بدون انتظار</span>
                      </div>
                    </div>
                  </div>

                  {/* Feature 3: توصيل دليفري (Delivery) */}
                  <div
                    style={{
                      background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)',
                      borderRadius: 22,
                      padding: '26px 22px',
                      border: '2px solid #bbf7d0',
                      boxShadow: '0 12px 30px rgba(22, 163, 74, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 14,
                      transform: `translateY(${(1 - card3Spring) * 28}px)`,
                      opacity: card3Spring,
                      position: 'relative'
                    }}
                  >
                    {/* Top Status Pill */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 16,
                          background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                          display: 'grid',
                          placeItems: 'center',
                          color: '#ffffff',
                          boxShadow: '0 8px 18px rgba(22, 163, 74, 0.25)'
                        }}
                      >
                        <Truck size={28} />
                      </div>
                      <div
                        style={{
                          background: 'rgba(22, 163, 74, 0.12)',
                          color: '#16a34a',
                          border: '1px solid rgba(22, 163, 74, 0.25)',
                          fontSize: 12,
                          fontWeight: 900,
                          padding: '4px 10px',
                          borderRadius: 20,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a' }} />
                        <span>متاح ومفعل</span>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: 23, fontWeight: 900, color: THEME.colors.ink }}>
                        توصيل دليفري
                      </div>
                      <div style={{ fontSize: 13, color: '#16a34a', fontWeight: 800, marginTop: 2 }} dir="ltr">
                        Home Delivery
                      </div>
                      <div style={{ fontSize: 13.5, color: '#64748b', marginTop: 8, lineHeight: 1.5 }}>
                        حفظ بيانات العميل والعنوان تلقائياً، احتساب رسوم التوصيل، وتوجيه الطيارين.
                      </div>
                    </div>

                    {/* Feature Highlights Pills */}
                    <div style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div
                        style={{
                          background: 'rgba(22, 163, 74, 0.08)',
                          color: '#15803d',
                          padding: '6px 12px',
                          borderRadius: 10,
                          fontSize: 12.5,
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        <CheckCircle2 size={14} color="#16a34a" />
                        <span>سجل عناوين العملاء</span>
                      </div>
                      <div
                        style={{
                          background: 'rgba(22, 163, 74, 0.08)',
                          color: '#15803d',
                          padding: '6px 12px',
                          borderRadius: 10,
                          fontSize: 12.5,
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        <CheckCircle2 size={14} color="#16a34a" />
                        <span>إدارة وتسليم الطيارين</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Animated Cursor inside Window */}
          <AnimatedPointer
            x={curX}
            y={curY}
            isClicking={isClicking}
            rippleScale={ripScale}
            rippleOpacity={ripOpacity}
            opacity={curOpacity}
          />
        </div>
      </div>
    </div>
  )
}

