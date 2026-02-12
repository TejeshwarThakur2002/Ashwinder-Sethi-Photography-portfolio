/**
 * Centralized SEO Configuration for Shoot Studio by Ashwinder Sethi
 * All metadata values are defined here for consistency and easy updates
 * TODO: Consider moving some values to Sanity CMS site settings when integrated
 */

// =============================================================================
// BASE CONFIGURATION
// =============================================================================

/**
 * Base URL for the site - update before production launch
 * TODO: Replace with actual production domain
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shootstudio.in';

/**
 * Core site identity
 */
export const SITE_CONFIG = {
  name: 'Shoot Studio by Ashwinder Sethi',
  shortName: 'Shoot Studio',
  tagline: 'Professional Photography & Creative Studio',
  description:
    'Premium photography studio in Ludhiana offering fashion, portrait, food & product photography, talk show production, and studio rentals. Book your creative session today.',
  author: 'Ashwinder Sethi',
  locale: 'en_IN',
  language: 'en',
} as const;

/**
 * Business contact information
 * TODO: Sync with Sanity site settings when CMS is integrated
 */
export const BUSINESS_INFO = {
  phone: '+91 9915200824',
  email: 'hello@shootstudio.in',
  address: {
    street: 'Near Model Town Extension',
    city: 'Ludhiana',
    region: 'Punjab',
    postalCode: '141002',
    country: 'IN',
    full: 'Near Model Town Extension, Ludhiana, Punjab 141002, India',
  },
  hours: 'Mon-Sat: 10:00 AM - 8:00 PM',
  social: {
    instagram: 'https://instagram.com/ashwinder.sethi',
    // TODO: Add other social profiles when available
  },
} as const;

// =============================================================================
// DEFAULT IMAGES
// =============================================================================

/**
 * Default Open Graph images
 * TODO: Create dedicated OG images for each page type
 */
export const DEFAULT_IMAGES = {
  og: `${SITE_URL}/images/gallery/3K9A1765-Enhanced-NR.jpg`,
  twitter: `${SITE_URL}/images/gallery/3K9A1765-Enhanced-NR.jpg`,
  logo: `${SITE_URL}/logo.png`,
} as const;

// =============================================================================
// PAGE-SPECIFIC METADATA
// =============================================================================

/**
 * Pre-defined metadata for all static pages
 * TODO: Some of these will be fetched from Sanity CMS in the future
 */
export const PAGE_METADATA: Record<
  string,
  { title: string; description: string; keywords?: string[] }
> = {
  home: {
    title: 'Shoot Studio by Ashwinder Sethi | Professional Photography in Ludhiana',
    description:
      'Premium photography studio offering fashion, portrait, food & product photography, talk show production, and studio rentals in Ludhiana, Punjab. Book your creative session.',
    keywords: [
      'photography studio Ludhiana',
      'professional photographer Punjab',
      'fashion photography',
      'portrait photography',
      'product photography',
      'studio rental',
      'Ashwinder Sethi',
    ],
  },
  gallery: {
    title: 'Portfolio Gallery',
    description:
      "Explore the creative portfolio of Shoot Studio – featuring fashion editorials, stunning portraits, commercial product shots, and food photography from Ludhiana's premier studio.",
    keywords: [
      'photography portfolio',
      'fashion gallery',
      'portrait gallery',
      'commercial photography',
    ],
  },
  blog: {
    title: 'Stories & Insights',
    description:
      'Behind-the-scenes stories, photography tips, tutorials, and insights from professional photographer Ashwinder Sethi. Learn about fashion, portrait, and commercial photography.',
    keywords: [
      'photography blog',
      'photography tips',
      'behind the scenes',
      'photography tutorials',
    ],
  },
  about: {
    title: 'About Ashwinder Sethi',
    description:
      'Meet Ashwinder Sethi, a professional photographer based in Ludhiana, Punjab. Discover the story behind Shoot Studio and our passion for capturing creative moments.',
    keywords: [
      'Ashwinder Sethi',
      'photographer Ludhiana',
      'about Shoot Studio',
      'professional photographer',
    ],
  },
  contact: {
    title: 'Contact Us',
    description:
      "Get in touch with Shoot Studio in Ludhiana. Book a consultation, inquire about services, or visit our studio. We're here to bring your creative vision to life.",
    keywords: ['contact Shoot Studio', 'photography inquiry', 'book photographer Ludhiana'],
  },
} as const;

// =============================================================================
// METADATA HELPER FUNCTIONS
// =============================================================================

import type { Metadata } from 'next';

/**
 * Generate full page title with site name suffix
 */
export function getPageTitle(pageTitle: string): string {
  return `${pageTitle} | ${SITE_CONFIG.shortName}`;
}

/**
 * Generate canonical URL for a given path
 */
export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Generate complete metadata object for a page
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
  keywords = [],
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  const ogImage = image || DEFAULT_IMAGES.og;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.name,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@ashwindersethi',
    },
  };
}

/**
 * Generate metadata for blog posts
 * TODO: Integrate with Sanity CMS post data
 */
export function generateBlogPostMetadata({
  title,
  excerpt,
  slug,
  coverImage,
  publishedAt,
  author,
  tags = [],
}: {
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  publishedAt: string;
  author: string;
  tags?: string[];
}): Metadata {
  const canonicalUrl = getCanonicalUrl(`/blog/${slug}`);
  const ogImage = coverImage.startsWith('http') ? coverImage : `${SITE_URL}${coverImage}`;

  return {
    title: getPageTitle(title),
    description: excerpt,
    keywords: tags,
    authors: [{ name: author }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: excerpt,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: 'article',
      publishedTime: publishedAt,
      authors: [author],
      tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: excerpt,
      images: [ogImage],
    },
  };
}
