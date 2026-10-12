import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'

import { AllocationBar } from '../budget/AllocationBar'
import { formatAmount } from '../../lib/formatAmount'

// Made-up figures for the public page; never real user data.
const DEMO_INCOME = 120000
const DEMO_SHARES = { bills: 45, spending: 22, investing: 22, giving: 11, unallocated: 0 }
const DEMO_ROWS: { label: string; category: string; amount: number; isIncome: boolean }[] = [
  { label: 'Plata', category: 'Prihod', amount: 120000, isIncome: true },
  { label: 'Maxi', category: 'Hrana', amount: 4380, isIncome: false },
  { label: 'Infostan', category: 'Računi', amount: 9650, isIncome: false },
]

export function ProductPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-orange-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="relative space-y-3 rotate-[-1.5deg] md:rotate-[-2deg]">
        <AllocationBar shares={DEMO_SHARES} monthlyIncome={DEMO_INCOME} currency="RSD" />
        <div className="bg-[#111418] rounded-xl border border-white/5 divide-y divide-white/5">
          {DEMO_ROWS.map(row => (
            <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center ${row.isIncome ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-400'}`}>
                  {row.isIncome ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{row.label}</p>
                  <p className="text-[11px] text-slate-500">{row.category}</p>
                </div>
              </div>
              <span className={`text-sm font-bold ${row.isIncome ? 'text-emerald-400' : 'text-slate-200'}`}>
                {row.isIncome ? '+' : '−'}{formatAmount(row.amount, 'RSD')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
