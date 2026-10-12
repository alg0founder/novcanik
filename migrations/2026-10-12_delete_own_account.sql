-- ============================================================
-- Self-service account deletion
-- ============================================================
-- Lets a signed-in user delete their own auth.users row. Every table that
-- holds user data references auth.users with ON DELETE CASCADE
-- (transactions, categories, settings, budget_settings, fixed_costs,
-- budget_rules), so one delete removes everything. invite_codes.used_by
-- is ON DELETE SET NULL.
--
-- The function takes no argument on purpose: it can only ever delete the
-- caller (auth.uid()), never an id supplied by the client.

create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;
  -- Require a password sign-in within the last 5 minutes. A stolen token
  -- alone is not enough: refreshing a session keeps the original amr
  -- timestamp, so only re-entering the password passes this check.
  if not exists (
    select 1
    from jsonb_array_elements(coalesce(auth.jwt() -> 'amr', '[]'::jsonb)) as m
    where m ->> 'method' = 'password'
      and (m ->> 'timestamp')::bigint > extract(epoch from now())::bigint - 300
  ) then
    raise exception 'reauthentication required';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;
