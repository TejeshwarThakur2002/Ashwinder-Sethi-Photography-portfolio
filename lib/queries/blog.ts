import { sanityClient, urlFor } from '@/lib/sanity.client';
import type { SanityBlogPost, BlogPost } from '@/lib/types';

// ---------------------------------------------------------------------------
// GROQ Queries
// ---------------------------------------------------------------------------

/**
 * All published blog posts for the index page.
 * Ordered: featured first → priority ascending → publishedAt descending.
 * Filters out drafts automatically.
 */
const blogPostsQuery = /* groq */ `
  *[_type == "blogPost" && !(_id in path("drafts.**"))] | order(featured desc, priority asc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    coverImage {
      asset-> { _id, url },
      alt,
      hotspot
    },
    excerpt,
    body,
    tags,
    "categoryTitle": category->title,
    "categorySlug": category->slug.current,
    publishedAt,
    readingTimeMinutes,
    featured,
    priority,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset-> { _id, url },
        alt,
        hotspot
      },
      canonicalUrl,
      noIndex
    },
    _updatedAt
  }
`;

/**
 * Single blog post by slug – includes full body for the detail page.
 */
const blogPostBySlugQuery = /* groq */ `
  *[_type == "blogPost" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    "slug": slug.current,
    coverImage {
      asset-> { _id, url },
      alt,
      hotspot
    },
    excerpt,
    body,
    tags,
    "categoryTitle": category->title,
    "categorySlug": category->slug.current,
    publishedAt,
    readingTimeMinutes,
    featured,
    priority,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset-> { _id, url },
        alt,
        hotspot
      },
      canonicalUrl,
      noIndex
    },
    _updatedAt
  }
`;

/**
 * Fetch all published blog post slugs (for generateStaticParams).
 */
const blogSlugsQuery = /* groq */ `
  *[_type == "blogPost" && !(_id in path("drafts.**"))].slug.current
`;

// ---------------------------------------------------------------------------
// Mappers
// ---------------------------------------------------------------------------

/** Map a raw Sanity blog document to the UI-facing BlogPost shape */
function toBlogPost(doc: SanityBlogPost): BlogPost {
  return {
    _id: doc._id,
    title: doc.title,
    slug: doc.slug,
    coverImage: doc.coverImage ? urlFor(doc.coverImage).url() : '',
    coverImageAlt: doc.coverImage?.alt ?? doc.title,
    excerpt: doc.excerpt ?? '',
    body: doc.body ?? [],
    tags: doc.tags ?? [],
    category: doc.categoryTitle ?? 'Uncategorized',
    publishedAt: doc.publishedAt ?? doc._updatedAt,
    readingTimeMinutes: doc.readingTimeMinutes ?? 5,
    featured: doc.featured ?? false,
    priority: doc.priority ?? 999,
    seo: doc.seo ?? null,
    updatedAt: doc._updatedAt,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch all published blog posts, ready for the index page.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const docs: SanityBlogPost[] = await sanityClient.fetch(blogPostsQuery);
  return docs.map(toBlogPost);
}

/**
 * Fetch a single published blog post by its slug, or null if not found.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const doc: SanityBlogPost | null = await sanityClient.fetch(blogPostBySlugQuery, { slug });
  return doc ? toBlogPost(doc) : null;
}

/**
 * Fetch the latest published blog post (for the home page).
 */
export async function getLatestBlogPost(): Promise<BlogPost | null> {
  const latestQuery = /* groq */ `
    *[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0] {
      _id,
      title,
      "slug": slug.current,
      coverImage {
        asset-> { _id, url },
        alt,
        hotspot
      },
      excerpt,
      body,
      tags,
      "categoryTitle": category->title,
      "categorySlug": category->slug.current,
      publishedAt,
      readingTimeMinutes,
      featured,
      priority,
      seo {
        metaTitle,
        metaDescription,
        ogImage {
          asset-> { _id, url },
          alt,
          hotspot
        },
        canonicalUrl,
        noIndex
      },
      _updatedAt
    }
  `;
  const doc: SanityBlogPost | null = await sanityClient.fetch(latestQuery);
  return doc ? toBlogPost(doc) : null;
}

/**
 * Fetch all published blog post slugs (for static generation).
 */
export async function getBlogSlugs(): Promise<string[]> {
  const slugs: string[] = await sanityClient.fetch(blogSlugsQuery);
  return slugs.filter(Boolean);
}

/**
 * Get related posts by shared tags (excluding the current post).
 */
export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts();
  const currentPost = allPosts.find((p) => p.slug === currentSlug);
  if (!currentPost) return [];

  const scoredPosts = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
      return { post, score: sharedTags.length };
    })
    .sort((a, b) => b.score - a.score);

  return scoredPosts.slice(0, limit).map((item) => item.post);
}

/**
 * Extract all unique tags from an array of posts.
 */
export function getAllTagsFromPosts(posts: BlogPost[]): string[] {
  const tagsSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

/**
 * Format a date string for display.
 */
export function formatPostDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
