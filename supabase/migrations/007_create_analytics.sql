-- 007_create_analytics.sql
-- Analytics table for engagement metrics and reporting

create table if not exists public.analytics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  post_id uuid references public.posts(id) on delete cascade,
  platform text not null, -- e.g., 'twitter', 'facebook', etc.
  metric_type text not null, -- e.g., 'likes', 'comments', 'shares', 'views'
  value integer not null,
  recorded_at timestamptz default now()
);

-- Row Level Security
alter table public.analytics enable row level security;

-- Only allow users to select their own analytics
create policy "Users can view their own analytics" on public.analytics
  for select using (auth.uid() = user_id);

-- Only allow insert by the user themselves
create policy "Users can insert their own analytics" on public.analytics
  for insert with check (auth.uid() = user_id);
