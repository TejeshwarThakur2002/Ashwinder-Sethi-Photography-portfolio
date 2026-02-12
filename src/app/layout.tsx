import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Playfair_Display, Inter } from 'next/font/google';
import { ToastProvider } from '@/components/ui';
import AnalyticsListener from '@/components/AnalyticsListener';
import { GA_MEASUREMENT_ID } from '@/lib/ga';
import { SITE_URL, SITE_CONFIG, DEFAULT_IMAGES } from '@/lib/seoConfig';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

/**
 * Global metadata configuration for Shoot Studio
 * Individual pages can override these defaults using their own metadata export
 * TODO: Some values will be fetched from Sanity CMS site settings when integrated
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.shortName}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'photography studio',
    'professional photographer',
    'Ludhiana',
    'Punjab',
    'fashion photography',
    'portrait photography',
    'product photography',
    'food photography',
    'studio rental',
    'Ashwinder Sethi',
  ],
  authors: [{ name: SITE_CONFIG.author, url: SITE_URL }],
  creator: SITE_CONFIG.author,
  publisher: SITE_CONFIG.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_URL,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [
      {
        url: DEFAULT_IMAGES.og,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [DEFAULT_IMAGES.twitter],
    creator: '@ashwindersethi',
  },
  verification: {
    // TODO: Add verification codes when available
    // google: 'google-site-verification-code',
  },
  alternates: {
    canonical: SITE_URL,
  },
};

/**
 * Viewport configuration for responsive design
 */
export const viewport: Viewport = {
  themeColor: '#0F0F0F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-[#0F0F0F] text-white`}
      >
        {/* Skip to main content link for keyboard users */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <ToastProvider>{children}</ToastProvider>
        {GA_MEASUREMENT_ID && <AnalyticsListener />}
      </body>
    </html>
  );
}
