-- 002_add_account_name_to_transactions.sql
-- Dodaje slobodno tekstualno polje za naziv računa na transakciji

alter table public.transactions
  add column account_name text;
