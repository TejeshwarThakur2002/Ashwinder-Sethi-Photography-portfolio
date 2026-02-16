import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { SectionHeading } from '@/components/ui';
import { ContactForm, StudioInfoPanel } from '@/components/contact';
import { PAGE_METADATA, generatePageMetadata } from '@/lib/seoConfig';
import { JsonLd, generateLocalBusinessSchema } from '@/lib/structuredData';

/**
 * Contact Page
 * Features contact form, studio information, and location map
 */

/**
 * Contact page metadata
 */
export const metadata: Metadata = generatePageMetadata({
  title: PAGE_METADATA.contact.title,
  description: PAGE_METADATA.contact.description,
  path: '/contact',
  keywords: PAGE_METADATA.contact.keywords,
});

export default function ContactPage() {
  // Include LocalBusiness schema on Contact page for business info
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <Header />
      <main id="main-content" className="min-h-screen bg-[#0F0F0F] pt-20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          {/* Page Header */}
          <SectionHeading
            eyebrow="Get in Touch"
            title="Contact Us"
            description="Have a project in mind? Let's create something beautiful together. Reach out to discuss your vision."
            align="center"
            as="h1"
          />

          {/* Main Content - Two Column Layout */}
          <section className="mt-16">
            <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
              {/* Contact Form - Takes more space */}
              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-white/10 bg-[#1C1C1C]/50 p-6 sm:p-8">
                  <h2 className="mb-6 font-playfair text-2xl font-semibold text-white">
                    Send a Message
                  </h2>
                  <ContactForm />
                </div>
              </div>

              {/* Studio Info Panel */}
              <aside className="lg:col-span-2">
                <div className="sticky top-28 rounded-2xl border border-white/10 bg-[#1C1C1C]/50 p-6 sm:p-8">
                  <StudioInfoPanel />
                </div>
              </aside>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
