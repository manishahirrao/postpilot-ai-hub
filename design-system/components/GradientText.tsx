import React, { ElementType, ReactNode } from 'react'
import { textGradients } from '../theme/theme'

type GradientVariant = keyof typeof textGradients

interface GradientTextProps {
  as?: ElementType
  variant?: GradientVariant
  children: ReactNode
  className?: string
}

export function GradientText({
  as: Component = 'span',
  variant = 'primary',
  children,
  className = '',
}: GradientTextProps) {
  const gradientClass = textGradients[variant] || textGradients.primary
  
  return (
    <Component className={`${gradientClass} ${className}`}>
      {children}
    </Component>
  )
}
