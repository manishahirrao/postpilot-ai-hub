import { ReactNode } from 'react'
import { cn } from '../theme/theme'
import { motion } from 'framer-motion'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  actions?: ReactNode
  className?: string
  contentClassName?: string
}

export function Hero({
  title,
  subtitle,
  description,
  actions,
  className = '',
  contentClassName = '',
}: HeroProps) {
  return (
    <section className={cn('relative overflow-hidden py-20 md:py-32', className)}>
      {/* Orbital Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-1/4 -top-1/4 w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute -left-1/4 -bottom-1/4 w-full h-full bg-gradient-to-tr from-purple-600/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -right-1/4 -bottom-1/4 w-full h-full bg-gradient-to-tl from-cyan-500/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8', contentClassName)}>
        <div className="max-w-4xl mx-auto text-center">
          {subtitle && (
            <motion.p
              className="text-lg md:text-xl text-cyan-400 mb-4 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {subtitle}
            </motion.p>
          )}
          
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h1>
          
          {description && (
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {description}
            </motion.p>
          )}
          
          {actions && (
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {actions}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
