import { useState } from 'react'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'

const MONTHS_SR = [
  'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
  'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar',
]
const MONTHS_SR_GEN = [
  'januara', 'februara', 'marta', 'aprila', 'maja', 'juna',
  'jula', 'avgusta', 'septembra', 'oktobra', 'novembra', 'decembra',
]
const DAY_NAMES = ['Po', 'Ut', 'Sr', 'Če', 'Pe', 'Su', 'Ne']

function parseDate(value: string): Date {
  return new Date(value + 'T00:00:00')
}

function formatDisplay(value: string): string {
  const d = parseDate(value)
  return `${d.getDate()}. ${MONTHS_SR_GEN[d.getMonth()]} ${d.getFullYear()}.`
}

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

interface CalendarPickerProps {
  value: string
  onChange: (date: string) => void
}

export function CalendarPicker({ value, onChange }: CalendarPickerProps) {
  const [open, setOpen] = useState(false)

  const selected = parseDate(value)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewYear, setViewYear] = useState(selected.getFullYear())
  const [viewMonth, setViewMonth] = useState(selected.getMonth())

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  // Build calendar grid (Monday start)
  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const startOffset = (firstDay + 6) % 7
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const cells: (number | null)[] = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const handleDay = (day: number) => {
    onChange(toDateStr(viewYear, viewMonth, day))
    setOpen(false)
  }

  const isSelected = (day: number) =>
    selected.getFullYear() === viewYear &&
    selected.getMonth() === viewMonth &&
    selected.getDate() === day

  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-2 px-3 py-2.5 border border-slate-700 rounded-xl bg-slate-800/50 text-sm text-[#e1e2e7] transition-all hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50"
      >
        <CalendarDays size={15} className="text-slate-500 shrink-0" />
        <span>{formatDisplay(value)}</span>
      </button>

      {open && (
        <div className="mt-1 bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xl">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Prethodni mesec"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="text-sm font-semibold text-[#e1e2e7]">
              {MONTHS_SR[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              aria-label="Sledeći mesec"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAY_NAMES.map(d => (
              <span key={d} className="text-center text-[10px] font-medium text-slate-500 py-1">
                {d}
              </span>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-y-0.5">
            {cells.map((day, i) => day ? (
              <button
                key={i}
                type="button"
                onClick={() => handleDay(day)}
                className={`
                  h-8 w-full rounded-lg text-sm font-medium transition-colors
                  ${isSelected(day)
                    ? 'bg-orange-500 text-[#2d1600]'
                    : isToday(day)
                      ? 'border border-orange-500/50 text-orange-400 hover:bg-orange-500/10'
                      : 'text-[#e1e2e7] hover:bg-slate-700'
                  }
                `}
              >
                {day}
              </button>
            ) : (
              <span key={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
