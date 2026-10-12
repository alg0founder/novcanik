import { Link, Navigate } from 'react-router-dom'
import { Github, ArrowRight } from 'lucide-react'

import { useAuth } from '../hooks/useAuth'
import { ProductPreview } from '../components/landing/ProductPreview'
import { FeatureList } from '../components/landing/FeatureList'

const REPO_URL = 'https://github.com/alg0founder/novcanik'

const primaryCta = 'inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-[#2d1600] font-bold px-7 py-3.5 rounded-full transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111417]'

export function Landing() {
  const { session, loading } = useAuth()
  if (!loading && session) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-[#111417] text-[#e1e2e7] overflow-x-hidden">
      <header className="max-w-6xl mx-auto px-5 md:px-8 py-6 flex items-center justify-between">
        <Link to="/pocetna" className="flex items-center gap-2.5">
          <img src="/icon-192.png" alt="" width={32} height={32} className="rounded-lg" />
          <span className="font-display text-lg font-extrabold text-white">Novčanik</span>
        </Link>
        <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
          Prijavi se
        </Link>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-5 md:px-8 pt-10 md:pt-20 pb-20 md:pb-28 grid md:grid-cols-[1.1fr_1fr] gap-14 md:gap-10 items-center">
          <div>
            <p className="animate-fade-up text-[11px] font-black text-orange-500 uppercase tracking-widest mb-4">
              Besplatno · Bez reklama · Otvoren kod
            </p>
            <h1 className="animate-fade-up [animation-delay:80ms] font-display text-4xl md:text-6xl font-extrabold text-white leading-[1.05] mb-5">
              Znaj gde ti odlazi novac.
            </h1>
            <p className="animate-fade-up [animation-delay:160ms] text-base md:text-lg text-slate-400 max-w-md leading-relaxed mb-8">
              Upisuješ prihode i troškove, a Novčanik ti pokaže mesec, budžet i gde možeš da uštediš.
            </p>
            <div className="animate-fade-up [animation-delay:240ms] flex flex-wrap items-center gap-4">
              <Link to="/login?tab=signup" className={primaryCta}>
                Napravi nalog <ArrowRight size={16} />
              </Link>
              <Link to="/login" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors px-2 py-3">
                Već imam nalog
              </Link>
            </div>
          </div>
          <div className="animate-fade-up [animation-delay:320ms]">
            <ProductPreview />
          </div>
        </section>

        <section className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-24">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-12 max-w-lg">
              Sve što ti treba, ništa što ti ne treba.
            </h2>
            <FeatureList />
          </div>
        </section>

        <section className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-24 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-4">
                Kod je javan.
              </h2>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-md">
                Svako može da pogleda kako aplikacija radi i kako čuva podatke. Svaki nalog vidi samo svoje podatke.
                Šta se tačno čuva i ko tehnički ima pristup piše u{' '}
                <Link to="/privacy-policy" className="text-orange-400 hover:text-orange-300 underline-offset-2 hover:underline">
                  politici privatnosti
                </Link>.
              </p>
            </div>
            <div className="md:justify-self-end">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-sm font-semibold text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                <Github size={16} /> Pogledaj kod na GitHub-u
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-8">
              Počni od ovog meseca.
            </h2>
            <Link to="/login?tab=signup" className={primaryCta}>
              Napravi nalog <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
          <Link to="/privacy-policy" className="hover:text-slate-300">Politika privatnosti</Link>
          <Link to="/terms-of-service" className="hover:text-slate-300">Uslovi korišćenja</Link>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">GitHub</a>
        </div>
      </footer>
    </div>
  )
}
