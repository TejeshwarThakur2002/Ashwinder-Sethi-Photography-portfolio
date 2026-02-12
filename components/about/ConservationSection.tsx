'use client';

import { TreePine, Bird, Mountain, Waves } from 'lucide-react';

/**
 * ConservationSection Component
 * Nature conservation commitment section
 * TODO: Replace static content with Sanity "about" document when CMS is integrated
 */

export default function ConservationSection() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#1C1C1C] to-[#0F0F0F]" />

      {/* Decorative icons */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <TreePine className="absolute left-[10%] top-[20%] h-32 w-32 text-white" />
        <Bird className="absolute right-[15%] top-[30%] h-24 w-24 text-white" />
        <Mountain className="absolute left-[20%] bottom-[20%] h-40 w-40 text-white" />
        <Waves className="absolute right-[10%] bottom-[15%] h-28 w-28 text-white" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-[#DC2626]">
            Art for Nature
          </span>
          <h2 className="mt-4 font-playfair text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            Celebrating & Conserving Natural Beauty
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-[#DC2626]" />
        </div>

        <div className="mt-12 rounded-2xl border border-[#DC2626]/20 bg-[#1C1C1C]/80 p-8 backdrop-blur-sm sm:p-12">
          <p className="text-center text-lg leading-relaxed text-[#F5F5F5]/80 sm:text-xl">
            Through every frame, I strive to celebrate natural beauty — and to support the greater
            cause of nature conservation. My wildlife photography is not just about capturing
            stunning images; it&apos;s about raising awareness for the delicate ecosystems and
            magnificent creatures that share our planet.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <TreePine className="h-4 w-4 text-[#DC2626]" />
              <span className="text-sm text-[#F5F5F5]/70">Forest Ecosystems</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Bird className="h-4 w-4 text-[#DC2626]" />
              <span className="text-sm text-[#F5F5F5]/70">Wildlife Protection</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Mountain className="h-4 w-4 text-[#DC2626]" />
              <span className="text-sm text-[#F5F5F5]/70">Natural Habitats</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Waves className="h-4 w-4 text-[#DC2626]" />
              <span className="text-sm text-[#F5F5F5]/70">Aquatic Life</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
