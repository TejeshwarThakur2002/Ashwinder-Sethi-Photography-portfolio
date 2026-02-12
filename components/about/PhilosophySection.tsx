'use client';

import { Sparkles, Eye, Heart, Leaf } from 'lucide-react';

/**
 * PhilosophySection Component
 * Creative philosophy and values section
 * TODO: Replace static content with Sanity "about" document when CMS is integrated
 */

interface PhilosophyValue {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const philosophyValues: PhilosophyValue[] = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Minimalism',
    description: 'Stripping away the unnecessary to reveal the essence of each moment.',
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: 'Serenity',
    description: 'Creating images that evoke calm and invite quiet contemplation.',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Purity',
    description: 'Capturing authentic, unmanipulated beauty in its natural form.',
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: 'Peace of Mind',
    description: 'Each photograph is an invitation to pause and find stillness.',
  },
];

export default function PhilosophySection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-[#DC2626]">
            Creative Philosophy
          </span>
          <h2 className="mt-4 font-playfair text-2xl font-semibold text-white sm:text-3xl">
            Photography as Escape and Expression
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-[#DC2626]" />
        </div>

        {/* Philosophy intro */}
        <div className="mt-10 rounded-xl border border-white/10 bg-[#1C1C1C]/50 p-8 text-center">
          <p className="text-lg leading-relaxed text-[#F5F5F5]/80">
            &ldquo;Photography is my escape. It allows me to express my creativity through
            simplicity. I am drawn to minimalist compositions and use various creative techniques to
            translate my vision into timeless images. My goal is to create photographs that
            communicate serenity, purity, and peace of mind.&rdquo;
          </p>
        </div>

        {/* Values grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {philosophyValues.map((value, index) => (
            <div
              key={index}
              className="group rounded-xl border border-white/10 bg-[#1C1C1C]/30 p-6 transition-all duration-300 hover:border-[#DC2626]/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DC2626]/10 text-[#DC2626] transition-colors group-hover:bg-[#DC2626]/20">
                {value.icon}
              </div>
              <h3 className="mt-4 font-playfair text-xl font-semibold text-white">{value.title}</h3>
              <p className="mt-2 text-[#F5F5F5]/60">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
