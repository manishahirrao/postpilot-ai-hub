# Text Styling System

This directory contains the text styling system for the application, providing consistent typography and text utilities across all components.

## Usage

### Text Components

Import and use the pre-defined text components from `@/utils/text`:

```tsx
import { H1, H2, P, Lead, Small, Muted } from '@/utils/text';

function MyComponent() {
  return (
    <div>
      <H1>Main Heading</H1>
      <H2>Section Heading</H2>
      <P>This is a paragraph of text with consistent styling.</P>
      <Lead>This is a lead paragraph with slightly larger text.</Lead>
      <Small>This is small helper text.</Small>
      <Muted>This is muted text for secondary information.</Muted>
    </div>
  );
}
```

### Text Utility Function

For more control, use the `text` utility function to generate class names:

```tsx
import { text } from '@/utils/text';

function MyComponent() {
  return (
    <p className={text({ variant: 'p', color: 'primary', weight: 'medium', align: 'center' })}>
      Centered medium weight text
    </p>
  );
}
```

### Text Props

All text components accept the following props:

- `as`: The HTML element to render (defaults to appropriate element for each variant)
- `variant`: Text variant (`h1`-`h6`, `p`, `lead`, `small`, `muted`, `blockquote`)
- `weight`: Font weight (`light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`)
- `color`: Text color (`primary`, `secondary`, `muted`, `success`, `warning`, `danger`, `info`)
- `align`: Text alignment (`left`, `center`, `right`, `justify`)
- `gradient`: Whether to apply a gradient text effect (boolean)
- `className`: Additional CSS classes

## Styling Guidelines

1. **Use semantic HTML elements** where possible (e.g., `h1`-`h6` for headings)
2. **Leverage the text components** for consistent styling
3. **Use the `text` utility** for custom text styles
4. **Follow the design system** for typography scales and colors
5. **Keep line lengths readable** (45-75 characters per line)
6. **Maintain proper vertical rhythm** with consistent spacing

## Customization

To customize the text styles, modify the following files:

- `src/styles/typography.css`: Base typography styles
- `src/utils/text.ts`: Text component and utility function
- `tailwind.config.ts`: Font families, sizes, and other typography settings

## Best Practices

- Use `H1`-`H6` components for all headings
- Use `P` for body text
- Use `Lead` for introductory paragraphs
- Use `Small` and `Muted` for secondary information
- Use the `gradient` prop sparingly for emphasis
- Maintain proper heading hierarchy (don't skip heading levels)
