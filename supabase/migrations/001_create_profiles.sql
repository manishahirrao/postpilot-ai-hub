-- 001_create_profiles.sql
-- Profiles table extends auth.users with additional metadata

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  avatar_url text,
  username text unique,
  bio text,
  subscription_tier text default 'free',
  credits integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger to update updated_at on row modification
create or replace function public.update_profile_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_profile_updated_at on public.profiles;
create trigger set_profile_updated_at
before update on public.profiles
for each row execute procedure public.update_profile_updated_at();

-- Row Level Security
alter table public.profiles enable row level security;

-- Only allow users to select/update their own profile
create policy "Users can view their own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- Allow insert only for the user themselves (e.g., after signup)
create policy "Users can insert their own profile" on public.profiles
  for insert with check (auth.uid() = id);
