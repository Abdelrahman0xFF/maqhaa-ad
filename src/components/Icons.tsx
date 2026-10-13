import React from 'react'

export const CoffeeIcon: React.FC<{ size?: number | string; style?: React.CSSProperties; className?: string }> = ({ size = '1em', style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <path d="M10 2v2M14 2v2M6 8h11v7a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4zM17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
  </svg>
)

export const JuiceIcon: React.FC<{ size?: number | string; style?: React.CSSProperties }> = ({ size = '1em', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M7 3h10l-1.2 16a2 2 0 0 1-2 1.8h-3.6a2 2 0 0 1-2-1.8zM7.5 9h9M13 3l2-2" />
  </svg>
)

export const CakeIcon: React.FC<{ size?: number | string; style?: React.CSSProperties }> = ({ size = '1em', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M4 20h16M5 20v-6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6M12 12V8M12 5.5v.01M8 14c1 1 2 1 3 0s2-1 3 0 2 1 3 0" />
  </svg>
)

export const WifiOffIcon: React.FC<{ size?: number | string; style?: React.CSSProperties }> = ({ size = '1em', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M2 2l20 20M8.5 16.4a5 5 0 0 1 7 0M5 12.9a10 10 0 0 1 5-2.7M19 12.9a10 10 0 0 0-2.6-1.9M2 8.8a15 15 0 0 1 4.2-2.4M22 8.8a15 15 0 0 0-8.7-3.7M12 20h.01" />
  </svg>
)

export const InfinityIcon: React.FC<{ size?: number | string; style?: React.CSSProperties }> = ({ size = '1em', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M6 16c-2.2 0-4-1.8-4-4s1.8-4 4-4c4 0 8 8 12 8 2.2 0 4-1.8 4-4s-1.8-4-4-4c-4 0-8 8-12 8z" />
  </svg>
)

export const LockIcon: React.FC<{ size?: number | string; style?: React.CSSProperties }> = ({ size = '1em', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4M12 15v2" />
  </svg>
)

export const BoxIcon: React.FC<{ size?: number | string; style?: React.CSSProperties }> = ({ size = '1em', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M21 8l-9-5-9 5v8l9 5 9-5zM3.3 7.5L12 12.5l8.7-5M12 22V12.5" />
  </svg>
)

export const PrinterIcon: React.FC<{ size?: number | string; style?: React.CSSProperties }> = ({ size = '1em', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z" />
  </svg>
)

export const ChartIcon: React.FC<{ size?: number | string; style?: React.CSSProperties }> = ({ size = '1em', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M3 3v18h18M8 17v-5M13 17V8M18 17v-9" />
  </svg>
)

export const CheckIcon: React.FC<{ size?: number | string; style?: React.CSSProperties }> = ({ size = '1em', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export const WhatsAppIcon: React.FC<{ size?: number | string; style?: React.CSSProperties }> = ({ size = '1em', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M3 21l1.7-5A9 9 0 1 1 8 19.3zM9 10c0 3 2 5 5 5l1.5-1.5-2-1-1 .8a3 3 0 0 1-1.6-1.6l.8-1-1-2z" />
  </svg>
)

export const UpArrowIcon: React.FC<{ size?: number | string; style?: React.CSSProperties }> = ({ size = '1em', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
)

export const CursorSvg: React.FC<{ size?: number | string; style?: React.CSSProperties; className?: string }> = ({ size = 46, style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style} className={className}>
    <path d="M4 2l16 9-7 2-3 7z" fill="#ffffff" stroke="#1c1917" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)
