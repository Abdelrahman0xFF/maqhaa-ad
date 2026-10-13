import React from 'react'
import { interpolate, spring } from 'remotion'
import { Coffee, Printer, Zap, CheckCircle2 } from 'lucide-react'
import { THEME } from '../../utils/theme'

interface Printer3DModelProps {
  printProgress: number
  orderNumber?: string
  total?: number
  items?: Array<{ name: string; qty: number; price: number; mods?: string[] }>
}

export const Printer3DModel: React.FC<Printer3DModelProps> = ({
  printProgress,
  orderNumber = '#1042',
  total = 199.5,
  items
}) => {
  // Receipt paper height based on printProgress (0 to 1)
  const paperHeight = interpolate(printProgress, [0, 1], [0, 390], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  // Subtle isometric paper curvature effect
  const paperCurl = interpolate(printProgress, [0, 0.4, 1], [0, -3, -0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  return (
    <div
      style={{
        position: 'relative',
        width: 440,
        height: 640,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        perspective: 1200,
        fontFamily: "'Cairo', sans-serif"
      }}
    >
      {/* 1. Realistic Thermal Receipt Paper matching real Maqhaa POS ReceiptModal */}
      <div
        style={{
          position: 'absolute',
          bottom: 235, // sits right inside printer cutter mouth
          width: 300,
          height: paperHeight,
          background: '#ffffff',
          color: '#000000',
          borderRadius: '4px 4px 0 0',
          boxShadow: '0 -15px 40px rgba(0, 0, 0, 0.32), 0 0 1px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          direction: 'rtl',
          border: '1px solid #d1d5db',
          borderBottom: 'none',
          transform: `rotateX(${paperCurl}deg)`,
          transformOrigin: 'bottom center',
          zIndex: 10,
          fontWeight: 'bold',
          fontFamily: "'Cairo', sans-serif"
        }}
      >
        <div style={{ padding: '16px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header section (from real ReceiptModal) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 8, gap: 2 }}>
            <h1 style={{ fontSize: 24, fontWeight: 900, textAlign: 'center', margin: 0, color: '#000000' }}>
              مقهى | Maqhaa
            </h1>
            <p style={{ fontSize: 13, textAlign: 'center', color: '#000000', fontWeight: 'bold', margin: '2px 0' }}>
              أهلاً وسهلاً بكم • نورتونا
            </p>
            <div style={{ display: 'flex', gap: 8, fontSize: 11, color: '#000000', marginTop: 1 }}>
              <span dir="ltr">0100 000 0000</span>
              <span>•</span>
              <span>القاهرة، مصر</span>
            </div>
            <p style={{ fontSize: 11, textAlign: 'center', color: '#000000', margin: '2px 0' }}>
              الرقم الضريبي: <span dir="ltr">TR-9824-710</span>
            </p>
          </div>

          {/* 2px dashed divider */}
          <div style={{ width: '100%', borderBottom: '2px dashed #000000', margin: '6px 0' }} />

          {/* Order No & Timestamp row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, paddingBottom: 2 }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 12, color: '#000000', margin: 0 }}>رقم الطلب</p>
              <p style={{ fontSize: 24, fontWeight: 900, margin: 0, lineHeight: 1.1 }}>{orderNumber}</p>
            </div>
            <div style={{ fontSize: 11, color: '#000000', display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'left', direction: 'ltr' }}>
              <p style={{ margin: 0 }}>2026-10-12</p>
              <p style={{ margin: 0, fontWeight: 'bold' }}>04:30 PM</p>
            </div>
          </div>

          {/* 2px dashed divider */}
          <div style={{ width: '100%', borderBottom: '2px dashed #000000', margin: '4px 0' }} />

          {/* Real Table Header & Rows */}
          <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse', marginBottom: 6 }}>
            <thead>
              <tr>
                <th style={{ padding: '4px 0', fontWeight: 900, fontSize: 14, textAlign: 'right', borderBottom: '3px solid #000000' }}>
                  الصنف
                </th>
                <th style={{ textAlign: 'center', padding: '4px 0', fontWeight: 900, fontSize: 14, width: 36, borderBottom: '3px solid #000000' }}>
                  ك
                </th>
                <th style={{ padding: '4px 0', fontWeight: 900, fontSize: 14, width: 55, textAlign: 'left', borderBottom: '3px solid #000000' }}>
                  السعر
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Item 1 */}
              <tr>
                <td style={{ padding: '5px 0', fontWeight: 'bold', fontSize: 13, lineHeight: 1.2, borderBottom: '1px dashed #000000' }}>
                  سبانش لاتيه بارد
                  <div style={{ fontSize: 10, color: '#000000', marginTop: 1, fontWeight: 'normal' }}>
                    + حليب شوفان + سكر مظبوط
                  </div>
                </td>
                <td style={{ textAlign: 'center', padding: '5px 0', fontWeight: 900, fontSize: 13, borderBottom: '1px dashed #000000' }}>
                  1
                </td>
                <td style={{ padding: '5px 0', fontWeight: 'bold', fontSize: 13, textAlign: 'left', borderBottom: '1px dashed #000000' }}>
                  110.00
                </td>
              </tr>
              {/* Item 2 */}
              <tr>
                <td style={{ padding: '5px 0', fontWeight: 'bold', fontSize: 13, lineHeight: 1.2, borderBottom: '1px dashed #000000' }}>
                  كرواسون زبدة فرنسي
                </td>
                <td style={{ textAlign: 'center', padding: '5px 0', fontWeight: 900, fontSize: 13, borderBottom: '1px dashed #000000' }}>
                  1
                </td>
                <td style={{ padding: '5px 0', fontWeight: 'bold', fontSize: 13, textAlign: 'left', borderBottom: '1px dashed #000000' }}>
                  65.00
                </td>
              </tr>
            </tbody>
          </table>

          {/* Subtotal & Financials */}
          <div style={{ paddingTop: 2, display: 'flex', flexDirection: 'column', gap: 3, fontSize: 13, fontWeight: 'bold' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>المجموع:</span>
              <span>175.00 ج.م</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>الضريبة:</span>
              <span>+24.50 ج.م</span>
            </div>
            {/* Total Row with 3px solid top border */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 20,
                fontWeight: 900,
                marginTop: 4,
                paddingTop: 4,
                borderTop: '3px solid #000000'
              }}
            >
              <span>الإجمالي:</span>
              <span>{total.toFixed(2)} ج.م</span>
            </div>
          </div>

          {/* Footer section */}
          <div style={{ marginTop: 8, textAlign: 'center', paddingTop: 2, paddingBottom: 4 }}>
            <p style={{ fontSize: 13, textAlign: 'center', color: '#000000', fontWeight: 'bold', margin: '2px 0' }}>
              شكراً لطلبكم • نراكم قريباً
            </p>
            <p style={{ marginTop: 2, fontWeight: 'bold', fontSize: 11, color: '#000000' }}>
              maqhaa.abdelrahmanashraf.dev
            </p>
          </div>
        </div>

        {/* Top Serrated Edge of Paper */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: `radial-gradient(circle, transparent 3px, #ffffff 3px)`,
            backgroundSize: '10px 10px',
            backgroundPosition: '0 3px'
          }}
        />
      </div>

      {/* 2. Realistic 3D POS Thermal Receipt Printer Chassis (ESC/POS 80mm) */}
      <div
        style={{
          position: 'absolute',
          bottom: 15,
          width: 350,
          height: 250,
          zIndex: 20,
          transform: 'rotateX(12deg)',
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 35px 50px rgba(0, 0, 0, 0.65))'
        }}
      >
        {/* Printer Main Body */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(165deg, #1e293b 0%, #0f172a 50%, #020617 100%)',
            borderRadius: '24px 24px 18px 18px',
            border: '2px solid rgba(255, 255, 255, 0.14)',
            boxShadow: 'inset 0 2px 6px rgba(255, 255, 255, 0.2), inset 0 -10px 20px rgba(0,0,0,0.8)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            padding: '14px 18px'
          }}
        >
          {/* Top Bevel & Cutter Slot */}
          <div
            style={{
              height: 44,
              background: 'linear-gradient(180deg, #090d16 0%, #1e293b 100%)',
              borderRadius: 14,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 14px',
              position: 'relative'
            }}
          >
            {/* Paper Mouth Slot */}
            <div
              style={{
                width: 270,
                height: 9,
                background: '#020617',
                borderRadius: 5,
                border: '1px solid #334155',
                boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.9), 0 0 10px rgba(16, 185, 129, 0.2)'
              }}
            />

            {/* Serrated metallic cutter blade edge glow */}
            <div
              style={{
                position: 'absolute',
                bottom: 4,
                width: 270,
                height: 2,
                background: 'linear-gradient(90deg, transparent, #94a3b8, transparent)',
                opacity: 0.8
              }}
            />
          </div>

          {/* Status Bar & Controls */}
          <div
            style={{
              marginTop: 18,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 8px'
            }}
          >
            {/* Model & Brand Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'rgba(234, 88, 12, 0.18)',
                  border: '1px solid rgba(234, 88, 12, 0.4)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#ea580c'
                }}
              >
                <Printer size={20} />
              </div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: 900, fontSize: 16, letterSpacing: '0.5px' }}>
                  MAQHAA 80MM
                </div>
                <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700 }}>
                  AUTO-CUTTER • HIGH SPEED
                </div>
              </div>
            </div>

            {/* Hardware LEDs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* Power LED */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#10b981',
                    boxShadow: '0 0 12px #10b981'
                  }}
                />
                <span style={{ fontSize: 9, color: '#64748b', fontWeight: 800 }}>POWER</span>
              </div>

              {/* Feed LED */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#3b82f6',
                    boxShadow: '0 0 10px #3b82f6'
                  }}
                />
                <span style={{ fontSize: 9, color: '#64748b', fontWeight: 800 }}>READY</span>
              </div>

              {/* Paper Out LED */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#475569'
                  }}
                />
                <span style={{ fontSize: 9, color: '#64748b', fontWeight: 800 }}>ERROR</span>
              </div>
            </div>
          </div>

          {/* Lower Chassis Grille & Tactile Feed Button */}
          <div
            style={{
              marginTop: 'auto',
              background: 'rgba(0, 0, 0, 0.35)',
              borderRadius: 16,
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={16} color="#10b981" />
              <span style={{ color: '#10b981', fontSize: 13, fontWeight: 800 }}>
                سرعة الطباعة: 250 مم/ثانية (فوري)
              </span>
            </div>

            {/* Physical Feed Push Button */}
            <div
              style={{
                background: 'linear-gradient(180deg, #334155 0%, #1e293b 100%)',
                color: '#cbd5e1',
                padding: '6px 16px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 800,
                border: '1px solid #475569',
                boxShadow: '0 3px 6px rgba(0,0,0,0.4)',
                letterSpacing: '1px'
              }}
            >
              FEED
            </div>
          </div>
        </div>

        {/* 3D Drop Shadow Base Pedestal */}
        <div
          style={{
            position: 'absolute',
            bottom: -16,
            left: '5%',
            width: '90%',
            height: 24,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, transparent 70%)',
            zIndex: -1
          }}
        />
      </div>
    </div>
  )
}
