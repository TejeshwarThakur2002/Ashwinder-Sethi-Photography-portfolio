'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/animated';
import { LightboxModal } from '@/components/gallery';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { GalleryPhoto } from '@/lib/types';

/**
 * Featured Gallery Section Component
 * Displays a grid of featured photos from the portfolio with lightbox.
 * Images are fetched from Sanity and passed in via the `images` prop.
 */

interface FeaturedGalleryProps {
  images: GalleryPhoto[];
}

export default function FeaturedGallery({ images }: FeaturedGalleryProps) {
  // State for lightbox
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  // Lightbox handlers
  const handlePhotoClick = useCallback((photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const handleNextPhoto = useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = images.findIndex((p) => p.id === selectedPhoto.id);
    if (currentIndex < images.length - 1) {
      setSelectedPhoto(images[currentIndex + 1]);
    }
  }, [selectedPhoto, images]);

  const handlePreviousPhoto = useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = images.findIndex((p) => p.id === selectedPhoto.id);
    if (currentIndex > 0) {
      setSelectedPhoto(images[currentIndex - 1]);
    }
  }, [selectedPhoto, images]);
  return (
    <section className="bg-[#0F0F0F] py-20 lg:py-28" aria-labelledby="featured-gallery-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection animation="fadeInUp" className="flex flex-col items-center text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-[#DC2626]">
            Portfolio
          </span>
          <h2
            id="featured-gallery-heading"
            className="mt-3 font-playfair text-3xl font-semibold text-white sm:text-4xl lg:text-5xl"
          >
            Featured Work
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#F5F5F5]/60">
            A curated selection of moments captured across continents. Each frame tells a story of
            patience, passion, and the pursuit of nature&apos;s fleeting beauty.
          </p>
          <div className="mt-6 h-px w-16 bg-[#DC2626]" />
        </AnimatedSection>

        {/* Photo Grid - Bento-style layout with breathing room on mobile */}
        {images.length === 0 ? (
          <div className="mt-12 flex items-center justify-center py-16">
            <p className="text-base text-[#F5F5F5]/60">Featured work coming soon</p>
          </div>
        ) : (
          <motion.div
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-[2px] sm:[grid-template-rows:repeat(2,minmax(250px,1fr))]"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {images.map((photo, index) => (
              <motion.div
                key={photo.id}
                variants={fadeInUp}
                className={index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}
              >
                <button
                  onClick={() => handlePhotoClick(photo)}
                  className="group relative block h-full w-full overflow-hidden rounded-lg text-left sm:rounded-none"
                >
                  {/* Image Container */}
                  <div
                    className={`relative w-full ${index === 0 ? 'aspect-[4/3] sm:aspect-auto sm:h-full' : 'aspect-[4/3] sm:aspect-auto sm:h-full'}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Permanent subtle caption - visible by default */}
                    <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0F0F0F]/70 to-transparent p-4 transition-opacity duration-300 group-hover:opacity-0 sm:from-[#0F0F0F]/60">
                      <span className="text-sm font-medium text-white/90 sm:text-white/80">
                        {photo.title}
                      </span>
                    </div>

                    {/* Hover Overlay + Caption - visible on hover */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-[#0F0F0F]/80 via-[#0F0F0F]/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-xs font-medium uppercase tracking-wider text-[#DC2626]">
                        {photo.location || 'Photography'}
                      </span>
                      <h3 className="mt-1 font-playfair text-lg font-semibold text-white">
                        {photo.title}
                      </h3>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 text-base font-medium text-[#DC2626] transition-colors hover:text-[#DC2626]/80"
          >
            View Full Gallery
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        photo={selectedPhoto}
        photos={images}
        onClose={handleCloseLightbox}
        onNext={handleNextPhoto}
        onPrevious={handlePreviousPhoto}
      />
    </section>
  );
}
