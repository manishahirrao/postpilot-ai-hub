import { cn } from '@/lib/utils';

type TextVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'p' | 'lead' | 'small' | 'muted' | 'blockquote';

type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
type TextColor = 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'danger' | 'info';
type TextAlign = 'left' | 'center' | 'right' | 'justify';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  variant?: TextVariant;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
  className?: string;
  children: React.ReactNode;
  gradient?: boolean;
}

const variantClasses: Record<TextVariant, string> = {
  h1: 'text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'text-3xl font-bold tracking-tight',
  h3: 'text-2xl font-bold tracking-tight',
  h4: 'text-xl font-semibold tracking-tight',
  h5: 'text-lg font-semibold tracking-tight',
  h6: 'text-base font-semibold tracking-tight',
  p: 'text-base leading-relaxed',
  lead: 'text-xl text-muted-foreground',
  small: 'text-sm text-muted-foreground',
  muted: 'text-sm text-muted-foreground',
  blockquote: 'border-l-2 border-muted pl-4 italic',
};

const weightClasses: Record<TextWeight, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

const colorClasses: Record<TextColor, string> = {
  primary: 'text-foreground',
  secondary: 'text-muted-foreground',
  muted: 'text-muted-foreground/70',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  danger: 'text-red-600 dark:text-red-400',
  info: 'text-blue-600 dark:text-blue-400',
};

const alignClasses: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

export const Text = ({
  as: Component = 'p',
  variant = 'p',
  weight,
  color = 'primary',
  align = 'left',
  className,
  children,
  gradient = false,
  ...props
}: TextProps) => {
  const baseClasses = variantClasses[variant] || '';
  const weightClass = weight ? weightClasses[weight] : '';
  const colorClass = color ? colorClasses[color] : '';
  const alignClass = align ? alignClasses[align] : '';
  
  return (
    <Component
      className={cn(
        baseClasses,
        weightClass,
        colorClass,
        alignClass,
        gradient && 'bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

// Pre-defined text components for common use cases
export const H1 = (props: Omit<TextProps, 'as' | 'variant'>) => (
  <Text as="h1" variant="h1" {...props} />
);

export const H2 = (props: Omit<TextProps, 'as' | 'variant'>) => (
  <Text as="h2" variant="h2" {...props} />
);

export const H3 = (props: Omit<TextProps, 'as' | 'variant'>) => (
  <Text as="h3" variant="h3" {...props} />
);

export const H4 = (props: Omit<TextProps, 'as' | 'variant'>) => (
  <Text as="h4" variant="h4" {...props} />
);

export const H5 = (props: Omit<TextProps, 'as' | 'variant'>) => (
  <Text as="h5" variant="h5" {...props} />
);

export const H6 = (props: Omit<TextProps, 'as' | 'variant'>) => (
  <Text as="h6" variant="h6" {...props} />
);

export const P = (props: Omit<TextProps, 'as' | 'variant'>) => (
  <Text as="p" variant="p" {...props} />
);

export const Lead = (props: Omit<TextProps, 'as' | 'variant'>) => (
  <Text as="p" variant="lead" {...props} />
);

export const Small = (props: Omit<TextProps, 'as' | 'variant'>) => (
  <Text as="small" variant="small" {...props} />
);

export const Muted = (props: Omit<TextProps, 'as' | 'variant'>) => (
  <Text as="p" variant="muted" {...props} />
);

export const Blockquote = (props: Omit<TextProps, 'as' | 'variant'>) => (
  <Text as="blockquote" variant="blockquote" {...props} />
);

// Utility function to generate text class names
export const text = ({
  variant = 'p',
  weight,
  color = 'primary',
  align = 'left',
  className,
  gradient = false,
}: Omit<TextProps, 'as' | 'children'>) => {
  const baseClasses = variantClasses[variant] || '';
  const weightClass = weight ? weightClasses[weight] : '';
  const colorClass = color ? colorClasses[color] : '';
  const alignClass = align ? alignClasses[align] : '';
  
  return cn(
    baseClasses,
    weightClass,
    colorClass,
    alignClass,
    gradient && 'bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600',
    className
  );
};
