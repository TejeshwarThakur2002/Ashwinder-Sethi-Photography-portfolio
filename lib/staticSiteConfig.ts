/**
 * Static Site Configuration
 * Replaces the former Sanity siteSettings singleton document.
 * Update values here whenever business details change.
 */

export const staticSiteConfig = {
  // ─── Studio Identity ──────────────────────────────────
  studioName: 'Shoot Studio by Ashwinder Sethi',
  tagline: 'Professional Photography & Creative Studio',

  // ─── Contact ──────────────────────────────────────────
  phone: '+91 9915200824',
  phoneLink: 'tel:+919915200824',
  email: 'ashwindersethis@gmail.com',
  emailLink: 'mailto:ashwindersethis@gmail.com',

  // ─── Social ───────────────────────────────────────────
  instagramHandle: '@ashwinder.sethi',
  instagramUrl: 'https://instagram.com/ashwinder.sethi',

  // ─── Address ──────────────────────────────────────────
  address: {
    line1: 'Shoot Studio',
    line2: 'F-9 Oasis Complex',
    line3: 'Guru Nanak Bhawan',
    city: 'Ludhiana',
    region: 'Punjab',
    postalCode: '141001',
    country: 'India',
    full: 'Shoot Studio, F-9 Oasis Complex, Guru Nanak Bhawan, Ludhiana, Punjab, 141001',
  },

  // ─── Maps ─────────────────────────────────────────────
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Oasis+Complex+Guru+Nanak+Bhawan+Ludhiana+Punjab',

  // ─── Business Hours ───────────────────────────────────
  hours: {
    weekdays: '10:00 AM - 8:00 PM',
    weekends: '11:00 AM - 6:00 PM',
  },
} as const;
