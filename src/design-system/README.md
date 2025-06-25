# Design System

A comprehensive design system for the PostPilot AI Hub application, providing consistent styling, components, and animations across the entire application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Theming](#theming)
- [Animations](#animations)
- [Utilities](#utilities)

## Installation

All components and utilities are automatically available through the main export:

```tsx
import { Section, Container, FadeIn, gradientText } from '@/design-system';
```

## Components

### Section

A wrapper component for page sections with consistent spacing and animations.

```tsx
<Section id="features" padding="lg" background="muted" withDivider>
  <Container>
    <h2 className="text-4xl font-bold mb-8">Features</h2>
    {/* Content */}
  </Container>
</Section>
```

### Container

A container component for consistent content width and padding.

```tsx
<Container size="lg" padding="md">
  {/* Content */}
</Container>
```

## Theming

The design system uses a centralized theme configuration for colors, typography, and spacing.

### Colors

```tsx
import { theme } from '@/design-system';

// Usage
theme.colors.primary.DEFAULT; // #3b82f6
theme.colors.secondary.light; // #a78bfa
```

### Typography

```tsx
// In your CSS
body {
  font-family: var(--font-sans);
  font-size: var(--font-base);
}

// In your JSX
<h1 className="text-4xl font-bold font-display">Hello World</h1>
```

## Animations

### FadeIn

A wrapper component for fade-in animations.

```tsx
<FadeIn direction="up" delay={0.2}>
  <h2>Animated Heading</h2>
</FadeIn>
```

### Animation Variants

Predefined animation variants for Framer Motion.

```tsx
import { motion } from 'framer-motion';
import { fadeIn } from '@/design-system/animations';

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeIn('up')}
>
  <h2>Animated with Variants</h2>
</motion.div>
```

## Utilities

### Gradients

Predefined gradient classes for text and backgrounds.

```tsx
import { gradientText, gradientBg } from '@/design-system/utils/gradients';

<h1 className={`text-4xl font-bold ${gradientText.primary}`}>
  Gradient Text
</h1>

<div className={`p-8 rounded-lg ${gradientBg.secondary}`}>
  Gradient Background
</div>
```

## Best Practices

1. **Consistent Spacing**: Use the `Section` and `Container` components for consistent spacing.
2. **Animation**: Use the provided animation components and variants for consistent motion.
3. **Theming**: Reference theme variables for colors, typography, and spacing.
4. **Responsive Design**: Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:) for responsive layouts.
5. **Accessibility**: Ensure all interactive elements are keyboard-navigable and have proper ARIA attributes.
