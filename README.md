# Smart Monorepo

A modern monorepo built with Turborepo, Next.js 15, TypeScript, and Tailwind CSS.

## Project Structure

```
smart/
├── apps/
│   └── web/                 # Next.js 15 application (App Router)
├── packages/
│   └── db/                  # Shared Supabase database client
├── turbo.json              # Turborepo configuration
├── pnpm-workspace.yaml     # pnpm workspace configuration
└── tsconfig.base.json      # Shared TypeScript configuration
```

## Prerequisites

- Node.js 18.0.0 or higher
- pnpm 8.15.0 (will be automatically used via `packageManager` field)

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Setup

Copy the example environment file and add your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (optional, server-side only)

You can find these in your Supabase project at: `https://app.supabase.com/project/_/settings/api`

### 3. Start Development Server

```bash
pnpm dev
```

This will start:
- Web app at http://localhost:3000

## Available Scripts

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps for production
- `pnpm lint` - Lint all apps
- `pnpm test` - Run tests across all apps
- `pnpm format` - Format code with Prettier

## Apps and Packages

### apps/web

Next.js 15 application with:
- App Router
- TypeScript
- Tailwind CSS
- ESLint configured

### packages/db

Shared Supabase client package with:
- TypeScript
- Supabase client utilities
- Type-safe database access

## Development

### Adding Dependencies

To add a dependency to a specific workspace:

```bash
# For the web app
pnpm --filter @smart/web add <package>

# For the db package
pnpm --filter @smart/db add <package>

# For the root
pnpm add -w <package>
```

### Creating New Packages

1. Create a new directory in `packages/`
2. Add a `package.json` with name `@smart/<package-name>`
3. Add to workspace references in relevant tsconfig.json files

## Project References

The monorepo uses TypeScript project references for better type checking and IDE support:

- `tsconfig.base.json` - Shared base configuration
- Each package has its own `tsconfig.json` extending the base
- Apps reference packages they depend on via `references` field

## Turborepo

This monorepo uses Turborepo for:
- Fast, incremental builds
- Task orchestration
- Caching
- Parallel execution

See `turbo.json` for task configuration.
