import { ArrowDownLeft, ArrowUpRight, ChevronLeft, ChevronRight, Plus } from 'lucide-react'

import { formatAmount } from '../../../lib/formatAmount'
import { DEMO_BALANCE, DEMO_EXPENSE, DEMO_INCOME, DEMO_MONTH, DEMO_TRANSACTIONS } from '../demoData'
import { TxRow } from './TxRow'

export function DashboardScreen() {
  return (
    <div className="space-y-3">
      <section className="glass-card rounded-[1.6rem] px-5 py-7 border border-orange-500/20 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        <div className="flex items-center gap-3 mb-3">
          <ChevronLeft size={14} className="text-orange-500/60" />
          <div>
            <p className="text-orange-500/80 text-[10px] font-bold uppercase tracking-[0.3em]">{DEMO_MONTH}</p>
            <p className="text-slate-500 text-[9px] uppercase tracking-[0.2em] mt-0.5">Balans</p>
          </div>
          <ChevronRight size={14} className="text-orange-500/30" />
        </div>
        <div className="flex items-baseline gap-2 mb-5">
          <span className="font-display text-white text-5xl font-bold tracking-tight">{DEMO_BALANCE.toLocaleString('de-DE')}</span>
          <span className="font-display text-orange-500/60 text-lg font-semibold">RSD</span>
        </div>
        <span className="bg-orange-500 text-[#2d1600] font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5">
          <Plus size={14} /> Dodaj transakciju
        </span>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {[
          { label: 'Prihodi', value: DEMO_INCOME, icon: ArrowDownLeft, tone: 'green', pct: 100 },
          { label: 'Rashodi', value: DEMO_EXPENSE, icon: ArrowUpRight, tone: 'red', pct: 42 },
        ].map(({ label, value, icon: Icon, tone, pct }) => (
          <div key={label} className="glass-card rounded-2xl p-4">
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${tone === 'green' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              <Icon size={16} />
            </span>
            <p className="text-slate-400 text-[11px] mb-0.5">{label}</p>
            <p className="font-display text-[#e1e2e7] text-base font-semibold">{formatAmount(value, 'RSD')}</p>
            <div className="mt-3 h-1 rounded-full bg-slate-800/50 overflow-hidden">
              <div className={`h-full rounded-full ${tone === 'green' ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </section>

      <section className="glass-card rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h3 className="font-display text-sm font-semibold text-[#e1e2e7]">Poslednje transakcije</h3>
          <span className="text-orange-500 text-[11px] font-bold">Vidi sve</span>
        </div>
        <ul className="divide-y divide-white/5">
          {DEMO_TRANSACTIONS.slice(0, 4).map(tx => <TxRow key={tx.note} tx={tx} />)}
        </ul>
      </section>
    </div>
  )
}
