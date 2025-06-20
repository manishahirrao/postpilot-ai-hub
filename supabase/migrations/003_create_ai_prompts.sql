-- 003_create_ai_prompts.sql
-- AI Prompts table for reusable prompt templates

create table if not exists public.ai_prompts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  prompt text not null,
  category text,
  is_public boolean default false,
  usage_count integer default 0,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.ai_prompts enable row level security;

-- Only allow users to select/update/delete their own prompts
create policy "Users can view their own prompts" on public.ai_prompts
  for select using (auth.uid() = user_id);

create policy "Users can update their own prompts" on public.ai_prompts
  for update using (auth.uid() = user_id);

create policy "Users can delete their own prompts" on public.ai_prompts
  for delete using (auth.uid() = user_id);

create policy "Users can insert their own prompts" on public.ai_prompts
  for insert with check (auth.uid() = user_id);

-- Optionally allow public prompts to be viewed by anyone
create policy "Anyone can view public prompts" on public.ai_prompts
  for select using (is_public = true);
