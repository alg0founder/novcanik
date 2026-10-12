import { CalendarRange, PieChart, Scale, Smartphone } from 'lucide-react'
import type { ReactNode } from 'react'

const FEATURES: { icon: ReactNode; title: string; text: string }[] = [
  {
    icon: <CalendarRange size={20} />,
    title: 'Svaki mesec na jednom ekranu',
    text: 'Prihodi, rashodi i stanje za tekući mesec. Listaš unazad i vidiš kako je bilo ranije.',
  },
  {
    icon: <Scale size={20} />,
    title: 'Budžet po pravilu 50/20/20/10',
    text: 'Računi, trošenje, investiranje i davanje. Pomeraš slajdere i odmah vidiš iznose.',
  },
  {
    icon: <PieChart size={20} />,
    title: 'Izveštaji po kategorijama',
    text: 'Gde odlazi najviše novca, mesec po mesec ili za ceo period.',
  },
  {
    icon: <Smartphone size={20} />,
    title: 'Na telefonu kao aplikacija',
    text: 'Dodaš na početni ekran i otvaraš kao svaku drugu aplikaciju. Podaci su isti na telefonu i računaru.',
  },
]

export function FeatureList() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
      {FEATURES.map(f => (
        <li key={f.title} className="flex gap-4">
          <span className="w-10 h-10 shrink-0 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
            {f.icon}
          </span>
          <div>
            <h3 className="font-display text-base font-bold text-white mb-1">{f.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{f.text}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
