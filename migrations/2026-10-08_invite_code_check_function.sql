-- ============================================================
-- Step 1 of 2: invite code check without exposing the code list
-- ============================================================
-- Signup used to SELECT from invite_codes directly, which needed a
-- "USING (true)" policy, so anyone with the public anon key could list
-- every unused code. This function answers only for the one code asked.
--
-- Run BEFORE deploying the frontend that calls it. Additive only:
-- the old SELECT policy keeps working until step 2.

create or replace function public.check_invite_code(p_code text)
returns text
language sql
security definer
set search_path = public
as $$
  select case
    when not exists (select 1 from invite_codes where code = upper(trim(p_code))) then 'missing'
    when exists (select 1 from invite_codes where code = upper(trim(p_code)) and used) then 'used'
    else 'ok'
  end;
$$;

revoke all on function public.check_invite_code(text) from public;
grant execute on function public.check_invite_code(text) to anon, authenticated;
