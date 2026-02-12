'use client';

import type { BlogPost } from '@/lib/types';
import BlogCard from './BlogCard';

/**
 * BlogList Component
 * Renders a grid of blog post cards
 * TODO: Add pagination or infinite scroll when connected to Sanity
 */

interface BlogListProps {
  posts: BlogPost[];
  showFeatured?: boolean;
}

export default function BlogList({ posts, showFeatured = true }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#1C1C1C] p-12 text-center">
        <p className="text-lg text-[#F5F5F5]/60">No stories found</p>
        <p className="mt-2 text-sm text-[#F5F5F5]/40">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  // Separate featured and regular posts
  const featuredPost = showFeatured ? posts.find((p) => p.featured) : null;
  const regularPosts = showFeatured
    ? posts.filter((p) => !p.featured || p !== featuredPost)
    : posts;

  return (
    <div className="space-y-8">
      {/* Featured post */}
      {featuredPost && <BlogCard post={featuredPost} variant="featured" />}

      {/* Regular posts grid */}
      {regularPosts.length > 0 && (
        <div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Blog posts"
        >
          {regularPosts.map((post) => (
            <div key={post._id} role="listitem">
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
