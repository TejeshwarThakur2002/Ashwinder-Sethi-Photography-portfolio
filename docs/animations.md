# Animation System Documentation

## Overview

The Shoot Studio website uses **Framer Motion** for smooth, performant animations. All animation configurations are centralized in `lib/animations.ts` for easy tuning.

## Configuration

### Global Settings (`lib/animations.ts`)

```typescript
export const ANIMATION_CONFIG = {
  // Hero slideshow settings
  hero: {
    slideInterval: 6000, // Time between slides (ms)
    slideDuration: 1.2,  // Crossfade duration (s)
  },
  
  // Standard durations (seconds)
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    verySlow: 0.8,
  },
  
  // Scroll reveal settings
  scrollReveal: {
    threshold: 0.15, // % of element visible before trigger
    triggerOnce: true,
  },
};
```

## Components

### AnimatedSection

Wraps content with scroll-triggered reveal animations.

```tsx
import { AnimatedSection } from '@/components/animated';

<AnimatedSection 
  animation="fadeInUp" // or: fadeIn, fadeInLeft, fadeInRight, scaleIn
  delay={0.2}          // optional delay in seconds
  className="my-class"
>
  <YourContent />
</AnimatedSection>
```

**Props:**
- `animation`: `'fadeInUp' | 'fadeIn' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'none'`
- `delay`: Optional delay before animation starts (seconds)
- `threshold`: Viewport threshold for trigger (0-1)
- `once`: Only animate once (default: true)

### MotionCard

Card wrapper with hover lift effect.

```tsx
import { MotionCard } from '@/components/animated';

<MotionCard className="your-styles">
  <CardContent />
</MotionCard>
```

## Available Variants

Import from `lib/animations.ts`:

| Variant | Description |
|---------|-------------|
| `fadeInUp` | Fade in + slide up |
| `fadeInDown` | Fade in + slide down |
| `fadeIn` | Simple fade |
| `fadeInLeft` | Fade in from left |
| `fadeInRight` | Fade in from right |
| `scaleIn` | Scale up + fade |
| `heroImageVariants` | Hero slideshow crossfade |
| `heroTextContainer` | Staggered text container |
| `heroTextItem` | Individual text item |
| `staggerContainer` | Parent for staggered children |
| `cardHover` | Card hover effect |
| `buttonHover` | Button hover effect |

## Hero Slideshow

The hero images are configured in `lib/heroImages.ts`:

```typescript
export const heroImages: HeroImage[] = [
  {
    id: 'hero-1',
    src: '/images/gallery/image.jpg',
    alt: 'Description',
    caption: 'Optional caption',
  },
  // Add more images...
];
```

**Features:**
- Auto-advances every 6 seconds
- Pauses when tab is hidden
- Manual navigation (arrows + dots)
- Keyboard navigation (← →)
- Respects `prefers-reduced-motion`

## Accessibility

- All animations respect `prefers-reduced-motion` media query
- Hero controls have proper `aria-label` attributes
- Animations use opacity/transform (not layout-affecting properties)
- No rapid flashing or jarring motion

## Usage Examples

### Staggered Grid Items

```tsx
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';

<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={fadeInUp}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Custom Delays

```tsx
<AnimatedSection animation="fadeInUp" delay={0}>
  <Heading />
</AnimatedSection>
<AnimatedSection animation="fadeInUp" delay={0.2}>
  <Content />
</AnimatedSection>
```

## Performance Tips

1. Avoid animating layout properties (width, height)
2. Use `willChange: 'transform'` for heavy animations
3. Wrap heavy animated sections with `viewport={{ once: true }}`
4. Keep animation durations under 1 second for most cases
