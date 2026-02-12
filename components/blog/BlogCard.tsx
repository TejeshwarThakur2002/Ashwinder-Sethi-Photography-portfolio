'use client';

import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { formatPostDate } from '@/lib/queries/blog';
import { Clock, ArrowRight } from 'lucide-react';

/**
 * BlogCard Component
 * Displays a blog post preview in card format
 * TODO: Image will come from Sanity CDN when CMS is integrated
 */

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}

export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  if (variant === 'featured') {
    return (
      <article className="group overflow-hidden rounded-xl border border-white/10 bg-[#1C1C1C]">
        <Link href={`/blog/${post.slug}`} className="relative block">
          {/* Image - taller aspect on mobile for better content fit */}
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[21/9]">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/60 to-transparent sm:via-[#1C1C1C]/50" />

            {/* Featured badge */}
            <div className="absolute left-4 top-4 rounded-full bg-[#DC2626] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white sm:left-6 sm:top-6 sm:px-4 sm:py-1.5 sm:text-xs">
              Featured Story
            </div>

            {/* Content - overlaid on image for desktop */}
            <div className="hidden sm:absolute sm:inset-x-0 sm:bottom-0 sm:block sm:p-8">
              {/* Tags */}
              <div className="mb-3 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 px-3 py-1 text-xs text-[#F5F5F5]/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="font-playfair text-3xl font-semibold text-white transition-colors group-hover:text-[#DC2626] lg:text-4xl">
                {post.title}
              </h2>

              <p className="mt-3 line-clamp-2 text-lg text-[#F5F5F5]/60">{post.excerpt}</p>

              {/* Meta */}
              <div className="mt-4 flex items-center gap-4 text-sm text-[#F5F5F5]/50">
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingTimeMinutes} min read
                </span>
              </div>
            </div>
          </div>

          {/* Content - below image on mobile only */}
          <div className="p-4 sm:hidden">
            {/* Tags */}
            <div className="mb-2 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] text-[#F5F5F5]/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="font-playfair text-xl font-semibold leading-tight text-white transition-colors group-hover:text-[#DC2626]">
              {post.title}
            </h2>

            <p className="mt-2 line-clamp-2 text-sm text-[#F5F5F5]/60">{post.excerpt}</p>

            {/* Meta */}
            <div className="mt-3 flex items-center gap-3 text-xs text-[#F5F5F5]/50">
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTimeMinutes} min read
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group flex gap-4">
        <Link
          href={`/blog/${post.slug}`}
          className="relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-lg"
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        <div className="flex-1">
          <Link href={`/blog/${post.slug}`}>
            <h3 className="font-medium text-white transition-colors group-hover:text-[#DC2626] line-clamp-2">
              {post.title}
            </h3>
          </Link>
          <p className="mt-1 text-xs text-[#F5F5F5]/50">{formatPostDate(post.publishedAt)}</p>
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#1C1C1C] transition-all duration-300 hover:border-[#DC2626]/30 hover:shadow-lg hover:shadow-[#DC2626]/5">
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent" />

          {/* Category badge */}
          <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {post.category}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#DC2626]/10 px-2.5 py-0.5 text-xs font-medium text-[#DC2626]"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-playfair text-xl font-semibold text-white transition-colors group-hover:text-[#DC2626] line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#F5F5F5]/60 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta and CTA */}
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 text-xs text-[#F5F5F5]/50">
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTimeMinutes} min
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#DC2626] transition-colors hover:text-[#DC2626]/80"
          >
            Read Story
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
