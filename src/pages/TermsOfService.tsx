import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function TermsOfService() {
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

        <div className="max-w-none space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Uslovi korišćenja</h1>
            <p className="text-xs text-slate-500">Poslednje ažuriranje: april 2026.</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Prihvatanje uslova</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Korišćenjem aplikacije Novčanik prihvatate ove Uslove korišćenja. Ako se ne slažete sa uslovima, molimo vas da ne koristite aplikaciju.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">O aplikaciji</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Novčanik je besplatna aplikacija za praćenje ličnih finansija. Aplikacija omogućava korisnicima da beleže prihode, rashode i planiraju budžet.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-white">Novčanik nije finansijski savetnik.</strong> Sve finansijske odluke donosite na sopstvenu odgovornost.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Anonimnost i podaci</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Novčanik ne zahteva vaš stvarni identitet. Možete koristiti bilo koji email i bilo koje ime.
              Invite kodovi koji se koriste za registraciju automatski se brišu nakon 7 dana i ne postoji
              zapis o tome kome su dodeljeni. Vaš nalog u sistemu postoji isključivo kao nasumični tehnički identifikator.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Nalog i pristup</h2>
            <ul className="text-sm text-slate-400 space-y-2 list-none pl-0">
              {[
                'Registracija je moguća samo uz invite kod.',
                'Odgovorni ste za čuvanje pristupnih podataka svog naloga.',
                'Niste ovlašćeni da delite nalog sa drugima.',
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-orange-500 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Prihvatljivo korišćenje</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Aplikaciju smete koristiti isključivo u lične, nekomercijalne svrhe. Zabranjeno je:
            </p>
            <ul className="text-sm text-slate-400 space-y-2 list-none pl-0">
              {[
                'Pokušati pristupiti podacima drugih korisnika.',
                'Pokušati ugroziti sigurnost aplikacije ili baze podataka.',
                'Koristiti aplikaciju za bilo kakvu nezakonitu aktivnost.',
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-orange-500 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Dostupnost</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Novčanik je besplatna aplikacija koja se pruža "kakva jeste". Ne garantujemo neprekidnu dostupnost niti odsustvo grešaka.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Ograničenje odgovornosti</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Administrator aplikacije nije odgovoran za gubitak podataka zbog tehničkih problema niti za
              finansijske odluke donete na osnovu podataka iz aplikacije.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white">Gašenje naloga</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Korisnik može u svakom trenutku zatražiti brisanje naloga na{' '}
              <a href="mailto:algo_founder@proton.me" className="text-orange-400 hover:text-orange-300">
                algo_founder@proton.me
              </a>.
              Administrator može ugasiti nalog koji krši ove uslove korišćenja.
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
