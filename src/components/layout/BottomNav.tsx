import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Receipt, Wallet, BarChart2, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Pregled', icon: LayoutDashboard, end: true },
  { to: '/transakcije', label: 'Transakcije', icon: Receipt, end: false },
  { to: '/budzet', label: 'Budžet', icon: Wallet, end: false },
  { to: '/izvestaji', label: 'Izveštaji', icon: BarChart2, end: false },
  { to: '/podesavanja', label: 'Podešavanja', icon: Settings, end: false },
] as const

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-4 py-3 bg-slate-900/90 backdrop-blur-xl rounded-t-3xl border-t border-white/5 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] md:hidden">
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 transition-all ${
              isActive ? 'text-orange-500 scale-105' : 'text-slate-500'
            }`
          }
        >
          <Icon size={18} strokeWidth={1.75} />
          <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
