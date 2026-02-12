'use client';

/**
 * BlogFilters Component
 * Renders a compact dropdown filter for blog tags, mirroring the Gallery filter style
 */

interface BlogFiltersProps {
  tags: string[];
  selectedTag: string | null;
  onTagChange: (tag: string | null) => void;
  postCounts?: Record<string, number>;
}

export default function BlogFilters({
  tags,
  selectedTag,
  onTagChange,
  postCounts,
}: BlogFiltersProps) {
  return (
    <div className="relative inline-block">
      <select
        value={selectedTag ?? 'all'}
        onChange={(e) => onTagChange(e.target.value === 'all' ? null : e.target.value)}
        aria-label="Filter posts by tag"
        className="appearance-none rounded-full border border-white/15 bg-white/5 py-2 pl-4 pr-10 text-sm font-medium text-[#F5F5F5]/90 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 cursor-pointer"
      >
        <option value="all">{postCounts ? `All (${postCounts['all'] ?? 0})` : 'All'}</option>
        {tags.map((tag) => {
          const count = postCounts?.[tag];
          const label = count !== undefined ? `${tag} (${count})` : tag;
          return (
            <option key={tag} value={tag}>
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
