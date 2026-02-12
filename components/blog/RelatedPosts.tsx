'use client';

import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { formatPostDate } from '@/lib/queries/blog';
import { ArrowRight } from 'lucide-react';

/**
 * RelatedPosts Component
 * Displays related stories at the bottom of blog posts
 * TODO: Use Sanity's reference resolution for smarter related content
 */

interface RelatedPostsProps {
  posts: BlogPost[];
  title?: string;
}

export default function RelatedPosts({ posts, title = 'Related Stories' }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-white/10 pt-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-playfair text-2xl font-semibold text-white">{title}</h2>
        <Link
          href="/blog"
          className="flex items-center gap-1 text-sm font-medium text-[#DC2626] transition-colors hover:text-[#DC2626]/80"
        >
          View all stories
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post._id}
            className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#1C1C1C] transition-all duration-300 hover:border-[#DC2626]/30"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent" />
              </div>
            </Link>

            <div className="flex flex-1 flex-col p-4">
              <Link href={`/blog/${post.slug}`}>
                <h3 className="font-playfair text-lg font-semibold text-white transition-colors group-hover:text-[#DC2626] line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              <p className="mt-2 text-sm text-[#F5F5F5]/50">{formatPostDate(post.publishedAt)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
