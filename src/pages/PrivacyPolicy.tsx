import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function PrivacyPolicy() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  return (
    <div className="min-h-screen bg-[#111417] p-4 pb-12">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(searchParams.get('from') === 'signup' ? '/login?tab=signup' : '/login')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-8 mt-4"
        >
          <ArrowLeft size={16} />
          Nazad
        </button>

        <div className="max-w-none space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Politika privatnosti</h1>
            <p className="text-xs text-slate-500">Poslednje ažuriranje: oktobar 2026.</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Ko smo mi</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Novčanik je besplatna aplikacija za praćenje ličnih finansija namenjena srpskom tržištu.
              Za sva pitanja možete nas kontaktirati na:{' '}
              <a href="mailto:algo_founder@proton.me" className="text-orange-400 hover:text-orange-300">
                algo_founder@proton.me
              </a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Šta znamo o vama</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Za nalog je potrebna email adresa. Možete koristiti bilo koju email adresu, ne mora biti vezana za vaše ime.
              Proveravamo samo da adresa radi (na nju stiže link za potvrdu), ne i ko je njen vlasnik. Ako koristite
              adresu iz koje se ne vidi ko ste, nemamo način da to saznamo.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ime i prezime nisu obavezni. Vaši podaci u bazi vezani su za vaš nalog. Druge lične podatke ne tražimo.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Koje podatke prikupljamo</h2>
            <p className="text-sm text-slate-400 leading-relaxed">Prikupljamo samo podatke koje vi sami unesete:</p>
            <ul className="text-sm text-slate-400 space-y-2 list-none pl-0">
              {[
                'Email adresa: koristi se isključivo za prijavu i tehničku komunikaciju (potvrda naloga, promena lozinke).',
                'Lozinka: čuva se isključivo u hashovanom obliku (bcrypt); niko, uključujući administratora, ne može videti vašu lozinku.',
                'Finansijski podaci: transakcije, budžet i podešavanja koje unesete.',
                'Ime i prezime: opciono; čuva se uz vaš nalog i u aplikaciji ga vidite samo vi.',
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-orange-500 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ne prikupljamo podatke o lokaciji, ne koristimo kolačiće za praćenje niti analitičke alate trećih strana.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Kako koristimo vaše podatke</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Vaši podaci se koriste isključivo za prikaz unutar aplikacije i sinhronizaciju između vaših uređaja.
              Vaše podatke <strong className="text-white">ne prodajemo, ne delimo i ne koristimo</strong> ni u kakve druge svrhe.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Gde se podaci čuvaju</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Podaci se čuvaju na platformi <strong className="text-white">Supabase</strong>, serveri locirani u Evropskoj uniji
              (Frankfurt, Nemačka), zaštićeni SSL/TLS enkripcijom i Row Level Security sistemom koji osigurava
              da svaki korisnik može pristupiti isključivo sopstvenim podacima.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Ko ima pristup</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Administrator aplikacije tehnički ima pristup bazi i može da vidi podatke. Ne pregleda ih, ne koristi i ne deli.
              Pored toga, podaci prolaze kroz ove servise: <strong className="text-white">Supabase</strong> (baza i prijava),{' '}
              <strong className="text-white">Vercel</strong> (hosting), <strong className="text-white">Google/Gmail</strong> (slanje
              emailova za potvrdu i lozinku) i <strong className="text-white">Cloudflare Turnstile</strong> (provera „nisam robot").
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Vaša prava</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Nalog i sve podatke možete sami obrisati u <strong className="text-white">Podešavanja → Obriši nalog</strong>.
              Brisanje je odmah i trajno. Za sve ostalo pišite na{' '}
              <a href="mailto:algo_founder@proton.me" className="text-orange-400 hover:text-orange-300">
                algo_founder@proton.me
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Bezbednost</h2>
            <ul className="text-sm text-slate-400 space-y-2 list-none pl-0">
              {[
                'Lozinke su hashovane (bcrypt), niko ih ne može pročitati.',
                'Sav prenos podataka je enkriptovan (HTTPS).',
                'Svaki korisnik vidi isključivo sopstvene podatke (RLS).',
                'Registraciju i prijavu štiti provera „nisam robot" (Cloudflare Turnstile).',
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-orange-500 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Izmene politike</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              O značajnim izmenama bićete obavešteni putem emaila ili u aplikaciji. Nastavak korišćenja aplikacije znači prihvatanje izmena.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Kontakt</h2>
            <p className="text-sm text-slate-400">
              <a href="mailto:algo_founder@proton.me" className="text-orange-400 hover:text-orange-300">
                algo_founder@proton.me
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
