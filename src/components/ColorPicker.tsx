export const PRESET_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308',
  '#22c55e', '#10b981', '#06b6d4', '#3b82f6',
  '#8b5cf6', '#ec4899', '#64748b', '#78716c',
]

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2 p-2 bg-slate-800/80 rounded-xl border border-slate-700">
      {PRESET_COLORS.map(c => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          aria-label={c}
          className={`w-7 h-7 rounded-full transition-transform ${
            value === c
              ? 'ring-2 ring-offset-2 ring-offset-slate-800 ring-white scale-110'
              : 'hover:scale-105'
          }`}
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  )
}
