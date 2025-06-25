import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeIn } from '../animations';

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type MotionDivProps = HTMLMotionProps<'div'>;

export interface PageLayoutProps extends MotionDivProps {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  withContainer?: boolean;
  withPadding?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className,
  title,
  description,
  withContainer = true,
  withPadding = true,
  ...props
}) => {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        'min-h-screen w-full',
        withPadding && 'py-8 md:py-12',
        className
      )}
      {...props}
    >
      {title && (
        <div className={cn(withContainer ? 'container mx-auto px-4' : '')}>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={fadeIn('up')}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p 
              className="text-xl text-muted-foreground mb-8"
              variants={fadeIn('up')}
            >
              {description}
            </motion.p>
          )}
        </div>
      )}
      {withContainer ? (
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      ) : (
        <div className="w-full">
          {children}
        </div>
      )}
    </motion.main>
  );
};

// Add display name for better debugging
PageLayout.displayName = 'PageLayout';

export default PageLayout;
