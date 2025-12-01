# @smart/db

Shared database utilities and Supabase schema for the Smart monorepo.

This package now houses the canonical SQL representation of the Smart data model alongside the Supabase client helpers.

## Contents

- `src/` – TypeScript helpers for creating Supabase clients.
- `supabase/config.toml` – Supabase CLI configuration scoped to this package.
- `supabase/migrations/` – SQL migrations applied to the project.
- `supabase/seed.sql` – Optional seed data for local development.

## Prerequisites

1. **Supabase CLI** – Install via [official docs](https://supabase.com/docs/guides/cli). Common options:
   ```bash
   brew install supabase/tap/supabase      # macOS (Homebrew)
   scoop install supabase                  # Windows (Scoop)
   npm install -g supabase                 # Cross-platform alternative
   ```

2. **Docker** – Required if you want to run the full local Supabase stack (`supabase start`).

3. **Environment variables** – Copy `.env.example` to `.env.local` at the repo root and provide your Supabase keys if you plan to run the Next.js app against this schema.

## Running Migrations Locally

All commands below assume you are in the `packages/db` directory:

```bash
cd packages/db
```

1. **Reset the local database using the Supabase CLI**
   ```bash
   supabase db reset
   ```
   This applies every migration in `supabase/migrations` and runs `supabase/seed.sql` if present. By default the CLI uses the settings in `supabase/config.toml` and connects to the local stack started via `supabase start`.

2. **Apply migrations without dropping data**
   ```bash
   supabase db push
   ```

3. **Create a new migration**
   ```bash
   supabase migration new add-new-table
   # edit the generated SQL file under supabase/migrations
   ```

> **Tip:** If you need to target a remote project, update `supabase/config.toml` (`project_id`) or supply `--project-ref your-ref` when running the CLI.

## Data Model Overview

| Table | Purpose |
| --- | --- |
| `profiles` | Extends `auth.users` with user-facing metadata (username, avatar, bio). |
| `works` | Canonical representation of source materials (books, podcasts, papers, etc.). |
| `summaries` | Multi-language/tone summaries tied to a work. |
| `audio_tracks` | Generated audio derived from works or summaries. |
| `insights` | Highlighted takeaways, quotes, or actions from a work. |
| `flashcards` | User-authored study prompts tied to works. |
| `flashcard_srs_state` | Spaced-repetition metadata (intervals, ease factor, due dates). |
| `circles` | Community/group concept for sharing works and discussion. |
| `circle_members` | Membership + roles for users inside a circle. |
| `circle_posts` | Posts shared inside a circle, optionally referencing a work. |
| `circle_comments` | Comment threads on posts. |
| `daily_feeds` | Aggregated per-user feed snapshots for each day. |

For detailed column-level documentation and example queries, check out [SCHEMA_REFERENCE.md](./SCHEMA_REFERENCE.md).

### Relationships & Constraints

- Every table that has a `*_id` referencing users points back to `auth.users(id)` for consistency with Supabase Auth.
- `circles`, `circle_posts`, and `circle_comments` enforce referential integrity across the collaboration features.
- Helper functions (`public.can_access_circle`, `public.can_access_work`, `public.is_circle_moderator`) encapsulate complex access logic so policies remain readable.

### Row-Level Security (RLS)

RLS is enabled for every public table. We enforce:

- **Authenticated ownership** – Creation and mutation policies always ensure `auth.uid()` matches the owning column (e.g., `author_id`, `owner_id`).
- **Circle membership visibility** – Select policies defer to helper functions to allow public readers, circle members, or moderators to see collaborative content.
- **Future collaboration hooks** – Each collaborative policy includes a `TODO` comment outlining the next iteration (e.g., organization sharing, invite workflows).

## Seed Data

The provided `supabase/seed.sql` includes a plpgsql block you can adapt to your local Auth users. Steps:

1. Create one or more test users via Supabase Studio (`auth.users`).
2. Update the sample UUID assignments in `seed.sql` to match those user IDs.
3. Run `supabase db reset` (which automatically runs the seed) **or** execute the seed file manually:
   ```bash
   supabase db reset --seed supabase/seed.sql
   # or
   psql "$SUPABASE_DB_URL" -f supabase/seed.sql
   ```

The seed inserts demo data for works, insights, flashcards, and circle discussions to make UI testing easier.

## Using the Generated Schema

The shared Supabase client in `src/index.ts` continues to work as before. Once migrations are applied to your Supabase project, your apps can immediately rely on the new tables and policies. Consider generating types via `supabase gen types typescript --project-id <project-ref>` if you need end-to-end type safety.
