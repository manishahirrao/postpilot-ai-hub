-- 004_create_social_accounts.sql
-- Social Accounts table for storing OAuth credentials and metadata

create table if not exists public.social_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  platform text not null, -- e.g. 'twitter', 'facebook', 'instagram', 'linkedin'
  account_id text not null,
  account_name text,
  access_token text not null,
  refresh_token text,
  expires_at timestamptz,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.social_accounts enable row level security;

-- Only allow users to select/update/delete their own social accounts
create policy "Users can view their own social accounts" on public.social_accounts
  for select using (auth.uid() = user_id);

create policy "Users can update their own social accounts" on public.social_accounts
  for update using (auth.uid() = user_id);

create policy "Users can delete their own social accounts" on public.social_accounts
  for delete using (auth.uid() = user_id);

create policy "Users can insert their own social accounts" on public.social_accounts
  for insert with check (auth.uid() = user_id);
