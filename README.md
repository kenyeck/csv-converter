To run locally...
   1) pnpm install (first time)
   2) pnpm run dev

To test Stripe subscriptions, you'll need:
   1) Install the CLI - start here: https://docs.stripe.com/stripe-cli
   2) Open terminal in VSCode, login and start a listener - "stripe listen --events checkout.session.completed  --forward-to localhost:3001/api/webhook". Note: The first time you start the listener, you need to copy the webhook secret provided and add it to STRIPE_WEBHOOK_SECRET in your .env.development file.
   3) Open http://localhost:3000 and exercise the subscriptions (create, cancel, etc.).

This Turborepo includes the following packages and apps:

### Apps and Packages

- `api`: an [Express](https://expressjs.com/) server
- `web`: a [Next.js](https://nextjs.org/) app
- `@repo/eslint-config`: ESLint configurations used throughout the monorepo
- `@repo/jest-presets`: Jest configurations
- `@repo/logger`: isomorphic logger (a small wrapper around console.log)
- `@repo/ui`: a dummy React UI library (which contains `<CounterButton>` and `<Link>` components)
- `@repo/typescript-config`: tsconfig.json's used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
