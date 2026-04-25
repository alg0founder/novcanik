import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Check } from 'lucide-react'

import { supabase } from '../lib/supabase'

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [validSession, setValidSession] = useState(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setValidSession(true)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    setError(null)
    if (password.length < 8) { setError('Lozinka mora imati najmanje 8 karaktera.'); return }
    if (password !== confirm) { setError('Lozinke se ne poklapaju.'); return }
    setLoading(true)
    const { error: updateErr } = await supabase.auth.updateUser({ password })
    if (updateErr) {
      setError('Greška pri postavljanju lozinke. Link je možda istekao.')
      setLoading(false)
      return
    }
    setSuccess(true)
    setLoading(false)
    setTimeout(() => navigate('/login'), 3000)
  }

  const inputCls = 'w-full px-3 py-2.5 border border-slate-700 rounded-lg bg-slate-800/50 text-[#e1e2e7] placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all'

  return (
    <div className="min-h-screen bg-[#111417] flex items-center justify-center p-4">
      <div className="centered-hero-gradient fixed inset-0 pointer-events-none" />
      <div className="w-full max-w-sm relative">
        <div className="flex flex-col items-center mb-8">
          <span className="font-display text-3xl font-black tracking-tighter text-orange-500 mb-1">
            Novčanik
          </span>
          <p className="text-sm text-slate-500">Postavi novu lozinku</p>
        </div>

        <div className="glass-card rounded-2xl border border-orange-500/10 p-6">
          {success ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                <Check size={22} className="text-green-400" />
              </div>
              <p className="text-sm font-semibold text-white">Lozinka uspešno promenjena</p>
              <p className="text-xs text-slate-500">Bićete preusmereni na prijavu...</p>
            </div>
          ) : !validSession ? (
            <div className="text-center py-4 space-y-3">
              <p className="text-sm text-slate-400">Čekanje na verifikaciju linka...</p>
              <p className="text-xs text-slate-600">Ako ste direktno otvorili ovu stranicu, link iz emaila je neispravan ili je istekao.</p>
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
              >
                Nazad na prijavu
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Nova lozinka</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoFocus
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Minimum 8 karaktera"
                    className={`${inputCls} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Potvrdi lozinku</label>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Ponovi lozinku"
                  className={inputCls}
                />
              </div>
              {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-[#2d1600] font-bold rounded-xl transition-all active:scale-95"
              >
                {loading ? 'Čuvanje...' : 'Postavi novu lozinku'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
