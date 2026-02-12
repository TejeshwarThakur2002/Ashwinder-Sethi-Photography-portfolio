'use client';

import { Building2, Home, Fish, Camera } from 'lucide-react';

/**
 * JourneyTimeline Component
 * Visual timeline of career phases before photography
 * TODO: Replace static content with Sanity "about" document when CMS is integrated
 */

interface JourneyStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  period?: string;
}

const journeySteps: JourneyStep[] = [
  {
    icon: <Building2 className="h-6 w-6" />,
    title: 'Hotel & Restaurant Business',
    description:
      'Explored the hospitality industry, learning the art of service and attention to detail.',
    period: 'Early Career',
  },
  {
    icon: <Home className="h-6 w-6" />,
    title: 'Professional Interior Design',
    description:
      'Developed an eye for aesthetics, space, and composition through interior design work.',
    period: 'Creative Phase',
  },
  {
    icon: <Fish className="h-6 w-6" />,
    title: 'Aquarium Studio',
    description:
      'Built a space where imagination and nature blended beautifully — a prelude to wildlife photography.',
    period: 'Nature Connection',
  },
  {
    icon: <Camera className="h-6 w-6" />,
    title: 'Professional Photography',
    description:
      'Finally embraced photography as a profession, turning passion into purpose without losing the love for it.',
    period: 'Present',
  },
];

export default function JourneyTimeline() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-playfair text-2xl font-semibold text-white sm:text-3xl">
          Twenty Years of Creative Exploration
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[#F5F5F5]/60">
          Before photography became my profession, I spent nearly two decades exploring different
          career paths — each one teaching me something valuable.
        </p>

        {/* Timeline */}
        <div className="relative mt-12">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-[#DC2626] via-[#DC2626]/50 to-transparent sm:block" />

          <div className="space-y-8">
            {journeySteps.map((step, index) => (
              <div key={index} className="relative flex flex-col gap-4 sm:flex-row sm:gap-8">
                {/* Icon circle */}
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1C1C1C] text-[#DC2626]">
                  {step.icon}
                </div>

                {/* Content card */}
                <div className="flex-1 rounded-xl border border-white/10 bg-[#1C1C1C]/50 p-6">
                  {step.period && (
                    <span className="text-xs font-medium uppercase tracking-wider text-[#DC2626]">
                      {step.period}
                    </span>
                  )}
                  <h3 className="mt-1 font-playfair text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[#F5F5F5]/60">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
