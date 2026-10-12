-- ============================================================
-- Hardening for open registration
-- ============================================================
-- Run after the frontend without invite codes is live.
--
-- 1. The invite functions are no longer used by the app, and both were
--    callable anonymously (claim_invite_code even took the user id from
--    the client). The invite_codes table stays: the cron ping reads it.
-- 2. Length limits on free-text columns, so one scripted account cannot
--    fill the free-tier storage. NOT VALID: existing rows are not
--    rechecked, only new and edited ones.

drop function if exists public.claim_invite_code(text, uuid);
drop function if exists public.check_invite_code(text);

alter table public.transactions
  add constraint transactions_note_length check (char_length(note) <= 500) not valid,
  add constraint transactions_account_name_length check (char_length(account_name) <= 100) not valid;

alter table public.categories
  add constraint categories_name_length check (char_length(name) <= 100) not valid;

alter table public.fixed_costs
  add constraint fixed_costs_name_length check (char_length(name) <= 100) not valid,
  add constraint fixed_costs_notes_length check (char_length(notes) <= 500) not valid;

alter table public.settings
  add constraint settings_full_name_length check (char_length(full_name) <= 100) not valid;
