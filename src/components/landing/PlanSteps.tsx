import { Eye, Scissors, PieChart } from 'lucide-react'

const STEPS = [
  {
    icon: Eye,
    title: 'Prati',
    text: 'Svaki prihod i trošak na jednom mestu. Posle mesec dana vidiš gde ti novac stvarno odlazi.',
  },
  {
    icon: Scissors,
    title: 'Smanji račune',
    text: 'Kad su računi crno na belo, odmah se vidi koji je najveći i gde može da se uštedi. Svaki dinar skinut sa računa ostaje tebi.',
  },
  {
    icon: PieChart,
    title: 'Rasporedi unapred',
    text: 'Kad plata legne, već znaš koliko ide na trošenje, koliko na investiranje, a koliko na davanje. Ne čekaš kraj meseca da vidiš šta je ostalo.',
  },
]

export function PlanSteps() {
  return (
    <section className="border-t border-white/5">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <p className="text-[11px] font-black text-orange-500 uppercase tracking-widest mb-4">Plan pre plate</p>
        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white leading-[1.1] max-w-3xl mb-14">
          Novac koji nema plan potroši se sam. Novčanik mu daje plan.
        </h2>
        <ol className="grid md:grid-cols-3 gap-10 md:gap-12">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-11 h-11 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
                  <Icon size={20} />
                </span>
                <span className="font-display text-sm font-bold text-slate-500">0{i + 1}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
