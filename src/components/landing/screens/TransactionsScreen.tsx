import { ChevronDown, ChevronLeft, ChevronRight, Plus, ShoppingCart } from 'lucide-react'

import { DEMO_MONTH, DEMO_TRANSACTIONS } from '../demoData'
import { TxRow } from './TxRow'

const FIELDS: { label: string; value: string; icon?: typeof ShoppingCart }[] = [
  { label: 'Kategorija', value: 'Hrana', icon: ShoppingCart },
  { label: 'Datum', value: '14. okt 2026' },
  { label: 'Beleška', value: 'Maxi' },
]

export function TransactionsScreen() {
  return (
    <div className="relative h-full">
      <div className="flex items-center gap-2 mb-1">
        <ChevronLeft size={14} className="text-slate-400" />
        <h3 className="text-xl font-bold text-white">{DEMO_MONTH}</h3>
        <ChevronRight size={14} className="text-slate-600" />
      </div>
      <div className="flex bg-white/5 p-1 rounded-full w-fit mb-3">
        {['Sve', 'Prihodi', 'Rashodi'].map((f, i) => (
          <span key={f} className={`px-3.5 py-1 rounded-full text-[11px] font-semibold ${i === 0 ? 'bg-orange-500 text-white' : 'text-slate-400'}`}>{f}</span>
        ))}
      </div>
      <ul className="bg-[#111418] rounded-xl border border-white/5 divide-y divide-white/5 opacity-50">
        {DEMO_TRANSACTIONS.slice(0, 5).map(tx => <TxRow key={tx.note} tx={tx} />)}
      </ul>

      {/* Add-transaction sheet, as it opens over the list */}
      <div className="absolute inset-x-[-16px] bottom-0 bg-[#111418] border-t border-white/10 rounded-t-3xl px-5 pt-4 pb-5 shadow-[0_-20px_60px_rgba(0,0,0,0.6)]">
        <div className="w-10 h-1 bg-white/15 rounded-full mx-auto mb-4" />
        <div className="flex bg-white/5 p-1 rounded-xl mb-4">
          <span className="flex-1 text-center py-1.5 rounded-lg text-[11px] font-bold bg-red-500/15 text-red-400">Rashod</span>
          <span className="flex-1 text-center py-1.5 text-[11px] font-bold text-slate-500">Prihod</span>
        </div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1">Iznos</p>
        <p className="font-display text-4xl font-bold text-white mb-4">4.380<span className="text-orange-500/60 text-lg ml-1.5">RSD</span></p>
        <div className="space-y-2 mb-4">
          {FIELDS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">{label}</span>
              <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#e1e2e7]">
                {Icon && <Icon size={12} className="text-green-500" />}{value}
                {label === 'Kategorija' && <ChevronDown size={12} className="text-slate-500" />}
              </span>
            </div>
          ))}
        </div>
        <span className="w-full bg-orange-500 text-[#2d1600] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5">
          <Plus size={14} /> Dodaj transakciju
        </span>
      </div>
    </div>
  )
}
