'use client';

import Link from 'next/link';
import { ArrowRight, Images, Mail } from 'lucide-react';

/**
 * AboutCTASection Component
 * Call-to-action section at the bottom of About page
 */

export default function AboutCTASection() {
  return (
    <section className="border-t border-white/10 bg-[#1C1C1C]/30 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-playfair text-2xl font-semibold text-white sm:text-3xl">
          Let&apos;s Create Something Beautiful
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[#F5F5F5]/60">
          Whether you want to explore my portfolio or get in touch, I&apos;d love to connect and
          bring your vision to life.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          {/* View My Work CTA */}
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20"
          >
            <Images className="h-5 w-5" />
            View My Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Contact CTA */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[#DC2626] px-8 py-4 text-base font-medium text-white transition-all hover:bg-[#DC2626]/90"
          >
            <Mail className="h-5 w-5" />
            Get in Touch
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
