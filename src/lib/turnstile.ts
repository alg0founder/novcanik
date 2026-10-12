const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

interface TurnstileRenderOptions {
  sitekey: string
  theme?: 'light' | 'dark' | 'auto'
  language?: string
  callback: (token: string) => void
  'expired-callback'?: () => void
  'error-callback'?: () => void
}

export interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

/** Public site key. Empty means captcha is off and auth calls go out without a token. */
export const TURNSTILE_SITE_KEY: string = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? ''
export const isCaptchaEnabled: boolean = TURNSTILE_SITE_KEY !== ''

let loading: Promise<TurnstileApi> | null = null

/**
 * Loads the Cloudflare Turnstile script once and resolves with its API.
 * @returns the global turnstile API
 */
export function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  if (loading) return loading
  loading = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT_URL
    script.async = true
    script.onload = () => window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile missing'))
    script.onerror = () => { loading = null; reject(new Error('turnstile script failed to load')) }
    document.head.appendChild(script)
  })
  return loading
}
