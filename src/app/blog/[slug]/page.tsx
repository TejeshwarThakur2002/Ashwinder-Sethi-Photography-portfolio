import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { BlogPostBody, RelatedPosts, ShareButtons } from '@/components/blog';
import {
  getBlogPostBySlug,
  getBlogSlugs,
  getRelatedPosts,
  formatPostDate,
} from '@/lib/queries/blog';
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';
import { generateBlogPostMetadata, SITE_URL, SITE_CONFIG } from '@/lib/seoConfig';
import { urlFor } from '@/lib/sanity.client';
import { JsonLd, generateArticleSchema } from '@/lib/structuredData';

/**
 * Blog Post Detail Page
 * Renders individual blog posts with rich Portable Text content from Sanity
 */

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate dynamic metadata for blog posts from Sanity data
 */
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: `Post Not Found | ${SITE_CONFIG.shortName}`,
      description: 'The requested blog post could not be found.',
    };
  }

  // Use SEO overrides from Sanity if available
  const seoTitle = post.seo?.metaTitle || post.title;
  const seoDescription = post.seo?.metaDescription || post.excerpt;
  const seoImage = post.seo?.ogImage
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : post.coverImage;

  return generateBlogPostMetadata({
    title: seoTitle,
    excerpt: seoDescription,
    slug: post.slug,
    coverImage: seoImage,
    publishedAt: post.publishedAt,
    author: SITE_CONFIG.author,
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  // Handle post not found
  if (!post) {
    notFound();
  }

  // Get related posts
  const relatedPosts = await getRelatedPosts(slug, 3);

  // Build canonical URL for sharing
  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  // Generate Article/BlogPosting JSON-LD for SEO
  const articleSchema = generateArticleSchema({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: SITE_CONFIG.author,
    tags: post.tags,
    category: post.category,
  });

  return (
    <>
      {/* Article JSON-LD Structured Data */}
      <JsonLd data={articleSchema} />
      <Header />
      <main id="main-content" className="min-h-screen bg-[#0F0F0F]">
        {/* Hero Section */}
        <section className="relative min-h-[max(60vh,400px)]">
          {/* Background image */}
          <div className="absolute inset-x-0 top-0 h-[60vh] min-h-[400px]">
            <img
              src={post.coverImage}
              alt={post.coverImageAlt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/40 via-[#0F0F0F]/70 to-[#0F0F0F]" />
          </div>

          {/* Content */}
          <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-28 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#F5F5F5]/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Stories
            </Link>

            {/* Post header */}
            <div className="mt-32 sm:mt-40">
              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#DC2626]/20 px-3 py-1 text-xs font-medium text-[#DC2626]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="font-playfair text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#F5F5F5]/60">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{SITE_CONFIG.author}</span>
                </div>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatPostDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingTimeMinutes} min read
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Lead paragraph / excerpt */}
          <p className="mb-8 text-xl leading-relaxed text-[#F5F5F5]/80">{post.excerpt}</p>

          {/* Rich Portable Text body from Sanity */}
          <BlogPostBody body={post.body} />

          {/* Author bio */}
          <div className="mt-12 flex items-start gap-4 rounded-xl border border-white/10 bg-[#1C1C1C] p-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#F5F5F5]/50">Written by</p>
              <p className="mt-1 font-playfair text-lg font-semibold text-white">
                {SITE_CONFIG.author}
              </p>
              <p className="mt-2 text-sm text-[#F5F5F5]/60">
                Professional photographer specializing in fashion, portrait, and commercial
                photography. Based in Ludhiana, Punjab.
              </p>
            </div>
          </div>

          {/* Share and CTA section */}
          <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-xl border border-white/10 bg-[#1C1C1C] p-6 sm:flex-row">
            <ShareButtons url={canonicalUrl} title={post.title} />

            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-[#DC2626] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#DC2626]/90"
            >
              Book a Session
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Related Posts */}
          <RelatedPosts posts={relatedPosts} />
        </article>
      </main>
      <Footer />
    </>
  );
}
