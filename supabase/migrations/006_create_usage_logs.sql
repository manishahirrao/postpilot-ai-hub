-- 006_create_usage_logs.sql
-- Usage Logs table for credit tracking and audit

create table if not exists public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  action text not null,
  credits_used integer default 0,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.usage_logs enable row level security;

-- Only allow users to select their own usage logs
create policy "Users can view their own usage logs" on public.usage_logs
  for select using (auth.uid() = user_id);

-- Only allow insert by the user themselves
create policy "Users can insert their own usage logs" on public.usage_logs
  for insert with check (auth.uid() = user_id);
