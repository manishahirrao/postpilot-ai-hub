import * as React from "react";
import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  amount?: number;
  duration?: number;
  once?: boolean;
  viewport?: boolean;
  as?: keyof JSX.IntrinsicElements;
};

export const FadeIn = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  amount = 20,
  duration = 0.6,
  once = true,
  viewport = true,
  as: Component = 'div',
  ...props
}: FadeInProps) => {
  const directionMap = {
    up: { y: amount },
    down: { y: -amount },
    left: { x: amount },
    right: { x: -amount },
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...directionMap[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const motionProps = {
    initial: 'hidden',
    whileInView: viewport ? 'visible' : undefined,
    animate: !viewport ? 'visible' : undefined,
    viewport: viewport ? { once, margin: '-100px' } : undefined,
    variants,
  };

  return (
    <motion.div
      as={Component}
      className={cn('w-full', className)}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
