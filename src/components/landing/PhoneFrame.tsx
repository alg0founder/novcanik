import type { ReactNode } from 'react'
import { LayoutDashboard, Receipt, Wallet, BarChart2, Settings } from 'lucide-react'

export type PhoneTab = 'pregled' | 'transakcije' | 'budzet' | 'izvestaji' | 'podesavanja'

const SCREEN_W = 360
const SCREEN_H = 760

const TABS: { key: PhoneTab; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'pregled', label: 'Pregled', icon: LayoutDashboard },
  { key: 'transakcije', label: 'Transakcije', icon: Receipt },
  { key: 'budzet', label: 'Budžet', icon: Wallet },
  { key: 'izvestaji', label: 'Izveštaji', icon: BarChart2 },
  { key: 'podesavanja', label: 'Podešavanja', icon: Settings },
]

interface PhoneFrameProps {
  /** Rendered width in px; the screen is laid out at 360 px and scaled to fit. */
  width: number
  tab: PhoneTab | null
  children: ReactNode
}

/** A phone drawn in CSS. Screens inside are recreations of the app's own layout, not screenshots. */
export function PhoneFrame({ width, tab, children }: PhoneFrameProps) {
  const scale = width / SCREEN_W

  return (
    <div
      className="relative rounded-[3rem] bg-[#0b0e11] p-2.5 shadow-[0_40px_120px_-20px_rgba(249,115,22,0.25),0_0_0_1px_rgba(255,255,255,0.08)]"
      style={{ width: width + 20 }}
    >
      <div className="relative overflow-hidden rounded-[2.4rem] bg-[#111417]" style={{ width, height: SCREEN_H * scale }}>
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black z-20" />
        <div style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <div className="h-full flex flex-col pt-12">
            <div className="flex-1 overflow-hidden px-4">{children}</div>
            {tab && (
              <nav className="flex justify-around items-center px-3 pt-3 pb-6 bg-slate-900/90 rounded-t-3xl border-t border-white/5">
                {TABS.map(({ key, label, icon: Icon }) => (
                  <span key={key} className={`flex flex-col items-center gap-1 ${key === tab ? 'text-orange-500' : 'text-slate-500'}`}>
                    <Icon size={18} strokeWidth={1.75} />
                    <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
                  </span>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
