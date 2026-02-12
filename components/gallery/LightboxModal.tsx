'use client';

import { useEffect, useCallback, useRef } from 'react';
import type { GalleryPhoto } from '@/lib/types';
import { X, ChevronLeft, ChevronRight, MapPin, Aperture, Focus, Calendar } from 'lucide-react';

/**
 * LightboxModal Component
 * Full-screen modal for viewing photos with navigation
 * Supports keyboard navigation (Escape, Arrow keys) and accessibility
 */

interface LightboxModalProps {
  photo: GalleryPhoto | null;
  photos: GalleryPhoto[];
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function LightboxModal({
  photo,
  photos,
  onClose,
  onNext,
  onPrevious,
}: LightboxModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Get current photo index
  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1;
  const hasNext = currentIndex < photos.length - 1;
  const hasPrevious = currentIndex > 0;

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          if (hasNext) onNext();
          break;
        case 'ArrowLeft':
          if (hasPrevious) onPrevious();
          break;
      }
    },
    [onClose, onNext, onPrevious, hasNext, hasPrevious]
  );

  // Set up keyboard listeners and focus trap
  useEffect(() => {
    if (!photo) return;

    // Add keyboard listener
    document.addEventListener('keydown', handleKeyDown);

    // Focus the close button when modal opens
    closeButtonRef.current?.focus();

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [photo, handleKeyDown]);

  // Focus trap - keep focus within modal
  const handleTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement?.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement?.focus();
    }
  };

  if (!photo) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${photo.title}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={handleTabKey}
    >
      {/* Close button */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Previous button */}
      {hasPrevious && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
          aria-label="Next photo"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      {/* Main content */}
      <div
        className="relative flex h-full w-full flex-col items-center justify-center p-4 sm:p-8 lg:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container */}
        <div className="relative max-h-[70vh] max-w-full overflow-hidden rounded-lg lg:max-h-[75vh]">
          <img
            src={photo.src}
            alt={photo.alt}
            className="max-h-[70vh] max-w-full object-contain lg:max-h-[75vh]"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
          {/* Protection overlay */}
          <div className="absolute inset-0 bg-transparent" aria-hidden="true" />
        </div>

        {/* Photo info */}
        <div className="mt-6 max-w-2xl text-center">
          <h2 className="font-playfair text-2xl font-semibold text-white sm:text-3xl">
            {photo.title}
          </h2>

          {photo.caption && <p className="mt-2 text-base text-[#F5F5F5]/70">{photo.caption}</p>}

          {/* Meta info */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-[#F5F5F5]/50">
            {photo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {photo.location}
              </span>
            )}
            {photo.camera && (
              <>
                {photo.camera.lens && (
                  <span className="flex items-center gap-1">
                    <Focus className="h-4 w-4" />
                    {photo.camera.lens}
                  </span>
                )}
                {photo.camera.aperture && (
                  <span className="flex items-center gap-1">
                    <Aperture className="h-4 w-4" />
                    {photo.camera.aperture}
                  </span>
                )}
                {photo.camera.shutterSpeed && <span>{photo.camera.shutterSpeed}</span>}
                {photo.camera.iso && <span>ISO {photo.camera.iso}</span>}
              </>
            )}
            {photo.captureDate && (
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(photo.captureDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>

          {/* Photo counter */}
          <p className="mt-4 text-sm text-[#F5F5F5]/40">
            {currentIndex + 1} of {photos.length}
          </p>
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-[#F5F5F5]/30">
        <span className="hidden sm:inline">
          Use <kbd className="rounded bg-white/10 px-1.5 py-0.5">←</kbd>{' '}
          <kbd className="rounded bg-white/10 px-1.5 py-0.5">→</kbd> to navigate •{' '}
          <kbd className="rounded bg-white/10 px-1.5 py-0.5">Esc</kbd> to close
        </span>
      </div>
    </div>
  );
}
