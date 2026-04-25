import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

import type { CategoryStat } from '../../hooks/useIzvestaji'
import { formatAmount } from '../../lib/formatAmount'

const INCOME_PALETTE = [
  '#f97316', '#fb923c', '#f59e0b', '#fbbf24',
  '#eab308', '#fdba74', '#d97706', '#fcd34d',
  '#ef4444', '#ec4899', '#78716c', '#a38d7b',
]

const EXPENSE_PALETTE = [
  '#ef4444', '#f43f5e', '#ec4899', '#dc2626',
  '#f97316', '#e11d48', '#fb923c', '#db2777',
  '#a855f7', '#e879f9', '#64748b', '#78716c',
]

interface Props {
  title: string
  data: CategoryStat[]
  currency: string
  total: number
  emptyText: string
  type: 'income' | 'expense'
}

interface TooltipPayload {
  name: string
  value: number
  payload: { color: string }
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div className="bg-[#191c1f] border border-[#554335] rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-[#e1e2e7] font-semibold mb-0.5">{item.name}</p>
      <p style={{ color: item.payload.color }} className="font-bold">{formatAmount(item.value, 'RSD')}</p>
    </div>
  )
}

export function CategoryPieChart({ title, data, currency, total, emptyText, type }: Props) {
  const palette = type === 'income' ? INCOME_PALETTE : EXPENSE_PALETTE
  const chartData = data.map((cat, i) => ({
    name: cat.name,
    value: cat.total,
    pct: cat.pct,
    color: palette[i % palette.length],
  }))

  return (
    <section className="bg-[#191c1f] rounded-xl p-6 border border-[#554335]/40">
      <h2 className="text-base font-bold text-[#e1e2e7] mb-1">{title}</h2>
      <p className="text-[10px] text-[#a38d7b] uppercase tracking-widest font-bold mb-6">
        Godišnji udeo po kategorijama
      </p>

      {data.length === 0 ? (
        <p className="text-sm text-[#554335] py-8 text-center">{emptyText}</p>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-full sm:w-48 shrink-0">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={82}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center text-[11px] text-[#a38d7b] font-bold -mt-1">
              {formatAmount(total, currency)}
            </p>
          </div>

          <div className="flex-1 w-full space-y-3">
            {chartData.map(item => (
              <div key={item.name} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-[#dbc2ae] truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-bold" style={{ color: item.color }}>{item.pct}%</span>
                  <span className="text-[11px] text-[#a38d7b] tabular-nums">{formatAmount(item.value, currency)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
