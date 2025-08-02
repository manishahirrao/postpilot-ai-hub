import React, { ReactNode } from 'react';
import MainLayout from './MainLayout';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProductLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  hideHeader?: boolean;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({
  title,
  description,
  children,
  className = '',
  hideHeader = false,
}) => {
  return (
    <MainLayout>
      <div className={cn('min-h-screen bg-background', className)}>
        {!hideHeader && (
          <motion.header 
            className="bg-gradient-to-r from-primary/5 to-primary/10 py-16 md:py-24"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4 text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                {title}
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {description}
              </motion.p>
            </div>
          </motion.header>
        )}
        <motion.main 
          className="py-12 md:py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            {children}
          </div>
        </motion.main>
      </div>
    </MainLayout>
  );
};

export default ProductLayout;
