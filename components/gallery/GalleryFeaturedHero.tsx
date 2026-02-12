'use client';

import Image from 'next/image';
import type { GalleryPhoto } from '@/lib/types';

/**
 * GalleryFeaturedHero Component
 * Chunks ALL gallery photos into groups of 3 and renders each group
 * in a repeating "Featured Work" 2-column layout:
 * LEFT: 1 large hero card | RIGHT: 2 stacked smaller cards
 * Handles remainders: 1 item = full-width card, 2 items = left big + 1 right card
 * Responsive: single column on mobile, 2-column on lg+
 */

interface GalleryFeaturedHeroProps {
  photos: GalleryPhoto[];
  onPhotoClick: (photo: GalleryPhoto, triggerElement?: HTMLElement) => void;
}

/** Shared card styles */
const cardBase =
  'group relative w-full overflow-hidden rounded-none bg-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:ring-offset-2 focus:ring-offset-[#0F0F0F]';

function PhotoCard({
  photo,
  onPhotoClick,
  className,
  priority = false,
}: {
  photo: GalleryPhoto;
  onPhotoClick: (photo: GalleryPhoto, triggerElement?: HTMLElement) => void;
  className?: string;
  priority?: boolean;
}) {
  return (
    <button
      onClick={(e) => onPhotoClick(photo, e.currentTarget)}
      className={`${cardBase} ${className ?? ''}`}
      aria-label={`View ${photo.title}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <span className="absolute bottom-4 left-4 text-sm font-medium text-white/90">
        {photo.title}
      </span>
    </button>
  );
}

/** Split an array into chunks of the given size */
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function GalleryFeaturedHero({ photos, onPhotoClick }: GalleryFeaturedHeroProps) {
  if (photos.length === 0) return null;

  const chunks = chunkArray(photos, 3);

  return (
    <div className="flex flex-col gap-4">
      {chunks.map((chunk, chunkIdx) => {
        // Full group of 3: big left + two stacked right
        if (chunk.length === 3) {
          return (
            <div key={chunkIdx} className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:h-[520px]">
              <PhotoCard
                photo={chunk[0]}
                onPhotoClick={onPhotoClick}
                className="h-[320px] lg:h-full"
                priority={chunkIdx === 0}
              />
              <div className="grid grid-rows-2 gap-4 lg:h-full">
                <PhotoCard
                  photo={chunk[1]}
                  onPhotoClick={onPhotoClick}
                  className="h-[200px] lg:h-full"
                />
                <PhotoCard
                  photo={chunk[2]}
                  onPhotoClick={onPhotoClick}
                  className="h-[200px] lg:h-full"
                />
              </div>
            </div>
          );
        }

        // 2 remaining: big left + one right
        if (chunk.length === 2) {
          return (
            <div key={chunkIdx} className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:h-[520px]">
              <PhotoCard
                photo={chunk[0]}
                onPhotoClick={onPhotoClick}
                className="h-[320px] lg:h-full"
              />
              <PhotoCard
                photo={chunk[1]}
                onPhotoClick={onPhotoClick}
                className="h-[320px] lg:h-full"
              />
            </div>
          );
        }

        // 1 remaining: full-width card
        return (
          <div key={chunkIdx} className="lg:h-[520px]">
            <PhotoCard
              photo={chunk[0]}
              onPhotoClick={onPhotoClick}
              className="h-[320px] lg:h-full"
            />
          </div>
        );
      })}
    </div>
  );
}
