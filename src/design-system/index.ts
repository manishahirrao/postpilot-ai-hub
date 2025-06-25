// Theme
export * from './theme/theme.config';

// Components
export * from './components/Section';
export * from './components/Container';

// Layouts
export * from './layouts/PageLayout';

// Animations
export * from './animations/FadeIn';

// Utils
export * from './utils/gradients';
export * from './utils/page-utils';

// Re-export common UI components from shadcn/ui
export {
  Button,
  type ButtonProps,
} from '@/components/ui/button';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export { Badge, type BadgeProps } from '@/components/ui/badge';

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

// Icons
export {
  ArrowRight,
  Target,
  Heart,
  Users,
  Award,
  Rocket,
  Globe,
  Zap,
  // Add more icons as needed
} from 'lucide-react';
