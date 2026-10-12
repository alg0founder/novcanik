import { Link, Navigate } from 'react-router-dom'
import { ArrowRight, Github } from 'lucide-react'

import { useAuth } from '../hooks/useAuth'
import { HeroPhones } from '../components/landing/HeroPhones'
import { StoryScroll } from '../components/landing/StoryScroll'
import { FaqSection } from '../components/landing/FaqSection'

const REPO_URL = 'https://github.com/alg0founder/novcanik'

const primaryCta = 'inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-[#2d1600] font-bold px-7 py-3.5 rounded-full transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111417]'

export function Landing() {
  const { session, loading } = useAuth()
  if (!loading && session) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-[#111417] text-[#e1e2e7] overflow-x-clip">
      <header className="max-w-6xl mx-auto px-5 md:px-8 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/icon-192.png" alt="" width={32} height={32} className="rounded-lg" />
          <span className="font-display text-lg font-extrabold text-white">Novčanik</span>
        </Link>
        <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
          Prijavi se
        </Link>
      </header>

      <main>
        <section className="px-5 md:px-8 pt-10 md:pt-16 text-center">
          <p className="animate-fade-up text-[11px] font-black text-orange-500 uppercase tracking-widest mb-5">
            Novčanik · lične finansije
          </p>
          <h1 className="animate-fade-up [animation-delay:80ms] font-display text-[2.6rem] leading-[1.05] md:text-7xl font-extrabold text-white max-w-4xl mx-auto mb-6">
            Plata legne prvog.<br />
            <span className="text-orange-500">Do dvadesetog je nema.</span>
          </h1>
          <p className="animate-fade-up [animation-delay:160ms] text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed mb-8">
            Novčanik ti pokaže gde je otišla. Trošak upišeš za par sekundi, ostalo sabere aplikacija.
          </p>
          <div className="animate-fade-up [animation-delay:240ms] flex flex-wrap justify-center items-center gap-4 mb-3">
            <Link to="/login?tab=signup" className={primaryCta}>
              Napravi nalog <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors px-2 py-3">
              Već imam nalog
            </Link>
          </div>
          <p className="animate-fade-up [animation-delay:300ms] text-xs text-slate-500 mb-10">
            Besplatno je i nema reklama. Radi u browseru i na telefonu.
          </p>
          <HeroPhones />
        </section>

        <section className="pb-10 md:pb-20">
          <StoryScroll />
        </section>

        <FaqSection />

        <section className="border-t border-white/5">
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-24 md:py-32 text-center">
            <h2 className="font-display text-4xl md:text-6xl font-extrabold text-white mb-6">
              Počni od ovog meseca.
            </h2>
            <p className="text-slate-400 leading-relaxed mb-10 max-w-lg mx-auto">
              Besplatno je i nema reklama. Kod je javan na GitHub-u, a šta se čuva piše u{' '}
              <Link to="/privacy-policy" className="text-orange-400 hover:text-orange-300 underline-offset-2 hover:underline">politici privatnosti</Link>.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/login?tab=signup" className={primaryCta}>
                Napravi nalog <ArrowRight size={16} />
              </Link>
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-sm font-semibold text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
                <Github size={16} /> Kod na GitHub-u
              </a>
            </div>
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
