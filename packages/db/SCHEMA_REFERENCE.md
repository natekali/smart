# Database Schema Reference

This document provides a quick reference for the Smart platform database schema.

## Tables Overview

### User & Profile Management

#### `public.profiles`
Extends Supabase auth with user profile information.

| Column | Type | Description |
|--------|------|-------------|
| `user_id` | uuid | Primary key, references `auth.users.id` |
| `username` | citext | Unique username (case-insensitive) |
| `display_name` | text | User's display name |
| `avatar_url` | text | Profile picture URL |
| `bio` | text | User biography |
| `timezone` | text | User's timezone (default: 'UTC') |
| `created_at` | timestamptz | Record creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

**RLS Policies:**
- ✅ All authenticated users can read profiles
- ✅ Users can only update their own profile

---

### Content Management

#### `public.works`
Core content items (books, articles, podcasts, etc.)

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `author_id` | uuid | References `auth.users.id` |
| `title` | text | Work title |
| `slug` | text | URL-friendly identifier (unique) |
| `description` | text | Work description |
| `source_url` | text | Original source URL |
| `media_type` | work_media_type | Type: book, article, podcast, video, paper, course, other |
| `status` | work_status | Status: draft, in_progress, published, archived |
| `visibility` | visibility_level | Access level: private, circle, public |
| `metadata` | jsonb | Additional metadata (flexible) |
| `published_at` | timestamptz | Publication timestamp |
| `created_at` | timestamptz | Record creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

**RLS Policies:**
- ✅ Public works readable by everyone
- ✅ Authors have full control over their works
- ✅ Circle works readable by circle members

---

#### `public.summaries`
Multi-language/tone summaries of works.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `work_id` | uuid | References `works.id` |
| `author_id` | uuid | References `auth.users.id` |
| `language_code` | text | ISO language code (default: 'en') |
| `tone` | text | Summary tone (e.g., 'neutral', 'casual', 'formal') |
| `content` | text | Summary text |
| `is_primary` | boolean | Whether this is the primary summary |
| `created_at` | timestamptz | Record creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

**Constraints:**
- Only one primary summary per work

**RLS Policies:**
- ✅ Visibility follows work access rules
- ✅ Authors can manage their summaries

---

#### `public.audio_tracks`
Generated audio files from works or summaries.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `work_id` | uuid | References `works.id` (nullable) |
| `summary_id` | uuid | References `summaries.id` (nullable) |
| `owner_id` | uuid | References `auth.users.id` |
| `storage_path` | text | Path in storage bucket (unique) |
| `duration_seconds` | integer | Audio duration |
| `voice_profile` | text | Voice settings used |
| `status` | audio_generation_status | Status: queued, processing, ready, failed |
| `created_at` | timestamptz | Record creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

**RLS Policies:**
- ✅ Visibility follows work access rules
- ✅ Owners can manage their audio tracks

---

#### `public.insights`
Key takeaways, quotes, and notes from works.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `work_id` | uuid | References `works.id` |
| `author_id` | uuid | References `auth.users.id` |
| `kind` | insight_type | Type: key_takeaway, quote, statistic, question, action_item |
| `content` | text | Insight content |
| `supporting_quote` | text | Original quote (optional) |
| `metadata` | jsonb | Additional metadata |
| `created_at` | timestamptz | Record creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

**RLS Policies:**
- ✅ Visibility follows work access rules
- ✅ Authors can manage their insights

---

### Learning & Spaced Repetition

#### `public.flashcards`
Study cards created from works.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `owner_id` | uuid | References `auth.users.id` |
| `work_id` | uuid | References `works.id` (nullable) |
| `prompt` | text | Question/prompt |
| `answer` | text | Answer/explanation |
| `hint` | text | Optional hint |
| `difficulty` | flashcard_difficulty | Difficulty: easy, medium, hard |
| `tags` | text[] | Tag array for organization |
| `created_at` | timestamptz | Record creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

**RLS Policies:**
- ✅ Users can only see and manage their own flashcards
- 📝 TODO: Shared flashcard decks for collaboration

---

#### `public.flashcard_srs_state`
Spaced repetition system (SRS) state for flashcards.

| Column | Type | Description |
|--------|------|-------------|
| `flashcard_id` | uuid | Primary key, references `flashcards.id` |
| `owner_id` | uuid | References `auth.users.id` |
| `stage` | srs_stage | Learning stage: learning, reviewing, mastered |
| `ease_factor` | numeric(4,2) | Ease factor for interval calculation (default: 2.50) |
| `interval_days` | integer | Days until next review |
| `due_at` | timestamptz | When card is due for review |
| `last_reviewed_at` | timestamptz | Last review timestamp |
| `review_count` | integer | Total number of reviews |
| `created_at` | timestamptz | Record creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

**RLS Policies:**
- ✅ Users can only see and manage their own SRS state

---

### Collaboration & Communities

#### `public.circles`
Groups/communities for collaboration.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `owner_id` | uuid | References `auth.users.id` |
| `slug` | text | URL-friendly identifier (unique) |
| `name` | text | Circle name |
| `description` | text | Circle description |
| `visibility` | circle_visibility | Visibility: public, invite_only, private |
| `created_at` | timestamptz | Record creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

**RLS Policies:**
- ✅ Public circles readable by everyone
- ✅ Members can view their circles
- ✅ Owners have full control

---

#### `public.circle_members`
Membership relationships between users and circles.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `circle_id` | uuid | References `circles.id` |
| `member_id` | uuid | References `auth.users.id` |
| `role` | circle_role | Role: owner, admin, member, guest |
| `status` | circle_membership_status | Status: pending, active, banned, left |
| `invited_by` | uuid | References `auth.users.id` (nullable) |
| `joined_at` | timestamptz | Membership creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

**Constraints:**
- Unique combination of (circle_id, member_id)

**RLS Policies:**
- ✅ Members can view their own memberships
- ✅ Moderators can view all memberships in their circles
- ✅ Moderators can manage membership
- 📝 TODO: Invitation workflow for invite-only circles

---

#### `public.circle_posts`
Posts shared within circles.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `circle_id` | uuid | References `circles.id` |
| `author_id` | uuid | References `auth.users.id` |
| `work_id` | uuid | References `works.id` (nullable) |
| `title` | text | Post title |
| `body` | text | Post content |
| `visibility` | visibility_level | Visibility: private, circle, public |
| `is_pinned` | boolean | Whether post is pinned |
| `created_at` | timestamptz | Record creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

**RLS Policies:**
- ✅ Circle members can view posts
- ✅ Authors can manage their posts
- ✅ Circle moderators can manage all posts

---

#### `public.circle_comments`
Comments on circle posts.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `post_id` | uuid | References `circle_posts.id` |
| `author_id` | uuid | References `auth.users.id` |
| `parent_comment_id` | uuid | References `circle_comments.id` (for threading) |
| `body` | text | Comment content |
| `created_at` | timestamptz | Record creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

**RLS Policies:**
- ✅ Circle members can view comments
- ✅ Authors can manage their comments
- ✅ Circle moderators can manage all comments

---

### Personalization

#### `public.daily_feeds`
Personalized daily feed snapshots for users.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `owner_id` | uuid | References `auth.users.id` |
| `feed_date` | date | Date for this feed |
| `payload` | jsonb | Feed items (flexible structure) |
| `metadata` | jsonb | Additional metadata |
| `created_at` | timestamptz | Record creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

**Constraints:**
- Unique combination of (owner_id, feed_date)

**RLS Policies:**
- ✅ Users can only see their own feeds

---

## Enums

### `work_media_type`
- `book`
- `article`
- `podcast`
- `video`
- `paper`
- `course`
- `other`

### `work_status`
- `draft`
- `in_progress`
- `published`
- `archived`

### `visibility_level`
- `private` - Only owner can see
- `circle` - Visible to circle members
- `public` - Visible to everyone

### `circle_role`
- `owner` - Circle creator, full permissions
- `admin` - Can manage members and content
- `member` - Standard member
- `guest` - Limited access member

### `circle_visibility`
- `public` - Anyone can join
- `invite_only` - Requires invitation
- `private` - Hidden from discovery

### `circle_membership_status`
- `pending` - Awaiting approval
- `active` - Active member
- `banned` - Banned from circle
- `left` - Previously a member

### `audio_generation_status`
- `queued` - Waiting to be processed
- `processing` - Currently generating
- `ready` - Available for playback
- `failed` - Generation failed

### `insight_type`
- `key_takeaway` - Main point or lesson
- `quote` - Notable quote
- `statistic` - Data or number
- `question` - Discussion question
- `action_item` - Actionable next step

### `flashcard_difficulty`
- `easy`
- `medium`
- `hard`

### `srs_stage`
- `learning` - Initial learning phase
- `reviewing` - Regular review phase
- `mastered` - Well-retained material

---

## Helper Functions

### `public.can_access_circle(target_circle_id uuid) → boolean`
Checks if the current user can access a circle (public, owner, or active member).

### `public.is_circle_moderator(target_circle_id uuid) → boolean`
Checks if the current user is a moderator (owner or admin) of a circle.

### `public.can_access_work(target_work_id uuid) → boolean`
Checks if the current user can access a work (public, author, or circle member if shared).

### `public.touch_updated_at() → trigger`
Trigger function that automatically updates `updated_at` timestamp on row updates.

---

## Future Expansion TODOs

Throughout the schema, you'll find `TODO` comments indicating planned features:

1. **Organization-level sharing** - Support for team/org-wide work visibility
2. **Shared flashcard decks** - Collaborative flashcard creation
3. **Enhanced invitation system** - Structured invite flows for private circles
4. **Advanced analytics** - Usage tracking and insights generation
5. **Content recommendations** - AI-powered content suggestions

---

## Common Queries

### Get all works visible to current user
```sql
SELECT * FROM public.works
WHERE visibility = 'public'
   OR author_id = auth.uid()
   OR (
     visibility = 'circle'
     AND EXISTS (
       SELECT 1 FROM public.circle_posts cp
       JOIN public.circle_members cm ON cm.circle_id = cp.circle_id
       WHERE cp.work_id = works.id
         AND cm.member_id = auth.uid()
         AND cm.status = 'active'
     )
   );
```

### Get user's due flashcards for review
```sql
SELECT f.*
FROM public.flashcards f
JOIN public.flashcard_srs_state srs ON srs.flashcard_id = f.id
WHERE f.owner_id = auth.uid()
  AND srs.due_at <= now()
ORDER BY srs.due_at ASC;
```

### Get circle posts with author info
```sql
SELECT 
  cp.*,
  p.username,
  p.display_name,
  p.avatar_url
FROM public.circle_posts cp
JOIN public.profiles p ON p.user_id = cp.author_id
WHERE cp.circle_id = '<circle-id>'
  AND public.can_access_circle(cp.circle_id)
ORDER BY cp.is_pinned DESC, cp.created_at DESC;
```
