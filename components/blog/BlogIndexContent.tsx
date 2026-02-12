'use client';

import { useState, useMemo } from 'react';
import type { BlogPost } from '@/lib/types';
import { getAllTagsFromPosts } from '@/lib/queries/blog';
import BlogFilters from './BlogFilters';
import BlogList from './BlogList';

/**
 * BlogIndexContent Component
 * Client component handling blog filtering and search state
 * TODO: Replace local filtering with Sanity GROQ queries for server-side filtering
 */

interface BlogIndexContentProps {
  initialPosts: BlogPost[];
}

export default function BlogIndexContent({ initialPosts }: BlogIndexContentProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all tags for filter UI
  const allTags = useMemo(() => getAllTagsFromPosts(initialPosts), [initialPosts]);

  // Filter posts based on tag selection
  const filteredPosts = useMemo(() => {
    let posts = initialPosts;

    // Apply tag filter
    if (selectedTag) {
      posts = posts.filter((post) =>
        post.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    // Sort by date (newest first)
    return posts.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [initialPosts, selectedTag]);

  // Calculate post counts per tag for filter badges
  const postCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialPosts.length };
    initialPosts.forEach((post) => {
      post.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [initialPosts]);

  return (
    <>
      {/* Header Row — title left, filter dropdown right (mirrors Gallery) */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-playfair text-3xl font-semibold tracking-wide text-white sm:text-4xl">
          The Blog
        </h1>
        <BlogFilters
          tags={allTags}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          postCounts={postCounts}
        />
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-[#F5F5F5]/50">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'}
          {selectedTag && (
            <span>
              {' '}
              in <span className="text-[#DC2626]">{selectedTag}</span>
            </span>
          )}
        </p>
      </div>

      {/* Posts grid */}
      <BlogList posts={filteredPosts} showFeatured={!selectedTag} />
    </>
  );
}
