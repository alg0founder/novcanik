-- ============================================================
-- Step 2 of 2: stop exposing the invite code list
-- ============================================================
-- Run ONLY AFTER the frontend that uses check_invite_code() is live
-- (step 1). Running it earlier breaks signup on the old frontend.
--
-- The cron ping (api/ping.js) still works: with no SELECT policy, RLS
-- returns an empty list with status 200, and the request still wakes
-- the database.

drop policy if exists "Anyone can verify invite code" on public.invite_codes;
