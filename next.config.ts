import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // NOTE: `output: 'export'` was removed to support the Sanity Studio dynamic
  // route at /studio. For Firebase static hosting deploys, a dedicated build
  // script or deployment pipeline will be configured in a future step.

  /* Enable React compiler */
  reactCompiler: true,

  /* Image optimization - use unoptimized for now (was needed for static export) */
  images: {
    unoptimized: true,
  },

  /* Trailing slash for cleaner URLs */
  trailingSlash: true,
};

export default nextConfig;
