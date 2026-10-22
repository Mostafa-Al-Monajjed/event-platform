# EventHub: Event Management Platform

Frontend for the Digit technical assessment, built with Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Zustand and TanStack Query.

**Live demo:** [<ضع رابط Vercel هنا>](https://event-platform-pi-umber.vercel.app)

## Features

- Login/Register, protected routes, persisted session
- Upcoming events with search, type and date filters, pagination
- Event details, registration form (LinkedIn, education, motivation), registration history
- Admin: all events, registrations list, approve, create, delete with confirmation
- Past/full events are labelled and registration is disabled
- Client-side validation (Zod + React Hook Form), loading/error/empty states, responsive layout

## Setup

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/Mostafa-Al-Monajjed/movie-explorer
cd event-platform
npm install
cp .env.example .env.local
```

## API Configuration

`.env.local`:

```
NEXT_PUBLIC_API_URL=https://events-management-api-847aeb3c849e.hosted.ghaymah.systems
```

## Run locally

```bash
npm run dev   # http://localhost:3000
```

Test admin: `admin@example.com` / `admin123`

## Build & Deploy

```bash
npm run build
npm start
```

Deployed on Vercel. Set `NEXT_PUBLIC_API_URL` in the project environment variables.

## Project structure

```
src/app          routes (App Router)
src/components   UI components (ui, shared, events, admin, layout)
src/services     API calls
src/hooks        TanStack Query hooks
src/stores       Zustand stores
src/lib          utils, validators, API client
```

## Assumptions, Limitations and Trade-offs

- **Role detection:** the login response only returns a token, so the role is read from the decoded JWT. The role cookie is used for UX redirects only; real authorization is enforced by the API (403).
- **Token storage:** the token is stored in localStorage (Zustand persist) and in a JS-readable cookie so middleware can protect routes. Trade-off: not HttpOnly. A production app would use HttpOnly cookies set by a backend/BFF.
- **State management:** Zustand for client state (auth), TanStack Query for server state (caching, pagination, invalidation).
- **No reject action:** the API only exposes approve, so the UI does not offer reject.
- **My registrations** uses `GET /events/attended`, the only endpoint available for this.
- **Past events** return 404 for non-admin users on the details endpoint, so past events are not linked from the user history.
- **Capacity state** relies on `registrationCount`; if the list endpoint omits it, the Full badge appears only on the details page.
- **Native selects** are used for forms for reliability on mobile and simplicity.
- **Future improvements:** unit/E2E tests (Vitest, Playwright), optimistic updates, edit event (PATCH), i18n (EN/AR with RTL), bundle analysis, better a11y audit.
