## Purpose

Quick, focused instructions for AI coding agents working on this repository.
Reference key files and concrete examples rather than generic guidance.

## Big picture

- This is a Nuxt 4 front-end (see `package.json` and `nuxt.config.ts`) using Vue 3.
- State is managed with Pinia (`@pinia/nuxt`); the auth store is at `stores/auth.ts`.
- HTTP to the backend is centralized via the `plugins/api.ts` plugin which provides `$api`.
- Authentication token is persisted in a cookie named `token` and attached to requests by the plugin.
- Prisma schema (`prisma/schema.prisma`) models the backend domain (User, Order) and migrations live under `prisma/migrations`.

## Important files to consult

- `plugins/api.ts` — creates `$api` ($fetch wrapper) and injects Authorization header from cookie `token`.
- `stores/auth.ts` — single source of truth for login/register/logout flows and how `token`/`user` are stored.
- `app/middleware/auth.global.ts` — route-guard example: protects `/orders` when `token` is missing.
- `composables/useAuth.ts` — lighter helper used in pages; note it mixes `useState` with direct `$fetch` calls (inconsistent with `stores/auth.ts`).
- `prisma/schema.prisma` and `prisma/migrations/` — DB models and migration history.
- `.env.example` — runtime env names (notably `NUXT_PUBLIC_API_URL`, `DATABASE_URL`, `JWT_SECRET`).
- `.github/workflows/ci.yml` — CI steps (Node 18, `npm ci`, `npm run build`).

## Conventions and patterns to follow

- Use `$api` (from `plugins/api.ts`) for backend calls when possible so the `Authorization: Bearer <token>` header is applied automatically. Example: in `stores/auth.ts` the store calls `$api('/auth/login', { method: 'POST', body })`.
- Auth token cookie key is `token`. The app expects `token` to be a cookie (see `stores/auth.ts` and `plugins/api.ts`).
- Prefer the Pinia `auth` store (`stores/auth.ts`) for global auth state. The composable `composables/useAuth.ts` exists but uses different patterns — when updating auth flows, consolidate behavior into the store.
- Route middleware uses `defineNuxtRouteMiddleware` and checks store state. For protected routes, see `app/middleware/auth.global.ts`.
- Runtime config: plugin reads `config.public.apiBase` — set `NUXT_PUBLIC_API_URL` (see `.env.example`) so Nuxt maps it to `public.apiBase` at runtime.
- Project uses `vite-tsconfig-paths` (see `nuxt.config.ts`) and Tailwind CSS (`assets/css/tailwind.css`, `tailwind.config.ts`).

## Developer workflows (commands)

- Install dependencies: `npm install` (CI uses `npm ci`).
- Development: `npm run dev` (Nuxt dev server on http://localhost:3000 by default).
- Build for production: `npm run build` then `npm run start` to serve the built app.
- CI: `.github/workflows/ci.yml` runs `npm ci` and `npm run build` on Node 18.

## Integration points & gotchas discovered

- Backend endpoints expected: `/auth/login`, `/auth/register`, and `/orders` based on store and pages.
- There is an inconsistency: `composables/useAuth.ts` sometimes calls `$fetch('/api/...')` (relative) and once calls `http://localhost:3000/auth/login` directly — update to use `$api` and the runtime `NUXT_PUBLIC_API_URL` pattern when fixing or adding features.
- The plugin reads the cookie named `token`; any tests or scripts that simulate authenticated requests must set that cookie or call the auth store to set it.
- Prisma files indicate a PostgreSQL backend; don't assume a different provider unless `DATABASE_URL` is changed.

## Examples (how to make common changes)

- Add a protected API call from a page or store:

  - Use the injected client: `const { $api } = useNuxtApp()` then `await $api('/orders', { method: 'GET' })`.
  - The `Authorization` header is automatically applied when `token` cookie exists.

- Update runtime API base URL in dev: set `NUXT_PUBLIC_API_URL` in `.env` or your environment.

## When to ask for clarification

- If an API shape is required (response envelopes, error formats), consult the backend repo or the integrated tests — the frontend assumes `data.token` and `data.user` on login responses (see `stores/auth.ts`).
- If you plan to change the auth persistence (cookie vs localStorage), discuss with maintainers — middleware and `plugins/api.ts` rely on the cookie named `token`.

Please review these notes and tell me any missing or unclear areas to iterate on. If you want, I can also add a small checklist for new feature work (local backend setup, migrations, and seeding) next.
