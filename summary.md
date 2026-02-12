# Ashwinder Sethi Photography — Complete Project Summary

> **Purpose of this document:** This file contains every detail about the project — its architecture, tech stack, file structure, component hierarchy, data flow, design system, routing, SEO strategy, current status, and planned integrations. Feed this to any LLM (Claude, ChatGPT, etc.) and it will have full context to assist with any part of the codebase.

---

## 1. Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Ashwinder Sethi Photography / Shoot Studio |
| **Package Name** | `ashwinder-photography-frontend` |
| **Brand** | "Shoot Studio by Ashwinder Sethi" |
| **Domain (planned)** | `https://shootstudio.in` |
| **Location** | Ludhiana, Punjab, India |
| **Type** | Photography portfolio + storytelling blog + booking platform |
| **License** | Private — All rights reserved |

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js (App Router) | 16.0.6 |
| **Language** | TypeScript | ^5 |
| **UI Library** | React | 19.2.0 |
| **Styling** | Tailwind CSS | ^4 (via `@tailwindcss/postcss`) |
| **Animations** | Framer Motion | ^12.23.25 |
| **Icons** | Lucide React | ^0.555.0 |
| **Build Output** | Static export (`output: 'export'`) | — |
| **Hosting** | Firebase Hosting | Project: `ashwinder-sethi-portfolio` |
| **Linting** | ESLint 9 + eslint-config-next + Prettier | — |
| **React Compiler** | Enabled (`reactCompiler: true`) | babel-plugin-react-compiler 1.0.0 |
| **CMS (planned)** | Sanity | Not yet integrated |
| **Database/Auth (planned)** | Supabase | Not yet integrated |
| **Payments (planned)** | Stripe | Not yet integrated |
| **Email (planned)** | SendGrid or Resend | Not yet integrated |

### Key Next.js Configuration (`next.config.ts`)
- `output: 'export'` — Generates a fully static site into the `out/` directory.
- `reactCompiler: true` — Enables the experimental React Compiler for automatic memoization.
- `images.unoptimized: true` — Required for static export (no server-side image optimization).
- `trailingSlash: true` — Appends `/` to URLs for cleaner static hosting.

### Firebase Hosting Configuration (`firebase.json`)
- Serves from `out/` directory.
- SPA rewrite: all routes → `/index.html`.
- Aggressive caching headers (1 year, immutable) for images, JS/CSS, and fonts.

---

## 3. Project Structure

```
ashwinder-sethi-portfolio-main/
├── src/
│   └── app/                    # Next.js App Router — pages & layouts
│       ├── layout.tsx          # Root layout (fonts, metadata, ToastProvider)
│       ├── page.tsx            # Home page
│       ├── not-found.tsx       # Custom 404 page
│       ├── globals.css         # Global styles + design tokens + accessibility CSS
│       ├── about/page.tsx      # About page
│       ├── blog/
│       │   ├── page.tsx        # Blog index (list + search/filter)
│       │   └── [slug]/page.tsx # Blog post detail (dynamic route)
│       ├── booking/
│       │   ├── page.tsx        # Booking hub (service selection)
│       │   ├── summary/page.tsx        # Booking review before confirmation
│       │   └── confirmation/page.tsx   # Thank-you / confirmation page
│       ├── contact/page.tsx    # Contact form + studio info + map
│       ├── gallery/page.tsx    # Photo gallery with filters + lightbox
│       └── services/
│           ├── page.tsx        # Services hub (all services + pricing)
│           └── [slug]/page.tsx # Individual service detail + booking form
├── components/                 # Reusable React components (barrel-exported)
│   ├── about/                  # 7 components: AboutHero, AboutHighlights, AboutStorySection,
│   │                           #   JourneyTimeline, PhilosophySection, ConservationSection, AboutCTASection
│   ├── animated/               # AnimatedSection (scroll-triggered), MotionCard (hover lift)
│   ├── blog/                   # BlogCard, BlogList, BlogSearchFilters, BlogContentRenderer,
│   │                           #   RelatedPosts, ShareButtons, BlogIndexContent
│   ├── booking/                # BookingStepsIndicator, BookingSummaryCard, StudioContactBlock
│   ├── contact/                # ContactForm, StudioInfoPanel, LocationSection,
│   │                           #   DatePicker (contact-specific), TimePicker
│   ├── gallery/                # GalleryContent, GalleryFilters, GalleryGrid, GalleryItem, LightboxModal
│   ├── home/                   # Hero, FeaturedGallery, ServicesSection, LatestStory, AboutSection, SocialSection
│   ├── layout/                 # Header, Footer
│   ├── services/               # ServiceCard, ServiceList, ServiceDetailContent, DatePicker,
│   │                           #   TimeSlotPicker, BookingForm, BookingConfirmationModal,
│   │                           #   LimitedOfferBanner, StudioContactInfo
│   ├── ui/                     # Design system primitives: Button, Input, Textarea, Select,
│   │                           #   Card (Card/CardHeader/CardBody/CardFooter), Badge, SectionHeading,
│   │                           #   Modal, Toast (ToastProvider + useToast hook)
│   └── index.ts                # Master barrel re-export of all component groups
├── lib/                        # Utilities, data, and shared logic
│   ├── animations.ts           # Framer Motion variants, transitions, config constants
│   ├── bookingStore.ts         # Client-side booking state (in-memory + sessionStorage)
│   ├── heroImages.ts           # Hero slideshow image data
│   ├── mockPhotos.ts           # Gallery photo data (30+ photos with camera metadata)
│   ├── mockPosts.ts            # Blog post data (rich content blocks, 6+ full posts)
│   ├── mockServices.ts         # Service data (6 services with pricing, features, availability rules)
│   ├── seoConfig.ts            # Centralized SEO: site config, business info, page metadata,
│   │                           #   metadata generator functions
│   ├── structuredData.tsx      # JSON-LD schema generators (LocalBusiness, WebSite, Article, Breadcrumb)
│   └── types.ts                # Shared TypeScript types (BookingDetails, BookingStep, formatters)
├── docs/                       # Project documentation
│   ├── project-notes.md        # Scope summary
│   ├── accessibility.md        # WCAG 2.1 AA compliance guide
│   └── animations.md           # Animation system documentation
├── assets/logo/                # Logo SVGs (black + red variants)
├── public/                     # Static assets served at root
│   ├── images/gallery/         # All photography images (JPGs)
│   ├── ashwinder-sethi/        # Author headshot
│   ├── logo.png, logo-*.svg    # Logo files
│   ├── robots.txt, sitemap.xml # SEO files
│   └── file.svg, globe.svg, etc.
├── styles/                     # Additional stylesheets (currently empty, .gitkeep)
├── .vscode/settings.json       # Editor settings
├── package.json                # Dependencies & scripts
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── firebase.json               # Firebase Hosting configuration
├── .firebaserc                 # Firebase project alias
├── eslint.config.mjs           # ESLint flat config
├── postcss.config.mjs          # PostCSS (Tailwind)
├── .prettierrc / .prettierignore # Prettier config
└── README.md                   # Getting started guide
```

---

## 4. Path Aliases (tsconfig.json)

| Alias | Maps To |
|-------|---------|
| `@/*` | `./src/*` |
| `@/components/*` | `./components/*` |
| `@/lib/*` | `./lib/*` |

---

## 5. Routing & Pages

All pages use the Next.js App Router. Every page is a **Server Component** unless marked `'use client'`.

### Static Pages (Server Components)
| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Home — Hero slideshow, Featured Gallery, Services, Latest Story, About, Social |
| `/gallery` | `src/app/gallery/page.tsx` | Photo portfolio with category filtering and lightbox |
| `/services` | `src/app/services/page.tsx` | All services hub with pricing, category highlights, booking info |
| `/services/[slug]` | `src/app/services/[slug]/page.tsx` | Individual service detail with inline booking form (uses `generateStaticParams`) |
| `/blog` | `src/app/blog/page.tsx` | Blog index with search and tag filtering |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Full blog post with content renderer, author bio, share, related posts (uses `generateStaticParams`) |
| `/about` | `src/app/about/page.tsx` | Biography, timeline, philosophy, conservation, CTA |
| `/contact` | `src/app/contact/page.tsx` | Contact form, studio info panel, location/map section |
| `/booking` | `src/app/booking/page.tsx` | Booking hub — "How It Works" steps + service selection list |

### Client-Side Pages (`'use client'`)
| Route | File | Description |
|-------|------|-------------|
| `/booking/summary` | `src/app/booking/summary/page.tsx` | Review booking details before confirmation (reads from bookingStore) |
| `/booking/confirmation` | `src/app/booking/confirmation/page.tsx` | Thank-you page with booking reference and next steps |
| `not-found` | `src/app/not-found.tsx` | Custom 404 with CTAs to go home or view services |

### Dynamic Routes with `generateStaticParams`
- `/services/[slug]` — Generates pages for: `fashion`, `portrait`, `food-and-beverages`, `product-shoot`, `talk-show`, `rental-studio`
- `/blog/[slug]` — Generates pages for all blog post slugs from `mockPosts`

---

## 6. Design System

### Color Palette
| Token | Hex | CSS Variable | Usage |
|-------|-----|-------------|-------|
| Rich Black | `#0F0F0F` | `--color-rich-black` | Primary background |
| Charcoal | `#1C1C1C` | `--color-charcoal` | Secondary background, cards |
| Soft White | `#FFFFFF` | `--color-soft-white` | Primary text |
| Red | `#DC2626` | `--color-red` | Accent, CTAs, active states, focus rings |
| Grey | `#F5F5F5` | `--color-grey` | Subtle text, muted backgrounds |

> **Note:** The README and project-notes reference Gold (`#D4AF37`) as an accent color, but the actual implementation uses Red (`#DC2626`) throughout. The design was updated post-planning.

### Typography
| Font | Variable | Usage |
|------|----------|-------|
| **Playfair Display** | `--font-playfair` | Headings, display text, brand elements |
| **Inter** | `--font-inter` / `--font-sans` | Body text, UI elements, navigation |

Both loaded via `next/font/google` with `display: 'swap'` for performance.

### UI Component Library (`components/ui/`)
All custom-built, no external UI library (no shadcn/ui). Components:
- **Button** — Variants: `primary` (red), `secondary` (outline), `ghost`. Sizes: `sm`, `md`, `lg`. Supports `leftIcon`, `isLoading`, `fullWidth`.
- **Input** — Styled text input with label, error state, `aria-invalid`/`aria-describedby`.
- **Textarea** — Multi-line input with same patterns as Input.
- **Select** — Styled dropdown with label and error state.
- **Card** — Compound component: `Card`, `CardHeader`, `CardBody`, `CardFooter`. Variants: `default`, `bordered`.
- **Badge** — Small label/tag component.
- **SectionHeading** — Reusable section header with eyebrow text, title, description. Supports `as` prop for heading level (`h1`-`h6`).
- **Modal** — Dialog overlay with focus trap, escape-to-close, body scroll lock.
- **Toast** — Context-based toast notification system (`ToastProvider` + `useToast` hook).

---

## 7. Component Architecture

### Layout Components
- **Header** — Fixed floating header with glassmorphism (`bg-white/10 backdrop-blur-2xl`), hide-on-scroll-down behavior, responsive mobile hamburger menu with ARIA attributes. Nav links: Home, Gallery, Services, Blog, About, Contact + "Book Now" CTA.
- **Footer** — 4-column grid: Brand + social, Quick Links, Services, Contact Info. Includes copyright and Privacy/Terms links.

### Home Page Sections (in order)
1. **Hero** — Full-screen image slideshow (5 images, 6s interval, crossfade via Framer Motion AnimatePresence). Manual navigation arrows + dot pagination. Keyboard navigation (← →). Pauses on tab blur. Respects `prefers-reduced-motion`. CTAs: "View Gallery" + "Book a Session".
2. **FeaturedGallery** — Portfolio preview grid with select photos.
3. **ServicesSection** — Service teaser cards linking to `/services`.
4. **LatestStory** — Featured blog post preview.
5. **AboutSection** — Mini biography section.
6. **SocialSection** — Instagram feed placeholder.

### Gallery System
- **GalleryContent** (client component) — Orchestrates filters, grid, and lightbox state.
- **GalleryFilters** — Category filter buttons: All, Wildlife, Landscape, Black & White, Macro.
- **GalleryGrid** — Responsive grid layout for filtered photos.
- **GalleryItem** — Individual photo card with hover effects.
- **LightboxModal** — Full-screen image viewer with: `role="dialog"`, `aria-modal`, focus trap, keyboard navigation (Escape, Arrow keys), focus restoration on close, body scroll prevention.

### Blog System
- **BlogIndexContent** (client component) — Manages search/filter state, renders BlogSearchFilters + BlogList.
- **BlogSearchFilters** — Text search input + tag/category filter chips.
- **BlogList** — Renders array of BlogCard components.
- **BlogCard** — Post preview card with cover image, tags, title, excerpt, date, read time.
- **BlogContentRenderer** — Renders rich content blocks (paragraph, heading, image, quote, list) from mock data. Designed to be replaced with Sanity Portable Text renderer.
- **RelatedPosts** — Shows 3 related posts at bottom of blog detail page.
- **ShareButtons** — Social sharing links (URL + title).

### Services & Booking System
- **ServiceList** — Renders ServiceCard components for all services.
- **ServiceCard** — Compact card with image, name, price, category, CTA.
- **ServiceDetailContent** (client component, 14KB) — Full service detail page with: image gallery, description, features list, "What's Included" list, and an embedded booking form section with DatePicker + TimeSlotPicker + BookingForm.
- **DatePicker** — Custom calendar component for date selection (respects availability rules, disables past dates and unavailable days).
- **TimeSlotPicker** — Displays available time slots for selected date (generated from `generateTimeSlots()` in mockServices).
- **BookingForm** — Client details form: name, email, phone, notes. Validates fields. On submit, saves to `bookingStore` and navigates to `/booking/summary`.
- **BookingConfirmationModal** — Success modal shown after booking.
- **LimitedOfferBanner** — Promotional banner ("Book your session for a free portfolio shoot").
- **StudioContactInfo** — Sidebar component with studio phone, Instagram, address.
- **BookingStepsIndicator** — Visual step indicator (Details → Summary → Confirmation).
- **BookingSummaryCard** — Displays all booking details in a review card.
- **StudioContactBlock** — Compact contact info for booking pages.

### About Page Components
- **AboutHero** — Full-width hero for the about page.
- **AboutHighlights** — Stats/highlights strip.
- **AboutStorySection** — Reusable section wrapper accepting `title`, `id`, and `children`.
- **JourneyTimeline** — Visual timeline of Ashwinder's career journey.
- **PhilosophySection** — Photography philosophy statement.
- **ConservationSection** — Conservation/nature commitment section.
- **AboutCTASection** — Call-to-action at bottom of about page.

### Contact Page Components
- **ContactForm** — Full form with: name, email, phone, service interest (select), preferred date (DatePicker), preferred time (TimePicker), message (textarea). Client-side validation with `aria-invalid`, `aria-describedby`, `aria-live="polite"`.
- **StudioInfoPanel** — Business hours, phone, email, Instagram, address.
- **LocationSection** — Map/directions section.
- **DatePicker** / **TimePicker** — Contact-specific date and time pickers (separate from services DatePicker).

### Animation Components
- **AnimatedSection** — Scroll-triggered reveal wrapper using Framer Motion `whileInView`. Supports animations: `fadeInUp`, `fadeIn`, `fadeInLeft`, `fadeInRight`, `scaleIn`, `none`. Props: `delay`, `threshold`, `once`.
- **MotionCard** — Card wrapper with hover lift effect using `cardHover` variants.

---

## 8. Data Layer (Current: Mock Data)

All data is currently **hardcoded mock data** in `lib/`. Every mock file has `TODO` comments indicating it will be replaced with Sanity CMS queries.

### Mock Photos (`lib/mockPhotos.ts`)
- 30+ photos with: id, title, slug, category (wildlife/landscape/blackwhite/macro), src, alt, caption, location, camera metadata (brand, lens, aperture, shutter speed, ISO), capture date, tags.
- Categories: Wildlife, Landscape, Black & White, Macro.
- Helper functions: relies on direct array import (no getter function needed since GalleryContent imports directly).

### Mock Blog Posts (`lib/mockPosts.ts`)
- 6+ full blog posts with: id, slug, title, excerpt, rich content blocks array, cover image, published date, tags, category, author object, reading time, featured flag.
- Content block types: `paragraph`, `heading` (levels 1-3), `image` (src/alt/caption), `quote` (content/author), `list` (items array).
- Helper functions: `getAllPosts()`, `getPostBySlug(slug)`, `getRelatedPosts(slug, count)`, `formatPostDate(date)`.

### Mock Services (`lib/mockServices.ts`)
- 6 services:
  1. **Fashion Photography** — ₹15,000, 3-4 hours
  2. **Portrait Photography** — ₹8,000, 1-2 hours
  3. **Food & Beverages** — ₹12,000, 2-3 hours
  4. **Product Shoot** — ₹10,000, 2-3 hours
  5. **Talk Show Production** — ₹20,000, 3-4 hours (video category)
  6. **Rental Studio** — ₹2,000/hour (rental category)
- Each service has: id, slug, name, category, price, deposit, duration, descriptions, features array, whatsIncluded array, image, gallery images, availability rules, popular flag, tags.
- Availability rules define: days of week, open/close times, slot duration, break times.
- `generateTimeSlots(service, date)` — Creates mock time slots based on availability rules with random availability.
- Helper functions: `getAllServices()`, `getServiceBySlug(slug)`, `getServicesByCategory(category)`, `getPopularServices()`, `formatPrice(price)` (INR format), `getCategoryLabel(category)`.
- Also exports: `studioInfo` (name, phone, Instagram, address), `limitedOffer` (promotional banner data).

### Hero Images (`lib/heroImages.ts`)
- 5 curated images for the home hero slideshow with id, src, alt, caption.
- Helper functions: `getNextIndex()`, `getPrevIndex()` (wrap-around navigation).

---

## 9. Booking Flow (Current: Frontend-Only Demo)

The booking flow works end-to-end as a frontend demo using client-side state:

1. **Service Selection** — User browses `/services` or `/booking`, clicks a service.
2. **Service Detail** (`/services/[slug]`) — Views service info, scrolls to booking section. Selects a date on the calendar → time slots appear → selects a time → fills in the booking form (name, email, phone, notes).
3. **Form Submission** — `BookingForm` validates fields, creates a `BookingDetails` object, saves it via `setBookingDetails()` in `bookingStore.ts`, then navigates to `/booking/summary`.
4. **Booking Summary** (`/booking/summary`) — Client component reads booking from `getBookingDetails()` (in-memory + sessionStorage fallback). Displays `BookingSummaryCard`. User clicks "Confirm Booking".
5. **Confirmation** — `confirmBooking()` moves data from `pendingBooking` to `confirmedBooking` in sessionStorage. Redirects to `/booking/confirmation`.
6. **Confirmation Page** (`/booking/confirmation`) — Shows success message, booking reference (mock), details, "What Happens Next" steps, and studio contact info.

### Booking Store (`lib/bookingStore.ts`)
- In-memory variable `currentBooking` + `sessionStorage` (for page refresh resilience).
- Functions: `setBookingDetails()`, `getBookingDetails()`, `clearBookingDetails()`, `confirmBooking()`, `getConfirmedBooking()`.
- Labeled as temporary — will be replaced by Supabase database storage.

### BookingDetails Type (`lib/types.ts`)
```typescript
interface BookingDetails {
  serviceSlug: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: string;
  serviceCategory: string;
  date: string;        // ISO date string
  time: string;        // e.g., "14:00"
  timeLabel: string;   // e.g., "2:00 PM"
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  hasPortfolioOffer?: boolean;
  depositAmount?: number;
}
```

---

## 10. SEO & Structured Data

### SEO Configuration (`lib/seoConfig.ts`)
- **SITE_URL**: `https://shootstudio.in` (configurable via `NEXT_PUBLIC_SITE_URL` env var).
- **SITE_CONFIG**: name, shortName, tagline, description, author, locale (`en_IN`).
- **BUSINESS_INFO**: phone, email, full address, hours, social links.
- **PAGE_METADATA**: Pre-defined title + description + keywords for every page (home, gallery, services, blog, about, contact, booking, bookingSummary, bookingConfirmation).
- **Helper functions**: `generatePageMetadata()` — generates full Next.js `Metadata` object with OpenGraph, Twitter Card, canonical URL, robots directives. `generateBlogPostMetadata()` — generates article-type metadata for blog posts.

### Structured Data / JSON-LD (`lib/structuredData.tsx`)
- **`generateLocalBusinessSchema()`** — `ProfessionalService` schema (used on Home + Contact pages).
- **`generateWebsiteSchema()`** — `WebSite` schema (used on Home page).
- **`generateArticleSchema()`** — `BlogPosting` schema (used on each blog post page).
- **`generateBreadcrumbSchema()`** — `BreadcrumbList` schema (available but not yet used).
- **`JsonLd` component** — Renders `<script type="application/ld+json">` for embedding schemas in pages.

### Per-Page SEO Implementation
- Every page exports a `metadata` object or `generateMetadata()` function.
- Root layout sets `metadataBase`, default title template (`%s | Shoot Studio`), global description, keywords, robots, icons, manifest, OpenGraph, Twitter Card.
- Dynamic routes (`/blog/[slug]`, `/services/[slug]`) generate metadata dynamically from post/service data.

---

## 11. Animation System

### Configuration (`lib/animations.ts`)
- **ANIMATION_CONFIG** — Central timing constants: hero slideshow interval (6s), slide duration (1.2s), standard durations (fast: 0.2s, normal: 0.4s, slow: 0.6s), easing presets (smooth, snappy, gentle, bouncy), scroll reveal settings (threshold: 0.15, triggerOnce: true), stagger delays.
- **Transition presets**: `smooth`, `gentle`, `quick`, `spring`.
- **Variant library**: `fadeInUp`, `fadeInDown`, `fadeIn`, `fadeInLeft`, `fadeInRight`, `scaleIn`, `heroImageVariants`, `heroTextContainer`, `heroTextItem`, `staggerContainer`, `cardHover`, `buttonHover`.
- **Utility**: `createStaggerContainer()`, `prefersReducedMotion()`.

### Reduced Motion Support
- CSS: `@media (prefers-reduced-motion: reduce)` kills all animation/transition durations.
- JS: `useReducedMotion()` hook from Framer Motion disables hero auto-advance and crossfade.

---

## 12. Accessibility (WCAG 2.1 AA)

Comprehensive accessibility implementation:
- **Skip to content** link on every page (visible on keyboard focus).
- **Semantic HTML** — `<header role="banner">`, `<nav aria-label>`, `<main id="main-content">`, `<footer>`, `<section>`, `<article>`, `<aside>`.
- **Heading hierarchy** — Single `h1` per page, logical `h2`/`h3` nesting.
- **Keyboard navigation** — All interactive elements focusable. Focus indicators: `2px solid var(--color-red)`. Mobile menu: `aria-expanded`, `aria-controls`. Lightbox: Escape, Arrow keys. Hero: Arrow keys for slides.
- **Focus management** — Lightbox: focus trap + focus restoration. Modal: focus trap + body scroll lock.
- **Form accessibility** — `<label htmlFor>`, `aria-invalid`, `aria-describedby` for errors, `aria-live="polite"` for announcements.
- **Images** — All meaningful images have descriptive `alt`. Decorative images use `aria-hidden="true"`.
- **Touch targets** — 44x44px minimum on touch devices via `@media (pointer: coarse)`.
- **Reduced motion** — Full support at CSS and JS levels.

---

## 13. Styling Approach

### Global CSS (`src/app/globals.css`)
- Imports Tailwind CSS v4 via `@import 'tailwindcss'`.
- Defines CSS custom properties (`:root` variables) for the color palette.
- `@theme inline` block registers Tailwind theme tokens from CSS variables.
- Smooth scrolling, reduced motion media query, body styling.
- Skip-to-content link styles, focus-visible styles, mouse-vs-keyboard focus detection.
- Touch target enforcement on mobile, GPU acceleration for fixed/sticky elements, backdrop-blur optimization, image rendering optimization.
- `.font-playfair` utility class.

### Tailwind Usage Patterns
- Colors are used directly as hex values in classes (e.g., `bg-[#0F0F0F]`, `text-[#DC2626]`, `border-white/10`).
- Opacity modifiers used extensively (e.g., `text-[#F5F5F5]/60`, `bg-white/10`).
- Glassmorphism pattern: `bg-white/10 backdrop-blur-2xl border border-white/20`.
- Responsive: Mobile-first with `sm:`, `md:`, `lg:` breakpoints.
- Dark theme only — `<html lang="en" className="dark">`, all styling assumes dark background.

---

## 14. Scripts & Development

| Script | Command | Purpose |
|--------|---------|---------|
| Dev server | `npm run dev` | Start Next.js dev server (localhost:3000) |
| Build | `npm run build` | Production build (generates `out/` for static export) |
| Start | `npm run start` | Start production server |
| Lint | `npm run lint` | Run ESLint |
| Lint fix | `npm run lint:fix` | ESLint with auto-fix |
| Format | `npm run format` | Prettier format all files |
| Format check | `npm run format:check` | Check formatting without changes |
| Deploy | `npm run deploy` | Build + Firebase deploy |
| Preview deploy | `npm run deploy:preview` | Build + Firebase preview channel |

---

## 15. Planned Integrations (TODOs)

The codebase is extensively annotated with `TODO` comments marking planned integrations:

### Sanity CMS
- Replace all `mock*.ts` files with GROQ queries to Sanity collections.
- Collections planned: Photos, Categories, Blog Posts, Booking Services, Site Settings.
- Blog content will use Sanity Portable Text (replacing current `ContentBlock` type).
- Service data, gallery photos, hero images, navigation, and footer content will all be CMS-driven.

### Supabase
- **Auth**: Admin dashboard login, optional client accounts.
- **Database**: Bookings table, ServiceAvailability, ContactMessages, Audit Logs, Users.
- **Real-time availability**: Replace `generateTimeSlots()` random availability with actual booking data.
- **Booking persistence**: Replace `bookingStore.ts` sessionStorage with database writes.

### Stripe
- **Checkout**: After booking summary, create Stripe Checkout session.
- **Webhooks**: Handle payment success/failure, update booking status in Supabase.
- **Deposit system**: Services have `depositAmount` field already defined.

### Other Planned Features
- **Email**: SendGrid or Resend for booking confirmations and contact form submissions.
- **Image Protection**: Disable right-click, hotlink blocking, optional watermarking.
- **Admin Dashboard**: Content, booking, and user management.
- **Commenting**: Supabase Realtime for blog comments.
- **Search**: Algolia or Typesense for site-wide search.
- **Analytics**: GA, Plausible, or Firebase Analytics.
- **i18n**: Localization support.
- **PWA**: Offline support.

---

## 16. Key Architectural Decisions

1. **Static Export** — The site builds to static HTML/CSS/JS (`output: 'export'`). No server-side rendering at runtime. All dynamic behavior is client-side. This enables simple Firebase Hosting deployment.

2. **Components Outside `src/`** — `components/` and `lib/` directories are at project root (not inside `src/`). Path aliases (`@/components/*`, `@/lib/*`) handle imports. `src/` only contains the `app/` directory.

3. **Barrel Exports** — Every component group has an `index.ts` barrel file. A master `components/index.ts` re-exports everything. Import pattern: `import { Hero } from '@/components/home'`.

4. **Server Components by Default** — Pages are server components. Client components (`'use client'`) are used only when needed: Hero (slideshow state), GalleryContent (filter state), BookingForm/Summary/Confirmation (form state, navigation), ContactForm (form state), Header (scroll/menu state).

5. **Mock Data Pattern** — All data files export typed arrays and getter functions matching the API that Sanity GROQ queries will eventually provide. This makes the future CMS migration a matter of swapping data sources without changing component interfaces.

6. **No State Management Library** — No Redux, Zustand, or Jotai. State is managed via:
   - React `useState`/`useEffect` for component state.
   - `bookingStore.ts` module-level variable + sessionStorage for cross-page booking state.
   - Props drilling for parent-child data flow.

7. **Custom UI Components** — All UI primitives are hand-built. No shadcn/ui, Radix, or Headless UI. Components follow consistent patterns with variant/size props and ARIA support.

---

## 17. Business Context

**Shoot Studio** is a professional photography studio based in Ludhiana, Punjab, India, owned by **Ashwinder Sethi**. The studio offers:

- **Fashion Photography** (₹15,000+) — Editorial, lookbook, commercial shoots
- **Portrait Photography** (₹8,000+) — Headshots, personal branding, family portraits
- **Food & Beverages Photography** (₹12,000+) — Restaurant menus, social media, packaging
- **Product Photography** (₹10,000+) — E-commerce, catalog, lifestyle shots
- **Talk Show / Podcast Production** (₹20,000+) — Multi-camera 4K video, audio, editing
- **Studio Rental** (₹2,000/hour) — Fully equipped space with lighting, backdrops, amenities

**Studio Address**: F-9 Oasis Complex, Guru Nanak Bhawan, Ludhiana, Punjab 141001
**Phone**: +91 9915200824
**Instagram**: @ashwinder.sethi
**Hours**: Mon-Sat 10:00 AM - 8:00 PM

The about page tells Ashwinder's personal story — growing up in a family of artists, finding photography through travel, and ultimately making it his profession. The site emphasizes a dark, cinematic aesthetic with a premium feel.

---

## 18. Current Project Status

**Phase: Frontend Complete (Static/Mock Data)**

What's done:
- All 10+ pages fully built and styled
- Complete component library (50+ components)
- Full booking flow (frontend demo with sessionStorage)
- Blog system with rich content rendering
- Gallery with category filtering and lightbox
- SEO metadata and JSON-LD structured data on all pages
- Accessibility (WCAG 2.1 AA) implemented
- Animation system with Framer Motion
- Responsive design (mobile-first)
- Firebase Hosting configured and ready to deploy

What's next (in order of priority):
1. Sanity CMS integration (replace all mock data)
2. Supabase setup (auth, bookings database, real-time availability)
3. Stripe integration (payment processing)
4. Email service (booking confirmations, contact form)
5. Admin dashboard
6. Image protection
7. Analytics
8. PWA / offline support
