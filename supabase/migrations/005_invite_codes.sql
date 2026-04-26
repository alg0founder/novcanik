-- ============================================================
-- Invite codes — invite-only registration system
-- Pokreni u: Supabase → SQL Editor
-- ============================================================

CREATE TABLE public.invite_codes (
  code       text PRIMARY KEY,
  used       boolean NOT NULL DEFAULT false,
  used_by    uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.invite_codes ENABLE ROW LEVEL SECURITY;

-- Svi (anon) mogu da provjere postoji li kod
CREATE POLICY "Anyone can verify invite code"
  ON public.invite_codes FOR SELECT USING (true);

-- Atomična funkcija: provjeri i zauzmi kod odjednom
-- SECURITY DEFINER = radi kao postgres, zaobilazi RLS
CREATE OR REPLACE FUNCTION public.claim_invite_code(p_code text, p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_claimed boolean;
BEGIN
  UPDATE public.invite_codes
  SET used = true, used_by = p_user_id
  WHERE code = upper(trim(p_code)) AND used = false
  RETURNING true INTO v_claimed;

  RETURN COALESCE(v_claimed, false);
END;
$$;
