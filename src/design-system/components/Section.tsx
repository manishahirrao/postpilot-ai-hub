import * as React from "react";
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: keyof JSX.IntrinsicElements;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'muted' | 'gradient' | 'glass';
  withDivider?: boolean;
  dividerPosition?: 'top' | 'bottom';
  animateInView?: boolean;
};

export const Section = ({
  children,
  className,
  id,
  as: Component = 'section',
  padding = 'lg',
  background = 'default',
  withDivider = false,
  dividerPosition = 'bottom',
  animateInView = true,
  ...props
}: SectionProps) => {
  const paddingMap = {
    none: 'py-0',
    sm: 'py-16 md:py-20',
    md: 'py-20 md:py-24',
    lg: 'py-24 md:py-28',
    xl: 'py-28 md:py-32',
  };

  const backgroundMap = {
    default: 'bg-background',
    muted: 'bg-muted/50',
    gradient: 'bg-gradient-to-b from-background to-muted/20',
    glass: 'backdrop-blur-sm bg-background/80',
  };

  const motionProps = animateInView
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-100px' },
        transition: { duration: 0.6 },
      }
    : {};

  const divider = withDivider && (
    <div className="relative py-12">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-border/20" />
      </div>
      {dividerPosition === 'top' && (
        <div className="relative flex justify-center">
          <span className="px-4 bg-background text-sm text-muted-foreground">
            {id ? id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : ''}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {dividerPosition === 'top' && withDivider && divider}
      <Component
        id={id}
        className={cn(
          'relative overflow-hidden',
          paddingMap[padding],
          backgroundMap[background],
          className
        )}
        {...props}
      >
        <motion.div {...motionProps} className="w-full h-full">
          {children}
        </motion.div>
      </Component>
      {dividerPosition === 'bottom' && withDivider && divider}
    </>
  );
};

export default Section;
