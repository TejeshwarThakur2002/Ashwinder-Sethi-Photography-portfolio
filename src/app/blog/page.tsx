import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BlogIndexContent } from '@/components/blog';
import { getBlogPosts } from '@/lib/queries/blog';
import { PAGE_METADATA, generatePageMetadata } from '@/lib/seoConfig';

/**
 * Blog Index Page
 * Lists all blog posts fetched from Sanity CMS
 * Posts include: title, slug, cover image, excerpt, tags, published date
 */

/**
 * Blog index page metadata
 */
export const metadata: Metadata = generatePageMetadata({
  title: PAGE_METADATA.blog.title,
  description: PAGE_METADATA.blog.description,
  path: '/blog',
  keywords: PAGE_METADATA.blog.keywords,
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-[#0F0F0F] pt-24">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Blog Content — header + filters + grid (client component) */}
          <div className="mt-4">
            {posts.length > 0 ? (
              <BlogIndexContent initialPosts={posts} />
            ) : (
              <div className="rounded-xl border border-white/10 bg-[#1C1C1C] p-12 text-center">
                <p className="text-lg text-[#F5F5F5]/60">No blog posts yet</p>
                <p className="mt-2 text-sm text-[#F5F5F5]/40">
                  Check back soon for new stories and insights.
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
