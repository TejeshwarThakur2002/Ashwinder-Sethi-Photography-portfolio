import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

/**
 * Reusable Sanity client for fetching published data.
 * No draft/preview handling — production reads only.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  fetch: { next: { revalidate: 0 } },
});

/** Image URL builder instance */
const builder = createImageUrlBuilder(sanityClient);

/**
 * Generate an image URL from a Sanity image source.
 * Usage: urlFor(image).width(800).url()
 */
export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
