'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Camera, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { heroImages, getNextIndex, getPrevIndex } from '@/lib/heroImages';
import {
  ANIMATION_CONFIG,
  heroImageVariants,
  heroTextContainer,
  heroTextItem,
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
  const prefersReducedMotion = useReducedMotion();

  const totalSlides = heroImages.length;
  const currentImage = heroImages[currentIndex];

  // Navigate to next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => getNextIndex(prev, totalSlides));
  }, [totalSlides]);

  // Navigate to previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => getPrevIndex(prev, totalSlides));
  }, [totalSlides]);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    // Reset autoplay timer when manually navigating
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 100);
  }, []);

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

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
            key={currentImage.id}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${currentImage.src}')`,
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

      {/* Slide Navigation Arrows - positioned lower on mobile to avoid overlapping content */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-[70%] z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2.5 text-white/70 backdrop-blur-sm transition-all hover:bg-black/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50 sm:left-6 sm:top-1/2 sm:p-3"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-[70%] z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2.5 text-white/70 backdrop-blur-sm transition-all hover:bg-black/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50 sm:right-6 sm:top-1/2 sm:p-3"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-8"
        variants={heroTextContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Icon badge */}
        <motion.div
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-2xl"
          variants={heroTextItem}
        >
          <Camera className="h-4 w-4 text-[#DC2626]" />
          <span className="text-sm font-medium text-[#F5F5F5]/80">
            Wildlife & Landscape Photography
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="font-playfair text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          variants={heroTextItem}
        >
          Ashwinder Sethi
          <span className="mt-2 block text-[#DC2626]">Photography</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#F5F5F5]/70 sm:text-xl"
          variants={heroTextItem}
        >
          Capturing the raw beauty of nature through a cinematic lens. Wildlife encounters,
          breathtaking landscapes, and stories that inspire.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          variants={heroTextItem}
        >
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-8 py-4 text-base font-medium text-white backdrop-blur-2xl transition-all hover:bg-white/25 hover:border-white/30 hover:shadow-lg hover:shadow-white/10"
          >
            View Gallery
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-xl transition-all hover:bg-white/15 hover:border-white/20"
          >
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>

      {/* Slide Pagination Dots - subtle on mobile */}
      <div
        className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 sm:bottom-20 sm:gap-2"
        role="tablist"
        aria-label="Slide navigation"
      >
        {heroImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => goToSlide(index)}
            className={`min-h-[44px] min-w-[24px] flex items-center justify-center focus:outline-none focus-visible:outline-none sm:min-h-0 sm:min-w-0`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}: ${image.caption || image.alt}`}
          >
            <span
              className={`block rounded-full transition-all ${
                index === currentIndex
                  ? 'h-[5px] w-4 bg-[#DC2626] sm:h-2 sm:w-8'
                  : 'h-[5px] w-[5px] bg-white/50 sm:h-2 sm:w-2'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll indicator - hidden on mobile to reduce clutter */}
      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <ChevronDown className="h-8 w-8 animate-bounce text-[#F5F5F5]/60" />
      </motion.div>
    </section>
  );
}
