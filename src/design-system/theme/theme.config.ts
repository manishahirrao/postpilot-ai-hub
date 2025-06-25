// Theme configuration constants
export const theme = {
  // Color palette
  colors: {
    primary: {
      light: '#60a5fa',
      DEFAULT: '#3b82f6',
      dark: '#2563eb',
    },
    secondary: {
      light: '#a78bfa',
      DEFAULT: '#8b5cf6',
      dark: '#7c3aed',
    },
    accent: {
      light: '#f472b6',
      DEFAULT: '#ec4899',
      dark: '#db2777',
    },
    success: {
      light: '#34d399',
      DEFAULT: '#10b981',
      dark: '#059669',
    },
    warning: {
      light: '#fbbf24',
      DEFAULT: '#f59e0b',
      dark: '#d97706',
    },
    error: {
      light: '#f87171',
      DEFAULT: '#ef4444',
      dark: '#dc2626',
    },
  },
  
  // Gradients
  gradients: {
    primary: 'from-cyan-500 to-blue-600',
    secondary: 'from-purple-500 to-pink-600',
    accent: 'from-orange-500 to-red-600',
    success: 'from-emerald-500 to-teal-600',
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      display: ['Cal Sans', 'Inter', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
  },
  
  // Spacing
  spacing: {
    section: {
      sm: '6rem',
      md: '8rem',
      lg: '10rem',
      xl: '12rem',
    },
  },
  
  // Border radius
  borderRadius: {
    none: '0px',
    sm: '0.25rem',
    DEFAULT: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '3rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
  },
  
  // Animations
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};

export type Theme = typeof theme;
