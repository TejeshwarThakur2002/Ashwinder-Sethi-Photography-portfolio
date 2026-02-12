'use client';

import { type HTMLAttributes, type ReactNode } from 'react';

/**
 * SectionHeading Component
 * Standardized section titles with optional eyebrow text and description
 */

type Alignment = 'left' | 'center' | 'right';

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  /** Small text above the title (e.g., "Our Services") */
  eyebrow?: string;
  /** Main heading text */
  title: string;
  /** Optional description below the title */
  description?: string;
  /** Text alignment */
  align?: Alignment;
  /** Show decorative line below title */
  showDivider?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Heading level - use 'h1' for page titles, 'h2' for section titles */
  as?: 'h1' | 'h2' | 'h3';
  /** Additional content after the heading */
  children?: ReactNode;
}

const alignStyles: Record<Alignment, string> = {
  left: 'text-left',
  center: 'text-center mx-auto',
  right: 'text-right ml-auto',
};

const titleSizes = {
  sm: 'text-2xl sm:text-3xl',
  md: 'text-3xl sm:text-4xl',
  lg: 'text-4xl sm:text-5xl',
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  showDivider = true,
  size = 'md',
  as: HeadingTag = 'h2',
  className = '',
  children,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={`${alignStyles[align]} ${className}`} {...props}>
      {eyebrow && (
        <span className="text-sm font-medium uppercase tracking-widest text-[#DC2626]">
          {eyebrow}
        </span>
      )}
      <HeadingTag className={`mt-3 font-playfair font-semibold text-white ${titleSizes[size]}`}>
        {title}
      </HeadingTag>
      {description && (
        <p className={`mt-4 text-[#F5F5F5]/60 ${align === 'center' ? 'mx-auto max-w-2xl' : ''}`}>
          {description}
        </p>
      )}
      {showDivider && (
        <div
          className={`mt-6 h-px w-16 bg-[#DC2626] ${
            align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
          }`}
        />
      )}
      {children}
    </div>
  );
}
