import { useRegisterSW } from 'virtual:pwa-register/react'
import { RefreshCw, X } from 'lucide-react'

const UPDATE_CHECK_MS = 60 * 60 * 1000

/** Banner shown when a new version of the app has been downloaded and is waiting. */
export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      // An installed app can stay open for days; look for a new version every hour.
      if (registration) setInterval(() => { void registration.update() }, UPDATE_CHECK_MS)
    },
  })

  if (!needRefresh) return null

  return (
    <div role="status" className="fixed z-[60] left-4 right-4 bottom-24 md:bottom-6 md:left-auto md:right-6 md:w-96 flex items-center gap-3 bg-[#191c1f] border border-orange-500/30 rounded-2xl shadow-2xl px-4 py-3">
      <RefreshCw size={18} className="text-orange-400 shrink-0" />
      <p className="flex-1 text-sm text-[#e1e2e7]">Nova verzija je dostupna.</p>
      <button
        onClick={() => void updateServiceWorker(true)}
        className="bg-orange-500 hover:bg-orange-600 text-[#2d1600] text-sm font-bold px-4 py-1.5 rounded-full transition-colors"
      >
        Osveži
      </button>
      <button onClick={() => setNeedRefresh(false)} aria-label="Zatvori" className="p-1 text-slate-500 hover:text-slate-300">
        <X size={16} />
      </button>
    </div>
  )
}
