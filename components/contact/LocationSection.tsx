import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { staticSiteConfig } from '@/lib/staticSiteConfig';

/**
 * Location Section Component
 * Displays map placeholder and directions
 * TODO: Integrate real Google Maps embed when API key is available
 */

const STUDIO_LOCATION = {
  address: staticSiteConfig.address.full,
  googleMapsUrl: staticSiteConfig.googleMapsUrl,
};

export default function LocationSection() {
  return (
    <section className="mt-16">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <span className="text-sm font-medium uppercase tracking-widest text-[#DC2626]">
          Find Us
        </span>
        <h2 className="mt-2 font-playfair text-3xl font-semibold text-white">Studio Location</h2>
        <p className="mx-auto mt-3 max-w-xl text-[#F5F5F5]/60">
          Visit our studio in the heart of Ludhiana for consultations, shoots, or to explore our
          rental space.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1C1C1C]">
        {/* Map Placeholder */}
        {/* TODO: Replace this placeholder with an actual Google Maps embed */}
        {/* Example embed code:
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
        */}
        <div className="relative h-[300px] bg-[#0F0F0F] sm:h-[400px]">
          {/* Stylized Map Background */}
          <div className="absolute inset-0 opacity-30">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid lines to simulate map */}
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-white/20"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
              {/* Simulated roads */}
              <line
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white/30"
              />
              <line
                x1="50"
                y1="0"
                x2="50"
                y2="100"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white/30"
              />
              <line
                x1="20"
                y1="0"
                x2="80"
                y2="100"
                stroke="currentColor"
                strokeWidth="1"
                className="text-white/20"
              />
            </svg>
          </div>

          {/* Center Pin */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
            <div className="relative">
              <div className="absolute -inset-4 animate-ping rounded-full bg-[#DC2626]/20" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#DC2626] shadow-lg shadow-[#DC2626]/30">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="absolute left-1/2 top-full h-4 w-0.5 -translate-x-1/2 bg-[#DC2626]" />
            </div>
          </div>

          {/* Overlay with location info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent p-6 pt-16">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="text-center sm:text-left">
                <h3 className="font-medium text-white">Shoot Studio by Ashwinder Sethi</h3>
                <p className="mt-1 text-sm text-[#F5F5F5]/60">{STUDIO_LOCATION.address}</p>
              </div>
              <a
                href={STUDIO_LOCATION.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Directions Info */}
        <div className="border-t border-white/10 p-6">
          <h3 className="mb-4 font-medium text-white">How to Reach Us</h3>
          <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white/5 p-4">
              <p className="font-medium text-[#DC2626]">By Car</p>
              <p className="mt-1 text-[#F5F5F5]/70">
                Located near Guru Nanak Bhawan. Free parking available at the complex.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <p className="font-medium text-[#DC2626]">Landmarks</p>
              <p className="mt-1 text-[#F5F5F5]/70">
                Look for Oasis Complex, F-9 block. We&apos;re on the ground floor.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4 sm:col-span-2 lg:col-span-1">
              <p className="font-medium text-[#DC2626]">Need Help?</p>
              <p className="mt-1 text-[#F5F5F5]/70">
                Call us at{' '}
                <a href={staticSiteConfig.phoneLink} className="text-white hover:underline">
                  {staticSiteConfig.phone}
                </a>{' '}
                for directions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
