'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import type { GalleryPhoto, GalleryCategory } from '@/lib/types';
import { GalleryFilters, LightboxModal } from './index';
import GalleryExploreGrid from './GalleryExploreGrid';

/**
 * GalleryContent Component
 * Main gallery content with filtering and lightbox functionality
 * This is a client component that manages state for the gallery
 * Data is fetched on the server and passed in as props.
 */

interface GalleryContentProps {
  photos: GalleryPhoto[];
}

/** Build a sorted category list from the photo data */
function buildCategories(photos: GalleryPhoto[]): GalleryCategory[] {
  const map = new Map<string, number>();
  photos.forEach((p) => {
    map.set(p.category, (map.get(p.category) || 0) + 1);
  });
  const cats: GalleryCategory[] = [{ id: 'all', label: 'All' }];
  map.forEach((count, slug) => {
    cats.push({
      id: slug,
      label: slug.charAt(0).toUpperCase() + slug.slice(1),
      count,
    });
  });
  return cats;
}

export default function GalleryContent({ photos }: GalleryContentProps) {
  // State for active category filter
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // State for lightbox
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  // Ref to store the element that opened the lightbox for focus restoration
  const triggerElementRef = useRef<HTMLElement | null>(null);

  // Derive categories from the photos array
  const categories = useMemo(() => buildCategories(photos), [photos]);

  // Filter photos based on selected category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') {
      return photos;
    }
    return photos.filter((photo) => photo.category === activeCategory);
  }, [activeCategory, photos]);

  // Calculate photo counts per category for filter badges
  const photoCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: photos.length,
    };
    photos.forEach((photo) => {
      counts[photo.category] = (counts[photo.category] || 0) + 1;
    });
    return counts;
  }, [photos]);

  // Lightbox navigation handlers
  const handlePhotoClick = useCallback((photo: GalleryPhoto, triggerElement?: HTMLElement) => {
    // Store the trigger element for focus restoration
    if (triggerElement) {
      triggerElementRef.current = triggerElement;
    }
    setSelectedPhoto(photo);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedPhoto(null);
    // Restore focus to the element that opened the lightbox
    if (triggerElementRef.current) {
      triggerElementRef.current.focus();
      triggerElementRef.current = null;
    }
  }, []);

  const handleNextPhoto = useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    if (currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1]);
    }
  }, [selectedPhoto, filteredPhotos]);

  const handlePreviousPhoto = useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    if (currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1]);
    }
  }, [selectedPhoto, filteredPhotos]);

  return (
    <>
      {/* Gallery Header Row */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-playfair text-3xl font-semibold tracking-wide text-white sm:text-4xl">
          Gallery
        </h1>
        <GalleryFilters
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          photoCounts={photoCounts}
        />
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-[#F5F5F5]/50">
          Showing {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
          {activeCategory !== 'all' && (
            <span>
              {' '}
              in{' '}
              <span className="text-[#DC2626]">
                {categories.find((c) => c.id === activeCategory)?.label}
              </span>
            </span>
          )}
        </p>
      </div>

      {/* Instagram Explore–style mosaic grid */}
      <GalleryExploreGrid photos={filteredPhotos} onPhotoClick={handlePhotoClick} />

      {/* Lightbox Modal */}
      <LightboxModal
        photo={selectedPhoto}
        photos={filteredPhotos}
        onClose={handleCloseLightbox}
        onNext={handleNextPhoto}
        onPrevious={handlePreviousPhoto}
      />
    </>
  );
}
