'use client';

/**
 * AboutStorySection Component
 * Renders a section of the About story with heading and content
 * TODO: Replace static content with Sanity portable text when CMS is integrated
 */

interface AboutStorySectionProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

export default function AboutStorySection({ title, children, id }: AboutStorySectionProps) {
  return (
    <section id={id} className="py-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-playfair text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
        <div className="mt-6 space-y-6 text-lg leading-relaxed text-[#F5F5F5]/70">{children}</div>
      </div>
    </section>
  );
}
