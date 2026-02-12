import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import {
  AboutHero,
  AboutHighlights,
  AboutStorySection,
  JourneyTimeline,
  PhilosophySection,
  ConservationSection,
  AboutCTASection,
} from '@/components/about';
import { PAGE_METADATA, generatePageMetadata } from '@/lib/seoConfig';

/**
 * About Page
 * Tells Ashwinder's story: artistic background, career journey, photography passion
 * TODO: Replace static content with Sanity "about" document when CMS is integrated
 */

/**
 * About page metadata
 */
export const metadata: Metadata = generatePageMetadata({
  title: PAGE_METADATA.about.title,
  description: PAGE_METADATA.about.description,
  path: '/about',
  keywords: PAGE_METADATA.about.keywords,
});

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-[#0F0F0F] pt-20">
        {/* Hero Section */}
        <AboutHero />

        {/* Highlights Strip */}
        <AboutHighlights />

        {/* Story Sections */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* TODO: Replace static text with content from Sanity "about" document */}

          {/* Roots Section */}
          <AboutStorySection title="Roots in a Family of Artists" id="roots">
            <p>
              I come from an extended family of artists — two painters, a professional photographer,
              an architect, a musician, a singer, and a fashion designer. Growing up in such a
              creative atmosphere, I absorbed something from each one of them.
            </p>
            <p>
              Like many children in artistic families, I received my first camera from my
              grandfather. But unlike the instant love affair some photographers describe, my
              connection with photography took its own time to develop. The seeds were planted, but
              they needed years to bloom.
            </p>
          </AboutStorySection>

          {/* Early Life Section */}
          <AboutStorySection title="Finding My Path Beyond the Classroom" id="early-life">
            <p>
              I wasn&apos;t very good at studies, but I excelled in extracurricular activities. I
              earned a brown belt in karate, played badminton at the district level, and coached
              roller skating. I also play the musical keyboard.
            </p>
            <p>
              Yet, despite being surrounded by art from every direction, I never actively pursued it
              in my early years. There was always this creative energy inside me, but it found
              expression through movement, sport, and music rather than visual arts.
            </p>
          </AboutStorySection>

          {/* Journey Timeline */}
          <JourneyTimeline />

          {/* Travel and Camera Section */}
          <AboutStorySection title="Travel, Curiosity, and the Camera" id="travel">
            <p>
              That passion for photography arrived much later — when I started traveling. My
              curiosity about the world eventually led me back to the camera. It became the perfect
              tool to capture and preserve the places that fascinated me.
            </p>
            <p>
              At that time, photography was private and deeply personal. I wasn&apos;t interested in
              sharing my images; they were for me, and only me. Each frame was a memory, a moment
              frozen in time that I could revisit whenever I wanted.
            </p>
          </AboutStorySection>

          {/* Turning Point Section */}
          <AboutStorySection title="The Turning Point" id="turning-point">
            <p>
              For the longest time, I believed that turning my passion into my profession would
              destroy the passion itself. I had seen it happen to others — the joy fading as work
              took over what was once a source of escape.
            </p>
            <p className="rounded-lg border-l-4 border-[#DC2626] bg-[#1C1C1C]/50 py-4 pl-6 pr-4 text-xl italic text-white">
              I was wrong.
            </p>
            <p>
              Making photography my profession didn&apos;t diminish my love for it. Instead, it
              deepened my commitment to the craft and gave me the freedom to pursue the images that
              truly mattered to me.
            </p>
          </AboutStorySection>
        </div>

        {/* Philosophy Section */}
        <PhilosophySection />

        {/* Conservation Section */}
        <ConservationSection />

        {/* CTA Section */}
        <AboutCTASection />
      </main>
      <Footer />
    </>
  );
}
