import React from 'react'

export const SparkleStar: React.FC<{
  size?: number
  color?: string
  glowColor?: string
  rotation?: number
  scale?: number
  opacity?: number
}> = ({
  size = 28,
  color = '#ea580c',
  glowColor = 'rgba(234, 88, 12, 0.5)',
  rotation = 0,
  scale = 1,
  opacity = 1
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `rotate(${rotation}deg) scale(${scale})`,
        opacity,
        filter: `drop-shadow(0 0 ${size * 0.4}px ${glowColor})`,
        flexShrink: 0
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
          fill={color}
        />
      </svg>
    </div>
  )
}
