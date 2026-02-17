import { sanityClient, urlFor } from '@/lib/sanity.client';
import type { SanityGalleryImage, GalleryPhoto } from '@/lib/types';

/**
 * GROQ query for all published gallery images.
 * Ordered: featured first → manual order ascending → newest first.
 * Dereferences the category to get its slug and title.
 */
const galleryQuery = /* groq */ `
  *[_type == "galleryImage"] | order(featured desc, order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "categoryTitle": category->title,
    image {
      asset-> { _id, url },
      alt,
      hotspot
    },
    caption,
    location,
    orientation,
    featured,
    order,
    aperture,
    shutterSpeed,
    iso,
    focalLength,
    shotDate,
    tags,
    _createdAt
  }
`;

/** Map a raw Sanity document to the UI-facing GalleryPhoto shape */
function toGalleryPhoto(doc: SanityGalleryImage): GalleryPhoto {
  return {
    id: doc._id,
    title: doc.title,
    slug: doc.slug ?? doc._id,
    category: doc.categorySlug ?? 'uncategorized',
    src: doc.image ? urlFor(doc.image).url() : '',
    alt: doc.image?.alt ?? doc.title,
    caption: doc.caption ?? undefined,
    location: doc.location ?? undefined,
    featured: doc.featured ?? false,
    camera: {
      aperture: doc.aperture ?? undefined,
      shutterSpeed: doc.shutterSpeed ?? undefined,
      iso: doc.iso ?? undefined,
      lens: doc.focalLength ?? undefined,
    },
    captureDate: doc.shotDate ?? undefined,
    tags: doc.tags ?? undefined,
  };
}

/**
 * Fetch all published gallery images from Sanity and return them
 * as GalleryPhoto[] ready for the UI.
 */
export async function getGalleryImages(): Promise<GalleryPhoto[]> {
  const docs: SanityGalleryImage[] = await sanityClient.fetch(galleryQuery);
  return docs.map(toGalleryPhoto);
}

/**
 * GROQ query for featured gallery images only.
 * Returns the top 3 images marked as featured, sorted by manual order
 * then newest first. Excludes drafts.
 */
const featuredGalleryQuery = /* groq */ `
  *[_type == "galleryImage" && featured == true && !(_id in path("drafts.**"))] | order(order asc, _createdAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "categoryTitle": category->title,
    image {
      asset-> { _id, url },
      alt,
      hotspot
    },
    caption,
    location,
    orientation,
    featured,
    order,
    aperture,
    shutterSpeed,
    iso,
    focalLength,
    shotDate,
    tags,
    _createdAt
  }
`;

/**
 * Fetch featured gallery images from Sanity (up to 3) for the
 * Home page "Featured Work" section.
 */
export async function getFeaturedGalleryImages(): Promise<GalleryPhoto[]> {
  const docs: SanityGalleryImage[] = await sanityClient.fetch(featuredGalleryQuery);
  return docs.map(toGalleryPhoto);
}

/**
 * GROQ query for all gallery categories.
 * Returns unique categories with slugs and titles.
 */
const categoriesQuery = /* groq */ `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "count": count(*[_type == "galleryImage" && references(^._id)])
  }
`;

/**
 * Fetch all gallery categories from Sanity.
 */
export async function getGalleryCategories(): Promise<{ id: string; label: string; slug: string; count: number }[]> {
  const docs = await sanityClient.fetch(categoriesQuery);
  return docs.map((doc: any) => ({
    id: doc.slug ?? doc._id,
    label: doc.title,
    slug: doc.slug ?? doc._id,
    count: doc.count ?? 0,
  }));
}
