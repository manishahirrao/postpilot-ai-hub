import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const gradients = {
  primary: 'bg-gradient-to-r from-cyan-500 to-purple-600',
  secondary: 'bg-gradient-to-r from-purple-500 to-pink-600',
  accent: 'bg-gradient-to-r from-orange-500 to-red-600',
  success: 'bg-gradient-to-r from-emerald-500 to-teal-600',
}

export const textGradients = {
  primary: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600',
  secondary: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600',
  accent: 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600',
  success: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600',
}

export const glassMorphism = 'backdrop-blur-sm bg-white/10 border border-white/10 hover:bg-white/20 transition-colors'
