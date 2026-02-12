'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Award, Camera, MapPin, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/animated';

/**
 * About Section Component
 * Mini bio introducing Ashwinder with a link to the full about page
 * TODO: Connect to Sanity Site Settings or About document for dynamic content
 */

export default function AboutSection() {
  return (
    <section className="bg-[#1C1C1C] py-20 lg:py-28" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <AnimatedSection animation="fadeInLeft" className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="/ashwinder-sethi/ashwinder-sethi.jpg"
                alt="Ashwinder Sethi - Professional Photographer"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-sm border border-[#DC2626]/30" />

            {/* Stats overlay */}
            <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-2 gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-2xl sm:left-12 sm:right-auto sm:w-48">
              <div className="text-center">
                <div className="font-playfair text-2xl font-semibold text-[#DC2626]">5+</div>
                <div className="mt-1 text-xs text-[#F5F5F5]/50">Years</div>
              </div>
              <div className="text-center">
                <div className="font-playfair text-2xl font-semibold text-[#DC2626]">50K+</div>
                <div className="mt-1 text-xs text-[#F5F5F5]/50">Photos</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection animation="fadeInRight" className="mt-8 lg:mt-0">
            <span className="text-sm font-medium uppercase tracking-widest text-[#DC2626]">
              About Me
            </span>
            <h2
              id="about-heading"
              className="mt-3 font-playfair text-3xl font-semibold text-white sm:text-4xl"
            >
              The Eye Behind the Lens
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#F5F5F5]/70">
              <p>
                I&apos;m Ashwinder Sethi, a fine art and wildlife photographer based in Punjab,
                India. I capture the serenity of nature through minimalist compositions and
                celebrate the beauty of the wild through every frame.
              </p>
              <p>
                My work has been featured in National Geographic, Wildlife Photographer of the Year,
                and numerous international publications. What drives me is the profound connection
                between humanity and the natural world.
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                  <Camera className="h-5 w-5 text-[#DC2626]" />
                </div>
                <span className="text-sm text-[#F5F5F5]/70">National Geographic</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                  <Award className="h-5 w-5 text-[#DC2626]" />
                </div>
                <span className="text-sm text-[#F5F5F5]/70">Award Winner</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                  <MapPin className="h-5 w-5 text-[#DC2626]" />
                </div>
                <span className="text-sm text-[#F5F5F5]/70">Punjab, India</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-base font-medium text-[#DC2626] transition-colors hover:text-[#DC2626]/80"
            >
              Learn More About My Journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
