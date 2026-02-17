'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { heroImages, getNextIndex, getPrevIndex } from '@/lib/heroImages';
import {
  ANIMATION_CONFIG,
  heroImageVariants,
} from '@/lib/animations';

/**
 * Hero Section Component
 * Full-width cinematic hero with image slideshow, branding, and CTAs.
 * Features:
 * - Auto-advancing image slideshow with crossfade transitions
 * - Manual navigation (arrows + dots)
 * - Animated text content
 * - Pauses on tab blur for performance
 * - Respects prefers-reduced-motion
 */

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const totalSlides = heroImages.length;
  const currentImage = heroImages[currentIndex];

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get the appropriate image source based on screen size
  const imageSrc = isMobile && currentImage.mobileSrc ? currentImage.mobileSrc : currentImage.src;

  // Navigate to next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => getNextIndex(prev, totalSlides));
  }, [totalSlides]);


  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;

    const interval = setInterval(nextSlide, ANIMATION_CONFIG.hero.slideInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, prefersReducedMotion]);

  // Pause slideshow when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsAutoPlaying(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);


  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0F0F0F]"
      aria-label="Hero section"
      aria-roledescription="carousel"
    >
      {/* Background Image Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={`${currentImage.id}-${isMobile}`}
            className="absolute inset-0 bg-cover bg-top bg-no-repeat sm:bg-center"
            style={{
              backgroundImage: `url('${imageSrc}')`,
            }}
            variants={prefersReducedMotion ? undefined : heroImageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            aria-hidden="true"
          />
        </AnimatePresence>

        {/* Cinematic overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/40 via-transparent to-[#0F0F0F]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <ChevronDown className="h-8 w-8 animate-bounce text-[#F5F5F5]/60" />
      </motion.div>
    </section>
  );
}
