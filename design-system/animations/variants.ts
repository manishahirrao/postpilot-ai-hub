import { Variants } from 'framer-motion'

export const fadeIn = (direction = 'up'): Variants => ({
  offscreen: {
    y: direction === 'up' ? 40 : -40,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
})

export const staggerContainer = (staggerChildren = 0.1): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
    },
  },
})

export const scaleIn = (scale = 0.8): Variants => ({
  hidden: { scale, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
})
