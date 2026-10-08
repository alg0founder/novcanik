import type { ChangeEvent } from 'react'

import { formatAmount } from '../../lib/formatAmount'

interface BudgetCardProps {
  label: string
  sub: string
  /** Percentage of what remains after bills. */
  pct: number
  /** Recommended percentage of what remains after bills. */
  recommended: number
  /** Same allocation expressed as a share of total income, or null without income. */
  incomeShare: number | null
  remainingBudget: number
  reserved: number
  currency: string
  onChange: (v: number) => void
  onSave: () => void
}

export function BudgetCard({
  label, sub, pct, recommended, incomeShare, remainingBudget, reserved, currency, onChange, onSave,
}: BudgetCardProps) {
  const amount = Math.round((pct / 100) * remainingBudget)
  const free = amount - reserved
  const isOverReserved = reserved > amount

  return (
    <div className="bg-[#111418] rounded-xl p-6 border border-white/5 relative overflow-hidden">
      <div className="absolute -right-6 -top-6 w-28 h-28 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="mb-6">
        <h3 className="text-base font-bold text-white">{label}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
      </div>
      <div className="flex justify-between items-end mb-5">
        <div>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">OD OSTATKA</p>
          <p className="text-2xl font-bold text-white">
            {pct}%{' '}
            <span className="text-xs text-slate-400 font-medium ml-1">({formatAmount(amount, currency)})</span>
          </p>
          {incomeShare !== null && (
            <p className="text-[10px] text-slate-500 mt-0.5">= {incomeShare}% ukupnog prihoda</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-[10px] text-orange-500/80 uppercase font-bold tracking-widest mb-1">PREPORUČENO</p>
          <p className={`text-xl font-bold ${pct > recommended ? 'text-red-400' : 'text-orange-400'}`}>
            {recommended}%
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <input
          type="range"
          min={0}
          max={100}
          value={pct}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
          onMouseUp={onSave}
          onTouchEnd={onSave}
          className="w-full h-1 rounded-full appearance-none cursor-pointer accent-orange-500"
          style={{ background: `linear-gradient(to right, #f97316 ${pct}%, rgba(255,255,255,0.05) ${pct}%)` }}
        />
        <div className="flex justify-between text-[10px] text-slate-600 font-bold">
          <span>0%</span>
          <span className="text-orange-500/50">{recommended}%</span>
          <span>100%</span>
        </div>
      </div>
      {reserved > 0 && (
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
            Već rezervisano (fiksni troškovi)
          </span>
          <span className={`text-xs font-bold ${isOverReserved ? 'text-red-400' : 'text-slate-300'}`}>
            −{formatAmount(reserved, currency)}
          </span>
        </div>
      )}
      {reserved > 0 && (
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Slobodno</span>
          <span className={`text-xs font-bold ${isOverReserved ? 'text-red-400' : 'text-emerald-400'}`}>
            {formatAmount(free, currency)}
          </span>
        </div>
      )}
    </div>
  )
}
