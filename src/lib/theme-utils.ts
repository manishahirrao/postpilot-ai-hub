import { useTheme } from "@/components/ThemeProvider";
import React from 'react';

// Type for theme styles
type ThemeStyles = {
  bgGradient: string;
  textPrimary: string;
  textSecondary: string;
  cardBg: string;
  cardBorder: string;
  buttonPrimary: string;
  buttonSecondary: string;
  inputBg: string;
  inputText: string;
};

// Hook to get theme-aware styles
export function useThemeStyles(): ThemeStyles {
  const { theme } = useTheme();
  
  return {
    // Background gradients
    bgGradient: theme === 'dark' 
      ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
      : 'bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50',
    
    // Text colors
    textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
    
    // Card backgrounds
    cardBg: theme === 'dark' ? 'bg-gray-800/50' : 'bg-white',
    cardBorder: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    
    // Button variants
    buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
    buttonSecondary: theme === 'dark'
      ? 'bg-gray-700 hover:bg-gray-600 text-white'
      : 'bg-gray-100 hover:bg-gray-200 text-gray-800',
      
    // Input fields
    inputBg: theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300',
    inputText: theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
  };
}

// Simple function to get theme styles
export function getThemeStyles() {
  return useThemeStyles();
}

// Alternative to HOC - use this instead of withThemeAwareStyles
export function useThemedStyles() {
  return useThemeStyles();
}
