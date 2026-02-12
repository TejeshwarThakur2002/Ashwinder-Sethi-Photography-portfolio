'use client';

import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui';
import { Home, Camera, ArrowLeft } from 'lucide-react';

/**
 * Custom 404 Not Found Page
 * Displays when a user navigates to a non-existent route
 */

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#0F0F0F] px-4 pt-20">
        <div className="text-center">
          {/* 404 Display */}
          <div className="relative">
            <span className="font-playfair text-[10rem] font-bold leading-none text-white/5 sm:text-[15rem]">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="h-16 w-16 text-[#DC2626] sm:h-24 sm:w-24" />
            </div>
          </div>

          {/* Message */}
          <h1 className="mt-4 font-playfair text-3xl font-semibold text-white sm:text-4xl">
            Page Not Found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[#F5F5F5]/60">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
            you back on track.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/">
              <Button variant="primary" size="lg" leftIcon={<Home className="h-4 w-4" />}>
                Go Home
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="secondary" size="lg" leftIcon={<Camera className="h-4 w-4" />}>
                View Services
              </Button>
            </Link>
          </div>

          {/* Back link */}
          <button
            onClick={() => window.history.back()}
            className="mt-8 inline-flex items-center gap-2 text-sm text-[#F5F5F5]/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back to previous page
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
