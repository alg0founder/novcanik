import { AllocationBar } from '../../budget/AllocationBar'
import { formatAmount } from '../../../lib/formatAmount'
import { DEMO_INCOME } from '../demoData'

const BILLS = 49000
const REMAINING = DEMO_INCOME - BILLS
const SHARES = { bills: 35, spending: 26, investing: 26, giving: 13, unallocated: 0 }
const SLIDERS = [
  { label: 'Trošenje', pct: 40, recommended: 40 },
  { label: 'Investiranje', pct: 40, recommended: 40 },
  { label: 'Davanje', pct: 20, recommended: 20 },
]

export function BudgetScreen() {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-0.5">Planiranje finansija</p>
        <h3 className="text-xl font-bold text-white">Budžet i alokacija</h3>
      </div>
      <AllocationBar shares={SHARES} monthlyIncome={DEMO_INCOME} currency="RSD" />
      <div className="bg-[#111418] rounded-xl p-4 border border-white/5">
        <div className="flex justify-between text-[11px] mb-1">
          <span className="text-slate-400">Računi (fiksno)</span>
          <span className="font-bold text-white">{formatAmount(BILLS, 'RSD')}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-slate-400">Ostatak za raspodelu</span>
          <span className="font-bold text-emerald-400">{formatAmount(REMAINING, 'RSD')}</span>
        </div>
      </div>
      {SLIDERS.map(s => (
        <div key={s.label} className="bg-[#111418] rounded-xl px-4 py-3.5 border border-white/5">
          <div className="flex justify-between items-end mb-2.5">
            <div>
              <p className="text-[13px] font-bold text-white">{s.label}</p>
              <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mt-0.5">Od ostatka</p>
            </div>
            <p className="text-lg font-bold text-white">
              {s.pct}% <span className="text-[11px] text-slate-400 font-medium">({formatAmount(Math.round(REMAINING * s.pct / 100), 'RSD')})</span>
            </p>
          </div>
          <div className="relative h-1 rounded-full bg-white/5">
            <div className="absolute inset-y-0 left-0 rounded-full bg-orange-500" style={{ width: `${s.pct}%` }} />
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-orange-500 ring-4 ring-orange-500/20" style={{ left: `${s.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}
