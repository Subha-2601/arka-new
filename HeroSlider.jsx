import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SLIDES } from './content'
import Photo from './Photo'

const DELAY = 7000

// Sliding hero on a white ground. The progress bar drives autoplay, so pausing freezes both.
// Arrows, tabs, swipe and the left/right keys all work.
export default function HeroSlider() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useRef(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  const touch = useRef(null)
  const n = SLIDES.length
  const go = useCallback((k) => setI(((k % n) + n) % n), [n])
  const onKey = (e) => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1) }
  const arrow = 'grid h-12 w-12 place-items-center border border-ink bg-white text-xl transition hover:border-orange hover:bg-orange'

  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-b from-wash to-white"
      aria-roledescription="carousel" aria-label="Featured"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      onKeyDown={onKey}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX }}
      onTouchEnd={(e) => { if (touch.current == null) return; const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 50) go(i + (d < 0 ? 1 : -1)); touch.current = null }}
    >
      <div className="pointer-events-none absolute -right-[8%] -top-[30%] -z-10 h-[46vw] max-h-[680px] w-[46vw] max-w-[680px] rounded-full bg-wash-2/70 max-lg:hidden" aria-hidden="true" />
      <div className="wrap grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <div className="order-2 min-h-[360px] lg:order-1 lg:min-h-[420px]">
          {SLIDES.map((s, k) => k === i && (
            <div key={k} className="animate-rise" aria-live="polite">
              <div className="mb-6 h-1.5 w-16 bg-orange" />
              <h1 className="text-[clamp(2.4rem,5vw,4.5rem)]">{s.title}</h1>
              <p className="mt-6 max-w-[54ch] text-[1.15rem] leading-relaxed text-ink-2 sm:text-xl">{s.text}</p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link to={s.cta.to} className="btn">{s.cta.label}</Link>
                <Link to="/services" className="lnk">Our services<span className="arr">→</span></Link>
              </div>
            </div>
          ))}
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="absolute -bottom-4 -left-4 h-[62%] w-[62%] bg-orange max-sm:-bottom-2.5 max-sm:-left-2.5" aria-hidden="true" />
          <div className="relative aspect-[16/11] bg-white lg:aspect-[5/4]">
            {SLIDES.map((s, k) => (
              <div key={k} className={`absolute inset-0 transition-opacity duration-1000 ${k === i ? 'opacity-100' : 'pointer-events-none opacity-0'}`} aria-hidden={k !== i}>
                <Photo name={s.photo} eager={k === 0} className="h-full w-full" imgClass={k === i ? 'animate-kenburns' : ''} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap pb-9">
        <div className="flex items-end justify-between gap-6">
          <ol className="grid flex-1 grid-cols-4 gap-3 sm:gap-5" aria-label="Choose a slide">
            {SLIDES.map((s, k) => (
              <li key={k}>
                <button onClick={() => go(k)} aria-label={`Show slide ${k + 1}: ${s.tab}`} aria-current={k === i} className="group block w-full text-left">
                  <span className="relative block h-[3px] overflow-hidden bg-line">
                    {k === i && <span key={i} onAnimationEnd={() => go(i + 1)} className="absolute inset-0 origin-left bg-orange" style={reduce.current ? { transform: 'none' } : { animation: `bar ${DELAY}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }} />}
                    {k < i && <span className="absolute inset-0 bg-ink/70" />}
                  </span>
                  <span className={`mt-3 hidden text-sm font-medium sm:block ${k === i ? 'text-ink' : 'text-mute group-hover:text-ink'}`}>{s.tab}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="flex gap-2 max-sm:hidden">
            <button onClick={() => go(i - 1)} aria-label="Previous slide" className={arrow}>←</button>
            <button onClick={() => go(i + 1)} aria-label="Next slide" className={arrow}>→</button>
          </div>
        </div>
      </div>
    </section>
  )
}
