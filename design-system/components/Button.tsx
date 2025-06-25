import React from 'react'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../theme/theme'
import { motion } from 'framer-motion'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass'

type DragHandlers = 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDrop'
type AnimationHandlers = 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onAnimationCancel'

type ButtonBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, DragHandlers | AnimationHandlers>

interface ButtonProps extends ButtonBaseProps {
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'relative rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2'
    
    const sizeStyles = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
    }

    const variantStyles = {
      primary: 'text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90',
      secondary: 'text-white bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90',
      outline: 'border border-white/20 hover:bg-white/5',
      ghost: 'hover:bg-white/5',
      glass: 'backdrop-blur-sm bg-white/10 border border-white/10 hover:bg-white/20',
    }

    return (
      <motion.button
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && 'w-full',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading || props.disabled}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-5 h-5 border-2 border-white/20 rounded-full border-t-white animate-spin" />
            </span>
            <span className="opacity-0">{children}</span>
          </>
        ) : (
          children
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
