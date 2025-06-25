import React from 'react';
import { motion, Variants, Transition } from 'framer-motion';

interface AnimatedProps {
  children?: React.ReactNode;
  className?: string;
  variants?: Variants;
  transition?: Transition;
  whileInView?: boolean;
  [key: string]: any; // Allow other motion props
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Animated: React.FC<AnimatedProps> = ({
  children,
  className,
  variants = defaultVariants,
  transition = { duration: 0.8, ease: 'easeInOut' },
  whileInView = true,
  ...rest
}) => {
  const motionProps = whileInView
    ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.2 },
      }
    : {
        initial: 'hidden',
        animate: 'visible',
      };

  return (
    <motion.div
      className={className}
      variants={variants}
      transition={transition}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Animated;
