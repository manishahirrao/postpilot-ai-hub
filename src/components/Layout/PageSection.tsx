import React from 'react';

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
}

const PageSection: React.FC<PageSectionProps> = ({ children, className = '' }) => {
  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default PageSection;
