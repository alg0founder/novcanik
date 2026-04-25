import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface PWAInstall {
  canInstall: boolean
  isIOS: boolean
  isInstalled: boolean
  install: () => Promise<void>
}

export function usePWAInstall(): PWAInstall {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)
  const isInstalled = window.matchMedia('(display-mode: standalone)').matches

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const install = async (): Promise<void> => {
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') setPrompt(null)
  }

  return {
    canInstall: !!prompt,
    isIOS,
    isInstalled,
    install,
  }
}
