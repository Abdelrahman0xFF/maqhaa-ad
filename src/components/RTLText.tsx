import React from 'react'
import { THEME } from '../utils/theme'

interface RTLTextProps {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
}

export const RTLText: React.FC<RTLTextProps> = ({
  children,
  style,
  className,
  as: Component = 'div'
}) => {
  return (
    <Component
      dir="rtl"
      className={className}
      style={{
        fontFamily: THEME.fonts.cairo,
        textAlign: 'right',
        color: THEME.colors.textMain,
        margin: 0,
        padding: 0,
        ...style
      }}
    >
      {children}
    </Component>
  )
}
