import React from 'react'
import { useCurrentFrame } from 'remotion'

export const ThreeDStage: React.FC<{
  children: React.ReactNode
  rotateX?: number
  rotateY?: number
  rotateZ?: number
  translateZ?: number
  scale?: number
  perspective?: number
  floatEffect?: boolean
  style?: React.CSSProperties
}> = ({
  children,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  translateZ = 0,
  scale = 1,
  perspective = 1400,
  floatEffect = true,
  style = {}
}) => {
  const frame = useCurrentFrame()

  // Gentle physical breathing floating motion
  const floatY = floatEffect ? Math.sin(frame / 40) * 8 : 0
  const floatRotX = floatEffect ? Math.sin(frame / 50) * 0.8 : 0
  const floatRotY = floatEffect ? Math.cos(frame / 60) * 0.8 : 0

  return (
    <div
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: 'center center',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformStyle: 'preserve-3d',
        ...style
      }}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: `
            translateY(${floatY}px)
            rotateX(${rotateX + floatRotX}deg)
            rotateY(${rotateY + floatRotY}deg)
            rotateZ(${rotateZ}deg)
            translateZ(${translateZ}px)
            scale(${scale})
          `,
          transition: 'transform 0.1s linear',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        {children}
      </div>
    </div>
  )
}
