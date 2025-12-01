-- Seed data for Smart Monorepo
-- This file contains sample data for local development and testing

begin;

-- Note: In a real setup, users would be created through Supabase Auth
-- For local development, you may need to create test users via the Supabase Studio UI
-- or via the Supabase CLI/Auth API first.

-- Sample user IDs (replace with actual user IDs from auth.users in your local setup)
-- These are example UUIDs - adjust them to match your actual test users
do $$
declare
  user_alice uuid;
  user_bob uuid;
  user_charlie uuid;
  work_sapiens uuid;
  work_thinking_fast uuid;
  circle_book_club uuid;
  circle_research uuid;
  post_sapiens uuid;
begin
  -- Create test profiles
  -- Note: You'll need to create these users in auth.users first via Supabase Studio
  -- This is just to show the structure
  
  -- Example: If you have test users, insert their profiles
  -- user_alice := '00000000-0000-0000-0000-000000000001'::uuid;
  -- user_bob := '00000000-0000-0000-0000-000000000002'::uuid;
  -- user_charlie := '00000000-0000-0000-0000-000000000003'::uuid;

  -- Uncomment and adjust the following after creating test users:
  
  /*
  -- Sample profiles
  insert into public.profiles (user_id, username, display_name, bio) values
    (user_alice, 'alice', 'Alice Wonder', 'Curious learner passionate about history and science'),
    (user_bob, 'bob', 'Bob Builder', 'Software engineer who loves reading'),
    (user_charlie, 'charlie', 'Charlie Brown', 'Psychology enthusiast and lifelong learner')
  on conflict (user_id) do nothing;

  -- Sample works
  insert into public.works (id, author_id, title, slug, description, media_type, status, visibility) values
    (gen_random_uuid(), user_alice, 'Sapiens: A Brief History of Humankind', 'sapiens-brief-history', 'A groundbreaking narrative of humanity''s creation and evolution', 'book', 'published', 'public'),
    (gen_random_uuid(), user_bob, 'Thinking, Fast and Slow', 'thinking-fast-and-slow', 'Exploration of the two systems that drive the way we think', 'book', 'published', 'public'),
    (gen_random_uuid(), user_alice, 'The Psychology of Money', 'psychology-of-money', 'Timeless lessons on wealth, greed, and happiness', 'book', 'published', 'circle')
  returning id into work_sapiens;

  -- Sample summaries
  insert into public.summaries (work_id, author_id, content, is_primary) values
    (work_sapiens, user_alice, 'Sapiens traces human history from the Stone Age to the present, exploring how Homo sapiens came to dominate the planet through cognitive, agricultural, and scientific revolutions.', true);

  -- Sample insights
  insert into public.insights (work_id, author_id, kind, content, supporting_quote) values
    (work_sapiens, user_alice, 'key_takeaway', 'The Cognitive Revolution enabled humans to create shared myths and cooperate in large groups', 'The Cognitive Revolution is accordingly the point when history declared its independence from biology'),
    (work_sapiens, user_alice, 'quote', 'Money is the most universal and most efficient system of mutual trust ever devised', null);

  -- Sample flashcards
  insert into public.flashcards (owner_id, work_id, prompt, answer, difficulty, tags) values
    (user_alice, work_sapiens, 'What are the three major revolutions described in Sapiens?', 'The Cognitive Revolution, the Agricultural Revolution, and the Scientific Revolution', 'medium', array['history', 'sapiens']),
    (user_bob, work_sapiens, 'When did the Cognitive Revolution occur?', 'Approximately 70,000 years ago', 'easy', array['history', 'evolution']);

  -- Sample circles
  insert into public.circles (id, owner_id, slug, name, description, visibility) values
    (gen_random_uuid(), user_alice, 'book-club', 'Book Club', 'A community for discussing great books', 'public'),
    (gen_random_uuid(), user_bob, 'research-group', 'Research Group', 'Private group for research discussions', 'invite_only')
  returning id into circle_book_club;

  -- Sample circle members
  insert into public.circle_members (circle_id, member_id, role, status) values
    (circle_book_club, user_alice, 'owner', 'active'),
    (circle_book_club, user_bob, 'member', 'active'),
    (circle_book_club, user_charlie, 'member', 'active');

  -- Sample circle posts
  insert into public.circle_posts (id, circle_id, author_id, work_id, title, body) values
    (gen_random_uuid(), circle_book_club, user_alice, work_sapiens, 'Just finished reading Sapiens!', 'What an incredible book! Would love to hear everyone''s thoughts on the Cognitive Revolution chapter.')
  returning id into post_sapiens;

  -- Sample circle comments
  insert into public.circle_comments (post_id, author_id, body) values
    (post_sapiens, user_bob, 'I found that chapter fascinating! The idea of shared myths creating cooperation at scale is mind-blowing.'),
    (post_sapiens, user_charlie, 'Agreed! It really changed how I think about human organizations and societies.');
  */

  raise notice 'Seed data structure prepared. Create test users in auth.users first, then uncomment and adjust the seed data above.';
end $$;

commit;
