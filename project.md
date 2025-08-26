## Project Overview

This app is a modular, enterprise-ready React + TypeScript frontend using TanStack Router, Zustand, and Vite. Pages are intentionally minimal placeholders; all domain logic lives under modules and shared layers.

## High-level Layout

- src/
  - app/
    - router/ → Route files and configuration
    - providers/ → App-wide providers (auth, data fetching)
    - layout/ → Shell UI like navbar/sidebar
  - modules/ → Feature modules (one folder per domain)
  - shared/ → Reusable cross-module code (UI, lib, config, hooks)
  - test/ → Unit/integration test scaffolding

Keep root configs (`vite.config.ts`, `tsconfig*.json`, `playwright.config.ts`) as-is.

## Where to add/change things

- Routing
  - File-based routes live under `src/routes` today. They render minimal placeholders.
  - When adding UI: keep page composition in the route file, but import all logic/UI parts from the relevant module under `src/modules/<module>`.
  - Auth guard: `src/routes/_authenticated.tsx` handles redirect logic.

- Global app shell
  - `src/app/layout/` for `AppShell.tsx`, `Navbar.tsx`, `Sidebar.tsx`.
  - Wrap providers in `src/app/providers/` and initialize in `src/main.tsx`.

- Feature work (domain logic/UI)
  - Create or extend a module: `src/modules/<feature>/`
    - api/ → API clients for the feature (fetchers, SDK wrappers)
    - components/ → Feature-specific UI components
    - hooks/ → Feature hooks (fetch, state bindings)
    - stores/ → Zustand stores for the feature
    - types/ → DTOs and TypeScript types for the feature
    - utils/ → Pure helpers tied to feature domain

- Reusable/shared code
  - `src/shared/components/ui/` → Primitive UI (button, card, form, input, spinner, popover, etc.)
  - `src/shared/components/*` → Non-primitive shared components (feedback, navigation)
  - `src/shared/lib/` → Cross-cutting helpers: `api.ts`, `http.ts`, `router-context.ts`, `schemas.ts`, `utils.ts`
  - `src/shared/config/` → `env.ts`, `constants.ts`
  - `src/shared/hooks/` → Generic hooks like `useAuth`, `useDebounce`
  - `src/shared/types/` → Global DTOs and models if shared across modules

## Current routes (placeholders)

- `src/routes/index.tsx` → Home
- `src/routes/login.tsx` → Login
- `src/routes/_authenticated.tsx` → Auth guard layout
- `src/routes/_authenticated/dashboard.tsx` → Dashboard
- `src/routes/_authenticated/services/index.tsx` → Services index
- `src/routes/_authenticated/services/news.tsx` → News
- `src/routes/_authenticated/services/image.tsx` → Image
- `src/routes/_authenticated/services/social.tsx` → Social
- `src/routes/_authenticated/services/government.tsx` → Government
- `src/routes/_authenticated/services/email.tsx` → Email
- `src/routes/_authenticated/services/darkweb.tsx` → Dark Web

Each page should only orchestrate UI; do not place business logic in route files.

## Auth

- `src/contexts/AuthContext.tsx` currently provides auth context.
- Recommended: move to `src/app/providers/AuthProvider.tsx` and expose a simple `useAuth()` in `src/shared/hooks/useAuth.ts`.
  - Route guards read from `RouterContext` via `src/lib/router-context.ts` (already wired in root route).

## API and data fetching

- Use `src/shared/lib/http.ts` to centralize HTTP (base URL, interceptors, auth headers).
- Keep feature-specific API in `src/modules/<feature>/api/`.
- Define DTOs in `src/modules/<feature>/types/` or shared if cross-feature.

## State management

- Feature-local state with Zustand in `src/modules/<feature>/stores/`.
- Global state (rare) under `src/shared/stores/`.

## Naming and conventions

- Files: kebab-case; React components: PascalCase; hooks: useX.ts.
- No business logic in UI components. Keep side-effects in hooks/stores.
- Export typed functions; avoid `any`. Keep return types explicit for public APIs.
- Prefer composition: pages import feature components and hooks.

## How to implement a new feature

1) Create `src/modules/<feature>/` with subfolders: `api/`, `components/`, `hooks/`, `stores/`, `types/`, `utils/`.
2) Add route file under `src/routes/...` that renders a minimal page composing components from the module.
3) Add API client(s) in `api/` and types in `types/`.
4) Add Zustand store in `stores/` if needed.
5) Build UI in `components/` and wire with hooks.
6) Keep shared pieces in `src/shared/*`.

## Where to change X

- Change environment variables: `src/shared/config/env.ts`
- Add global constants: `src/shared/config/constants.ts`
- Add new shared UI component: `src/shared/components/`
- Add new API base behavior (auth header, retry): `src/shared/lib/http.ts`
- Add validation schemas: `src/shared/lib/schemas.ts` or module `types/`
- Add navigation/menu: `src/app/layout/` and shared navigation components

## Testing

- `src/test/` for unit/integration tests.
- E2E: Playwright config at root; tests in `osint-tool/tests/`.

## Build and lint

- Types and lint must be clean. Keep imports via aliases (configure in `tsconfig.json`).


