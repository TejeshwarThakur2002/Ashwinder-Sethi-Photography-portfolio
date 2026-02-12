import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { GalleryContent } from '@/components/gallery';
import { PAGE_METADATA, generatePageMetadata } from '@/lib/seoConfig';
import { getGalleryImages } from '@/lib/queries/gallery';
import type { GalleryPhoto } from '@/lib/types';

/**
 * Gallery Page
 * Displays the photography portfolio with category filtering and lightbox.
 * Data is fetched from Sanity CMS on the server.
 */

/**
 * Gallery page metadata
 */
export const metadata: Metadata = generatePageMetadata({
  title: PAGE_METADATA.gallery.title,
  description: PAGE_METADATA.gallery.description,
  path: '/gallery',
  keywords: PAGE_METADATA.gallery.keywords,
});

export default async function GalleryPage() {
  let photos: GalleryPhoto[] = [];
  try {
    photos = await getGalleryImages();
  } catch (error) {
    console.error('[Gallery] Failed to fetch images from Sanity:', error);
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-[#0F0F0F] pt-24">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Gallery Content - Client Component with header, filtering and lightbox */}
          <div className="mt-4">
            {photos.length > 0 ? (
              <GalleryContent photos={photos} />
            ) : (
              <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed border-[#DC2626]/20 bg-[#1C1C1C]/50">
                <p className="text-center text-[#F5F5F5]/50">
                  Gallery coming soon.
                  <br />
                  <span className="text-sm">No images have been published yet.</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
