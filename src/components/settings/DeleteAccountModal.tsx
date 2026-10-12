import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Eye, EyeOff, AlertTriangle } from 'lucide-react'

import { deleteAccount } from '../../lib/deleteAccount'
import { isCaptchaEnabled } from '../../lib/turnstile'
import { Captcha } from '../Captcha'

const CONFIRM_WORD = 'OBRIŠI'

interface DeleteAccountModalProps {
  email: string
  onClose: () => void
}

export function DeleteAccountModal({ email, onClose }: DeleteAccountModalProps) {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmText, setConfirmText] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [captchaReset, setCaptchaReset] = useState(0)

  const canSubmit = confirmText.trim().toUpperCase() === CONFIRM_WORD && password.length > 0 && !loading
    && (!isCaptchaEnabled || captchaToken !== null)
  const inputCls = 'w-full pl-4 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-[#e1e2e7] placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all text-sm'

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    if (!canSubmit) return
    setError(null)
    setLoading(true)
    const err = await deleteAccount(email, password, captchaToken ?? undefined)
    if (err) { setError(err); setLoading(false); setCaptchaReset(n => n + 1); return }
    navigate('/login?deleted=1', { replace: true })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={loading ? undefined : onClose} />
      <div className="relative w-full max-w-sm bg-[#111418] border border-red-500/20 rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#e1e2e7]">Obriši nalog</h2>
          <button onClick={onClose} disabled={loading} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="flex gap-3 p-3 mb-5 rounded-xl bg-red-500/10 text-red-300 text-xs leading-relaxed">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          <p>Nalog i svi podaci (transakcije, kategorije, budžet, podešavanja) biće trajno obrisani. Ovo ne može da se poništi.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Lozinka</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className={inputCls} />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Upiši {CONFIRM_WORD} za potvrdu
            </label>
            <input type="text" value={confirmText} onChange={e => setConfirmText(e.target.value)} placeholder={CONFIRM_WORD} className={inputCls} />
          </div>
          <Captcha onToken={setCaptchaToken} resetSignal={captchaReset} />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} disabled={loading} className="flex-1 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-semibold transition-all">Otkaži</button>
            <button type="submit" disabled={!canSubmit} className="flex-1 py-2.5 rounded-full bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all">
              {loading ? 'Brisanje...' : 'Obriši zauvek'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
