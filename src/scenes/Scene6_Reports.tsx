import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { BarChart3, TrendingUp, DollarSign, Award, ArrowUpRight } from 'lucide-react'
import { THEME } from '../utils/theme'
import { KineticBadgeHeader } from '../components/motion/KineticBadgeHeader'

export const Scene6_Reports: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  const cameraDrift = interpolate(frame, [0, durationInFrames], [1, 1.02], { extrapolateRight: 'clamp' })
  const enterWindow = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 80, mass: 0.9 } })

  // Staggered springs for 3 stat cards
  const stat1Spring = spring({ frame: frame - 8, fps, config: { damping: 14, stiffness: 85, mass: 0.8 } })
  const stat2Spring = spring({ frame: frame - 22, fps, config: { damping: 14, stiffness: 85, mass: 0.8 } })
  const stat3Spring = spring({ frame: frame - 36, fps, config: { damping: 14, stiffness: 85, mass: 0.8 } })

  // Sales counter (0 -> 48,650)
  const salesCounter = Math.round(
    interpolate(frame, [10, 65], [0, 48650], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    })
  )

  // Chart line draw animation
  const chartDrawProgress = interpolate(frame, [20, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

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
        badgeIcon={<BarChart3 size={18} color="#16a34a" />}
        badgeText="التقارير والذكاء المالي | Financial Analytics"
        badgeColor="#16a34a"
        title="رؤية لحظية دقيقة لمبيعاتك، أرباحك، وأداء الكافيه"
        subtitle="رسوم بيانية تفاعلية وتقارير مفصلة تمكنك من اتخاذ القرارات ومتابعة النمو بثقة"
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
              مقهى | لوحة التحليلات والتقارير المالية (Analytics)
            </em>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 15, fontWeight: 700, color: '#16a34a' }}>
              <TrendingUp size={18} />
              <span>نمو أسبوعي +28%</span>
            </div>
          </div>

          {/* Analytics Dashboard Body */}
          <div style={{ padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
            {/* 3 Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {/* Stat 1: Total Sales */}
              <div
                style={{
                  border: `1px solid ${THEME.colors.line}`,
                  borderRadius: 18,
                  padding: '18px 22px',
                  background: '#fcfaf6',
                  opacity: stat1Spring,
                  transform: `translateY(${(1 - stat1Spring) * 16}px)`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, color: THEME.colors.mut, fontWeight: 700 }}>إجمالي مبيعات اليوم</span>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(234, 88, 12, 0.15)', color: THEME.colors.brand, display: 'grid', placeItems: 'center' }}>
                    <DollarSign size={20} />
                  </div>
                </div>
                <div style={{ fontSize: 34, fontWeight: 900, color: THEME.colors.ink, marginTop: 8 }}>
                  {salesCounter.toLocaleString('en-US')} ج.م
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#16a34a', fontSize: 14, fontWeight: 800, marginTop: 4 }}>
                  <ArrowUpRight size={16} />
                  <span>+28% مقارنة بالأمس • 284 طلب</span>
                </div>
              </div>

              {/* Stat 2: Net Profit */}
              <div
                style={{
                  border: '1.5px solid rgba(22, 163, 74, 0.4)',
                  borderRadius: 18,
                  padding: '18px 22px',
                  background: 'rgba(22, 163, 74, 0.04)',
                  opacity: stat2Spring,
                  transform: `translateY(${(1 - stat2Spring) * 16}px)`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, color: THEME.colors.mut, fontWeight: 700 }}>صافي الأرباح المحققة</span>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(22, 163, 74, 0.15)', color: '#16a34a', display: 'grid', placeItems: 'center' }}>
                    <TrendingUp size={20} />
                  </div>
                </div>
                <div style={{ fontSize: 34, fontWeight: 900, color: '#16a34a', marginTop: 8 }}>
                  36,250 ج.م
                </div>
                <span style={{ fontSize: 14, color: '#16a34a', fontWeight: 800, marginTop: 4, display: 'block' }}>
                  هامش ربح ممتاز: 74.5%
                </span>
              </div>

              {/* Stat 3: Top Item */}
              <div
                style={{
                  border: `1px solid ${THEME.colors.line}`,
                  borderRadius: 18,
                  padding: '18px 22px',
                  background: '#fcfaf6',
                  opacity: stat3Spring,
                  transform: `translateY(${(1 - stat3Spring) * 16}px)`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, color: THEME.colors.mut, fontWeight: 700 }}>الأكثر مبيعاً اليوم</span>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(245, 158, 11, 0.15)', color: THEME.colors.a1, display: 'grid', placeItems: 'center' }}>
                    <Award size={20} />
                  </div>
                </div>
                <div style={{ fontSize: 26, fontWeight: 900, color: THEME.colors.ink, marginTop: 8 }}>
                  سبانش لاتيه بارد
                </div>
                <span style={{ fontSize: 14, color: THEME.colors.brand, fontWeight: 800, marginTop: 4, display: 'block' }}>
                  142 كوب مباع • 12,780 ج.م
                </span>
              </div>
            </div>

            {/* SVG Interactive Area Chart */}
            <div
              style={{
                flex: 1,
                border: `1px solid ${THEME.colors.line}`,
                borderRadius: 18,
                padding: '20px 24px',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 18, fontWeight: 900 }}>منحنى المبيعات على مدار اليوم (Sales Curve)</span>
                <span style={{ fontSize: 14, color: THEME.colors.mut }}>ساعة الذروة: 7:00 م - 9:00 م</span>
              </div>

              {/* SVG Area Curve */}
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <svg width="100%" height="100%" viewBox="0 0 900 240" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16a34a" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#16a34a" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="0" y1="60" x2="900" y2="60" stroke="#f0ece6" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="120" x2="900" y2="120" stroke="#f0ece6" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="180" x2="900" y2="180" stroke="#f0ece6" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Gradient Area Fill */}
                  <path
                    d={`M 0 220 L 100 190 L 220 150 L 350 170 L 480 90 L 600 50 L 720 110 L 850 40 L 900 70 L 900 240 L 0 240 Z`}
                    fill="url(#curveGradient)"
                    opacity={chartDrawProgress}
                  />

                  {/* Smooth Stroke Line */}
                  <path
                    d={`M 0 220 L 100 190 L 220 150 L 350 170 L 480 90 L 600 50 L 720 110 L 850 40 L 900 70`}
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="1200"
                    strokeDashoffset={1200 * (1 - chartDrawProgress)}
                  />

                  {/* Peak Point Dot Beacon */}
                  {chartDrawProgress > 0.8 && (
                    <g transform="translate(850, 40)">
                      <circle r="12" fill="rgba(22, 163, 74, 0.3)" />
                      <circle r="6" fill="#16a34a" stroke="#ffffff" strokeWidth="2" />
                    </g>
                  )}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
