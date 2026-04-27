import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function PrivacyPolicy() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#111417] p-4 pb-12">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-8 mt-4"
        >
          <ArrowLeft size={16} />
          Nazad
        </button>

        <div className="prose prose-invert prose-sm max-w-none space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Politika privatnosti</h1>
            <p className="text-xs text-slate-500">Poslednje ažuriranje: april 2026.</p>
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
            <h2 className="text-base font-bold text-white">Anonimnost korisnika</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Novčanik je dizajniran tako da ne znamo ko ste vi.
            </p>
            <ul className="text-sm text-slate-400 space-y-2 list-none pl-0">
              {[
                'Email adresa nije verifikovana kao vaša lična adresa — možete koristiti bilo koji email.',
                'Ime i prezime nisu obavezni i ne proveravamo njihovu tačnost.',
                'Invite kodovi se automatski generišu kao nasumični nizovi karaktera i brišu se nakon 7 dana — ne postoji zapis o tome kome je koji kod dodeljen.',
                'U bazi podataka vaš nalog postoji samo kao nasumični tehnički identifikator (UUID).',
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-orange-500 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-400 leading-relaxed">
              Rezultat je da nemamo mogućnost da povežemo vaše podatke u aplikaciji sa vašim stvarnim identitetom.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Koje podatke prikupljamo</h2>
            <p className="text-sm text-slate-400 leading-relaxed">Prikupljamo samo podatke koje vi sami unesete:</p>
            <ul className="text-sm text-slate-400 space-y-2 list-none pl-0">
              {[
                'Email adresa — koristi se isključivo za prijavu i tehničku komunikaciju.',
                'Lozinka — čuva se isključivo u hashovanom obliku (bcrypt); niko, uključujući administratora, ne može videti vašu lozinku.',
                'Finansijski podaci — transakcije, budžet i podešavanja koje unesete.',
                'Ime i prezime — opciono, prikazuje se samo vama unutar aplikacije.',
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-orange-500 shrink-0">—</span>
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
            <h2 className="text-base font-bold text-white">Vaša prava</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Imate pravo da u svakom trenutku zatražite brisanje naloga i svih podataka. Zahtev šaljete na{' '}
              <a href="mailto:algo_founder@proton.me" className="text-orange-400 hover:text-orange-300">
                algo_founder@proton.me
              </a>{' '}
              — podaci se brišu u roku od 30 dana.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Bezbednost</h2>
            <ul className="text-sm text-slate-400 space-y-2 list-none pl-0">
              {[
                'Lozinke su hashované (bcrypt) — niko ih ne može pročitati.',
                'Sav prenos podataka je enkriptovan (HTTPS).',
                'Svaki korisnik vidi isključivo sopstvene podatke (RLS).',
                'Invite kodovi se automatski brišu nakon 7 dana.',
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-orange-500 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Izmene politike</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              O značajnim izmenama bićete obavešteni putem emaila. Nastavak korišćenja aplikacije znači prihvatanje izmena.
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
