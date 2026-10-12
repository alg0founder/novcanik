import { FAQ } from './faq'

export function FaqSection() {
  return (
    <section className="border-t border-white/5">
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-20 md:py-24">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-10">Česta pitanja</h2>
        <div className="divide-y divide-white/5 border-y border-white/5">
          {FAQ.map(item => (
            <details key={item.q} className="group py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-base font-semibold text-white focus:outline-none focus-visible:text-orange-400">
                {item.q}
                <span className="text-orange-500 text-xl leading-none transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-2xl">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
