import { useState, useEffect, useCallback } from 'react'

import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export interface FixedCost {
  id: string
  name: string
  amount: number
  notes: string | null
}

export interface BudgetSettings {
  income_override: number | null
  bills_pct: number
  spending_pct: number
  investing_pct: number
  giving_pct: number
}

const DEFAULT_SETTINGS: BudgetSettings = {
  income_override: null,
  bills_pct: 50,
  spending_pct: 20,
  investing_pct: 20,
  giving_pct: 10,
}

export function useBudzet() {
  const { user } = useAuth()
  const [settings, setSettings] = useState<BudgetSettings>(DEFAULT_SETTINGS)
  const [fixedCosts, setFixedCosts] = useState<FixedCost[]>([])
  const [transactionIncome, setTransactionIncome] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = useCallback(async (): Promise<void> => {
    if (!user) return
    setLoading(true)
    setError(null)

    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`
    const lastDay = new Date(year, month, 0).getDate()
    const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay}`

    const [settingsRes, costsRes, incomeRes] = await Promise.all([
      supabase.from('budget_settings').select('*').eq('user_id', user.id).maybeSingle(),
      supabase.from('fixed_costs').select('id, name, amount, notes').eq('user_id', user.id).order('created_at'),
      supabase.from('transactions').select('amount').eq('type', 'income').gte('date', startDate).lte('date', endDate),
    ])

    if (settingsRes.error || costsRes.error || incomeRes.error) {
      setError('Greška pri učitavanju budžeta.')
      setLoading(false)
      return
    }

    setSettings((settingsRes.data as BudgetSettings | null) ?? DEFAULT_SETTINGS)
    setFixedCosts((costsRes.data ?? []) as FixedCost[])
    setTransactionIncome((incomeRes.data ?? []).reduce((s, r) => s + r.amount, 0))
    setLoading(false)
  }, [user])

  useEffect(() => { fetchAll() }, [fetchAll])

  const saveSettings = async (patch: Partial<BudgetSettings>): Promise<string | null> => {
    if (!user) return null
    const next = { ...settings, ...patch }
    setSettings(next)
    const { error: e } = await supabase.from('budget_settings').upsert({ user_id: user.id, ...next })
    return e ? 'Greška pri čuvanju budžeta.' : null
  }

  const addFixedCost = async (name: string, amount: number, notes: string | null): Promise<string | null> => {
    if (!user) return null
    const { data, error: e } = await supabase
      .from('fixed_costs')
      .insert({ user_id: user.id, name, amount, notes })
      .select('id, name, amount, notes')
      .single()
    if (e) return 'Greška pri dodavanju troška.'
    if (data) setFixedCosts(prev => [...prev, data as FixedCost])
    return null
  }

  const updateFixedCost = async (id: string, name: string, amount: number, notes: string | null): Promise<string | null> => {
    const { error: e } = await supabase
      .from('fixed_costs')
      .update({ name, amount, notes })
      .eq('id', id)
    if (e) return 'Greška pri izmjeni troška.'
    setFixedCosts(prev => prev.map(c => c.id === id ? { ...c, name, amount, notes } : c))
    return null
  }

  const deleteFixedCost = async (id: string): Promise<string | null> => {
    const { error: e } = await supabase.from('fixed_costs').delete().eq('id', id)
    if (e) return 'Greška pri brisanju troška.'
    setFixedCosts(prev => prev.filter(c => c.id !== id))
    return null
  }

  const monthlyIncome = settings.income_override ?? transactionIncome
  const totalFixedCosts = fixedCosts.reduce((s, c) => s + c.amount, 0)
  const remainingBudget = Math.max(0, monthlyIncome - totalFixedCosts)

  return {
    settings,
    fixedCosts,
    monthlyIncome,
    transactionIncome,
    totalFixedCosts,
    remainingBudget,
    loading,
    error,
    saveSettings,
    addFixedCost,
    updateFixedCost,
    deleteFixedCost,
  }
}
