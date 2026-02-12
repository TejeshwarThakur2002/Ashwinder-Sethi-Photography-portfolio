# Ashwinder Sethi Photography – Frontend

A premium photography portfolio and storytelling blog built with Next.js and Sanity CMS.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **CMS**: Sanity Studio (embedded at `/studio`)
- **Hosting**: Firebase Hosting

## Prerequisites

- **Node.js**: v18.17.0 or higher (v20+ recommended)
- **npm**: v9+ (comes with Node.js)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd ashwinder-photography-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

> **Note**: `.env.local` is gitignored and should never be committed.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Required Environment Variables

See [`.env.example`](.env.example) for the full list. Key variables:

| Variable | Scope | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Public | Sanity dataset (e.g. `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Public | Sanity API version |
| `SANITY_WRITE_TOKEN` | Server-only | Write token for contact form submissions |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Public | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical site URL for SEO/OG images |

> **Warning**: Never commit `.env.local` — it is gitignored. Only `.env.example` (with placeholder values) should be tracked.

## Available Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start development server            |
| `npm run build`   | Build for production                 |
| `npm run start`   | Start production server              |
| `npm run lint`    | Run ESLint                           |
| `npm run lint:fix`| Run ESLint with auto-fix             |
| `npm run format`  | Format code with Prettier            |
| `npm run format:check` | Check formatting without changes |

## Project Structure

```
ashwinder-photography-frontend/
├── src/
│   └── app/              # Next.js App Router pages and layouts
├── components/           # Reusable UI components
├── lib/                  # Utility functions and shared logic
├── styles/               # Additional stylesheets
├── docs/                 # Project documentation
├── public/               # Static assets
├── .env.example          # Environment variable template
└── package.json
```

## Design System

| Token       | Value     | Usage                    |
| ----------- | --------- | ------------------------ |
| Rich Black  | `#0F0F0F` | Primary background       |
| Charcoal    | `#1C1C1C` | Secondary background     |
| Soft White  | `#FFFFFF` | Primary text             |
| Gold        | `#D4AF37` | Accent color             |
| Grey        | `#F5F5F5` | Subtle text/backgrounds  |

**Typography**: Playfair Display (headings) · Inter (body)

## Documentation

- [Project Notes](./docs/project-notes.md) – Summary of project scope and requirements

## Deployment

### Firebase Hosting

```bash
# Build and deploy in one step
npm run deploy

# Or deploy to a preview channel
npm run deploy:preview
```

Make sure `firebase.json` is configured and you are authenticated via `firebase login`.

### Other Hosts

Any platform that supports Next.js (Vercel, Netlify, etc.) can deploy this project. Set the environment variables listed above in the host's dashboard.

## License

Private – All rights reserved.
