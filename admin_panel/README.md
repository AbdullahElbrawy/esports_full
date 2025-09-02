# vite-admin (Dashboard)

A production‑grade **React + TypeScript + Vite + Tailwind** admin dashboard scaffold. It follows an **isolation-first** architecture (Dashboard separated from the marketing site) and ships with providers, routing/guards, state, API modules, UI kit, mocks, and analytics/error tooling.

> **Why this repo?** To start building the private app (Dashboard) fast, with clean boundaries, batteries included, and a design-ready content spec.

---

## Table of contents

* [Features](#features)
* [Tech stack](#tech-stack)
* [Getting started](#getting-started)
* [Environment variables](#environment-variables)
* [Scripts](#scripts)
* [Project layout](#project-layout)
* [Architecture](#architecture)
* [UI/UX content](#uiux-content)
* [Conventions](#conventions)
* [Testing](#testing)
* [Build & deploy](#build--deploy)
* [Troubleshooting](#troubleshooting)
* [FAQ](#faq)
* [Roadmap](#roadmap)
* [License](#license)

---

## Features

* **App shell** (Top bar, Sidebar, Breadcrumbs) with responsive layout.
* **Routing** via `react-router` + lazy routes, **auth guard** & **role guard**.
* **State** via Redux Toolkit (UI + Auth slices) + typed hooks.
* **Data layer** via Axios instance, interceptors, React Query client, zod schemas.
* **UI kit** (Buttons, Inputs, Table, Cards, Tabs, Dialog, Toast, Spinner, etc.).
* **Feature modules**: Auth, Matches, Teams, Players, Streams, Analytics, Settings, Admin.
* **Design tokens ready** (Tailwind), dark mode class, theme provider.
* **Analytics** (PostHog) and **Error monitoring** (Sentry) hooks.
* **Mock server** (MSW) for fast local dev without a backend.
* **Type‑safe env** validation.
* **DX**: Path aliases, ESBuild/Vite fast refresh, strict TS, ESLint + Prettier.

---

## Tech stack

* **Runtime**: React 18, TypeScript 5, Vite
* **UI**: Tailwind CSS
* **Routing**: `react-router-dom`
* **State**: Redux Toolkit (+ React Redux typed hooks)
* **Server state**: TanStack Query (React Query)
* **HTTP**: Axios (with auth/refresh interceptors)
* **Validation**: Zod
* **Instrumentation**: Sentry, PostHog (optional)
* **Mocks**: MSW

---

## Getting started

### 1) Prerequisites

* Node **≥ 18.17**
* pnpm **≥ 9** (or npm/yarn; commands assume pnpm)

### 2) Install

```bash
pnpm i
```

### 3) Configure environment

Copy and fill the example env file:

```bash
cp .env.example .env
```

See [Environment variables](#environment-variables) for details.

### 4) Run (with mocks)

```bash
pnpm dev
```

By default, the app can run against MSW mock handlers (see `src/__mocks__`). If you prefer real API:

* Set `VITE_API_BASE_URL` to your backend.
* Ensure `/auth/login`, `/auth/refresh`, `/auth/me` endpoints exist.

### 5) Build & preview

```bash
pnpm build
pnpm preview
```

---

## Environment variables

All variables are validated in `src/lib/env.ts` via zod.

| Key                 | Required | Example                            | Notes                       |
| ------------------- | -------- | ---------------------------------- | --------------------------- |
| `VITE_API_BASE_URL` | ✅        | `http://localhost:3000`            | Base URL for Axios instance |
| `VITE_SENTRY_DSN`   | ❌        | `https://xxx.ingest.sentry.io/123` | Enable error monitoring     |
| `VITE_POSTHOG_KEY`  | ❌        | `phc_xxx`                          | Enable product analytics    |
| `VITE_POSTHOG_HOST` | ❌        | `https://eu.posthog.com`           | Custom PostHog host         |

> Keep secrets out of git. The `VITE_` prefix exposes values to the browser; do not place server secrets here.

---

## Scripts

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "typecheck": "tsc --noEmit",
  "msw": "node ./src/__mocks__/server.ts"
}
```

* **dev**: Start local dev server.
* **build**: Type-check + bundle for production.
* **preview**: Serve production build locally.
* **lint**/**typecheck**: Quality gates.
* **msw**: Optional mock worker entry (for node/debug use-cases).

---

## Project layout

The high-level tree (details omitted for brevity):

```
vite-admin/
├─ .editorconfig
├─ .env.example
├─ .eslintignore
├─ .eslintrc.cjs
├─ .gitignore
├─ .prettierignore
├─ .prettierrc
├─ index.html
├─ package.json
├─ postcss.config.cjs
├─ tailwind.config.ts
├─ tsconfig.json
├─ tsconfig.paths.json
├─ vite.config.ts
├─ public/
│  ├─ favicon.ico
│  ├─ site.webmanifest
│  ├─ robots.txt
│  └─ og-image.png
├─ docs/                       # optional: ADRs, design notes, API docs
│  ├─ ADR-0001-auth.md
│  └─ API-contracts.md
├─ .github/
│  └─ workflows/
│     └─ ci.yml
├─ scripts/                    # optional dev scripts/scaffolding
│  ├─ generate-component.mjs
│  └─ sync-env.mjs
├─ tests/                      # test root (unit + e2e config)
│  ├─ unit/
│  └─ e2e/
└─ src/
   ├─ app/
   │  ├─ App.tsx               # (thin wrapper)
   │  ├─ main.tsx              # entry bootstrap
   │  ├─ providers/
   │  │  ├─ QueryProvider.tsx
   │  │  ├─ StoreProvider.tsx
   │  │  ├─ ThemeProvider.tsx
   │  │  ├─ SentryProvider.tsx
   │  │  └─ PostHogProvider.tsx
   │  └─ router/
   │     ├─ routes.tsx
   │     ├─ paths.ts
   │     ├─ guards/
   │     │  ├─ ProtectedRoute.tsx
   │     │  └─ RoleGuard.tsx
   │     └─ layouts/
   │        ├─ RootLayout.tsx
   │        ├─ AuthLayout.tsx
   │        └─ DashboardLayout.tsx
   ├─ content/                 # central UI/UX copy & specs (no code)
   │  └─ dashboard-content.ts  # page titles, sections, tables, forms, fixtures, toasts
   ├─ api/                     # typed endpoints + react-query hooks
   │  ├─ auth/
   │  │  ├─ endpoints.ts
   │  │  ├─ schemas.ts
   │  │  └─ index.ts
   │  ├─ users/
   │  │  ├─ endpoints.ts
   │  │  ├─ queries.ts
   │  │  └─ index.ts
   │  ├─ orders/
   │  │  ├─ endpoints.ts
   │  │  ├─ queries.ts
   │  │  └─ index.ts
   │  ├─ matches/
   │  │  ├─ endpoints.ts
   │  │  ├─ queries.ts
   │  │  └─ index.ts
   │  ├─ teams/
   │  │  ├─ endpoints.ts
   │  │  ├─ queries.ts
   │  │  └─ index.ts
   │  ├─ players/
   │  │  ├─ endpoints.ts
   │  │  ├─ queries.ts
   │  │  └─ index.ts
   │  ├─ streams/
   │  │  ├─ endpoints.ts
   │  │  ├─ queries.ts
   │  │  └─ index.ts
   │  ├─ analytics/
   │  │  ├─ endpoints.ts
   │  │  ├─ queries.ts
   │  │  └─ index.ts
   │  └─ index.ts
   ├─ assets/
   │  ├─ fonts/
   │  └─ images/
   ├─ components/
   │  ├─ common/               # shell & shared compositional blocks
   │  │  ├─ Navbar.tsx
   │  │  ├─ Sidebar.tsx
   │  │  ├─ PageHeader.tsx
   │  │  ├─ Breadcrumbs.tsx
   │  │  ├─ CommandK.tsx
   │  │  └─ ThemeToggle.tsx
   │  └─ ui/                   # primitives (design system)
   │     ├─ Button.tsx
   │     ├─ Input.tsx
   │     ├─ Select.tsx
   │     ├─ Checkbox.tsx
   │     ├─ Dialog.tsx
   │     ├─ Tooltip.tsx
   │     ├─ Tabs.tsx
   │     ├─ Toast.tsx
   │     ├─ Card.tsx
   │     ├─ Spinner.tsx
   │     └─ Table/
   │        ├─ DataTable.tsx
   │        └─ types.ts
   ├─ features/                # screen-level domains (pages/components/hooks)
   │  ├─ auth/
   │  │  ├─ pages/LoginPage.tsx
   │  │  ├─ components/LoginForm.tsx
   │  │  ├─ hooks/useAuth.ts
   │  │  └─ types.ts
   │  ├─ users/
   │  │  ├─ pages/UsersListPage.tsx
   │  │  ├─ pages/UserDetailPage.tsx
   │  │  ├─ components/UserTable.tsx
   │  │  ├─ components/UserForm.tsx
   │  │  ├─ hooks/useUserForm.ts
   │  │  └─ types.ts
   │  ├─ orders/
   │  │  ├─ pages/OrdersListPage.tsx
   │  │  ├─ components/OrdersTable.tsx
   │  │  └─ types.ts
   │  ├─ matches/
   │  │  ├─ pages/MatchesListPage.tsx
   │  │  ├─ pages/MatchDetailPage.tsx
   │  │  ├─ components/MatchesTable.tsx
   │  │  ├─ components/MatchFilters.tsx
   │  │  └─ types.ts
   │  ├─ teams/
   │  │  ├─ pages/TeamsListPage.tsx
   │  │  ├─ pages/TeamDetailPage.tsx
   │  │  ├─ components/TeamsTable.tsx
   │  │  └─ types.ts
   │  ├─ players/
   │  │  ├─ pages/PlayersListPage.tsx
   │  │  ├─ pages/PlayerDetailPage.tsx
   │  │  ├─ components/PlayersTable.tsx
   │  │  └─ types.ts
   │  ├─ streams/
   │  │  ├─ pages/StreamPage.tsx
   │  │  ├─ pages/VodPage.tsx
   │  │  ├─ components/HLSPlayer.tsx
   │  │  └─ types.ts
   │  ├─ analytics/
   │  │  ├─ pages/AnalyticsMePage.tsx
   │  │  ├─ pages/AnalyticsTeamsPage.tsx
   │  │  └─ components/MetricTiles.tsx
   │  ├─ notifications/
   │  │  └─ pages/NotificationsPage.tsx
   │  └─ settings/
   │     ├─ pages/ProfilePage.tsx
   │     ├─ pages/SecurityPage.tsx
   │     ├─ pages/AccountsPage.tsx
   │     ├─ pages/PreferencesPage.tsx
   │     ├─ pages/NotificationsPrefsPage.tsx
   │     ├─ pages/ApiKeysPage.tsx
   │     └─ pages/DevicesPage.tsx
   ├─ screens/                 # multi-feature compositions
   │  ├─ DashboardScreen.tsx
   │  └─ SettingsScreen.tsx
   ├─ hooks/
   │  ├─ useDisclosure.ts
   │  ├─ useMediaQuery.ts
   │  └─ useDebounce.ts
   ├─ lib/
   │  ├─ axios.ts
   │  ├─ env.ts
   │  ├─ i18n.ts
   │  ├─ storage.ts
   │  ├─ permissions.ts
   │  ├─ sentry.ts
   │  └─ posthog.ts
   ├─ store/
   │  ├─ index.ts
   │  ├─ hooks.ts
   │  ├─ ui.slice.ts
   │  ├─ auth.slice.ts
   │  └─ (rtk-query)/api.ts     # optional if you adopt RTKQ
   ├─ styles/
   │  ├─ globals.css
   │  └─ tailwind.css
   ├─ types/
   │  └─ globals.d.ts
   ├─ utils/
   │  ├─ cn.ts
   │  ├─ error_boundary.tsx
   │  ├─ date.ts
   │  └─ format.ts
   └─ __mocks__/               # MSW handlers for local dev
      ├─ server.ts
      └─ handlers/
         ├─ auth.ts
         ├─ users.ts
         ├─ matches.ts
         └─ streams.ts


> Path aliases are configured via `tsconfig.paths.json` (`@/*` → `src/*`).

---

## Architecture

### App shell & layouts

* `DashboardLayout` renders **Sidebar + Navbar + <Outlet>**.
* `AuthLayout` centers auth forms.
* `RootLayout` wraps routes in a global `ErrorBoundary`.

### Routing & guards

* `routes.tsx` uses **lazy imports**.
* `ProtectedRoute` redirects to `/auth/login` if no token.
* `RoleGuard` conditionally renders blocks based on `user.role` (`viewer|manager|admin`).

### State & server state

* **Redux Toolkit** slices: `ui.slice.ts` (theme/sidebar), `auth.slice.ts` (token/user).
* **React Query** handles caching, retries, background refresh.

### HTTP client

* `lib/axios.ts` attaches `Authorization: Bearer <token>` and automatically **refreshes tokens** on `401`, falling back to logout if refresh fails.

### Validation

* Use zod for request/response schema checks (e.g., `api/auth/schemas.ts`).

### UI kit

* Tailwind-first primitives in `components/ui` (Buttons, Input, Table, Card, etc.).
* Extend with shadcn/ui or your own DS as needed.

### Analytics & errors

* Initialize **PostHog** (client) in `PostHogProvider`.
* Initialize **Sentry** (browser) in `SentryProvider` and `lib/sentry`.

### Access control

* Role checks in `RoleGuard` and util functions in `lib/permissions.ts`.

### Mocks

* MSW handlers in `src/__mocks__/handlers/*`. Useful for local dev and Storybook.

---

## UI/UX content

Use the centralized **content spec** to keep copy/labels/columns/forms in sync:

* `src/content/dashboard-content.ts` — page titles & subtitles, actions, empty/loading/error states, filters, **table columns**, **form fields** (with validation hints), toasts/status badges, sidebar items, breadcrumbs, and **fixtures**.

**Design handoff**

* Mirror the structure in Figma (page headers, filters, sections, empty/loading/error states).
* Components should expose size/state/theme variants and follow the copy provided in the content spec.

---

## Conventions

### Coding

* **TypeScript strict**; no `any` without justification.
* Co-locate **feature UI** under `src/features/<feature>` with `pages/`, `components/`, `hooks/`, `types.ts`.
* Keep **shared primitives** in `components/ui` (no feature coupling).

### Styling

* Tailwind utility-first; extract repeated patterns into components or `@apply`.
* Dark mode via `html.dark` class.

### Commits & PRs

* Conventional commits (e.g., `feat:`, `fix:`, `chore:`).
* PR checklist: typecheck, lint, unit tests green.

---

## Testing

* **Unit**: Vitest (suggested) for utilities, reducers, and simple components.
* **Component/Stories**: Storybook or Ladle with MSW for interactive states.
* **E2E**: Playwright (auth flow, route guards, core tables/forms).
* **A11y**: `@axe-core/playwright` smoke on key pages.

> Not preinstalled by default—add per your preference.

---

## Build & deploy

* Build once: `pnpm build` → outputs `/dist`.
* Serve via any static host (Vercel, Netlify, Nginx). If you use client-side routing, ensure **fallback to `index.html`**.
* Configure **CSP** to allow your API/analytics domains (Axios base URL, Sentry, PostHog).

**Isolating Dashboard from Website**

* This repo is the **Dashboard** only (`app.apexarena.com`).
* Keep marketing site in a separate app/repo/project to avoid coupling (own CI, analytics, SEO).

---

## Troubleshooting

* **White screen**: Check console for env parse errors (see `lib/env.ts`).
* **401 loops**: Ensure `/auth/refresh` exists and returns a valid token.
* **CORS**: Add `http://localhost:5173` to API’s allowed origins.
* **Tailwind not applying**: Verify `content` globs in `tailwind.config.ts`.
* **Path aliases not working**: Confirm `vite-tsconfig-paths` plugin and `tsconfig.paths.json`.

---

## FAQ

**Q: Can I replace Redux with Zustand or RTK Query only?**
A: Yes. Swap `store/` for Zustand or use RTK Query as your primary data layer; keep React Query or remove it.

**Q: How do I add a new screen?**

1. Create `src/features/<name>/pages/<Name>Page.tsx`.
2. Add a lazy route in `routes.tsx`.
3. If it lists data, add a table spec in the content file.
4. Add API endpoints and queries if needed.

**Q: Where do design tokens live?**
A: Tailwind config + CSS variables (`styles/globals.css`). If you use Style Dictionary, generate tokens to CSS/TS.

---

## Roadmap

* Storybook + Chromatic visual tests
* RTL (Arabic) layout & copy pass
* Advanced table (virtual rows, column pinning, CSV export)
* Form generator from `Forms` spec
* Role-based menu building

---

## License

Copyright © 2025. All rights reserved. Replace with your chosen license (MIT/Apache-2.0/etc.).
