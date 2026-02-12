'use client';

import Image from 'next/image';

/**
 * AboutHero Component
 * Hero section for the About page featuring portrait, name, and role
 * TODO: Replace static content with Sanity "about" document when CMS is integrated
 */

export default function AboutHero() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] via-[#1C1C1C]/50 to-[#0F0F0F]" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-md lg:order-2">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/ashwinder-sethi/ashwinder-sethi.jpg"
                alt="Ashwinder Sethi - Fine Art & Wildlife Photographer"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border border-[#DC2626]/30" />
          </div>

          {/* Text content */}
          <div className="text-center lg:order-1 lg:text-left">
            <span className="text-sm font-medium uppercase tracking-widest text-[#DC2626]">
              About Me
            </span>

            <h1 className="mt-4 font-playfair text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              Ashwinder Sethi
            </h1>

            <p className="mt-4 text-xl text-[#F5F5F5]/70 sm:text-2xl">
              Fine Art & Wildlife Photographer
            </p>

            <div className="mx-auto mt-6 h-px w-16 bg-[#DC2626] lg:mx-0" />

            {/* Short intro */}
            <p className="mt-8 text-lg leading-relaxed text-[#F5F5F5]/80">
              An Indian fine art and wildlife photographer living in Punjab, India — capturing the
              serenity of nature through minimalist compositions and celebrating the beauty of the
              wild through every frame.
            </p>

            {/* Location tag */}
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F5F5F5]/60">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              Punjab, India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
