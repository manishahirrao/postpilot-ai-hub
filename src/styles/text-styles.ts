import { HTMLAttributes, ReactNode, ElementType, FC, forwardRef } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// Extend React types to support 'as' prop
declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      as?: ElementType;
    }
  }
  namespace React {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      as?: ElementType;
    }
  }
}

type TextElement = keyof JSX.IntrinsicElements | React.ComponentType<any>;

type TextVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'  // Headings
  | 'p' | 'lead' | 'small' | 'muted' | 'blockquote'  // Paragraph variants
  | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'  // Sizes
  | 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'  // Weights
  | 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case'  // Transforms
  | 'underline' | 'line-through' | 'no-underline'  // Text decoration
  | 'left' | 'center' | 'right' | 'justify'  // Text alignment
  | 'truncate' | 'text-ellipsis' | 'text-clip'  // Text overflow
  | 'gradient' | 'shadow'  // Effects
  | 'tracking-tight' | 'tracking-normal' | 'tracking-wide'  // Letter spacing
  | 'leading-none' | 'leading-tight' | 'leading-snug' | 'leading-normal' | 'leading-relaxed' | 'leading-loose';  // Line height

const textVariants: Record<string, string> = {
  // Headers
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 text-3xl font-semibold tracking-tight mt-10 mb-4 pb-2 border-b border-muted',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  h5: 'text-lg font-semibold',
  h6: 'text-base font-semibold',
  
  // Text variants
  p: 'text-base leading-relaxed',
  lead: 'text-xl text-muted-foreground leading-relaxed',
  small: 'text-sm text-muted-foreground',
  muted: 'text-sm text-muted-foreground',
  blockquote: 'border-l-4 border-primary/20 pl-4 italic bg-muted/30 dark:bg-muted/10 p-4 rounded-r',
  
  // Sizes
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  
  // Weights
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
  
  // Transforms
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
  'normal-case': 'normal-case',
  
  // Decorations
  underline: 'underline underline-offset-4',
  'line-through': 'line-through',
  'no-underline': 'no-underline',
  
  // Alignments
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
  
  // Effects
  gradient: 'bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600',
  shadow: 'drop-shadow-sm',
};

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TextElement;
  variant?: TextVariant | TextVariant[];
  className?: string;
  children?: ReactNode;
  gradient?: boolean;
  shadow?: boolean;
  animate?: boolean;
}

export const Text = forwardRef<HTMLElement, TextProps>((props, ref) => {
  const {
    as: Element = 'span',
    variant = 'p',
    className = '',
    children,
    gradient = false,
    shadow = false,
    animate = false,
    ...rest
  } = props;

  // Get variant classes
  const variantClasses = Array.isArray(variant) 
    ? variant.map(v => textVariants[v]).filter(Boolean).join(' ')
    : textVariants[variant] || '';

  // Combine classes
  const baseClasses = 'text-foreground';
  const classes = cn(baseClasses, variantClasses, className);

  // Handle gradient
  if (gradient) {
    return (
      <span className={cn('relative inline-block', className)}>
        <span className={cn('bg-clip-text text-transparent', classes, 'gradient')}>
          {children}
        </span>
      </span>
    );
  }

  // Handle animation
  if (animate) {
    return (
      <motion.span
        className={cn(classes, { 'drop-shadow-md': shadow })}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        {...rest as MotionProps}
      >
        {children}
      </motion.span>
    );
  }

  // Default render
  return (
    <Element 
      ref={ref} 
      className={cn(classes, { 'drop-shadow-md': shadow })} 
      {...rest}
    >
      {children}
    </Element>
  );
});

Text.displayName = 'Text';

// Predefined Text Components
type TextElementProps = Omit<TextProps, 'as' | 'variant'> & {
  variant?: TextVariant | TextVariant[];
  className?: string;
};

const createTextComponent = (as: TextElement, variant: TextVariant) => {
  const Component = forwardRef<HTMLElement, TextElementProps>(({ className, ...props }, ref) => (
    <Text as={as} variant={variant} className={className} ref={ref} {...props} />
  ));
  Component.displayName = `Text.${as.toString().toUpperCase()}`;
  return Component;
};

export const H1 = createTextComponent('h1', 'h1');
export const H2 = createTextComponent('h2', 'h2');
export const H3 = createTextComponent('h3', 'h3');
export const H4 = createTextComponent('h4', 'h4');
export const H5 = createTextComponent('h5', 'h5');
export const H6 = createTextComponent('h6', 'h6');
export const P = createTextComponent('p', 'p');
export const Lead = createTextComponent('p', 'lead');
export const Small = createTextComponent('small', 'small');
export const Muted = createTextComponent('p', 'muted');
export const Blockquote = createTextComponent('blockquote' as const, 'blockquote');

// Export all text utilities
export const TextStyles = {
  variants: textVariants,
  Text,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Lead,
  Small,
  Muted,
  Blockquote,
};
