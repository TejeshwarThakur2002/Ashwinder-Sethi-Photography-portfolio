'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cardHover, transitions } from '@/lib/animations';

/**
 * MotionCard Component
 * A card wrapper with smooth hover animations.
 * Scales up slightly and lifts on hover for a premium feel.
 */

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  /** Disable hover animations */
  disableHover?: boolean;
  /** Click handler */
  onClick?: () => void;
}

export default function MotionCard({
  children,
  className = '',
  disableHover = false,
  onClick,
}: MotionCardProps) {
  const prefersReducedMotion = useReducedMotion();

  // Disable hover effects if user prefers reduced motion or explicitly disabled
  const shouldAnimate = !prefersReducedMotion && !disableHover;

  return (
    <motion.div
      className={className}
      initial="rest"
      whileHover={shouldAnimate ? 'hover' : undefined}
      whileTap={shouldAnimate ? { scale: 0.99 } : undefined}
      variants={cardHover}
      transition={transitions.quick}
      onClick={onClick}
      style={{ willChange: shouldAnimate ? 'transform' : 'auto' }}
    >
      {children}
    </motion.div>
  );
}
