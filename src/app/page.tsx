import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Hero, FeaturedGallery, LatestStory, AboutSection, SocialSection } from '@/components/home';
import { getFeaturedGalleryImages } from '@/lib/queries/gallery';
import { getLatestBlogPost } from '@/lib/queries/blog';
import { PAGE_METADATA, generatePageMetadata } from '@/lib/seoConfig';
import { JsonLd, generateLocalBusinessSchema, generateWebsiteSchema } from '@/lib/structuredData';

/**
 * Home Page - Shoot Studio by Ashwinder Sethi
 * Landing page with all main sections composing the brand experience
 */

/**
 * Home page metadata - optimized for search and social sharing
 */
export const metadata: Metadata = generatePageMetadata({
  title: PAGE_METADATA.home.title,
  description: PAGE_METADATA.home.description,
  path: '/',
  keywords: PAGE_METADATA.home.keywords,
});

export default async function Home() {
  // Fetch featured gallery images and latest blog post from Sanity
  const [featuredImages, latestPost] = await Promise.all([
    getFeaturedGalleryImages(),
    getLatestBlogPost(),
  ]);

  // Generate structured data for the home page
  const localBusinessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      {/* Structured Data - LocalBusiness and WebSite schemas */}
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={websiteSchema} />

      <Header />
      <main id="main-content" className="min-h-screen">
        {/* Hero Section - Full-width cinematic intro */}
        <Hero />

        {/* Featured Gallery - Portfolio preview grid */}
        <FeaturedGallery images={featuredImages} />

        {/* Latest Story - Blog highlight */}
        <LatestStory post={latestPost} />

        {/* About Section - Mini bio */}
        <AboutSection />

        {/* Social Section - Instagram feed placeholder */}
        <SocialSection />
      </main>
      <Footer />
    </>
  );
}
