import { useState, type FormEvent } from 'react'
import { X, Trash2, Plus, Pencil, Check } from 'lucide-react'

import type { FixedCost } from '../../hooks/useBudzet'
import { formatAmount } from '../../lib/formatAmount'

interface Props {
  fixedCosts: FixedCost[]
  currency: string
  onAdd: (name: string, amount: number, notes: string | null) => Promise<string | null>
  onUpdate: (id: string, name: string, amount: number, notes: string | null) => Promise<string | null>
  onDelete: (id: string) => Promise<string | null>
  onClose: () => void
}

interface EditState {
  name: string
  amount: string
  notes: string
}

export function FixedCostsModal({ fixedCosts, currency, onAdd, onUpdate, onDelete, onClose }: Props) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [notes, setNotes] = useState('')
  const [adding, setAdding] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editState, setEditState] = useState<EditState>({ name: '', amount: '', notes: '' })
  const [savingId, setSavingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAdd = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    setError(null)
    const parsed = parseFloat(amount.replace(',', '.'))
    if (!name.trim()) { setError('Unesite ime računa.'); return }
    if (isNaN(parsed) || parsed <= 0) { setError('Iznos mora biti veći od 0.'); return }
    setAdding(true)
    const err = await onAdd(name.trim(), parsed, notes.trim() || null)
    if (err) { setError(err); setAdding(false); return }
    setName('')
    setAmount('')
    setNotes('')
    setAdding(false)
  }

  const startEdit = (c: FixedCost): void => {
    setEditingId(c.id)
    setEditState({ name: c.name, amount: String(c.amount), notes: c.notes ?? '' })
  }

  const handleUpdate = async (id: string): Promise<void> => {
    const parsed = parseFloat(editState.amount.replace(',', '.'))
    if (!editState.name.trim() || isNaN(parsed) || parsed <= 0) return
    setSavingId(id)
    const err = await onUpdate(id, editState.name.trim(), parsed, editState.notes.trim() || null)
    setSavingId(null)
    if (err) { setError(err); return }
    setEditingId(null)
  }

  const handleDelete = async (id: string): Promise<void> => {
    setDeletingId(id)
    const err = await onDelete(id)
    setDeletingId(null)
    if (err) setError(err)
  }

  const inputCls = 'w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[#e1e2e7] placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all text-sm'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#111418] border border-white/10 rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#e1e2e7]">Fiksni troškovi</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Existing list */}
        {fixedCosts.length > 0 && (
          <div className="space-y-2 mb-6">
            {fixedCosts.map(c => (
              <div key={c.id}>
                {editingId === c.id ? (
                  <div className="p-3 rounded-xl bg-white/5 border border-orange-500/30 space-y-2">
                    <input
                      value={editState.name}
                      onChange={e => setEditState(s => ({ ...s, name: e.target.value }))}
                      placeholder="Ime računa"
                      className={inputCls}
                    />
                    <div className="relative">
                      <input
                        value={editState.amount}
                        onChange={e => setEditState(s => ({ ...s, amount: e.target.value }))}
                        placeholder="0.00"
                        inputMode="decimal"
                        className={`${inputCls} pr-14`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">{currency}</span>
                    </div>
                    <input
                      value={editState.notes}
                      onChange={e => setEditState(s => ({ ...s, notes: e.target.value }))}
                      placeholder="Beleška (opciono)"
                      className={inputCls}
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-semibold transition-colors"
                      >
                        Otkaži
                      </button>
                      <button
                        onClick={() => void handleUpdate(c.id)}
                        disabled={savingId === c.id}
                        className="flex-1 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-[#2d1600] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Check size={13} />
                        {savingId === c.id ? 'Čuvanje...' : 'Sačuvaj'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="group flex items-start justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/[0.07] transition-colors">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#e1e2e7]">{c.name}</p>
                      <p className="text-xs text-[#a38d7b]">{formatAmount(c.amount, currency)}</p>
                      {c.notes && (
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate max-w-[220px]" title={c.notes}>
                          {c.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(c)}
                        className="p-1.5 text-slate-500 hover:text-orange-400 transition-colors rounded-lg hover:bg-orange-500/10"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => void handleDelete(c.id)}
                        disabled={deletingId === c.id}
                        className="p-1.5 text-slate-500 hover:text-red-400 disabled:opacity-40 transition-colors rounded-lg hover:bg-red-500/10"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add form */}
        <form onSubmit={handleAdd} className="space-y-3">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Dodaj novi</p>
          <input
            type="text"
            placeholder="Ime računa (npr. Stanarina)"
            value={name}
            onChange={e => setName(e.target.value)}
            className={inputCls}
          />
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className={`${inputCls} pr-14`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">{currency}</span>
          </div>
          <input
            type="text"
            placeholder="Beleška (opciono)"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className={inputCls}
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-semibold transition-all">
              Zatvori
            </button>
            <button type="submit" disabled={adding} className="flex-1 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-[#2d1600] font-bold text-sm transition-all flex items-center justify-center gap-2">
              <Plus size={15} />
              {adding ? 'Dodavanje...' : 'Dodaj'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
