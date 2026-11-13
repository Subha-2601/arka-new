import { useEffect, useRef, useState, Children } from 'react'

// A touch-friendly sliding row with snap points, arrows and a progress bar.
export default function Carousel({ children, label, itemClass = 'w-[82%] sm:w-[46%] lg:w-[31.5%]' }) {
  const ref = useRef(null)
  const [prog, setProg] = useState(0)
  const [edge, setEdge] = useState({ start: true, end: false })

  const update = () => {
    const el = ref.current; if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProg(max > 0 ? el.scrollLeft / max : 1)
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 })
  }
  useEffect(() => { update(); window.addEventListener('resize', update); return () => window.removeEventListener('resize', update) }, [])

  const go = (dir) => {
    const el = ref.current; if (!el) return
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 280), behavior: 'smooth' })
  }
  const arrow = 'grid h-12 w-12 place-items-center border border-ink bg-white text-xl transition hover:bg-orange hover:border-orange disabled:cursor-not-allowed disabled:border-line disabled:text-line disabled:hover:bg-white'
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={ref} onScroll={update} tabIndex={0}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-8 sm:px-8 lg:-mx-14 lg:px-14">
        {Children.map(children, (c) => <div className={`shrink-0 snap-start ${itemClass}`}>{c}</div>)}
      </div>
      <div className="mt-8 flex items-center gap-6">
        <div className="h-[3px] flex-1 bg-line" aria-hidden="true">
          <div className="h-full origin-left bg-orange transition-transform duration-300" style={{ transform: `scaleX(${Math.max(prog, 0.12)})` }} />
        </div>
        <div className="flex gap-2">
          <button className={arrow} onClick={() => go(-1)} disabled={edge.start} aria-label="Previous">←</button>
          <button className={arrow} onClick={() => go(1)} disabled={edge.end} aria-label="Next">→</button>
        </div>
      </div>
    </div>
  )
}
