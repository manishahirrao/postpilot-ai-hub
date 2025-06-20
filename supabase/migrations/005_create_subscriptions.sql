-- 005_create_subscriptions.sql
-- Subscriptions table for Stripe billing integration

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  stripe_subscription_id text not null,
  status text not null, -- e.g. 'active', 'canceled', 'past_due', etc.
  price_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.subscriptions enable row level security;

-- Only allow users to select/update/delete their own subscriptions
create policy "Users can view their own subscriptions" on public.subscriptions
  for select using (auth.uid() = user_id);

create policy "Users can update their own subscriptions" on public.subscriptions
  for update using (auth.uid() = user_id);

create policy "Users can delete their own subscriptions" on public.subscriptions
  for delete using (auth.uid() = user_id);

create policy "Users can insert their own subscriptions" on public.subscriptions
  for insert with check (auth.uid() = user_id);
