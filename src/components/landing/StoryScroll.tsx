import { useEffect, useRef, useState } from 'react'

import { PhoneFrame } from './PhoneFrame'
import { STORY_STEPS } from './storySteps'

/**
 * Desktop: the phone stays pinned while the text scrolls past and its screen
 * follows the step in the middle of the viewport. Mobile: each step carries its own phone.
 */
export function StoryScroll() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  // Tracks which step crosses the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    stepRefs.current.forEach(el => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-10">
      <div>
        {STORY_STEPS.map((step, i) => (
          <article
            key={step.tab}
            ref={el => { stepRefs.current[i] = el }}
            data-step={i}
            className="md:min-h-[85vh] flex flex-col justify-center py-14 md:py-0"
          >
            <p className={`text-[11px] font-black uppercase tracking-widest mb-4 transition-colors ${i === active ? 'text-orange-500' : 'text-orange-500/60'}`}>
              {step.kicker}
            </p>
            <h2 className="font-display text-3xl md:text-[2.6rem] font-extrabold text-white leading-[1.1] mb-5 max-w-md">
              {step.title}
            </h2>
            <p className="text-base text-slate-400 leading-relaxed max-w-md">{step.text}</p>
            <div className="md:hidden mt-10 flex justify-center">
              <PhoneFrame width={280} tab={step.tab}>{step.screen}</PhoneFrame>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden md:block">
        <div className="sticky top-[8vh] h-[84vh] flex items-center justify-center">
          <div className="relative">
            <PhoneFrame width={290} tab={STORY_STEPS[active].tab}>
              <div className="relative h-full">
                {STORY_STEPS.map((step, i) => (
                  <div
                    key={step.tab}
                    aria-hidden={i !== active}
                    className={`absolute inset-0 transition-all duration-500 ease-out ${i === active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                  >
                    {step.screen}
                  </div>
                ))}
              </div>
            </PhoneFrame>
          </div>
        </div>
      </div>
    </div>
  )
}
