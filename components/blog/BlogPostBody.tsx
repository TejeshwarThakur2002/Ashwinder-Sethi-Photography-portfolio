'use client';

import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/lib/sanity.client';
import type { PortableTextBlock } from '@/lib/types';

/**
 * BlogPostBody Component
 * Renders Sanity Portable Text body content with custom styled components.
 * Preserves the existing blog typography and design language.
 */

interface BlogPostBodyProps {
  body: PortableTextBlock[];
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-relaxed text-[#F5F5F5]/80">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 font-playfair text-2xl font-semibold text-white sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-playfair text-xl font-semibold text-white sm:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-6 font-playfair text-lg font-semibold text-white">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-[#DC2626] bg-[#1C1C1C] py-4 pl-6 pr-4">
        <p className="text-xl italic text-white">{children}</p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-6 space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="my-6 list-decimal space-y-2 pl-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative text-[#F5F5F5]/80 before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#DC2626]">
        {children}
      </li>
    ),
    number: ({ children }) => <li className="text-[#F5F5F5]/80">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    'strike-through': ({ children }) => <s>{children}</s>,
    link: ({ value, children }) => {
      const target = value?.blank ? '_blank' : undefined;
      const rel = value?.blank ? 'noopener noreferrer' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-[#DC2626] underline decoration-[#DC2626]/30 underline-offset-2 transition-colors hover:text-[#DC2626]/80"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).width(1200).url();
      return (
        <figure className="my-8">
          <div className="overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt={value.alt || ''}
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm italic text-[#F5F5F5]/50">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function BlogPostBody({ body }: BlogPostBodyProps) {
  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <PortableText value={body} components={portableTextComponents} />
    </div>
  );
}
