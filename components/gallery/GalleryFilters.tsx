'use client';

import type { GalleryCategory } from '@/lib/types';

/**
 * GalleryFilters Component
 * Renders a compact dropdown filter for the gallery categories
 */

interface GalleryFiltersProps {
  categories: GalleryCategory[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  photoCounts?: Record<string, number>;
}

export default function GalleryFilters({
  categories,
  activeCategory,
  onCategoryChange,
  photoCounts,
}: GalleryFiltersProps) {
  return (
    <div className="relative inline-block">
      <select
        value={activeCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter photos by category"
        className="gallery-filter-select appearance-none rounded-full border border-white/15 bg-white/5 py-2 pl-4 pr-10 text-sm font-medium text-[#F5F5F5]/90 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 cursor-pointer"
      >
        {categories.map((category) => {
          const count = photoCounts?.[category.id];
          const label = count !== undefined ? `${category.label} (${count})` : category.label;
          return (
            <option key={category.id} value={category.id}>
              {label}
            </option>
          );
        })}
      </select>
      {/* Custom chevron icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          className="h-4 w-4 text-[#F5F5F5]/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
