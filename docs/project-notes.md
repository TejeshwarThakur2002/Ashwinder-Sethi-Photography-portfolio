# Ashwinder Sethi Photography Website – Project Notes

Summary of key points from `scope.md`.

## Project Goals

- Premium photography portfolio and storytelling platform
- Booking system for studio rentals, podcast rooms, outdoor shoots, and 1:1 coaching
- No e-commerce print shop at this stage
- Dark, cinematic design with rich black and gold palette

## Main Pages

1. **Home** – Hero, featured photos grid, blog preview, booking teasers, mini about, Instagram feed
2. **Gallery (Portfolio)** – Category filters, masonry grid, lightbox, image protection
3. **Booking Hub** – Service cards, detail pages, calendar picker, Stripe checkout, confirmation
4. **Blog (Stories)** – Post listing with filters, individual posts with rich text and galleries
5. **About** – Biography, timeline, achievements, CTA
6. **Contact** – Form with spam protection, map, social links
7. **Admin Dashboard** – Content, booking, and user management

## Core Features

- **Image Protection**: Disable right-click, hotlink blocking, optional watermarking
- **Booking Flow**: Select service → pick date/time → enter details → pay via Stripe → confirmation email
- **Authentication**: Supabase Auth for admin and optional client accounts
- **SEO**: SSR/SSG, dynamic OG tags, sitemap, structured data
- **Accessibility**: WCAG 2.0 compliance, keyboard navigation, ARIA labels

## Tech Stack

| Layer          | Technology                              |
| -------------- | --------------------------------------- |
| Frontend       | Next.js (App Router), TypeScript, React |
| Styling        | Tailwind CSS                            |
| CMS            | Sanity (photos, blog, services, settings) |
| Database/Auth  | Supabase (bookings, users, comments)    |
| Payments       | Stripe (checkout, webhooks)             |
| Hosting        | Firebase Hosting / Firebase App Hosting |
| Email          | SendGrid or Resend                      |

## Design System

- **Colors**: Rich black (#0F0F0F), charcoal (#1C1C1C), soft white (#FFFFFF), gold (#D4AF37), grey (#F5F5F5)
- **Typography**: Playfair Display (headings), Inter (body)
- **Layout**: 12-column grid, 80px section padding, 24px gaps

## Data Models (Sanity)

- Photos, Categories, Blog Posts, Booking Services, Bookings, Site Settings

## Data Models (Supabase)

- Users, Bookings, ServiceAvailability, ContactMessages, Audit Logs

## Enhancements to Consider

- Commenting system (Supabase Realtime)
- Site-wide search (Algolia or Typesense)
- Analytics (GA, Plausible, or Firebase Analytics)
- Localization / i18n
- CRM integration (Mailchimp, HubSpot)
- PWA / offline support
