/**
 * Hero Slideshow Images
 * Curated images for the home page hero carousel.
 * TODO: Replace with Sanity CMS integration when ready
 */

export interface HeroImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Hero images array
 * Add/remove images here to change the slideshow content
 * Recommended: 4-6 high-quality images for optimal variety without excess loading
 */
export const heroImages: HeroImage[] = [
  {
    id: 'hero-1',
    src: '/images/gallery/3K9A1765-Enhanced-NR.jpg',
    alt: 'Cinematic portrait with dramatic lighting',
    caption: 'Portrait',
  },
  {
    id: 'hero-2',
    src: '/images/gallery/3K6A6628.jpg',
    alt: 'Professional studio photography session',
    caption: 'Studio',
  },
  {
    id: 'hero-3',
    src: '/images/gallery/059A0263-Enhanced-NR.jpg',
    alt: 'Golden hour portrait photography',
    caption: 'Golden Hour',
  },
  {
    id: 'hero-4',
    src: '/images/gallery/3K9A3682-Enhanced-NR.jpg',
    alt: 'Fashion photography with artistic flair',
    caption: 'Fashion',
  },
  {
    id: 'hero-5',
    src: '/images/gallery/3K9A4867-Enhanced-NR.jpg',
    alt: 'Creative portrait with unique composition',
    caption: 'Creative',
  },
];

/**
 * Get next image index with wrap-around
 */
export function getNextIndex(current: number, total: number): number {
  return (current + 1) % total;
}

/**
 * Get previous image index with wrap-around
 */
export function getPrevIndex(current: number, total: number): number {
  return (current - 1 + total) % total;
}
