/**
 * Structured Data (JSON-LD) Generators for Shoot Studio
 * Provides schema.org structured data for SEO and rich results
 * TODO: Integrate with Sanity CMS data when available
 */

import React from 'react';
import { SITE_URL, SITE_CONFIG, BUSINESS_INFO, DEFAULT_IMAGES } from './seoConfig';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface LocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': 'ProfessionalService' | 'LocalBusiness';
  '@id': string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email?: string;
  image: string;
  logo: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  openingHours?: string;
  priceRange?: string;
  sameAs: string[];
}

export interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article' | 'BlogPosting';
  '@id': string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': 'Person';
    name: string;
    url?: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
  keywords?: string;
  articleSection?: string;
  wordCount?: number;
}

export interface WebsiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  '@id': string;
  name: string;
  description: string;
  url: string;
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

// =============================================================================
// SCHEMA GENERATORS
// =============================================================================

/**
 * Generate LocalBusiness/ProfessionalService schema for the studio
 * This should be included on the Home page and optionally on Contact/About pages
 * TODO: Add geo coordinates when available
 */
export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_URL,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    image: DEFAULT_IMAGES.og,
    logo: DEFAULT_IMAGES.logo,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.region,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    // TODO: Add geo coordinates when available
    // geo: {
    //   '@type': 'GeoCoordinates',
    //   latitude: 30.9010,
    //   longitude: 75.8573,
    // },
    openingHours: 'Mo-Sa 10:00-20:00',
    priceRange: '₹₹-₹₹₹',
    sameAs: [
      BUSINESS_INFO.social.instagram,
      // TODO: Add more social profiles when available
    ],
  };
}

/**
 * Generate WebSite schema for the main site
 * Include on Home page for site-wide search features
 */
export function generateWebsiteSchema(): WebsiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_URL,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_IMAGES.logo,
      },
    },
    // TODO: Enable site search when search functionality is implemented
    // potentialAction: {
    //   '@type': 'SearchAction',
    //   target: `${SITE_URL}/search?q={search_term_string}`,
    //   'query-input': 'required name=search_term_string',
    // },
  };
}

/**
 * Generate Article/BlogPosting schema for blog posts
 * TODO: Integrate with Sanity CMS post data
 */
export function generateArticleSchema({
  title,
  excerpt,
  slug,
  coverImage,
  publishedAt,
  updatedAt,
  author,
  tags = [],
  category,
  wordCount,
}: {
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags?: string[];
  category?: string;
  wordCount?: number;
}): ArticleSchema {
  const postUrl = `${SITE_URL}/blog/${slug}`;
  const imageUrl = coverImage.startsWith('http') ? coverImage : `${SITE_URL}${coverImage}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${postUrl}/#article`,
    headline: title,
    description: excerpt,
    image: imageUrl,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: author,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_IMAGES.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: tags.join(', '),
    articleSection: category,
    wordCount,
  };
}

/**
 * Generate BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; path?: string }>
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path ? `${SITE_URL}${item.path}` : undefined,
    })),
  };
}

// =============================================================================
// RENDER HELPERS
// =============================================================================

/**
 * Render JSON-LD script tag for structured data
 * Use this in page components to embed structured data
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

/**
 * Combine multiple schemas into an array for rendering
 */
export function combineSchemas(...schemas: object[]): object[] {
  return schemas;
}
