import type { IncomeShares } from '../../lib/budgetAllocation'
import { formatAmount } from '../../lib/formatAmount'

interface AllocationBarProps {
  shares: IncomeShares
  monthlyIncome: number
  currency: string
}

const SEGMENTS: { key: keyof IncomeShares; label: string; color: string }[] = [
  { key: 'bills',       label: 'Računi',        color: 'bg-slate-400' },
  { key: 'spending',    label: 'Trošenje',      color: 'bg-orange-500' },
  { key: 'investing',   label: 'Investiranje',  color: 'bg-amber-300' },
  { key: 'giving',      label: 'Davanje',       color: 'bg-sky-400' },
  { key: 'unallocated', label: 'Neraspoređeno', color: 'bg-white/10' },
]

export function AllocationBar({ shares, monthlyIncome, currency }: AllocationBarProps) {
  const visible = SEGMENTS.filter(s => shares[s.key] > 0)

  return (
    <div className="bg-[#111418] rounded-xl p-5 border border-white/5">
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Podela celog prihoda</p>
        <p className="text-[10px] font-bold text-slate-400">100% = {formatAmount(Math.round(monthlyIncome), currency)}</p>
      </div>
      <div className="flex w-full h-3 rounded-full overflow-hidden gap-0.5">
        {visible.map(s => (
          <div key={s.key} className={`${s.color} h-full`} style={{ width: `${shares[s.key]}%` }} />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        {visible.map(s => (
          <div key={s.key} className="flex items-center gap-1.5 text-xs">
            <span className={`w-2 h-2 rounded-full ${s.color}`} />
            <span className="text-slate-400">{s.label}</span>
            <span className="font-bold text-white">{shares[s.key]}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
