import { Variants } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right';

export const fadeIn = (direction: Direction = 'up', delay = 0): Variants => ({
  hidden: {
    y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
    x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
    opacity: 0,
  },
  visible: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.2): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const textVariant = (delay = 0): Variants => ({
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

export const slideIn = (direction: Direction, type = 'tween', delay = 0, duration = 0.6): Variants => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
  },
  visible: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

export const zoomIn = (delay = 0, scale = 0.9): Variants => ({
  hidden: {
    scale,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'tween',
      delay,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
