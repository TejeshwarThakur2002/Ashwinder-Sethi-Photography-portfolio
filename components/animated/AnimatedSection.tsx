'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import {
  fadeInUp,
  fadeIn,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  ANIMATION_CONFIG,
} from '@/lib/animations';

/**
 * AnimatedSection Component
 * Wraps content with scroll-triggered reveal animations.
 * Respects prefers-reduced-motion for accessibility.
 *
 * Usage:
 * <AnimatedSection animation="fadeInUp">
 *   <YourContent />
 * </AnimatedSection>
 */

export type AnimationType =
  | 'fadeInUp'
  | 'fadeIn'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'scaleIn'
  | 'none';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  /** Custom variants override */
  variants?: Variants;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Custom className */
  className?: string;
  /** Element to render as */
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer';
  /** Viewport threshold (0-1) */
  threshold?: number;
  /** Only animate once */
  once?: boolean;
}

const animationVariants: Record<AnimationType, Variants> = {
  fadeInUp,
  fadeIn,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  none: {
    hidden: {},
    visible: {},
  },
};

export default function AnimatedSection({
  children,
  animation = 'fadeInUp',
  variants,
  delay = 0,
  className = '',
  as = 'div',
  threshold = ANIMATION_CONFIG.scrollReveal.threshold,
  once = ANIMATION_CONFIG.scrollReveal.triggerOnce,
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  // Use simple fade or no animation for reduced motion preference
  const selectedVariants = prefersReducedMotion
    ? animationVariants.fadeIn
    : variants || animationVariants[animation];

  // Add delay to variants if specified
  const delayedVariants: Variants =
    delay > 0
      ? {
          ...selectedVariants,
          visible: {
            ...(selectedVariants.visible as object),
            transition: {
              ...((selectedVariants.visible as { transition?: object })?.transition || {}),
              delay,
            },
          },
        }
      : selectedVariants;

  const Component = motion[as];

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={delayedVariants}
      className={className}
    >
      {children}
    </Component>
  );
}
