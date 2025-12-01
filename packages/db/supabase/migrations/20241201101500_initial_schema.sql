-- Supabase schema definition for Smart Monorepo
-- Generated on 2024-12-01

begin;

create extension if not exists "pgcrypto" with schema public;
create extension if not exists "uuid-ossp" with schema public;
create extension if not exists citext with schema public;

-- Enum definitions ---------------------------------------------------------
create type public.work_media_type as enum ('book', 'article', 'podcast', 'video', 'paper', 'course', 'other');
create type public.work_status as enum ('draft', 'in_progress', 'published', 'archived');
create type public.visibility_level as enum ('private', 'circle', 'public');
create type public.circle_role as enum ('owner', 'admin', 'member', 'guest');
create type public.circle_visibility as enum ('public', 'invite_only', 'private');
create type public.circle_membership_status as enum ('pending', 'active', 'banned', 'left');
create type public.audio_generation_status as enum ('queued', 'processing', 'ready', 'failed');
create type public.insight_type as enum ('key_takeaway', 'quote', 'statistic', 'question', 'action_item');
create type public.flashcard_difficulty as enum ('easy', 'medium', 'hard');
create type public.srs_stage as enum ('learning', 'reviewing', 'mastered');

-- Helper function used by multiple tables to keep updated_at in sync ------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- Profiles -----------------------------------------------------------------
create table public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  username citext unique not null,
  display_name text,
  avatar_url text,
  bio text,
  timezone text not null default 'UTC',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.touch_updated_at();

-- Works --------------------------------------------------------------------
create table public.works (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  slug text unique,
  description text,
  source_url text,
  media_type public.work_media_type not null default 'other',
  status public.work_status not null default 'draft',
  visibility public.visibility_level not null default 'private',
  metadata jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger works_set_updated_at
before update on public.works
for each row
execute function public.touch_updated_at();

-- Summaries ----------------------------------------------------------------
create table public.summaries (
  id uuid primary key default gen_random_uuid(),
  work_id uuid not null references public.works (id) on delete cascade,
  author_id uuid not null references auth.users (id) on delete cascade,
  language_code text not null default 'en',
  tone text not null default 'neutral',
  content text not null,
  is_primary boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index summaries_work_primary_idx
on public.summaries (work_id)
where is_primary;

create trigger summaries_set_updated_at
before update on public.summaries
for each row
execute function public.touch_updated_at();

-- Audio Tracks -------------------------------------------------------------
create table public.audio_tracks (
  id uuid primary key default gen_random_uuid(),
  work_id uuid references public.works (id) on delete cascade,
  summary_id uuid references public.summaries (id) on delete set null,
  owner_id uuid not null references auth.users (id) on delete cascade,
  storage_path text not null,
  duration_seconds integer,
  voice_profile text,
  status public.audio_generation_status not null default 'queued',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index audio_tracks_storage_path_idx on public.audio_tracks (storage_path);

create trigger audio_tracks_set_updated_at
before update on public.audio_tracks
for each row
execute function public.touch_updated_at();

-- Insights -----------------------------------------------------------------
create table public.insights (
  id uuid primary key default gen_random_uuid(),
  work_id uuid not null references public.works (id) on delete cascade,
  author_id uuid not null references auth.users (id) on delete cascade,
  kind public.insight_type not null default 'key_takeaway',
  content text not null,
  supporting_quote text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger insights_set_updated_at
before update on public.insights
for each row
execute function public.touch_updated_at();

-- Flashcards ----------------------------------------------------------------
create table public.flashcards (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  work_id uuid references public.works (id) on delete set null,
  prompt text not null,
  answer text not null,
  hint text,
  difficulty public.flashcard_difficulty not null default 'medium',
  tags text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger flashcards_set_updated_at
before update on public.flashcards
for each row
execute function public.touch_updated_at();

-- Flashcard SRS State ------------------------------------------------------
create table public.flashcard_srs_state (
  flashcard_id uuid primary key references public.flashcards (id) on delete cascade,
  owner_id uuid not null references auth.users (id) on delete cascade,
  stage public.srs_stage not null default 'learning',
  ease_factor numeric(4,2) not null default 2.50,
  interval_days integer not null default 0,
  due_at timestamptz not null default timezone('utc', now()),
  last_reviewed_at timestamptz,
  review_count integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger flashcard_srs_state_set_updated_at
before update on public.flashcard_srs_state
for each row
execute function public.touch_updated_at();

-- Circles ------------------------------------------------------------------
create table public.circles (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  slug text not null unique,
  name text not null,
  description text,
  visibility public.circle_visibility not null default 'invite_only',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger circles_set_updated_at
before update on public.circles
for each row
execute function public.touch_updated_at();

-- Circle Members -----------------------------------------------------------
create table public.circle_members (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references public.circles (id) on delete cascade,
  member_id uuid not null references auth.users (id) on delete cascade,
  role public.circle_role not null default 'member',
  status public.circle_membership_status not null default 'pending',
  invited_by uuid references auth.users (id) on delete set null,
  joined_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (circle_id, member_id)
);

create trigger circle_members_set_updated_at
before update on public.circle_members
for each row
execute function public.touch_updated_at();

-- Circle Posts -------------------------------------------------------------
create table public.circle_posts (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references public.circles (id) on delete cascade,
  author_id uuid not null references auth.users (id) on delete cascade,
  work_id uuid references public.works (id) on delete set null,
  title text not null,
  body text,
  visibility public.visibility_level not null default 'circle',
  is_pinned boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index circle_posts_circle_id_idx on public.circle_posts (circle_id);
create index circle_posts_work_id_idx on public.circle_posts (work_id);

create trigger circle_posts_set_updated_at
before update on public.circle_posts
for each row
execute function public.touch_updated_at();

-- Circle Comments ----------------------------------------------------------
create table public.circle_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.circle_posts (id) on delete cascade,
  author_id uuid not null references auth.users (id) on delete cascade,
  parent_comment_id uuid references public.circle_comments (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index circle_comments_post_id_idx on public.circle_comments (post_id);
create index circle_comments_parent_idx on public.circle_comments (parent_comment_id);

create trigger circle_comments_set_updated_at
before update on public.circle_comments
for each row
execute function public.touch_updated_at();

-- Daily Feeds --------------------------------------------------------------
create table public.daily_feeds (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  feed_date date not null,
  payload jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (owner_id, feed_date)
);

create trigger daily_feeds_set_updated_at
before update on public.daily_feeds
for each row
execute function public.touch_updated_at();

-- Helper functions that depend on table definitions -----------------------
create or replace function public.can_access_circle(target_circle_id uuid)
returns boolean
language sql
stable
as $$
  select exists(
    select 1
    from public.circles c
    where c.id = target_circle_id
      and (
        c.visibility = 'public'
        or auth.uid() = c.owner_id
        or exists (
          select 1
          from public.circle_members cm
          where cm.circle_id = c.id
            and cm.member_id = auth.uid()
            and cm.status = 'active'
        )
      )
  );
$$;

create or replace function public.is_circle_moderator(target_circle_id uuid)
returns boolean
language sql
stable
as $$
  select exists(
    select 1
    from public.circles c
    where c.id = target_circle_id
      and (
        c.owner_id = auth.uid()
        or exists (
          select 1
          from public.circle_members cm
          where cm.circle_id = c.id
            and cm.member_id = auth.uid()
            and cm.role in ('owner', 'admin')
            and cm.status = 'active'
        )
      )
  );
$$;

create or replace function public.can_access_work(target_work_id uuid)
returns boolean
language sql
stable
as $$
  select exists(
    select 1
    from public.works w
    where w.id = target_work_id
      and (
        w.visibility = 'public'
        or auth.uid() = w.author_id
        or (
          w.visibility = 'circle'
          and exists (
            select 1
            from public.circle_posts cp
            join public.circle_members cm on cm.circle_id = cp.circle_id
            where cp.work_id = w.id
              and cm.member_id = auth.uid()
              and cm.status = 'active'
          )
        )
      )
  );
$$;

-- Row level security policies ---------------------------------------------
-- Profiles RLS
alter table public.profiles enable row level security;

create policy "Profiles readable by authenticated users"
  on public.profiles
  for select
  to authenticated
  using (true);

create policy "Users manage their own profile"
  on public.profiles
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Works RLS
alter table public.works enable row level security;

create policy "Public works are readable"
  on public.works
  for select
  using (visibility = 'public');

create policy "Authors own their works"
  on public.works
  for all
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

create policy "Circle work visibility"
  on public.works
  for select
  to authenticated
  using (
    visibility = 'circle'
    and exists (
      select 1
      from public.circle_posts cp
      join public.circle_members cm on cm.circle_id = cp.circle_id
      where cp.work_id = public.works.id
        and cm.member_id = auth.uid()
        and cm.status = 'active'
    )
  );
-- TODO: Expand to support organization-level sharing.

-- Summaries RLS
alter table public.summaries enable row level security;

create policy "Summary visibility matches work"
  on public.summaries
  for select
  using (
    author_id = auth.uid()
    or public.can_access_work(work_id)
  );

create policy "Summary authors manage rows"
  on public.summaries
  for all
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

-- Audio tracks RLS
alter table public.audio_tracks enable row level security;

create policy "Audio tracks follow work access"
  on public.audio_tracks
  for select
  using (
    owner_id = auth.uid()
    or (work_id is not null and public.can_access_work(work_id))
  );

create policy "Audio track owners manage rows"
  on public.audio_tracks
  for all
  to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- Insights RLS
alter table public.insights enable row level security;

create policy "Insights follow work access"
  on public.insights
  for select
  using (
    author_id = auth.uid()
    or public.can_access_work(work_id)
  );

create policy "Insight authors manage rows"
  on public.insights
  for all
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

-- Flashcards RLS
alter table public.flashcards enable row level security;

create policy "Flashcards owned by user"
  on public.flashcards
  for select
  using (owner_id = auth.uid());

create policy "Flashcard owners manage rows"
  on public.flashcards
  for all
  to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);
-- TODO: Allow shared flashcard decks once collaboration lands.

-- Flashcard SRS State RLS
alter table public.flashcard_srs_state enable row level security;

create policy "SRS state owned by user"
  on public.flashcard_srs_state
  for select
  using (owner_id = auth.uid());

create policy "SRS owners manage rows"
  on public.flashcard_srs_state
  for all
  to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- Circles RLS
alter table public.circles enable row level security;

create policy "Public circles readable"
  on public.circles
  for select
  using (visibility = 'public');

create policy "Members can view their circles"
  on public.circles
  for select
  to authenticated
  using (public.can_access_circle(id));

create policy "Circle owners manage circle"
  on public.circles
  for all
  to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- Circle members RLS
alter table public.circle_members enable row level security;

create policy "Members view membership rows"
  on public.circle_members
  for select
  to authenticated
  using (
    member_id = auth.uid()
    or public.is_circle_moderator(circle_id)
  );

create policy "Members update their membership"
  on public.circle_members
  for update
  to authenticated
  using (member_id = auth.uid())
  with check (member_id = auth.uid());

create policy "Moderators manage membership"
  on public.circle_members
  for all
  to authenticated
  using (public.is_circle_moderator(circle_id))
  with check (public.is_circle_moderator(circle_id));

create policy "Request to join circles"
  on public.circle_members
  for insert
  to authenticated
  with check (
    auth.uid() = member_id
    and public.can_access_circle(circle_id)
  );
-- TODO: Replace `can_access_circle` with invitation checks for invite-only spaces.

-- Circle posts RLS
alter table public.circle_posts enable row level security;

create policy "Circle posts readable by viewers"
  on public.circle_posts
  for select
  using (public.can_access_circle(circle_id));

create policy "Post authors manage rows"
  on public.circle_posts
  for all
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

create policy "Circle moderators manage posts"
  on public.circle_posts
  for all
  to authenticated
  using (public.is_circle_moderator(circle_id))
  with check (public.is_circle_moderator(circle_id));

-- Circle comments RLS
alter table public.circle_comments enable row level security;

create policy "Comments readable by circle viewers"
  on public.circle_comments
  for select
  using (
    exists (
      select 1
      from public.circle_posts cp
      where cp.id = post_id
        and public.can_access_circle(cp.circle_id)
    )
  );

create policy "Comment authors manage rows"
  on public.circle_comments
  for all
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

create policy "Moderators can manage comments"
  on public.circle_comments
  for all
  to authenticated
  using (
    exists (
      select 1
      from public.circle_posts cp
      where cp.id = post_id
        and public.is_circle_moderator(cp.circle_id)
    )
  )
  with check (
    exists (
      select 1
      from public.circle_posts cp
      where cp.id = post_id
        and public.is_circle_moderator(cp.circle_id)
    )
  );

-- Daily feeds RLS
alter table public.daily_feeds enable row level security;

create policy "Daily feeds owned by user"
  on public.daily_feeds
  for select
  using (owner_id = auth.uid());

create policy "Feed owners manage rows"
  on public.daily_feeds
  for all
  to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

commit;
