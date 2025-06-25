import React, { ReactNode } from 'react'
import { motion, Variants } from 'framer-motion'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  variants?: Variants
  initial?: string
  whileInView?: string
  viewport?: {
    once?: boolean
    margin?: string
    amount?: number
  }
}

export function AnimatedSection({
  children,
  className = '',
  variants,
  initial = 'offscreen',
  whileInView = 'onscreen',
  viewport = { once: true, margin: '-20% 0px' },
}: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      variants={variants}
    >
      {children}
    </motion.section>
  )
}
