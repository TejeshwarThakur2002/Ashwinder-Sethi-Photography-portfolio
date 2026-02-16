'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Build the label for the active category
  const activeLabel = (() => {
    const cat = categories.find((c) => c.id === activeCategory);
    if (!cat) return 'All';
    const count = photoCounts?.[cat.id];
    return count !== undefined ? `${cat.label} (${count})` : cat.label;
  })();

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const handleSelect = useCallback(
    (categoryId: string) => {
      onCategoryChange(categoryId);
      setIsOpen(false);
      triggerRef.current?.focus();
    },
    [onCategoryChange],
  );

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Trigger – single pill button with label + chevron as flex children */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Filter photos by category"
        className="gallery-filter-select flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-2 pl-4 pr-3 text-sm font-medium text-[#F5F5F5]/90 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 focus-visible:border-white/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 cursor-pointer"
      >
        <span className="whitespace-nowrap">{activeLabel}</span>
        {/* Chevron icon */}
        <svg
          className={`h-4 w-4 shrink-0 text-[#F5F5F5]/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <ul
          role="listbox"
          aria-label="Category filter options"
          className="absolute right-0 z-50 mt-2 min-w-full overflow-hidden rounded-xl border border-white/10 bg-[#1C1C1C] py-1 shadow-xl shadow-black/40 backdrop-blur-sm"
        >
          {categories.map((category) => {
            const count = photoCounts?.[category.id];
            const label = count !== undefined ? `${category.label} (${count})` : category.label;
            const isActive = category.id === activeCategory;
            return (
              <li
                key={category.id}
                role="option"
                aria-selected={isActive}
                tabIndex={0}
                onClick={() => handleSelect(category.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(category.id);
                  }
                }}
                className={`cursor-pointer whitespace-nowrap px-4 py-2 text-sm transition-colors duration-150 ${
                  isActive
                    ? 'bg-white/10 font-medium text-white'
                    : 'text-[#F5F5F5]/70 hover:bg-white/5 hover:text-[#F5F5F5]/90'
                }`}
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
