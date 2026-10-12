import { supabase } from './supabase'

/**
 * Permanently deletes the signed-in user's account and all of their data.
 * The password is re-checked first, so an unlocked device left open is not
 * enough to wipe someone's history.
 * @param email the signed-in user's email
 * @param password the password the user just typed
 * @param captchaToken Turnstile token; required by Supabase once captcha is on
 * @returns an error message for the UI, or null on success
 */
export async function deleteAccount(
  email: string, password: string, captchaToken: string | undefined,
): Promise<string | null> {
  const { error: authErr } = await supabase.auth.signInWithPassword({ email, password, options: { captchaToken } })
  if (authErr) return 'Lozinka nije ispravna.'

  const { error: deleteErr } = await supabase.rpc('delete_own_account')
  if (deleteErr) return 'Greška pri brisanju naloga. Pokušaj ponovo.'

  // The server-side session no longer exists, so only the local copy is cleared.
  await supabase.auth.signOut({ scope: 'local' })
  return null
}
