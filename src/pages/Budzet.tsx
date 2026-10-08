import { useState, useEffect } from 'react'
import { Pencil, Check, X, TrendingUp } from 'lucide-react'

import { useBudzet, type BudgetSettings, type ReservedByCategory } from '../hooks/useBudzet'
import { FixedCostsModal } from '../components/budget/FixedCostsModal'
import { BudgetCard } from '../components/budget/BudgetCard'
import { BillsCard } from '../components/budget/BillsCard'
import { AllocationBar } from '../components/budget/AllocationBar'
import { getIncomeShares } from '../lib/budgetAllocation'
import { useAuth } from '../hooks/useAuth'
import { formatAmount } from '../lib/formatAmount'

type SliderKey = 'spending_pct' | 'investing_pct' | 'giving_pct'
type CostKey = keyof ReservedByCategory

// Sliders split what remains after bills, so the 50/20/20/10 rule is expressed here
// in that same base: 20/20/10 of income = 40/40/20 of the remaining 50%.
const SLIDER_CATEGORIES: { key: SliderKey; costKey: CostKey; label: string; sub: string; recommended: number }[] = [
  { key: 'spending_pct',  costKey: 'spending',  label: 'Trošenje',    sub: 'Hrana, zabava, hobiji, putovanja',        recommended: 40 },
  { key: 'investing_pct', costKey: 'investing', label: 'Investiranje', sub: 'Bitcoin, akcije, nekretnine',             recommended: 40 },
  { key: 'giving_pct',    costKey: 'giving',    label: 'Davanje',     sub: 'Donacije, pomoć porodici',                 recommended: 20 },
]

export function Budzet() {
  const { currency, carryOverAffectsBudget } = useAuth()
  const {
    settings, fixedCosts, monthlyIncome, transactionIncome, openingBalance,
    totalFixedCosts, billsCosts, reservedByCategory, remainingBudget,
    loading, error, saveSettings, addFixedCost, updateFixedCost, deleteFixedCost,
  } = useBudzet()

  const [showCostsModal, setShowCostsModal] = useState(false)
  const [editingIncome, setEditingIncome] = useState(false)
  const [incomeInput, setIncomeInput] = useState('')
  const [saveError, setSaveError] = useState<string | null>(null)
  const [sliders, setSliders] = useState<Pick<BudgetSettings, SliderKey>>({
    spending_pct: 20, investing_pct: 20, giving_pct: 10,
  })

  useEffect(() => {
    if (!loading) {
      setSliders({
        spending_pct: settings.spending_pct,
        investing_pct: settings.investing_pct,
        giving_pct: settings.giving_pct,
      })
    }
  }, [loading, settings])

  const shares = getIncomeShares({
    monthlyIncome,
    billsCosts,
    spendingPct: sliders.spending_pct,
    investingPct: sliders.investing_pct,
    givingPct: sliders.giving_pct,
  })

  const handleSaveIncome = async (): Promise<void> => {
    setSaveError(null)
    const trimmed = incomeInput.trim()
    let err: string | null = null
    if (trimmed === '') {
      err = await saveSettings({ income_override: null })
    } else {
      const parsed = parseFloat(trimmed.replace(',', '.'))
      if (!isNaN(parsed) && parsed >= 0) {
        err = await saveSettings({ income_override: parsed })
      }
    }
    if (err) { setSaveError(err); return }
    setEditingIncome(false)
  }

  const handleSliderChange = (key: SliderKey, newValue: number): void => {
    const otherKeys = SLIDER_CATEGORIES.map(c => c.key).filter(k => k !== key)
    const othersSum = otherKeys.reduce((sum, k) => sum + sliders[k], 0)
    const clamped = Math.min(newValue, 100 - othersSum)
    setSliders(prev => ({ ...prev, [key]: clamped }))
  }

  const handleSliderSave = (): void => {
    void saveSettings({
      spending_pct: sliders.spending_pct,
      investing_pct: sliders.investing_pct,
      giving_pct: sliders.giving_pct,
    }).then(err => { if (err) setSaveError(err) })
  }

  return (
    <div className="space-y-8 pb-24 md:pb-8">
      <div>
        <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Planiranje finansija</p>
        <h1 className="text-3xl font-bold text-white mb-2">Budžet i Alokacija</h1>
        <p className="text-sm text-slate-400 max-w-xl">
          Primenite "Zlatna Pravila" investiranja i štednje. Prilagodite slajdere kako biste optimizovali raspodelu novca.
        </p>
      </div>

      <div className="p-5 bg-[#111418] border-l-4 border-orange-500 rounded-xl flex gap-4 items-start">
        <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-1">Pravilo podele (50/20/20/10)</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="text-orange-400 font-bold">50%</span> → računi i obaveze,{' '}
            <span className="text-orange-400 font-bold">20%</span> → trošenje,{' '}
            <span className="text-orange-400 font-bold">20%</span> → investiranje/štednja,{' '}
            <span className="text-orange-400 font-bold">10%</span> → davanje.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-1">
            Slajderi dele ono što ostane posle računa. Isto pravilo izraženo od ostatka:{' '}
            <span className="text-orange-400 font-bold">40%</span> trošenje,{' '}
            <span className="text-orange-400 font-bold">40%</span> investiranje,{' '}
            <span className="text-orange-400 font-bold">20%</span> davanje.
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {saveError && <p className="text-sm text-red-400">{saveError}</p>}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? null : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-[#111418] rounded-xl p-5 border border-white/5">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Ukupni mesečni prihod</p>
              {editingIncome ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="decimal"
                    autoFocus
                    value={incomeInput}
                    onChange={e => setIncomeInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') void handleSaveIncome() }}
                    className="flex-1 px-3 py-1.5 bg-white/5 border border-orange-500/50 rounded-lg text-white text-lg font-bold focus:outline-none"
                  />
                  <button onClick={() => void handleSaveIncome()} className="p-1.5 text-green-400 hover:text-green-300 transition-colors">
                    <Check size={16} />
                  </button>
                  <button onClick={() => setEditingIncome(false)} className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-orange-400">
                      {Math.round(monthlyIncome).toLocaleString('de-DE')}
                    </span>
                    <span className="text-xs text-slate-400 ml-1.5">{currency}</span>
                    {settings.income_override !== null ? (
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] text-slate-500">Ručno • iz transakcija: {Math.round(transactionIncome).toLocaleString('de-DE')} {currency}</p>
                        <button
                          onClick={() => void saveSettings({ income_override: null })}
                          className="text-[10px] text-orange-500/70 hover:text-orange-400 font-bold transition-colors"
                        >
                          Resetuj
                        </button>
                      </div>
                    ) : transactionIncome === 0 ? (
                      <p className="text-[10px] text-slate-600 mt-0.5">Nema prihoda ovaj mesec, unesi ručno</p>
                    ) : (
                      <p className="text-[10px] text-slate-500 mt-0.5">Iz transakcija ovog meseca</p>
                    )}
                    {carryOverAffectsBudget && openingBalance !== 0 && (
                      <p className="text-[10px] text-orange-400/80 mt-0.5">
                        Uključuje preneseno: {openingBalance >= 0 ? '+' : ''}{formatAmount(openingBalance, currency)}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => { setIncomeInput(settings.income_override !== null ? String(settings.income_override) : ''); setEditingIncome(true) }}
                    className="w-9 h-9 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 hover:bg-orange-500/20 transition-colors shrink-0"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#111418] rounded-xl p-5 border border-white/5">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Fiksni troškovi (obaveze)</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-white">
                    {Math.round(totalFixedCosts).toLocaleString('de-DE')}
                  </span>
                  <span className="text-xs text-slate-400 ml-1.5">{currency}</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {fixedCosts.length} {fixedCosts.length === 1 ? 'stavka' : 'stavki'}
                  </p>
                </div>
                <button
                  onClick={() => setShowCostsModal(true)}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                >
                  <Pencil size={14} />
                </button>
              </div>
            </div>

            <div className="bg-[#111418] rounded-xl p-5 border border-emerald-500/10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Preostali budžet</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-emerald-400">
                    {Math.round(remainingBudget).toLocaleString('de-DE')}
                  </span>
                  <span className="text-xs text-slate-400 ml-1.5">{currency}</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Prihod − računi</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <TrendingUp size={14} />
                </div>
              </div>
            </div>
          </div>

          {shares && <AllocationBar shares={shares} monthlyIncome={monthlyIncome} currency={currency} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <BillsCard
              billsCosts={billsCosts}
              pct={shares?.bills ?? 0}
              currency={currency}
              onEdit={() => setShowCostsModal(true)}
            />
            {SLIDER_CATEGORIES.map(cat => (
              <BudgetCard
                key={cat.key}
                label={cat.label}
                sub={cat.sub}
                pct={sliders[cat.key]}
                recommended={cat.recommended}
                incomeShare={shares ? shares[cat.costKey] : null}
                remainingBudget={remainingBudget}
                reserved={reservedByCategory[cat.costKey]}
                currency={currency}
                onChange={v => handleSliderChange(cat.key, v)}
                onSave={handleSliderSave}
              />
            ))}
          </div>
        </>
      )}

      {showCostsModal && (
        <FixedCostsModal
          fixedCosts={fixedCosts}
          currency={currency}
          onAdd={addFixedCost}
          onUpdate={updateFixedCost}
          onDelete={deleteFixedCost}
          onClose={() => setShowCostsModal(false)}
        />
      )}
    </div>
  )
}
