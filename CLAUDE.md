# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server on port **4001** (not the default 3000)
- `npm run build` — production build
- `npm start` — run production build
- `npm run lint` — ESLint (flat config: `eslint-config-next` core-web-vitals + typescript)
- No test framework is configured in this repo.

## Next.js version note

This repo runs **Next.js 16**, which renamed Middleware to Proxy. There is no
`middleware.ts`; the equivalent file is `proxy.ts` at the project root, exporting a
`proxy` function (not `middleware`). See `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`
before touching request-interception logic. Check the relevant doc under
`node_modules/next/dist/docs/` before relying on training-data knowledge of any other
Next.js API in this project.

## Architecture

**Auth model**: cookie-based (`access_token` cookie set by the backend, `credentials: 'include'`
on every fetch). `proxy.ts` does one optimistic check: redirect an already-authenticated user
away from `/login`. Real auth gating happens client-side in `app/page.tsx`, which calls
`refreshToken()` on mount and redirects unauthenticated users.

**API layer** (`app/api/`): all requests go through `baseFetch` (`app/api/base-fetch.ts`),
which prefixes `NEXT_PUBLIC_API_URL`, sends cookies, and normalizes every response to
`ApiResponse<T> = { status, description, data }` (`data` is `undefined` on any non-2xx status).
Domain modules (`auth.ts`, `user.ts`) are thin wrappers around `baseFetch` per endpoint.

401s are handled by `retryWithRefresh(callToRetry)`: on a 401 it calls `refreshToken()` once
(deduped across concurrent callers via a module-level `refreshPromise` in `refreshTokenOnce`)
and retries the original call once. Wrap any endpoint that requires auth in `retryWithRefresh`
(see `app/api/user.ts`) — `auth.ts` endpoints themselves are not wrapped.

**State** (`app/store/`, `app/providers/`): a single Zustand *vanilla* store (`SLMStore`) holds
global state (currently just `user`). It is not a module-level singleton — `SLMStoreProvider`
creates one instance per mount via `useRef` (SSR-safe) and exposes it through React context.
Components read/write it with `useSLMStore(selector)`, typically combined with
`useShallow` from `zustand/react/shallow` for object selections. `SLMStoreProvider` wraps
`<body>` in `app/layout.tsx`.

**Setup wizard** (`app/setup-wizard/`): a multi-step flow keyed off `user.setupStep`. The
`SetupWizard` component in `page.tsx` looks up the step component in the `compToRender` array
by index and renders it with `{ user, setUser }` props. New steps are added by creating a
`step-N.tsx` component and registering it in that array. `app/page.tsx` redirects users with
`!user.setupCompleted` into `/setup-wizard`.

**Form inputs** (`app/components/Inputs/`): `StyledField` is the shared base — it renders a
label + wrapper div and hands the input element to its `children` render prop, keyed by a
generated `htmlFor`/`id`. `TextField`, `DateField`, `SelectField` are built on top of it and
share a `(keyToModify, val) => void` setter signature designed to plug directly into a
wizard step's `modifyUser` pattern (see `step-0.tsx`).

**`app/components/stateful/`** holds components that talk to the API/store directly (e.g.
`TopBar`, `AddressForm`), as opposed to `app/components/Inputs/` and
`app/components/GlassEffectContainer/`, which are presentational.

## Known WIP / inconsistencies

- `app/Login/LoginPage.tsx` and `app/Login/page.tsx` are near-duplicates (the latter is the
  live route, wrapped in a `<form onSubmit>`); `LoginPage.tsx` looks like leftover dead code —
  confirm before editing either.
- `app/HomePage.tsx` and `app/setup-wizard/step-1.tsx` are stub placeholders.
