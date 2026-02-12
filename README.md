# Ashwinder Sethi Photography – Frontend

A premium photography portfolio, storytelling blog, and booking platform built with Next.js.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **CMS**: Sanity (planned)
- **Database/Auth**: Supabase (planned)
- **Payments**: Stripe (planned)
- **Hosting**: Firebase Hosting (planned)

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

Open [http://localhost:3000](http://localhost:3000) to see the placeholder page.

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

This project is designed for Firebase Hosting / Firebase App Hosting. Deployment instructions will be added as the project progresses.

## License

Private – All rights reserved.
