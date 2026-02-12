'use client';

import Image from 'next/image';
import type { GalleryPhoto } from '@/lib/types';

/**
 * GalleryExploreGrid Component
 * Instagram Explore / Search–style mosaic grid for the /gallery page.
 * Uses a deterministic tile-size pattern (index-based) to avoid SSR/CSR mismatch.
 * Desktop: 4 columns | Tablet: 3 columns | Mobile: 2 columns
 * Tile shapes: square (1×1), tall (1 col × 2 rows), wide (2 cols × 1 row, desktop only).
 */

interface GalleryExploreGridProps {
  photos: GalleryPhoto[];
  onPhotoClick: (photo: GalleryPhoto, triggerElement?: HTMLElement) => void;
}

/* ------------------------------------------------------------------ */
/*  Deterministic tile pattern                                        */
/* ------------------------------------------------------------------ */

type TileShape = 'square' | 'tall' | 'wide';

/**
 * 12-item repeating cycle:
 *  - 2 tall tiles  → vertical emphasis
 *  - 1 wide tile   → horizontal emphasis (desktop only; becomes square on mobile)
 *  - 9 squares     → filler
 * This gives an organic, Instagram-like mosaic without randomness.
 */
const TILE_PATTERN: TileShape[] = [
  'square',
  'square',
  'tall',
  'square',
  'square',
  'square',
  'square',
  'wide',
  'square',
  'tall',
  'square',
  'square',
];

function getTileShape(index: number, totalCount: number): TileShape {
  const baseShape = TILE_PATTERN[index % TILE_PATTERN.length];

  // Force square for items near the end of the list so tall/wide tiles
  // don't create unfillable gaps (dense packing can only back-fill when
  // there are enough subsequent items to place into the holes).
  if (baseShape !== 'square') {
    const itemsAfter = totalCount - index - 1;
    // A tall tile (row-span-2) needs up to maxColumns-1 items to fill its
    // second row; a wide tile (col-span-2) can leave a 1-cell hole.
    // Using 4 (max columns) as a safe threshold covers all breakpoints.
    if (itemsAfter < 4) {
      return 'square';
    }
  }

  return baseShape;
}

/**
 * Returns Tailwind classes for the tile's grid span.
 * - tall  → row-span-2
 * - wide  → col-span-2 on md+ (falls back to normal on mobile)
 * - square → default 1×1
 */
function getTileClasses(shape: TileShape): string {
  switch (shape) {
    case 'tall':
      return 'row-span-2';
    case 'wide':
      // On mobile (<md) wide tiles act as normal squares to keep 2-col layout stable
      return 'md:col-span-2';
    default:
      return '';
  }
}

/**
 * Returns appropriate `sizes` hint for Next/Image based on tile shape.
 */
function getSizes(shape: TileShape): string {
  switch (shape) {
    case 'wide':
      return '(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 66vw, 50vw';
    default:
      return '(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw';
  }
}

/* ------------------------------------------------------------------ */
/*  Tile component                                                    */
/* ------------------------------------------------------------------ */

function ExploreGridTile({
  photo,
  index,
  totalCount,
  onPhotoClick,
}: {
  photo: GalleryPhoto;
  index: number;
  totalCount: number;
  onPhotoClick: (photo: GalleryPhoto, triggerElement?: HTMLElement) => void;
}) {
  const shape = getTileShape(index, totalCount);
  const spanClasses = getTileClasses(shape);
  const sizes = getSizes(shape);

  return (
    <button
      onClick={(e) => onPhotoClick(photo, e.currentTarget)}
      className={`group relative w-full h-full overflow-hidden bg-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:ring-offset-2 focus:ring-offset-[#0F0F0F] ${spanClasses}`}
      aria-label={`View ${photo.title}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        className="object-cover object-center transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
        loading={index < 8 ? 'eager' : 'lazy'}
      />

      {/* Hover overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Caption on hover */}
      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="block text-xs font-medium uppercase tracking-wider text-[#DC2626]">
          {photo.location || photo.category}
        </span>
        <span className="mt-0.5 block text-sm font-medium text-white/90 line-clamp-1">
          {photo.title}
        </span>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Grid component                                                    */
/* ------------------------------------------------------------------ */

export default function GalleryExploreGrid({ photos, onPhotoClick }: GalleryExploreGridProps) {
  if (photos.length === 0) return null;

  return (
    <div
      id="gallery-grid"
      role="tabpanel"
      className="grid grid-cols-2 gap-1 sm:gap-1.5 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[220px] lg:auto-rows-[260px] grid-flow-row-dense"
    >
      {photos.map((photo, index) => (
        <ExploreGridTile
          key={photo.id}
          photo={photo}
          index={index}
          totalCount={photos.length}
          onPhotoClick={onPhotoClick}
        />
      ))}
    </div>
  );
}
