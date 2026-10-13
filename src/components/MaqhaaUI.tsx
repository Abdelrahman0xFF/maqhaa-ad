import React from 'react'
import {
  Coffee,
  Plus,
  Minus,
  Check,
  AlertTriangle,
  Package,
  ShoppingBag,
  Search,
  LayoutGrid,
  Store,
  Wallet,
  BarChart3,
  Settings,
  X,
  RotateCcw,
  Banknote,
  CreditCard,
  Save,
  Printer,
  SlidersHorizontal,
  Globe
} from 'lucide-react'
import { THEME } from '../utils/theme'
import { RTLText } from './RTLText'

// 1. Desktop Window Frame Header
export const MaqhaaWindowHeader: React.FC<{ title?: string; activeShiftText?: string }> = ({
  title = 'مقهى | Maqhaa POS (v1.0.0)',
  activeShiftText = '🟢 الوردية مفتوحة: أحمد (كاشير 1)'
}) => (
  <div
    style={{
      height: 48,
      background: '#f1f5f9',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      direction: 'rtl',
      fontFamily: THEME.fonts.tajawal,
      userSelect: 'none'
    }}
  >
    {/* Left: Window Controls (on RTL it appears on the far end) */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, direction: 'ltr' }}>
      <div style={{ width: 12, height: 12, borderRadius: 6, background: '#ef4444' }} />
      <div style={{ width: 12, height: 12, borderRadius: 6, background: '#f59e0b' }} />
      <div style={{ width: 12, height: 12, borderRadius: 6, background: '#10b981' }} />
    </div>

    {/* Center: Title & Shift status */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Coffee size={18} color={THEME.colors.primary} />
        <span style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>{title}</span>
      </div>
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #cbd5e1',
          padding: '2px 12px',
          borderRadius: 12,
          fontSize: 13,
          fontWeight: 700,
          color: '#059669'
        }}
      >
        {activeShiftText}
      </div>
    </div>

    <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
      وضع عدم الاتصال (100% Offline)
    </div>
  </div>
)

// 2. Realistic Navigation Sidebar (Right-side in RTL)
export const MaqhaaMiniSidebar: React.FC<{ activeNav?: string }> = ({ activeNav = 'pos' }) => {
  const items = [
    { id: 'reports', label: 'التقارير', icon: BarChart3 },
    { id: 'pos', label: 'نقطة البيع', icon: LayoutGrid },
    { id: 'tables', label: 'الطاولات', icon: Store },
    { id: 'expenses', label: 'المصروفات', icon: Wallet },
    { id: 'inventory', label: 'المخزون', icon: Package },
    { id: 'settings', label: 'الإعدادات', icon: Settings }
  ]

  return (
    <div
      style={{
        width: 190,
        background: '#ffffff',
        borderLeft: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 12px',
        direction: 'rtl',
        fontFamily: THEME.fonts.tajawal,
        flexShrink: 0
      }}
    >
      <div>
        {/* Brand Lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', marginBottom: 16 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: 'rgba(234, 88, 12, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Coffee size={22} color={THEME.colors.primary} />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', fontFamily: THEME.fonts.cairo }}>مقهى</div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>نظام الكاشير</div>
          </div>
        </div>

        {/* Nav Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {items.map((it) => {
            const Icon = it.icon
            const isActive = it.id === activeNav
            return (
              <div
                key={it.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 12,
                  background: isActive ? 'rgba(234, 88, 12, 0.1)' : 'transparent',
                  color: isActive ? THEME.colors.primary : '#475569',
                  borderRight: isActive ? `3.5px solid ${THEME.colors.primary}` : '3.5px solid transparent',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: 15,
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={18} color={isActive ? THEME.colors.primary : '#64748b'} />
                <span>{it.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Staff footer */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          padding: '10px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            background: THEME.colors.primary,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 14
          }}
        >
          أ
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap' }}>أحمد كاشير</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>كاشير رئيسي</div>
        </div>
      </div>
    </div>
  )
}

// 3. Exact Category Bar from CategoryBar.jsx
export const MaqhaaRealCategoryBar: React.FC<{ activeIndex?: number }> = ({ activeIndex = 1 }) => {
  const cats = ['الكل', 'قهوة مختصة', 'مشروبات باردة', 'مخبوزات', 'حلويات']

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        direction: 'rtl',
        marginBottom: 14,
        overflowX: 'hidden'
      }}
    >
      {cats.map((c, i) => {
        const isActive = i === activeIndex
        return (
          <div
            key={c}
            style={{
              padding: '8px 20px',
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 700,
              fontFamily: THEME.fonts.cairo,
              background: isActive ? THEME.colors.primary : '#ffffff',
              color: isActive ? '#ffffff' : '#64748b',
              border: isActive ? `1.5px solid ${THEME.colors.primary}` : '1.5px solid #e2e8f0',
              boxShadow: isActive ? '0 4px 12px rgba(234, 88, 12, 0.2)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            {c}
          </div>
        )
      })}
    </div>
  )
}

// 4. Exact MenuItemCard from MenuItemCard.jsx
export const MaqhaaRealMenuItemCard: React.FC<{
  name: string
  category: string
  price: number
  isLowStock?: boolean
  isSelected?: boolean
  onClick?: () => void
}> = ({ name, category, price, isLowStock = false, isSelected = false }) => {
  return (
    <div
      style={{
        background: '#ffffff',
        border: `1.5px solid ${isSelected ? THEME.colors.primary : '#e2e8f0'}`,
        borderRadius: 14,
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        direction: 'rtl',
        position: 'relative',
        boxShadow: isSelected ? '0 10px 25px rgba(234, 88, 12, 0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.2s ease',
        minHeight: 140
      }}
    >
      {isLowStock && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            background: '#ffedd5',
            color: '#c2410c',
            fontSize: 11,
            fontWeight: 800,
            padding: '2px 8px',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <AlertTriangle size={12} />
          <span>مخزون منخفض</span>
        </div>
      )}

      <div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 4, fontFamily: THEME.fonts.cairo }}>
          {name}
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#64748b',
            background: '#f1f5f9',
            padding: '2px 8px',
            borderRadius: 6
          }}
        >
          {category}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 12,
          paddingTop: 10,
          borderTop: '1px solid #f1f5f9'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: THEME.colors.primary, fontFamily: THEME.fonts.cairo }}>
            {price}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>ج.م</span>
        </div>

        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            background: isSelected ? THEME.colors.primary : 'rgba(234, 88, 12, 0.1)',
            color: isSelected ? '#ffffff' : THEME.colors.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          <Plus size={18} />
        </div>
      </div>
    </div>
  )
}

// 5. Exact Real Table Card from TablesGrid.jsx
export const MaqhaaRealTableCard: React.FC<{
  id: number
  name: string
  status: 'occupied' | 'free'
  seats?: string
  total?: string
  isHighlighted?: boolean
}> = ({ id, name, status, seats = '4 كراسي', total, isHighlighted = false }) => {
  const isOccupied = status === 'occupied'

  return (
    <div
      style={{
        padding: '20px 16px',
        borderRadius: 18,
        border: `2px solid ${
          isHighlighted
            ? THEME.colors.primary
            : isOccupied
            ? '#fecaca'
            : '#e2e8f0'
        }`,
        background: isOccupied ? '#fef2f2' : '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        direction: 'rtl',
        boxShadow: isHighlighted ? '0 12px 30px rgba(234, 88, 12, 0.2)' : '0 2px 8px rgba(0,0,0,0.03)',
        transition: 'all 0.3s ease'
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 26,
          background: isOccupied ? '#fecaca' : '#f1f5f9',
          color: isOccupied ? '#991b1b' : '#475569',
          fontSize: 20,
          fontWeight: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: THEME.fonts.cairo
        }}
      >
        {id}
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: isOccupied ? '#7f1d1d' : '#0f172a' }}>{name}</div>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{seats}</div>
      </div>

      <div
        style={{
          fontSize: 12,
          fontWeight: 800,
          padding: '4px 14px',
          borderRadius: 20,
          fontFamily: THEME.fonts.cairo,
          background: isOccupied ? '#fee2e2' : '#dcfce7',
          color: isOccupied ? '#b91c1c' : '#15803d'
        }}
      >
        {isOccupied ? `مشغولة (${total || 'طلب مفتوح'})` : 'متاحة'}
      </div>
    </div>
  )
}
