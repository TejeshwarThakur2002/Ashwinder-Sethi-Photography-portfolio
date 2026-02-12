/**
 * Shared TypeScript Types for Ashwinder Sethi Photography
 * TODO: These types will eventually align with Sanity CMS schemas
 */

// ---------------------------------------------------------------------------
// Gallery (Sanity-powered)
// ---------------------------------------------------------------------------

/** Shape returned by the gallery GROQ query (raw Sanity response) */
export interface SanityGalleryImage {
  _id: string;
  title: string;
  slug: string | null;
  categorySlug: string | null;
  categoryTitle: string | null;
  image: {
    asset: {
      _id: string;
      url: string;
    };
    alt: string | null;
    hotspot?: { x: number; y: number };
  } | null;
  caption: string | null;
  location: string | null;
  orientation: 'landscape' | 'portrait' | 'square' | null;
  featured: boolean | null;
  order: number | null;
  aperture: string | null;
  shutterSpeed: string | null;
  iso: string | null;
  focalLength: string | null;
  shotDate: string | null;
  tags: string[] | null;
  _createdAt: string;
}

/** UI-facing photo type used by all gallery components */
export interface GalleryPhoto {
  id: string;
  title: string;
  slug: string;
  category: string;
  src: string;
  alt: string;
  caption?: string;
  location?: string;
  featured?: boolean;
  camera?: {
    brand?: string;
    lens?: string;
    aperture?: string;
    shutterSpeed?: string;
    iso?: string;
  };
  captureDate?: string;
  tags?: string[];
}

/** Category entry for the gallery filter bar */
export interface GalleryCategory {
  id: string;
  label: string;
  count?: number;
}

// ---------------------------------------------------------------------------
// Blog (Sanity-powered)
// ---------------------------------------------------------------------------

/** Portable Text block – generic array type from Sanity */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortableTextBlock = any;

/** SEO object embedded on blogPost (and other documents) */
export interface SanitySeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImageSource;
  canonicalUrl?: string;
  noIndex?: boolean;
}

/** Minimal Sanity image source for urlFor() */
export interface SanityImageSource {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string | null;
  hotspot?: { x: number; y: number };
}

/** Shape returned by the blog GROQ queries (raw Sanity response) */
export interface SanityBlogPost {
  _id: string;
  title: string;
  slug: string;
  coverImage: SanityImageSource | null;
  excerpt: string | null;
  body: PortableTextBlock[] | null;
  tags: string[] | null;
  categoryTitle: string | null;
  categorySlug: string | null;
  publishedAt: string | null;
  readingTimeMinutes: number | null;
  featured: boolean | null;
  priority: number | null;
  seo: SanitySeo | null;
  _updatedAt: string;
}

/** UI-facing blog post type used by all blog components */
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  coverImage: string;
  coverImageAlt: string;
  excerpt: string;
  body: PortableTextBlock[];
  tags: string[];
  category: string;
  publishedAt: string;
  readingTimeMinutes: number;
  featured: boolean;
  priority: number;
  seo: SanitySeo | null;
  updatedAt: string;
}
