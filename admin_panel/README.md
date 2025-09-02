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
├─ public/                           # static assets
│  ├─ favicon.ico
│  ├─ robots.txt
│  └─ og-image.png
├─ docs/                             # ADRs, API contracts, UX notes
│  ├─ ADR-0001-auth.md
│  ├─ ADR-0002-roles-rbac.md
│  ├─ API-contracts.md
│  └─ UX-content-map.md
├─ .github/workflows/ci.yml
├─ scripts/                          # scaffolding/dev utilities
│  ├─ gen-feature.mjs
│  └─ sync-env.mjs
└─ src/
   ├─ app/
   │  ├─ main.tsx
   │  ├─ App.tsx
   │  ├─ providers/                 # global context providers
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
   ├─ content/                       # single source of truth for UI copy/spec
   │  └─ dashboard-content.ts        # pages, sections, tables, forms, fixtures, toasts
   ├─ api/                           # typed client per domain (endpoints + queries + schemas)
   │  ├─ auth/ {endpoints.ts, queries.ts?, schemas.ts, index.ts}
   │  ├─ users/ {endpoints.ts, queries.ts, schemas.ts?, fixtures.ts, index.ts}
   │  ├─ matches/ {endpoints.ts, queries.ts, schemas.ts, fixtures.ts, index.ts}
   │  ├─ teams/   { ... }
   │  ├─ players/ { ... }
   │  ├─ streams/ { ... }
   │  ├─ analytics/ { ... }
   │  ├─ notifications/ {endpoints.ts, queries.ts, index.ts}
   │  ├─ admin/
   │  │  ├─ cms/                     # content-admin APIs
   │  │  │  ├─ teams.ts
   │  │  │  ├─ players.ts
   │  │  │  └─ matches.ts
   │  │  ├─ moderation.ts
   │  │  ├─ users.ts                 # role/ban/suspend
   │  │  ├─ flags.ts                 # feature flags
   │  │  ├─ webhooks.ts
   │  │  ├─ audit.ts
   │  │  ├─ search.ts                # search index stats/reindex
   │  │  └─ push.ts                  # FCM topics/devices
   │  ├─ billing/ {subscriptions.ts, invoices.ts, payment-methods.ts}
   │  └─ index.ts
   ├─ assets/ {fonts/, images/}
   ├─ components/
   │  ├─ common/                     # shell & composite blocks
   │  │  ├─ Navbar.tsx
   │  │  ├─ Sidebar.tsx
   │  │  ├─ Breadcrumbs.tsx
   │  │  ├─ PageHeader.tsx
   │  │  ├─ CommandK.tsx
   │  │  ├─ ThemeToggle.tsx
   │  │  ├─ FilterBar.tsx            # chips, selects, reset
   │  │  └─ EmptyState.tsx
   │  └─ ui/                         # primitives
   │     ├─ Button.tsx, Input.tsx, Select.tsx, Checkbox.tsx, Switch.tsx
   │     ├─ Tabs.tsx, Dialog.tsx, Drawer.tsx, Tooltip.tsx, Toast.tsx
   │     ├─ Card.tsx, Badge.tsx, Avatar.tsx, Progress.tsx, Skeleton.tsx
   │     └─ Table/
   │        ├─ DataTable.tsx
   │        ├─ Toolbar.tsx           # search input, density, export
   │        └─ types.ts
   ├─ features/                      # domain modules (deeper split)
   │  ├─ auth/
   │  │  ├─ pages/LoginPage.tsx
   │  │  ├─ pages/LogoutPage.tsx
   │  │  ├─ components/LoginForm.tsx
   │  │  ├─ components/TwoFactorSetup.tsx
   │  │  ├─ hooks/useAuth.ts
   │  │  └─ types.ts
   │  ├─ dashboard/
   │  │  ├─ pages/DashboardHome.tsx
   │  │  ├─ sections/Upcoming.tsx
   │  │  ├─ sections/RecentActivity.tsx
   │  │  └─ sections/Recommendations.tsx
   │  ├─ discover/
   │  │  ├─ pages/DiscoverPage.tsx
   │  │  ├─ components/DiscoverCard.tsx
   │  │  └─ components/DiscoverFilters.tsx
   │  ├─ matches/
   │  │  ├─ pages/MatchesListPage.tsx
   │  │  ├─ pages/MatchDetailPage.tsx
   │  │  ├─ components/MatchesTable.tsx
   │  │  ├─ components/MatchFilters.tsx
   │  │  ├─ components/Timeline.tsx
   │  │  └─ components/Lineups.tsx
   │  ├─ streams/
   │  │  ├─ pages/StreamPage.tsx
   │  │  ├─ pages/VodPage.tsx
   │  │  ├─ components/HLSPlayer.tsx
   │  │  ├─ components/LiveBadge.tsx
   │  │  ├─ components/ChatPanel.tsx
   │  │  └─ components/PollsPanel.tsx
   │  ├─ teams/
   │  │  ├─ pages/TeamsListPage.tsx
   │  │  ├─ pages/TeamDetailPage.tsx
   │  │  ├─ components/TeamsTable.tsx
   │  │  ├─ components/RosterGrid.tsx
   │  │  └─ components/ScheduleTable.tsx
   │  ├─ players/
   │  │  ├─ pages/PlayersListPage.tsx
   │  │  ├─ pages/PlayerDetailPage.tsx
   │  │  └─ components/PlayersTable.tsx
   │  ├─ analytics/
   │  │  ├─ pages/AnalyticsMePage.tsx
   │  │  ├─ pages/AnalyticsTeamsPage.tsx
   │  │  ├─ components/MetricTiles.tsx
   │  │  └─ components/Charts.tsx
   │  ├─ notifications/
   │  │  ├─ pages/NotificationsPage.tsx
   │  │  └─ components/NotificationItem.tsx
   │  ├─ settings/
   │  │  ├─ pages/ProfilePage.tsx
   │  │  ├─ pages/SecurityPage.tsx
   │  │  ├─ pages/AccountsPage.tsx
   │  │  ├─ pages/PreferencesPage.tsx
   │  │  ├─ pages/NotificationsPrefsPage.tsx
   │  │  ├─ pages/ApiKeysPage.tsx
   │  │  └─ pages/DevicesPage.tsx
   │  └─ admin/                    # full admin suite
   │     ├─ pages/AdminHome.tsx
   │     ├─ cms/
   │     │  ├─ pages/TeamsCMSPage.tsx
   │     │  ├─ pages/PlayersCMSPage.tsx
   │     │  ├─ pages/MatchesCMSPage.tsx
   │     │  ├─ components/TeamForm.tsx
   │     │  ├─ components/PlayerForm.tsx
   │     │  └─ components/MatchForm.tsx
   │     ├─ moderation/
   │     │  ├─ pages/ModerationPage.tsx
   │     │  ├─ components/ModerationQueue.tsx
   │     │  └─ components/ModerationDetail.tsx
   │     ├─ users/
   │     │  ├─ pages/UsersAdminPage.tsx
   │     │  └─ components/RoleEditor.tsx
   │     ├─ announcements/
   │     │  ├─ pages/AnnouncementsPage.tsx
   │     │  └─ components/AnnouncementEditor.tsx
   │     ├─ flags/
   │     │  ├─ pages/FeatureFlagsPage.tsx
   │     │  └─ components/FlagEditor.tsx
   │     ├─ webhooks/
   │     │  ├─ pages/WebhooksPage.tsx
   │     │  └─ components/WebhookDetail.tsx
   │     ├─ audit/
   │     │  ├─ pages/AuditLogPage.tsx
   │     │  └─ components/AuditTable.tsx
   │     ├─ search/
   │     │  └─ pages/SearchIndexPage.tsx
   │     └─ push/
   │        ├─ pages/PushControlPage.tsx
   │        └─ components/TestPushForm.tsx
   ├─ billing/                      # optional if billing in-dashboard
   │  ├─ pages/BillingPage.tsx
   │  ├─ components/PlanCard.tsx
   │  ├─ components/InvoicesTable.tsx
   │  └─ components/PaymentMethods.tsx
   ├─ screens/                      # high-level page compositions
   │  ├─ DashboardScreen.tsx
   │  └─ SettingsScreen.tsx
   ├─ hooks/ {useDisclosure.ts, useMediaQuery.ts, useDebounce.ts}
   ├─ lib/   {axios.ts, env.ts, storage.ts, permissions.ts, sentry.ts, posthog.ts, i18n.ts}
   ├─ store/ {index.ts, hooks.ts, ui.slice.ts, auth.slice.ts, (rtk-query)/api.ts}
   ├─ styles/ {globals.css, tailwind.css}
   ├─ utils/  {cn.ts, error_boundary.tsx, date.ts, format.ts}
   └─ __mocks__/ {server.ts, handlers/{auth.ts, users.ts, matches.ts, streams.ts}}


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
