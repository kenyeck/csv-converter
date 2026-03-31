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

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js 15, React 18, TypeScript, Chakra UI 3 |
| **Backend** | Express.js, TypeScript, MongoDB |
| **Auth** | NextAuth v5 (GitHub, Google OAuth) |
| **Payments** | Stripe (Checkout, Webhooks, Subscriptions) |
| **Monorepo** | Turborepo, pnpm workspaces |
| **Testing** | Jest, Supertest |
| **Tooling** | ESLint, Prettier, tsup |

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

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
