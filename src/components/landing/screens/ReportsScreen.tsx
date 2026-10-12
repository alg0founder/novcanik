import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'

import { formatAmount } from '../../../lib/formatAmount'
import { DEMO_REPORT } from '../demoData'

const TOTAL = DEMO_REPORT.reduce((s, r) => s + r.amount, 0)

/** Conic-gradient donut, so the public page does not pull in the charting library. */
function donutBackground(): string {
  let start = 0
  const stops = DEMO_REPORT.map(r => {
    const end = start + (r.amount / TOTAL) * 100
    const stop = `${r.color} ${start}% ${end - 0.6}%, transparent ${end - 0.6}% ${end}%`
    start = end
    return stop
  })
  return `conic-gradient(${stops.join(', ')})`
}

export function ReportsScreen() {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-xl font-bold text-white">Izveštaji</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="flex items-center gap-2 text-sm font-bold text-white">
            <ChevronLeft size={14} className="text-slate-400" />2026<ChevronRight size={14} className="text-slate-600" />
          </span>
          <span className="flex items-center gap-1.5 text-[11px] rounded-lg px-2.5 py-1.5 border bg-[#191c1f] border-[#554335] text-slate-300">
            <SlidersHorizontal size={12} />Od – do
          </span>
        </div>
      </div>
      <section className="bg-[#191c1f] rounded-xl p-5 border border-[#554335]/40">
        <h4 className="text-sm font-bold text-[#e1e2e7]">Rashodi</h4>
        <p className="text-[9px] text-[#a38d7b] uppercase tracking-widest font-bold mb-5">Godišnji udeo po kategorijama</p>
        <div className="relative w-40 h-40 mx-auto mb-5 rounded-full" style={{ background: donutBackground() }}>
          <div className="absolute inset-[22%] rounded-full bg-[#191c1f] flex flex-col items-center justify-center">
            <span className="text-[9px] text-[#a38d7b] font-bold uppercase tracking-widest">Ukupno</span>
            <span className="text-[13px] font-bold text-white">{formatAmount(TOTAL, 'RSD')}</span>
          </div>
        </div>
        <div className="space-y-2.5">
          {DEMO_REPORT.map(r => (
            <div key={r.name} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-[#dbc2ae]">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />{r.name}
              </span>
              <span className="flex gap-3">
                <span className="text-[11px] font-bold" style={{ color: r.color }}>{Math.round(r.amount / TOTAL * 100)}%</span>
                <span className="text-[11px] text-[#a38d7b] tabular-nums w-20 text-right">{formatAmount(r.amount, 'RSD')}</span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
