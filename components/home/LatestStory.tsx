'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { AnimatedSection } from '@/components/animated';
import type { BlogPost } from '@/lib/types';

/**
 * Latest Story Section Component
 * Highlights the most recent blog post/story from Sanity
 */

interface LatestStoryProps {
  post: BlogPost | null;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function LatestStory({ post }: LatestStoryProps) {
  if (!post) return null;

  return (
    <section className="bg-[#0F0F0F] py-20 lg:py-28" aria-labelledby="latest-story-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection animation="fadeInUp" className="flex flex-col items-center text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-[#DC2626]">
            From the Blog
          </span>
          <h2
            id="latest-story-heading"
            className="mt-3 font-playfair text-3xl font-semibold text-white sm:text-4xl lg:text-5xl"
          >
            Latest Story
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#F5F5F5]/60">
            Behind every photograph is a story. Join me on my adventures as I share the moments,
            challenges, and discoveries from the field.
          </p>
          <div className="mt-6 h-px w-16 bg-[#DC2626]" />
        </AnimatedSection>

        {/* Story Card */}
        <AnimatedSection animation="fadeInUp" delay={0.2} className="mt-12">
          <Link
            href={`/blog/${post.slug}`}
            className="group grid overflow-hidden rounded-sm border border-[#DC2626]/10 bg-[#1C1C1C] transition-all hover:border-[#DC2626]/30 lg:grid-cols-2"
          >
            {/* Image */}
            <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Category badge */}
              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-xl">
                {post.category}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-6 lg:p-10">
              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-[#F5F5F5]/50">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingTimeMinutes} min read
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-4 font-playfair text-2xl font-semibold text-white transition-colors group-hover:text-[#DC2626] lg:text-3xl">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="mt-4 line-clamp-3 text-base leading-relaxed text-[#F5F5F5]/60">
                {post.excerpt}
              </p>

              {/* CTA */}
              <div className="mt-6">
                <span className="inline-flex items-center gap-2 text-base font-medium text-[#DC2626] transition-colors group-hover:text-[#DC2626]/80">
                  Read Story
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </AnimatedSection>

        {/* View All Stories CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#F5F5F5]/60 transition-colors hover:text-[#DC2626]"
          >
            View All Stories
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
