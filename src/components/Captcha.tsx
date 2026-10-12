import { useEffect, useRef, useState } from 'react'

import { TURNSTILE_SITE_KEY, isCaptchaEnabled, loadTurnstile } from '../lib/turnstile'

interface CaptchaProps {
  onToken: (token: string | null) => void
  /** Change this number to get a fresh token; Supabase accepts each token only once. */
  resetSignal: number
}

export function Captcha({ onToken, resetSignal }: CaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onTokenRef = useRef(onToken)
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    onTokenRef.current = onToken
  })

  // Renders the widget once on mount and removes it on unmount.
  useEffect(() => {
    if (!isCaptchaEnabled) return
    let cancelled = false
    loadTurnstile()
      .then(api => {
        if (cancelled || !containerRef.current) return
        widgetIdRef.current = api.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'dark',
          language: 'auto',
          callback: token => onTokenRef.current(token),
          'expired-callback': () => onTokenRef.current(null),
          'error-callback': () => onTokenRef.current(null),
        })
      })
      .catch(() => { if (!cancelled) setLoadFailed(true) })
    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current)
      widgetIdRef.current = null
    }
  }, [])

  // Issues a fresh token after each submit attempt.
  useEffect(() => {
    if (resetSignal === 0 || !widgetIdRef.current || !window.turnstile) return
    onTokenRef.current(null)
    window.turnstile.reset(widgetIdRef.current)
  }, [resetSignal])

  if (!isCaptchaEnabled) return null
  return (
    <div>
      <div ref={containerRef} className="min-h-[65px]" />
      {loadFailed && (
        <p className="text-xs text-red-400 mt-1">Provera „nisam robot" nije učitana. Osveži stranicu.</p>
      )}
    </div>
  )
}
