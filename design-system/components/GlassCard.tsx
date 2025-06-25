import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../theme/theme'

type ReactNode = React.ReactNode

interface GlassCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
  onClick?: () => void
}

export function GlassCard({
  children,
  className = '',
  hoverEffect = true,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-2xl p-6',
        'backdrop-blur-sm bg-white/5 border border-white/10',
        'transition-all duration-300',
        hoverEffect && 'hover:bg-white/10 hover:border-white/20',
        className
      )}
      whileHover={hoverEffect ? { y: -4, boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)' } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
