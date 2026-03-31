# CSV Converter

A full-stack SaaS application for converting, previewing, and transforming CSV files into multiple formats (JSON, XML, SQL). Features file upload with encoding detection, interactive data previews, and Stripe-powered subscription billing.

## Features

- **File Upload & Parsing** — Drag-and-drop CSV upload with automatic character encoding detection (via jschardet) and delimiter handling (via PapaParse)
- **Format Conversion** — Convert CSV data to JSON, XML, and SQL INSERT statements with syntax highlighting
- **Interactive Preview** — Paginated data table with column sorting and filtering
- **Import Settings** — Configure delimiters, headers, and encoding options before conversion
- **Subscription Billing** — Stripe integration with plan management, checkout sessions, and webhook handling
- **Authentication** — NextAuth (v5 beta) with GitHub and Google OAuth providers
- **Dark/Light Mode** — Theme toggle with persistent preference

## Tech Stack

| Layer        | Technologies                                  |
| ------------ | --------------------------------------------- |
| **Frontend** | Next.js 15, React 18, TypeScript, Chakra UI 3 |
| **Backend**  | Express.js, TypeScript, MongoDB               |
| **Auth**     | NextAuth v5 (GitHub, Google OAuth)            |
| **Payments** | Stripe (Checkout, Webhooks, Subscriptions)    |
| **Monorepo** | Turborepo, pnpm workspaces                    |
| **Testing**  | Jest, Supertest                               |
| **Tooling**  | ESLint, Prettier, tsup                        |

## Project Structure

```
csv-converter/
├── apps/
│   ├── api/          # Express.js REST API
│   │   ├── src/
│   │   │   ├── controllers/   # Plan, Stripe, User controllers
│   │   │   ├── middleware/     # JWT auth middleware
│   │   │   ├── models/        # MongoDB models
│   │   │   └── routes/        # API routes
│   │   └── tsup.config.ts
│   └── web/          # Next.js frontend
│       └── src/
│           ├── app/           # App Router pages (billing, login, register, privacy)
│           └── components/    # UI components (FileUpload, Preview, Convert, Pricing)
└── packages/         # Shared configs (ESLint, TypeScript, Jest, UI, Logger)
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm
- MongoDB instance
- Stripe account (for billing features)

### Installation

```bash
pnpm install
pnpm run dev
```

The web app runs on `http://localhost:3000` and the API on port `3001`.

### Stripe Testing

1. Install the [Stripe CLI](https://docs.stripe.com/stripe-cli)
2. Start the webhook listener:
   ```bash
   stripe listen --events checkout.session.completed --forward-to localhost:3001/api/webhook
   ```
3. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET` in your `.env.development` file

## Deploying API (Railway/Render)

The API is best deployed as a long-running Node service from `apps/api`.

### Railway

1. Create a service from this repository.
2. Set the service root directory to `apps/api`.
3. Railway will pick up `apps/api/railway.toml`.
4. Add the required environment variables.
5. Deploy.

Manual settings (if you do not use `railway.toml`):

- Root directory: `apps/api`
- Build command: `cd ../.. && pnpm install --frozen-lockfile && pnpm turbo run build --filter=api`
- Start command: `node dist/index.cjs`
- Health check path: `/health`
- Watch path (optional): `apps/api/**`
- Region: choose the closest region to your MongoDB cluster

### Render

1. Create a Web Service from this repository.
2. Use the Render Blueprint in `render.yaml` (or manually set the same commands).
3. Add the required environment variables.
4. Deploy.

Manual settings (if you do not use `render.yaml`):

- Service type: `Web Service`
- Runtime: `Node`
- Root directory: `apps/api`
- Build command: `cd ../.. && pnpm install --frozen-lockfile && pnpm turbo run build --filter=api`
- Start command: `node dist/index.cjs`
- Health check path: `/health`
- Auto deploy: `On`
- Node version: `>=18` (match your local/project version)

### Required environment variables

- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_CLIENT_URL`
- `CORS_ORIGIN`

### Optional environment variables

- `PORT` (platforms usually inject this automatically)
- `NODE_ENV` (set to `production`)

### Post-deploy smoke test

Run this from the repository root after deployment:

```bash
pnpm --filter api smoke:deploy -- https://<your-api-domain>
```

The smoke test checks:

- `/health`
- `/api/plans`
- `/api/stripe/plans`

### Production environment values (Railway/Render)

Use the same variables on both platforms. Replace placeholder values with your real credentials and domains.

| Variable                | Example value                                                                        | Notes                                                     |
| ----------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| `NODE_ENV`              | `production`                                                                         | Enables production behavior in libraries and middleware   |
| `PORT`                  | `3001`                                                                               | Optional on Railway/Render; platform usually injects this |
| `MONGODB_URI`           | `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority` | Use your Atlas connection string                          |
| `NEXTAUTH_SECRET`       | `<long-random-secret>`                                                               | Use a long random string (at least 32 chars)              |
| `STRIPE_SECRET_KEY`     | `sk_live_...`                                                                        | Stripe secret key for the same account as your frontend   |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...`                                                                          | Stripe webhook signing secret for this deployed endpoint  |
| `STRIPE_CLIENT_URL`     | `https://<your-web-domain>`                                                          | Public URL of your web app                                |
| `CORS_ORIGIN`           | `https://<your-web-domain>`                                                          | Must match your web app origin exactly                    |

Railway quick paste template:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
NEXTAUTH_SECRET=<long-random-secret>
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CLIENT_URL=https://<your-web-domain>
CORS_ORIGIN=https://<your-web-domain>
```

Render quick paste template:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
NEXTAUTH_SECRET=<long-random-secret>
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CLIENT_URL=https://<your-web-domain>
CORS_ORIGIN=https://<your-web-domain>
```

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
