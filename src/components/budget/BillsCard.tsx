import { Receipt } from 'lucide-react'

import { formatAmount } from '../../lib/formatAmount'

const RECOMMENDED_BILLS_PCT = 50

interface BillsCardProps {
  billsCosts: number
  /** Share of total income, already rounded so it matches the allocation bar. */
  pct: number
  currency: string
  onEdit: () => void
}

export function BillsCard({ billsCosts, pct, currency, onEdit }: BillsCardProps) {
  const isOver = pct > RECOMMENDED_BILLS_PCT

  return (
    <div className="bg-[#111418] rounded-xl p-6 border border-white/5 relative overflow-hidden">
      <div className="absolute -right-6 -top-6 w-28 h-28 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="mb-6">
        <h3 className="text-base font-bold text-white">Računi</h3>
        <p className="text-xs text-slate-500 mt-0.5">Stanarina, struja, internet, osiguranje</p>
      </div>
      <div className="flex justify-between items-end mb-5">
        <div>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">OD PRIHODA</p>
          <p className="text-2xl font-bold text-white">
            {pct}%{' '}
            <span className="text-xs text-slate-400 font-medium ml-1">({formatAmount(Math.round(billsCosts), currency)})</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-orange-500/80 uppercase font-bold tracking-widest mb-1">PREPORUČENO</p>
          <p className={`text-xl font-bold ${isOver ? 'text-red-400' : 'text-orange-400'}`}>
            do {RECOMMENDED_BILLS_PCT}%
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <div
          className="w-full h-1 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          <div
            className={`h-full rounded-full transition-all ${isOver ? 'bg-red-500' : 'bg-orange-500'}`}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-600 font-bold">
          <span>0%</span>
          <span className="text-orange-500/50">{RECOMMENDED_BILLS_PCT}%</span>
          <span>100%</span>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="mt-4 flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-orange-400 font-bold uppercase tracking-wider transition-colors"
      >
        <Receipt size={11} />
        Upravljaj fiksnim troškovima
      </button>
    </div>
  )
}
