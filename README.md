# BRISA

**Help every work.**

BRISA is a work-request marketplace that connects people who need something done with people who can help. Post a job, browse requests, express interest.

## Core workflow

1. Sign up with email + password
2. Browse all work requests on the dashboard
3. Post a work request (title, category, description, location)
4. Click "Quero ajudar" on a request you can help with
5. If you posted the request, see who's interested

## Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 16 (App Router) | Full-stack React, Vercel-native |
| Language | TypeScript | Type safety across frontend + API |
| Styling | Tailwind CSS v4 | Utility-first, fast iteration |
| Auth | JWT cookies (jose + bcryptjs) | Simple, stateless, zero external deps |
| Database | JSON file (fs module) | Zero-dep, Docker-portable, swap with Postgres/Turso later |
| Testing | Vitest + Testing Library | Fast, Jest-compatible |
| Hosting | Vercel | Zero-config Next.js deploy |
| CI/CD | GitHub Actions | Lint → Type-check → Test → Build → Deploy on every push |

## Getting started

```bash
npm install
npm run dev        # localhost:3000
npm run test       # run tests
npm run lint       # lint
npm run build      # production build
```

## Environment variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `JWT_SECRET` | `brisa-dev-secret-change-in-production` | JWT signing key — **change in production** |
| `DATA_DIR` | `./data` | Directory where `db.json` is stored |

## Deploying to Vercel (staging)

**One-time setup (2 minutes):**

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub (`fasilvabrisa`)
2. Click **Add New Project** → **Import Git Repository**
3. Select `fasilvabrisa/brisa` → Click **Deploy**
4. Add environment variables in Vercel dashboard:
   - `JWT_SECRET` = a random 32-character string (e.g. from `openssl rand -hex 32`)

Vercel will auto-deploy every push to `main`. Preview URLs are generated for every PR.

**After initial Vercel setup, enable GitHub Actions deploy:**

1. In Vercel dashboard: **Settings → Tokens** → Create a token
2. In GitHub repo: **Settings → Secrets → Actions**, add:
   - `VERCEL_TOKEN` = the token from step 1
   - `VERCEL_ORG_ID` = found in Vercel → Settings → General
   - `VERCEL_PROJECT_ID` = found in Vercel → Project → Settings

## Running with Docker

```bash
docker build -t brisa .
docker run -p 3000:3000 \
  -e JWT_SECRET=your-secret \
  -e DATA_DIR=/app/data \
  brisa
```

## Repository

[github.com/fasilvabrisa/brisa](https://github.com/fasilvabrisa/brisa)
