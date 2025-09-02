# Monorepo: Website + Dashboard (final)

A production‑grade setup for a **marketing Website** (SSR/SEO) and an **Admin Dashboard** (SPA) in one place. The website is optimized for discovery and content; the dashboard is optimized for data-rich internal UX. Both are isolated and deploy independently.

> **Stack choices**: Website → **Next.js 14 (App Router)** + Tailwind. Dashboard → **React + Vite + TypeScript + Tailwind**.

---

## Table of contents

* [Apps & scope](#apps--scope)
* [Tech stack](#tech-stack)
* [3rd‑party catalog](#3rd-party-catalog)
* [Directory layout](#directory-layout)
* [Getting started](#getting-started)
* [Environment variables](#environment-variables)
* [Scripts](#scripts)
* [Architecture](#architecture)
* [RBAC (roles & permissions)](#rbac-roles--permissions)
* [Feature → service map](#feature--service-map)
* [Testing](#testing)
* [Build & deploy](#build--deploy)
* [Troubleshooting](#troubleshooting)
* [Roadmap](#roadmap)
* [License](#license)

---

## Apps & scope

### apps/website (Marketing site)

* **Purpose**: SEO, landing, docs/blog, legal pages, public status/news.
* **Tech**: Next.js 14 (App Router), Tailwind, MDX (optional), next-seo, next-sitemap.
* **Why**: SSR/SSG for speed + SEO; edge‑ready rendering; internationalization.

### apps/admin (Dashboard)

* **Purpose**: Authenticated app for operations & analytics.
* **Tech**: React 18 + Vite + TypeScript + Tailwind, React Router, Redux Toolkit, TanStack Query, Axios.
* **Why**: Fast SPA, data‑heavy UI, flexible state management, mocks for DX.

---

## Tech stack

### Shared

* **TypeScript 5**
* **Tailwind CSS**
* **Sentry** (errors), **PostHog** (product analytics)
* **Axios** (HTTP), **Zod** (validation)

### apps/admin (Dashboard)

* **Framework & tooling**: `react`, `react-dom`, `vite`, `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, `vite-tsconfig-paths`
* **Routing**: `react-router-dom`
* **State (app)**: `@reduxjs/toolkit`, `react-redux`
* **Server state**: `@tanstack/react-query`
* **HTTP**: `axios`
* **Forms + validation**: `react-hook-form`, `zod`, `@hookform/resolvers`
* **Table & virtualization**: `@tanstack/react-table`, `@tanstack/react-virtual`
* **Charts**: `recharts`
* **Date/time**: `date-fns`
* **Icons**: `lucide-react`
* **UI primitives (headless)**: `@radix-ui/react-*` (optional)
* **HLS playback**: `hls.js`
* **i18n (optional)**: `react-i18next`, `i18next`
* **Testing**: `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `playwright`
* **Observability**: `@sentry/react`, `@sentry/vite-plugin`, `posthog-js`

### apps/website (Next.js)

* **Framework & tooling**: `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `postcss`, `autoprefixer`
* **Content**: MDX optional → `next-mdx-remote` or `contentlayer`
* **SEO**: `next-seo`, `next-sitemap`
* **i18n**: `next-intl` or `next-i18next`
* **Forms/validation**: `react-hook-form`, `zod`
* **HTTP**: `axios`
* **Analytics & errors**: `@sentry/nextjs`, `posthog-js`
* **Testing**: `vitest` (or Jest), `@testing-library/react`, `playwright`

---

## 3rd‑party catalog

> Pick the *MVP* option first; swap later if needed.

* **Auth** (choose one):

  * **Firebase Auth** (email/password + Google/Apple/Twitch) → `firebase`
  * **API‑first (JWT + refresh)** with Passport (server), OAuth strategies
* **DB & Storage**:

  * **Supabase** (Postgres + Auth alt + Realtime + Storage) → `@supabase/supabase-js`
  * **PostgreSQL + Prisma**, cache/queues with **Redis** (`ioredis`)
  * **Object storage**: S3 / Cloudflare R2, uploaders via `@uppy/*` (optional)
* **Realtime & chat**: **Pusher** (`pusher-js`) / **Ably** (`ably`) / **Firebase** / \*\*Supabase Realtime\`

  * Turnkey chat: **GetStream** → `stream-chat`, `stream-chat-react`
* **Push notifications**: **FCM** (via `firebase` messaging)
* **Email**: **Resend** / **Postmark** / **SendGrid** + **React Email** or **MJML**
* **Video & VOD**: **Mux** (ingest, VOD, analytics) + `hls.js`; alternatives: Livepeer, AWS IVS, Agora, Daily
* **Images / CDN**: **Cloudinary**
* **Search**: **Algolia** (`algoliasearch`) or **Meilisearch** (`meilisearch`)
* **Payments**: **Stripe** → `@stripe/stripe-js` (web), `stripe` (server)
* **Feature flags**: **Flagsmith** / **Unleash** (or PostHog flags)
* **Moderation**: **Perspective API**; profanity pre‑filter `bad-words`
* **Maps**: **Mapbox** (`mapbox-gl`)
* **DevOps**: Hosting (Vercel/Netlify), Backend (Fly.io/Render/AWS), CDN/WAF (Cloudflare), CI (GitHub Actions), Secrets (Doppler/1Password/GitHub Secrets)

---

## Directory layout

```
.
├─ apps/
│  ├─ website/                 # Next.js (marketing)
│  │  ├─ app/                  # App Router pages
│  │  ├─ components/
│  │  ├─ content/              # MDX or CMS mappers
│  │  ├─ lib/                  # seo.ts, analytics.ts, cms.ts
│  │  ├─ public/
│  │  ├─ styles/
│  │  ├─ tests/
│  │  └─ next.config.js
│  └─ admin/                   # Vite + React (dashboard)
│     ├─ src/
│     │  ├─ app/ (providers, router, layouts)
│     │  ├─ api/ (endpoints, queries, schemas)
│     │  ├─ components/ (common + ui)
│     │  ├─ content/ (dashboard-content.ts)
│     │  ├─ features/ (auth, matches, teams, ...)
│     │  ├─ lib/ (axios, env, permissions, sentry, posthog)
│     │  ├─ store/ (redux)
│     │  ├─ styles/
│     │  ├─ utils/
│     │  └─ __mocks__/ (msw)
│     └─ vite.config.ts
├─ packages/                   # optional shared code
│  ├─ ui/                      # design system pkg (if shared)
│  ├─ config/                  # eslint, tsconfig
│  └─ tsconfig/                # base tsconfig
├─ .github/workflows/ci.yml
├─ turbo.json (optional)
├─ pnpm-workspace.yaml
└─ README.md (this file)
```

> Prefer **pnpm workspaces** for easy dependency sharing and isolated app builds.

---

## Getting started

### 1) Prerequisites

* Node **≥ 18.17**
* pnpm **≥ 9**

### 2) Install (workspace root)

```bash
pnpm i
```

### 3) Configure envs

* Copy `apps/admin/.env.example` → `apps/admin/.env`
* Copy `apps/website/.env.example` → `apps/website/.env`

### 4) Run

```bash
# in parallel panes
pnpm --filter @app/website dev
pnpm --filter @app/admin dev
```

(Or use `pnpm -w dev` if you add a root script to start both via concurrently.)

### 5) Build

```bash
pnpm --filter @app/website build
pnpm --filter @app/admin build
```

---

## Environment variables

> **Prefix rules**: Vite exposes only vars starting with `VITE_`. Next.js exposes only `NEXT_PUBLIC_` to the browser; keep secrets server‑side.

### Common services (put in each app as needed)

| Service    | Key                                                                                   | Example                            | Notes                           |
| ---------- | ------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------- |
| Sentry     | `VITE_SENTRY_DSN` / `SENTRY_DSN`                                                      | `https://xxx.ingest.sentry.io/123` | Vite vs Next prefixes           |
| PostHog    | `VITE_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_KEY`                                        | `phc_xxx`                          | Optionally `POSTHOG_HOST`       |
| API Base   | `VITE_API_BASE_URL` / `NEXT_PUBLIC_API_BASE_URL`                                      | `http://localhost:3000`            | Axios base URL                  |
| Algolia    | `VITE_ALGOLIA_APP_ID`, `VITE_ALGOLIA_SEARCH_KEY` / Next equivalents                   |                                    | Search (public search key only) |
| Cloudinary | `VITE_CLOUDINARY_CLOUD_NAME` (+ server `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) |                                    | Upload presets on server        |

### apps/admin/.env.example (Vite)

```
VITE_API_BASE_URL=http://localhost:3000
VITE_SENTRY_DSN=
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=https://eu.posthog.com
# Realtime
VITE_PUSHER_KEY=
VITE_ABLY_KEY=
# Search
VITE_ALGOLIA_APP_ID=
VITE_ALGOLIA_SEARCH_KEY=
# Firebase / FCM (optional)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_VAPID_KEY=
# Supabase (optional)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### apps/website/.env.example (Next.js)

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com
# SEO
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Algolia (public search)
NEXT_PUBLIC_ALGOLIA_APP_ID=
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=
# Firebase (if using FCM for web push)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_VAPID_KEY=
```

---

## Scripts

**Root (workspace examples)**

```json
{
  "scripts": {
    "build": "pnpm -r build",
    "dev": "echo 'Run per app: pnpm --filter @app/website dev & pnpm --filter @app/admin dev'",
    "lint": "pnpm -r lint",
    "typecheck": "pnpm -r typecheck",
    "test": "pnpm -r test"
  }
}
```

**apps/admin**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "msw": "node ./src/__mocks__/server.ts"
  }
}
```

**apps/website**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "sitemap": "next-sitemap"
  }
}
```

---

## Architecture

### Website (Next.js)

* **App Router** with route groups for `/`, `/blog`, `/docs`, `/legal`.
* **SEO** via `next-seo` defaults + per‑page overrides; sitemap & robots.
* **Content** via MDX/Contentlayer or CMS (e.g., Headless CMS) mappers in `lib/cms.ts`.
* **Analytics** and **error boundary** set up via `@sentry/nextjs` and `posthog-js`.
* **i18n** with `next-intl` (Arabic/English supported).

### Dashboard (Vite SPA)

* **Layouts**: `DashboardLayout` (Sidebar + Navbar + <Outlet/>), `AuthLayout`, `RootLayout`.
* **Routing**: lazy routes; guards: `ProtectedRoute`, `RoleGuard`.
* **State**: Redux Toolkit for app state; React Query for server state.
* **HTTP**: Axios with auth header + refresh on 401; Zod‑validated schemas.
* **UI Kit**: Tailwind primitives; optional Radix components; DataTable with tanstack‑table & virtual rows.
* **Observability**: Sentry + PostHog providers; MSW handlers for fast dev.

---

## RBAC (roles & permissions)

**Main roles**: `guest`, `viewer`, `team_manager`, `moderator`, `admin`, `owner`.

* `viewer`: follow/notify/comment, manage own profile & devices, view own analytics.
* `team_manager`: CRUD for assigned team(s): teams/players/matches/streams/VOD metadata; team analytics export.
* `moderator`: moderate chat/comments/reports.
* `admin`: global CMS, users/roles, announcements, webhooks retry, audit view, push test, low‑risk flags.
* `owner`: everything admin + high‑risk ops (feature flags CRUD, search reindex, impersonate, push topics).

Use `src/content/rbac.json` (dashboard) to drive menu visibility and action guards.

---

## Feature → service map

* **Auth & sessions**: Firebase Auth **or** API‑first (JWT + refresh)
* **Teams/Players/Matches DB**: Postgres (Prisma) **or** Supabase
* **Streams/VOD**: Mux → playback via `hls.js`
* **Live chat**: Pusher/Ably (or Firebase/Supabase Realtime)
* **Push**: FCM
* **Email**: Resend (transactional)
* **Payments**: Stripe (Customer Portal)
* **Search**: Algolia (instant search in Discover)
* **Images**: Cloudinary (upload + transforms)
* **Analytics**: PostHog; **Errors**: Sentry; **Flags**: Flagsmith/Unleash; **Moderation**: Perspective API

---

## Testing

* **Unit**: Vitest for utils, reducers, hooks
* **Component**: Testing Library + MSW
* **E2E**: Playwright (auth flow, route guards, critical pages)
* **Accessibility**: `@axe-core/playwright` smoke
* **Performance**: Lighthouse CI on website

---

## Build & deploy

### Website

* Deploy to **Vercel** (Next.js); set envs in project settings.
* Enable ISR/SSG as needed; generate `sitemap.xml` with `next-sitemap`.
* Add custom headers & **CSP** for analytics and API origins.

### Dashboard

* Deploy static bundle to **Vercel**/**Netlify**/**S3+CloudFront**.
* Ensure SPA fallback → `index.html` for 404 rewrites.
* CSP allowlist for API base, Sentry, PostHog, Mux, Pusher/Ably, Algolia, Cloudinary.

### CI

* GitHub Actions: typecheck, lint, unit + E2E (on PR), build; upload source maps to Sentry.

---

## Troubleshooting

* **White screen**: check env parsing (`lib/env.ts`) or missing `NEXT_PUBLIC_*`/`VITE_*` keys.
* **401 loop** (dashboard): validate `/auth/refresh` and cookie/token domain.
* **CORS**: allow `http://localhost:5173` (admin) and `http://localhost:3000` (website dev).
* **HLS issues**: ensure CORS on Mux/IVS; serve `.m3u8` with correct headers.
* **Search errors**: public Algolia key only on client; admin key server‑side.

---

## Roadmap

* Storybook/Ladle with MSW states
* RTL polish (Arabic) across both apps
* Table powerhouse: column pinning, saved views, CSV export
* PWA (dashboard): service worker, offline cache, push opt‑in
* OTel traces across BFF/webhooks/DB for admin operations

---

## License

Copyright © 2025. All rights reserved. Replace with your preferred license (MIT/Apache‑2.0/etc.).
