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

## Deployment (Firebase Hosting)

This project deploys to **Firebase Hosting** using the [web frameworks](https://firebase.google.com/docs/hosting/frameworks/nextjs) integration, which runs Next.js SSR via Cloud Functions. This is required because the app has server-side routes (`/api/contact`, `/studio`).

### Prerequisites

```bash
npm install -g firebase-tools   # Install Firebase CLI (once)
firebase login                  # Authenticate (once)
firebase experiments:enable webframeworks   # Enable Next.js support (once)
```

### Firebase project binding

The repo is bound to project `ashwinder-sethi-portfolio` via `.firebaserc`. To change it:

```bash
firebase projects:list          # See your projects
firebase use --add              # Select a different project; use alias "default"
```

### Environment variables

Copy `.env.example` to `.env.production` and fill in real values:

```bash
cp .env.example .env.production
```

| Variable | Required | Scope | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Public | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Public | Sanity dataset (e.g. `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | Public | Sanity API version (defaults to `2024-01-01`) |
| `SANITY_WRITE_TOKEN` | Yes | **Secret** | Server-only write token for `/api/contact` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Recommended | Public | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public | Canonical URL (e.g. `https://<project>.web.app`) |

> **Warning**: `.env.production` is gitignored and must never be committed. Only `.env.example` (placeholder values) is tracked.

Next.js loads `.env.production` automatically during `next build`, and Firebase's web frameworks integration runs the build as part of `firebase deploy`.

### Local deploy (CLI)

```bash
# One-time: initialize hosting if you haven't already
firebase init hosting
# → Accept the detected Next.js framework when prompted

# Deploy (builds + deploys in one step)
npm run deploy

# Or deploy to a preview channel
npm run deploy:preview
```

Your site will be live at `https://<project-id>.web.app`.

### GitHub Actions deploy (optional)

1. **Connect repo** — In Firebase Console → Hosting, click "Set up GitHub integration". Firebase auto-creates a workflow file and a service account secret.

2. **Add secrets** — In GitHub → repo Settings → Secrets → Actions, create:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_WRITE_TOKEN`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - `NEXT_PUBLIC_SITE_URL`

3. **Wire secrets into the workflow** — Edit the generated `.github/workflows/firebase-hosting-merge.yml` and add an `env:` block to the build step:

   ```yaml
   - name: Build
     run: npm run build
     env:
       NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_SANITY_PROJECT_ID }}
       NEXT_PUBLIC_SANITY_DATASET: ${{ secrets.NEXT_PUBLIC_SANITY_DATASET }}
       NEXT_PUBLIC_SANITY_API_VERSION: ${{ secrets.NEXT_PUBLIC_SANITY_API_VERSION }}
       SANITY_WRITE_TOKEN: ${{ secrets.SANITY_WRITE_TOKEN }}
       NEXT_PUBLIC_GA_MEASUREMENT_ID: ${{ secrets.NEXT_PUBLIC_GA_MEASUREMENT_ID }}
       NEXT_PUBLIC_SITE_URL: ${{ secrets.NEXT_PUBLIC_SITE_URL }}
   ```

4. Push to `main` — the action builds and deploys automatically.

### Sanity CORS

After your first deploy, add your Firebase Hosting domain(s) to Sanity's allowed CORS origins:

1. Go to [manage.sanity.io](https://manage.sanity.io) → your project → API → CORS origins.
2. Add `https://<project-id>.web.app` (and any custom domain).
3. Enable **Allow credentials** if you use authenticated Studio requests.

This is required for Sanity Studio at `/studio` to work on the deployed domain.

### Other hosts

Any platform that supports Next.js (Vercel, Netlify, etc.) can deploy this project. Set the environment variables listed above in the host's dashboard.

## License

Private – All rights reserved.
