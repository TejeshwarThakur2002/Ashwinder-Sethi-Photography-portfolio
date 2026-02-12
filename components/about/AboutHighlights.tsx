'use client';

import { Camera, MapPin, Palette, Leaf } from 'lucide-react';

/**
 * AboutHighlights Component
 * Horizontal strip showcasing key identity points
 * TODO: Replace static highlights with Sanity "about" document when CMS is integrated
 */

interface Highlight {
  icon: React.ReactNode;
  label: string;
}

const highlights: Highlight[] = [
  {
    icon: <Camera className="h-5 w-5" />,
    label: 'Fine Art & Wildlife Photography',
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: 'Based in Punjab, India',
  },
  {
    icon: <Palette className="h-5 w-5" />,
    label: 'Minimalist, Serene Compositions',
  },
  {
    icon: <Leaf className="h-5 w-5" />,
    label: 'Nature Conservation Advocate',
  },
];

export default function AboutHighlights() {
  return (
    <section className="border-y border-white/10 bg-[#1C1C1C]/50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#DC2626]/10 text-[#DC2626]">
                {highlight.icon}
              </div>
              <span className="text-sm font-medium text-[#F5F5F5]/80">{highlight.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
