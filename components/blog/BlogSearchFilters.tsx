'use client';

import { useState, useCallback } from 'react';
import { Search, X, Tag } from 'lucide-react';

/**
 * BlogSearchFilters Component
 * Provides search and tag filtering for blog posts
 * TODO: Add category filters when more content is available
 */

interface BlogSearchFiltersProps {
  tags: string[];
  selectedTag: string | null;
  onTagChange: (tag: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function BlogSearchFilters({
  tags,
  selectedTag,
  onTagChange,
  searchQuery,
  onSearchChange,
}: BlogSearchFiltersProps) {
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

  const handleClearFilters = useCallback(() => {
    onTagChange(null);
    onSearchChange('');
  }, [onTagChange, onSearchChange]);

  const hasActiveFilters = selectedTag !== null || searchQuery.trim() !== '';

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#F5F5F5]/40" />
        <input
          type="text"
          placeholder="Search stories..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-[#1C1C1C] py-3 pl-12 pr-4 text-white placeholder-[#F5F5F5]/40 transition-colors focus:border-[#DC2626]/50 focus:outline-none focus:ring-1 focus:ring-[#DC2626]/50"
          aria-label="Search blog posts"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F5F5F5]/40 transition-colors hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Tags filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-sm text-[#F5F5F5]/50">
          <Tag className="h-4 w-4" />
          Filter:
        </span>

        {/* All posts button */}
        <button
          onClick={() => onTagChange(null)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
            selectedTag === null
              ? 'bg-[#DC2626] text-white'
              : 'border border-white/10 text-[#F5F5F5]/70 hover:border-[#DC2626]/50 hover:text-white'
          }`}
        >
          All
        </button>

        {/* Tag buttons - show first 5 or all if expanded */}
        {(isTagsExpanded ? tags : tags.slice(0, 5)).map((tag) => (
          <button
            key={tag}
            onClick={() => onTagChange(selectedTag === tag ? null : tag)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
              selectedTag === tag
                ? 'bg-[#DC2626] text-white'
                : 'border border-white/10 text-[#F5F5F5]/70 hover:border-[#DC2626]/50 hover:text-white'
            }`}
          >
            {tag}
          </button>
        ))}

        {/* Show more/less toggle */}
        {tags.length > 5 && (
          <button
            onClick={() => setIsTagsExpanded(!isTagsExpanded)}
            className="text-sm text-[#DC2626] transition-colors hover:text-[#DC2626]/80"
          >
            {isTagsExpanded ? 'Show less' : `+${tags.length - 5} more`}
          </button>
        )}

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="ml-auto flex items-center gap-1 text-sm text-[#F5F5F5]/50 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
