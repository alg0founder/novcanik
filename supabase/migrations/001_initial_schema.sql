-- ============================================================
-- 001_initial_schema.sql
-- Novčanik — početna shema baze podataka
-- ============================================================

-- ---- CATEGORIES ----
create table public.categories (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  type        text not null check (type in ('income', 'expense')),
  icon        text,
  color       text,
  created_at  timestamptz not null default now()
);

alter table public.categories enable row level security;

create policy "categories: korisnik vidi samo svoje"
  on public.categories for select
  using (auth.uid() = user_id);

create policy "categories: korisnik unosi svoje"
  on public.categories for insert
  with check (auth.uid() = user_id);

create policy "categories: korisnik mijenja svoje"
  on public.categories for update
  using (auth.uid() = user_id);

create policy "categories: korisnik briše svoje"
  on public.categories for delete
  using (auth.uid() = user_id);

-- ---- TRANSACTIONS ----
create table public.transactions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  date         date not null,
  amount       numeric(12, 2) not null check (amount > 0),
  type         text not null check (type in ('income', 'expense')),
  category_id  uuid references public.categories(id) on delete set null,
  note         text,
  created_at   timestamptz not null default now()
);

alter table public.transactions enable row level security;

create policy "transactions: korisnik vidi samo svoje"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "transactions: korisnik unosi svoje"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "transactions: korisnik mijenja svoje"
  on public.transactions for update
  using (auth.uid() = user_id);

create policy "transactions: korisnik briše svoje"
  on public.transactions for delete
  using (auth.uid() = user_id);

-- ---- BUDGET RULES ----
create table public.budget_rules (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  name          text not null,
  percentage    int not null check (percentage > 0 and percentage <= 100),
  category_ids  uuid[] not null default '{}',
  created_at    timestamptz not null default now()
);

alter table public.budget_rules enable row level security;

create policy "budget_rules: korisnik vidi samo svoje"
  on public.budget_rules for select
  using (auth.uid() = user_id);

create policy "budget_rules: korisnik unosi svoje"
  on public.budget_rules for insert
  with check (auth.uid() = user_id);

create policy "budget_rules: korisnik mijenja svoje"
  on public.budget_rules for update
  using (auth.uid() = user_id);

create policy "budget_rules: korisnik briše svoje"
  on public.budget_rules for delete
  using (auth.uid() = user_id);

-- ---- SETTINGS ----
create table public.settings (
  id                    uuid primary key references auth.users(id) on delete cascade,
  theme                 text not null default 'light' check (theme in ('light', 'dark')),
  currency              text not null default 'RSD',
  onboarding_completed  boolean not null default false
);

alter table public.settings enable row level security;

create policy "settings: korisnik vidi samo svoje"
  on public.settings for select
  using (auth.uid() = id);

create policy "settings: korisnik unosi svoje"
  on public.settings for insert
  with check (auth.uid() = id);

create policy "settings: korisnik mijenja svoje"
  on public.settings for update
  using (auth.uid() = id);

-- ---- AUTO-CREATE SETTINGS na registraciji ----
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.settings (id)
  values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---- INDEKSI za performanse ----
create index transactions_user_id_date_idx on public.transactions (user_id, date desc);
create index categories_user_id_idx on public.categories (user_id);
