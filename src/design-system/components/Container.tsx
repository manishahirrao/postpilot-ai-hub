import * as React from "react";
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  as?: keyof JSX.IntrinsicElements;
};

export const Container = ({
  children,
  className,
  size = 'lg',
  padding = 'md',
  as: Component = 'div',
  ...props
}: ContainerProps) => {
  const sizeMap = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  const paddingMap = {
    none: 'px-0',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-8 sm:px-10 lg:px-12',
    xl: 'px-10 sm:px-12 lg:px-16',
  };

  return (
    <Component
      className={cn(
        'mx-auto w-full',
        sizeMap[size],
        paddingMap[padding],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;
