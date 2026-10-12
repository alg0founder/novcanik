import { ArrowRightLeft, Coins, GripVertical, Smartphone } from 'lucide-react'

import { DEMO_TRANSACTIONS } from '../demoData'

const CATEGORIES = DEMO_TRANSACTIONS.filter(t => !t.isIncome).slice(0, 4)

export function SettingsScreen() {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold text-white">Podešavanja</h3>

      <section className="bg-[#111418] rounded-xl border border-white/5 p-4">
        <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-3">Kategorije · rashodi</p>
        <ul className="space-y-2">
          {CATEGORIES.map(c => {
            const Icon = c.icon
            return (
              <li key={c.category} className="flex items-center gap-3 px-2 py-2 rounded-lg bg-white/[0.03]">
                <GripVertical size={14} className="text-slate-600" />
                <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${c.color}26` }}>
                  <Icon size={14} color={c.color} />
                </span>
                <span className="text-[13px] text-white">{c.category}</span>
              </li>
            )
          })}
        </ul>
      </section>

      {[
        { icon: Coins, title: 'Valuta', sub: 'RSD · € · $', isOn: null },
        { icon: ArrowRightLeft, title: 'Prenos salda', sub: 'Ostatak ide u sledeći mesec', isOn: true },
      ].map(({ icon: Icon, title, sub, isOn }) => (
        <section key={title} className="bg-[#111418] rounded-xl border border-white/5 px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center"><Icon size={16} /></span>
            <div>
              <p className="text-[13px] font-bold text-white">{title}</p>
              <p className="text-[10px] text-slate-500">{sub}</p>
            </div>
          </div>
          {isOn !== null && (
            <span className="w-9 h-5 rounded-full bg-orange-500 relative"><span className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" /></span>
          )}
        </section>
      ))}

      <section className="rounded-xl border border-orange-500/30 bg-orange-500/5 px-4 py-4 flex items-center gap-3">
        <span className="w-9 h-9 rounded-xl bg-orange-500 text-[#2d1600] flex items-center justify-center"><Smartphone size={16} /></span>
        <div>
          <p className="text-[13px] font-bold text-white">Instaliraj aplikaciju</p>
          <p className="text-[10px] text-slate-400">Na početni ekran, bez prodavnice aplikacija</p>
        </div>
      </section>
    </div>
  )
}
