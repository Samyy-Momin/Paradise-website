# TRD — Paradise English School & Tender Kidz Pre-School
### Technical Requirements Document (v1)

---

## 1. Purpose

Defines the technical architecture, folder structure, environments, and standards for building the storefront + admin panel described in `PRD-technical.md`. This is what you build against — every module here should map back to a PRD section.

---

## 2. Repo Structure (monorepo)

```
paradise-school/
├── docker-compose.yml
├── .env                        # root env — shared secrets for the compose stack
├── apps/
│   ├── api/                    # NestJS backend
│   │   ├── Dockerfile
│   │   ├── .dockerignore
│   │   ├── docker-entrypoint.sh
│   │   ├── src/
│   │   │   ├── auth/            # Better Auth config + BetterAuthGuard (not a hand-rolled auth module)
│   │   │   ├── enquiries/
│   │   │   ├── notices/
│   │   │   ├── gallery/
│   │   │   ├── gallery-categories/
│   │   │   ├── testimonials/
│   │   │   ├── faculty/
│   │   │   ├── faq/
│   │   │   ├── settings/
│   │   │   ├── uploads/         # Cloudinary — see TRD.md §5.6
│   │   │   ├── documents/
│   │   │   ├── dashboard/
│   │   │   ├── common/         # guards, filters, pipes, decorators
│   │   │   ├── prisma/         # PrismaService + schema
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   ├── .env
│   │   └── package.json
│   └── web/                    # Next.js — storefront + admin (same app, separate route groups)
│       ├── Dockerfile
│       ├── .dockerignore
│       ├── next.config.js      # includes output: 'standalone' + the /api rewrite
│       ├── app/
│       │   ├── (storefront)/
│       │   │   ├── layout.tsx                # Header + {children} + Footer — NOT the root layout
│       │   │   ├── page.tsx                  # Home
│       │   │   ├── about/page.tsx
│       │   │   ├── academics/page.tsx
│       │   │   ├── admissions/page.tsx
│       │   │   ├── student-life/page.tsx
│       │   │   ├── tender-kidz/page.tsx
│       │   │   ├── facilities/page.tsx
│       │   │   ├── faculty/page.tsx
│       │   │   ├── gallery/page.tsx
│       │   │   ├── notices/page.tsx
│       │   │   ├── notices/[slug]/page.tsx
│       │   │   ├── testimonials/page.tsx
│       │   │   └── contact/page.tsx
│       │   ├── (admin)/
│       │   │   ├── layout.tsx                # AdminSidebar + {children} — NOT shared with storefront
│       │   │   ├── admin/page.tsx             # required — redirects to /admin/dashboard, fixes the 404
│       │   │   ├── admin/login/page.tsx
│       │   │   ├── admin/dashboard/page.tsx
│       │   │   ├── admin/enquiries/page.tsx
│       │   │   ├── admin/notices/page.tsx
│       │   │   ├── admin/gallery/page.tsx
│       │   │   ├── admin/gallery-categories/page.tsx
│       │   │   ├── admin/testimonials/page.tsx
│       │   │   ├── admin/faculty/page.tsx
│       │   │   ├── admin/faq/page.tsx
│       │   │   └── admin/settings/page.tsx
│       │   ├── layout.tsx                    # root — html/body/fonts/providers ONLY, no Header/Footer here
│       │   └── globals.css
│       ├── components/
│       │   ├── storefront/
│       │   ├── admin/
│       │   └── ui/            # shared primitives (button, input, card, etc.)
│       ├── lib/                # api client, auth helpers, utils
│       ├── public/
│       │   └── logo.png
│       ├── .env.local
│       └── package.json
└── openapi.yaml
```

**Why one repo, two apps:** simplest to run locally tonight (`docker compose up` + two `npm run dev`), simplest to deploy later (`apps/web` → Vercel, `apps/api` → Railway/VPS).

---

## 3. Tech Stack (locked for build)

| Layer | Choice |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| UI primitives | shadcn/ui (copy-in components, no runtime dependency bloat) |
| Backend | NestJS, TypeScript |
| ORM | Prisma |
| Database | PostgreSQL 16 (Docker container locally) |
| Auth | **Better Auth** (session-cookie based, Prisma adapter, `admin` plugin for roles) — mounted inside the NestJS app, not hand-rolled |
| Validation | `class-validator` + `class-transformer` (backend), `zod` (frontend forms) |
| File uploads (demo) | Local disk / stub — swap for Cloudinary post-demo |
| API docs | `@nestjs/swagger`, generated to match `openapi.yaml` |

---

## 4. Containerization — Postgres, API, and Web

**File placement:** the Dockerfiles are delivered as `api.Dockerfile`, `web.Dockerfile`, `api.docker-entrypoint.sh`, and `dockerignore` (flat, alongside this TRD) so they don't collide with each other during transfer. Place them as:
- `api.Dockerfile` → `apps/api/Dockerfile`
- `api.docker-entrypoint.sh` → `apps/api/docker-entrypoint.sh` (and `chmod +x` it)
- `web.Dockerfile` → `apps/web/Dockerfile`
- `dockerignore` → copy to **both** `apps/api/.dockerignore` and `apps/web/.dockerignore`

The whole stack is designed to run two ways, and both must keep working throughout the build:

- **Hybrid local dev** (fastest iteration): only Postgres runs in Docker; `apps/api` and `apps/web` run natively via `npm run dev` on your machine with hot reload. Use this while actively coding.
- **Full containerized stack** (deployable-ready demo): `docker compose up --build` builds and runs Postgres + API + Web as three containers, exactly how it would run on a real server. Use this to prove the demo is actually deployable, not just "works on my machine."

`docker-compose.yml` at the repo root defines all three services on one Docker network (see file provided). Key points:

- `postgres` — named volume for data persistence, health check gates the `api` service's startup
- `api` — built from `apps/api/Dockerfile`, waits on Postgres's health check, runs `prisma migrate deploy` on container start (via `docker-entrypoint.sh`) before starting the Nest app — so a fresh container always has an up-to-date schema, no manual migration step
- `web` — built from `apps/web/Dockerfile` using Next.js's `output: 'standalone'` mode (small production image, no dev dependencies), depends on `api`

### 4.1 Two different "where's the API" values
This is the one thing that trips people up: the URL the **browser** uses and the URL the **web container's server** uses to reach the API are different.

| Context | Points to | Used for |
|---|---|---|
| Browser (client-side) | `http://localhost:3000/api/...` (relative) | All fetches from React components — always relative, never hardcoded |
| Next.js server, hybrid local dev | `http://localhost:4000` | `next.config.js` rewrite destination when `apps/api` runs natively on the host |
| Next.js server, full container stack | `http://api:4000` | Same rewrite destination, but resolved via Docker's internal DNS (service name `api`), since `localhost` inside the `web` container means the container itself |

Handle this with one env var, not a hardcoded string:
```js
// apps/web/next.config.js
const API_INTERNAL_URL = process.env.API_INTERNAL_URL || "http://localhost:4000";
module.exports = {
  output: "standalone",
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_INTERNAL_URL}/api/:path*` }];
  },
};
```
Set `API_INTERNAL_URL=http://localhost:4000` in `apps/web/.env.local` for hybrid dev, and `API_INTERNAL_URL=http://api:4000` as an `environment:` entry on the `web` service in `docker-compose.yml` for the full stack. Same code, no branching logic, just a different env value per mode.

### 4.2 Dockerfiles (provided separately)
- `apps/api/Dockerfile` — multi-stage: install + `prisma generate` + `nest build` in a builder stage, then a slim production stage with only production deps + compiled `dist/` + the Prisma client. `docker-entrypoint.sh` runs `npx prisma migrate deploy` then `node dist/main.js`.
- `apps/web/Dockerfile` — multi-stage: install + `next build` (with `output: standalone`) in a builder stage, then a slim runner stage copying only `.next/standalone`, `.next/static`, and `public/`.
- Both have a matching `.dockerignore` (excludes `node_modules`, `.env*`, `.git`, `dist`, `.next`) so builds are fast and secrets never get baked into an image layer.

### 4.3 Root `.env` for the compose stack
```
POSTGRES_USER=paradise_admin
POSTGRES_PASSWORD=paradise_dev_pw
POSTGRES_DB=paradise_school
BETTER_AUTH_SECRET=replace-with-a-long-random-string
BETTER_AUTH_URL=http://localhost:4000
CORS_ORIGIN=http://localhost:3000
API_INTERNAL_URL=http://api:4000
```
`docker-compose.yml` reads this file automatically (`.env` at the same location as the compose file needs no explicit `env_file:` directive). Never commit this file — commit a `.env.example` with the same keys and placeholder values instead.

Backend `.env` (`apps/api/.env`):
```
DATABASE_URL="postgresql://paradise_admin:paradise_dev_pw@localhost:5432/paradise_school?schema=public"
BETTER_AUTH_SECRET="replace-with-a-long-random-string"
BETTER_AUTH_URL="http://localhost:4000"
PORT=4000
CORS_ORIGIN="http://localhost:3000"
```

Frontend `.env.local` (`apps/web/.env.local`):
```
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"
```
No `NEXT_PUBLIC_*` auth secret is ever needed — the frontend never touches password hashing or session signing, it only calls Better Auth's endpoints through the `/api/*` rewrite (see §5.3).

---

## 5. Backend Standards

### 5.1 Module pattern
Every feature module (`enquiries`, `notices`, etc.) follows: `*.controller.ts`, `*.service.ts`, `*.module.ts`, `dto/create-*.dto.ts`, `dto/update-*.dto.ts`, `entities/*.entity.ts` (or rely on Prisma types directly).

### 5.2 Global setup (`main.ts`)
- `app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))`
- `app.enableCors({ origin: process.env.CORS_ORIGIN, credentials: true })`
- `app.use(helmet())`
- Global exception filter returning a consistent error shape (see §7)
- Swagger bootstrap at `/api/docs` in non-production only

### 5.3 Auth — Better Auth (do not hand-roll this)
- Installed in `apps/api`, configured in `src/auth/auth.ts` with the Prisma adapter pointed at the same Postgres database
- Mounted at `/api/auth/*` using Better Auth's Node handler (`toNodeHandler`), registered in `main.ts` **before** Nest's body-parser middleware runs (Better Auth needs the raw request)
- Plugins enabled: `admin` (roles: `SUPER_ADMIN`, `ADMIN`, `RECEPTIONIST`; ban/unban if ever needed) — this is what gives you role management without writing it yourself
- Session strategy: **httpOnly cookie** (Better Auth default) — not a manually-signed JWT. Cookie is set on the API's domain; the browser only ever talks to it through the same-origin rewrite described in §5.3.1, so no cross-site cookie configuration is needed
- Schema: run `npx @better-auth/cli generate` to add Better Auth's own `user` / `session` / `account` / `verification` models to `prisma/schema.prisma` — do not hand-write these tables
- Guarding routes: a thin `BetterAuthGuard` calls `auth.api.getSession({ headers: req.headers })`; if valid, attaches `session.user` (including `role`) to the request. `RolesGuard` + `@Roles()` decorator reads `request.user.role` exactly as before — the rest of the module code in §5.4/§6 is unaffected by this swap.
- Password hashing, session expiry/rotation, CSRF protection, and rate limiting on auth endpoints are handled internally by Better Auth — none of that is application code you write or maintain

### 5.3.1 Same-origin proxy (required for cookie auth to work cleanly)
In `apps/web/next.config.js`, add a rewrite so the browser sees everything as one origin:
```js
async rewrites() {
  return [{ source: "/api/:path*", destination: "http://localhost:4000/api/:path*" }];
}
```
The Next.js app calls `/api/auth/...` and `/api/enquiries` etc. as **relative** paths — Next.js proxies them server-side to the NestJS API. This sidesteps cross-origin cookie issues entirely, locally and in production (just change the rewrite destination to the deployed API URL).

### 5.4 Rate limiting
- `@nestjs/throttler` on the public `POST /enquiries` endpoint specifically (e.g. 5 requests/min/IP) — this is the one endpoint the public can hit without auth, so it's the one that needs abuse protection before launch. Not critical for tonight's local demo, but stub it in so it's a 10-minute add later.

### 5.5 Seed data
`apps/api/prisma/seed.ts` must create: 1 super-admin user **via Better Auth's own `auth.api.signUpEmail(...)` call** (then promote the role to `SUPER_ADMIN` using the `admin` plugin's set-role API — never insert a hashed password directly into the `user`/`account` tables by hand), ~6 sample enquiries across different statuses, ~5 notices, 4-5 `GalleryCategory` rows (e.g. "Annual Day", "Campus", "Sports Day", "Classroom Activities"), ~8 `GalleryItem` rows distributed across those categories (placeholder image URLs are fine until real Cloudinary photos are uploaded through the admin panel), ~3 testimonials, ~4 faculty members, ~5 `FAQItem` rows (use the real Q&A pairs from the PRD — landmark/hours), and a `Settings` row with the real school data including the principal fields (`principalName: "Sangeeta Nagvanshi"`, `principalDesignation: "Founder & President"`). This is what makes the demo look alive instead of empty.

### 5.6 Cloudinary uploads — backend-owned, never client-side
The Cloudinary API secret must never reach the browser. All uploads go through one backend endpoint:
- `POST /uploads` (multipart/form-data, field name `file`) — guarded by `BetterAuthGuard` (admin-only)
- Implementation: `multer` (memory storage) to receive the file in NestJS, then the `cloudinary` npm SDK's `uploader.upload_stream` to push it to Cloudinary using `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` from env
- Response: `{ url, publicId }` — the frontend stores `url` on whichever entity the upload is for (gallery item, notice image, faculty photo, principal photo)
- Validate file type (`image/jpeg`, `image/png`, `image/webp` only) and size (cap at ~5MB) before uploading — reject early with a 400, don't let an arbitrary file hit Cloudinary
- Env vars (add to `apps/api/.env` and to the `api` service in `docker-compose.yml`):
```
CLOUDINARY_CLOUD_NAME=dghemsxka
CLOUDINARY_API_KEY=974718497549977
CLOUDINARY_API_SECRET=<keep this only in .env, never commit it or put it in a doc that gets shared>
```

---

## 6. Frontend Standards

- **Route group layouts — do not share one root layout:** `app/layout.tsx` (root) contains ONLY `<html>/<body>`, font loading, and global providers — nothing visual. `app/(storefront)/layout.tsx` renders `<Header/>` + `{children}` + `<Footer/>`. `app/(admin)/layout.tsx` renders its own `<AdminSidebar/>` + `{children}` — no public Header/Footer. This is a hard rule, not a style preference: mixing them is what causes the admin panel to render the public site's header.
- **Admin index route required:** `app/(admin)/admin/page.tsx` must exist (e.g. redirecting to `/admin/dashboard` or rendering the dashboard directly) — a route group with only child pages and no `page.tsx` at its own path 404s.
- **Data freshness from admin writes:** every storefront Server Component fetch to the API must use `fetch(url, { cache: "no-store" })` (or `next: { revalidate: 0 }`). Given this site's traffic, correctness (admin edits show immediately) matters more than the performance gain from caching — do not let any storefront fetch use Next's default caching behavior, or admin changes will silently not appear until a rebuild.
- **Rendering:** storefront pages are Server Components by default, fetching directly from the NestJS API at request time (no client-side loading spinners on first paint — matters for SEO and for a "sleek" first impression)
- **Styling direction:** since you want it sleek — pull the palette from the logo (black, gold, blue, red as accent only), generous white space, one clean sans-serif display font for headings (e.g. a geometric sans) + a readable body font, subtle scroll-reveal animations (Framer Motion, used sparingly — not on every element), no stock-photo look. **Never use unrelated stock photography (e.g. lifestyle/fitness/generic corporate images) as placeholders — use only real uploaded school photos (via Cloudinary, see §5.6) or, if none exist yet for a section, a clean solid-color/gradient placeholder block instead of a mismatched photo.**
- **Images:** always `next/image`, always with `alt` text (required prop, not optional, in your gallery/notice components)
- **Forms:** the enquiry form is a Client Component (needs interactivity), validated with `zod` + `react-hook-form`, posts to `POST /enquiries`
- **Admin panel:** Client Components throughout (it's an authenticated dashboard, SEO doesn't apply). Auth state comes from Better Auth's React client (`better-auth/react`'s `createAuthClient` + `useSession()` hook) — do not build a custom "is logged in" context from scratch, the library provides it. Table views use simple client-side state — no need for heavy state libraries at this scale
- **Image uploads in admin forms:** any admin form field that accepts an image (gallery item, notice image, faculty photo, principal photo) uses a shared `<ImageUploadField>` component that POSTs the file to `/uploads` first, receives back `{ url }`, and submits that URL as part of the entity payload. The component never touches Cloudinary directly or holds the API secret — see §5.6.
- **API client:** one shared `lib/api.ts` wrapping `fetch` with base URL + auth header injection, so every component calls e.g. `api.get('/notices')` instead of hardcoding URLs

---

## 7. API Error Shape (standard across all endpoints)

```json
{
  "statusCode": 400,
  "message": "childAge must be a positive number",
  "error": "Bad Request",
  "path": "/enquiries",
  "timestamp": "2026-07-17T10:00:00.000Z"
}
```
All 4xx/5xx responses follow this shape via the global exception filter — the frontend can rely on `error.message` always existing.

---

## 8. Non-Functional Requirements

- Public pages: LCP < 2.5s on simulated 4G (check with Lighthouse before calling any phase "done")
- Admin panel: no destructive action (delete notice/gallery item/testimonial) without a confirm dialog
- All list endpoints support pagination (`?page=&limit=`) from day one, even if the frontend doesn't paginate yet — retrofitting pagination later breaks response shapes
- All timestamps stored/returned in UTC ISO 8601; format for display on the frontend only

---

## 9. Definition of Done — "Demo Ready Tonight"

- [ ] `docker compose up -d` brings up Postgres cleanly
- [ ] `npx prisma migrate dev` + `npx prisma db seed` populate the DB
- [ ] Backend runs on `:4000`, Swagger docs load at `/api/docs`, Better Auth's endpoints respond at `/api/auth/*`
- [ ] Frontend runs on `:3000`
- [ ] Home, Admissions (with working enquiry form → saves to DB), Contact pages render with real seeded content and the actual logo
- [ ] Admin login works, enquiry list shows seeded + newly submitted enquiries, status can be changed
- [ ] Notices + Gallery are manageable from admin and reflect on the public site immediately (no rebuild needed)
- [ ] Everything above works on a phone-width viewport, not just desktop
- [ ] **Deployability check:** `docker compose down` (keep the volume) then `docker compose up --build` brings up all three containers — Postgres, API, Web — from a clean build, migrations run automatically, and the full walkthrough above still passes end-to-end talking only to containers, not anything running natively on your host
