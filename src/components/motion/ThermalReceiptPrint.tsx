import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { Coffee, CheckCircle2 } from 'lucide-react'
import { THEME } from '../../utils/theme'

export const ThermalReceiptPrint: React.FC<{
  progress?: number
  printProgress?: number
  opacity?: number
  items?: Array<{ name: string; qty: number; price: number; mods?: string[] }>
  subtotal?: number
  tax?: number
  total?: number
  orderNumber?: string
}> = ({
  progress,
  printProgress,
  opacity = 1,
  items,
  subtotal = 175,
  tax = 24.5,
  total = 199.5,
  orderNumber = '#1042'
}) => {
  const p = progress ?? printProgress ?? 1
  const receiptHeight = interpolate(p, [0, 1], [0, 480], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  return (
    <div
      style={{
        width: 320,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity,
        filter: 'drop-shadow(0 20px 35px rgba(15, 23, 42, 0.18))'
      }}
    >
      {/* 1. Thermal Printer Mechanism Slot */}
      <div
        style={{
          width: 340,
          height: 22,
          background: '#1e293b',
          borderRadius: '12px 12px 4px 4px',
          borderBottom: '3px solid #0f172a',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          zIndex: 30
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: '#10b981',
              boxShadow: '0 0 8px #10b981'
            }}
          />
          <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700 }}>
            ESC/POS THERMAL
          </span>
        </div>
        <span style={{ fontSize: 9, color: '#64748b', fontWeight: 600 }}>
          READY
        </span>
      </div>

      {/* 2. Sliding Receipt Paper */}
      <div
        style={{
          width: 300,
          height: receiptHeight,
          background: '#ffffff',
          overflow: 'hidden',
          transition: 'height 0.1s linear',
          boxShadow: 'inset 0 10px 15px -10px rgba(0,0,0,0.15)',
          position: 'relative',
          direction: 'rtl',
          fontFamily: THEME.fonts.tajawal,
          borderLeft: '1px solid #e2e8f0',
          borderRight: '1px solid #e2e8f0'
        }}
      >
        <div style={{ padding: '16px 18px 24px', textAlign: 'center' }}>
          {/* Receipt Brand */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Coffee size={18} color="#ea580c" />
            <span style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', fontFamily: THEME.fonts.cairo }}>
              مقهى | Maqhaa POS
            </span>
          </div>
          <div style={{ fontSize: 11, color: '#64748b' }}>فاتورة ضريبية مبسطة #1042</div>
          <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 10 }}>2026-10-12 • 04:30 PM</div>

          <div style={{ borderTop: '1px dashed #cbd5e1', margin: '8px 0' }} />

          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'right' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 800, color: '#0f172a' }}>
                <span>سبانش لاتيه بارد</span>
                <span>90.00 ج.م</span>
              </div>
              <div style={{ fontSize: 11, color: '#64748b', paddingRight: 8 }}>+ سكر زيادة (0.00)</div>
              <div style={{ fontSize: 11, color: '#64748b', paddingRight: 8 }}>+ حليب شوفان (+20.00)</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 800, color: '#0f172a' }}>
              <span>كرواسون زبدة</span>
              <span>65.00 ج.م</span>
            </div>
          </div>

          <div style={{ borderTop: '1px dashed #cbd5e1', margin: '10px 0' }} />

          {/* Total */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 900, color: '#0f172a' }}>
            <span>الإجمالي:</span>
            <span style={{ color: '#ea580c' }}>175.00 ج.م</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#059669', fontWeight: 700, marginTop: 4 }}>
            <span>طريقة الدفع:</span>
            <span>كارت شبكة (POS) ✓</span>
          </div>

          <div style={{ borderTop: '1px dashed #cbd5e1', margin: '10px 0' }} />

          {/* Mock QR / Barcode & URL */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                width: 140,
                height: 28,
                background: `repeating-linear-gradient(
                  90deg,
                  #0f172a 0px,
                  #0f172a 3px,
                  transparent 3px,
                  transparent 6px,
                  #0f172a 6px,
                  #0f172a 8px,
                  transparent 8px,
                  transparent 11px
                )`,
                borderRadius: 2
              }}
            />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b', letterSpacing: '0.5px' }}>
              maqhaa.abdelrahmanashraf.dev
            </span>
          </div>
        </div>

        {/* Jagged Zigzag Tear Edge */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: `radial-gradient(circle, transparent 4px, #ffffff 4px)`,
            backgroundSize: '12px 12px',
            backgroundPosition: '0 -6px'
          }}
        />
      </div>
    </div>
  )
}
