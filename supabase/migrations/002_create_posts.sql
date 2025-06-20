-- 002_create_posts.sql
-- Posts table for AI/social content

create type public.post_status as enum ('draft', 'scheduled', 'published', 'failed');
create type public.post_content_type as enum ('text', 'image', 'video', 'link');

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text,
  content text,
  content_type public.post_content_type not null default 'text',
  platforms text[] not null,
  status public.post_status not null default 'draft',
  scheduled_for timestamptz,
  published_at timestamptz,
  media_urls text[],
  hashtags text[],
  ai_generated boolean default false,
  engagement_stats jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger to update updated_at on row modification
create or replace function public.update_post_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_post_updated_at on public.posts;
create trigger set_post_updated_at
before update on public.posts
for each row execute procedure public.update_post_updated_at();

-- Row Level Security
alter table public.posts enable row level security;

-- Only allow users to select/update/delete their own posts
create policy "Users can view their own posts" on public.posts
  for select using (auth.uid() = user_id);

create policy "Users can update their own posts" on public.posts
  for update using (auth.uid() = user_id);

create policy "Users can delete their own posts" on public.posts
  for delete using (auth.uid() = user_id);

create policy "Users can insert their own posts" on public.posts
  for insert with check (auth.uid() = user_id);
