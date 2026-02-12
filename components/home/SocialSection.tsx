'use client';

import { Instagram } from 'lucide-react';
import { AnimatedSection } from '@/components/animated';
import { staticSiteConfig } from '@/lib/staticSiteConfig';

/**
 * Social/Instagram Section Component
 * Simple CTA linking to the Instagram profile.
 */

const INSTAGRAM_URL = staticSiteConfig.instagramUrl;
const INSTAGRAM_HANDLE = staticSiteConfig.instagramHandle;

export default function SocialSection() {
  return (
    <section className="bg-[#0F0F0F] py-12 lg:py-16" aria-label="Follow on Instagram">
      <AnimatedSection animation="fadeInUp" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-base font-medium text-white transition-all hover:border-white/30 hover:bg-white/10"
          >
            <Instagram className="h-5 w-5 text-[#DC2626]" />
            Follow on Instagram
            <span className="text-[#F5F5F5]/50">{INSTAGRAM_HANDLE}</span>
          </a>
        </div>
      </AnimatedSection>
    </section>
  );
}
