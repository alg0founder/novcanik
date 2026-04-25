create table if not exists budget_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  income_override numeric,
  bills_pct integer not null default 50,
  spending_pct integer not null default 20,
  investing_pct integer not null default 20,
  giving_pct integer not null default 10
);

alter table budget_settings enable row level security;

create policy "Users manage own budget settings"
  on budget_settings for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists fixed_costs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  amount numeric not null,
  created_at timestamptz not null default now()
);

alter table fixed_costs enable row level security;

create policy "Users manage own fixed costs"
  on fixed_costs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
