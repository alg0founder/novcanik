-- ============================================================
-- handle_new_user() is a trigger function only
-- ============================================================
-- Supabase Security Advisor flags it because the default grants let anon
-- and authenticated call it over the API. Trigger functions cannot really be
-- invoked that way, but nothing should be able to try. The trigger on
-- auth.users keeps working: EXECUTE is not checked when a trigger fires.

revoke execute on function public.handle_new_user() from public, anon, authenticated;
