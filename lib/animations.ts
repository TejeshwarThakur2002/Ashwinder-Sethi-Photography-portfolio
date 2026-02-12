/**
 * Animation Configuration & Variants
 * Central configuration for all Framer Motion animations across the site.
 *
 * Usage:
 * - Import variants and use with Framer Motion's motion components
 * - Adjust durations/easing in ANIMATION_CONFIG for global timing changes
 * - Use useReducedMotion() hook to respect user preferences
 */

import { Variants, Transition } from 'framer-motion';

// ============================================================================
// ANIMATION CONFIGURATION
// Adjust these values to tune animation timing globally
// ============================================================================

export const ANIMATION_CONFIG = {
  // Hero slideshow settings
  hero: {
    slideInterval: 6000, // Time between slides in ms (6 seconds)
    slideDuration: 1.2, // Crossfade duration in seconds
  },

  // Standard durations (in seconds)
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    verySlow: 0.8,
  },

  // Easing presets
  easing: {
    smooth: [0.4, 0, 0.2, 1], // Smooth, natural movement
    snappy: [0.4, 0, 0.6, 1], // Quick snap into place
    gentle: [0.25, 0.1, 0.25, 1], // Very gentle, cinematic
    bouncy: [0.68, -0.55, 0.265, 1.55], // Slight bounce
  },

  // Scroll reveal settings
  scrollReveal: {
    threshold: 0.15, // Percentage of element visible before triggering
    triggerOnce: true, // Only animate once
  },

  // Stagger delays for lists/grids
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
} as const;

// ============================================================================
// TRANSITION PRESETS
// Pre-configured transition objects for common use cases
// ============================================================================

export const transitions: Record<string, Transition> = {
  smooth: {
    duration: ANIMATION_CONFIG.duration.normal,
    ease: ANIMATION_CONFIG.easing.smooth,
  },
  gentle: {
    duration: ANIMATION_CONFIG.duration.slow,
    ease: ANIMATION_CONFIG.easing.gentle,
  },
  quick: {
    duration: ANIMATION_CONFIG.duration.fast,
    ease: ANIMATION_CONFIG.easing.snappy,
  },
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
};

// ============================================================================
// ANIMATION VARIANTS
// Reusable variant objects for motion components
// ============================================================================

/**
 * Fade in from below - Great for text and content blocks
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.gentle,
  },
};

/**
 * Simple fade in (no movement)
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: transitions.gentle,
  },
};

/**
 * Fade in from left
 */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.gentle,
  },
};

/**
 * Fade in from right
 */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.gentle,
  },
};

/**
 * Scale up with fade - Good for cards and images
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.gentle,
  },
};

/**
 * Hero image crossfade variants
 */
export const heroImageVariants: Variants = {
  enter: {
    opacity: 0,
    scale: 1.05,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: { duration: ANIMATION_CONFIG.hero.slideDuration, ease: 'easeInOut' },
      scale: { duration: ANIMATION_CONFIG.hero.slideDuration * 1.5, ease: 'easeOut' },
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: {
      opacity: { duration: ANIMATION_CONFIG.hero.slideDuration * 0.8, ease: 'easeInOut' },
    },
  },
};

/**
 * Hero text variants - staggered children
 */
export const heroTextContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const heroTextItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.slow,
      ease: ANIMATION_CONFIG.easing.gentle,
    },
  },
};

/**
 * Staggered container for lists/grids
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION_CONFIG.stagger.normal,
      delayChildren: 0.1,
    },
  },
};

/**
 * Hover effects for cards
 */
export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: transitions.quick,
  },
};
