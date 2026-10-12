import { formatAmount } from '../../../lib/formatAmount'
import type { DemoTransaction } from '../demoData'

export function TxRow({ tx }: { tx: DemoTransaction }) {
  const Icon = tx.icon
  return (
    <li className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: `${tx.color}26` }}>
          <Icon size={16} color={tx.color} />
        </span>
        <div>
          <p className="text-[13px] font-medium text-[#e1e2e7]">{tx.category}</p>
          <p className="text-[11px] text-slate-500">{tx.date} · {tx.note}</p>
        </div>
      </div>
      <span className={`text-[13px] font-semibold tabular-nums ${tx.isIncome ? 'text-green-400' : 'text-red-400'}`}>
        {tx.isIncome ? '+' : '−'}{formatAmount(tx.amount, 'RSD')}
      </span>
    </li>
  )
}
