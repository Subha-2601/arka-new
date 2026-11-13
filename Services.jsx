import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHead from './PageHead'
import { SERVICES } from './content'

export default function Services() {
  const [cur, setCur] = useState(SERVICES[0].id)
  useEffect(() => {
    const f = () => {
      const y = scrollY + 180; let c = SERVICES[0].id
      SERVICES.forEach((s) => { const el = document.getElementById(s.id); if (el && el.offsetTop <= y) c = s.id })
      setCur(c)
    }
    f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f)
  }, [])
  return (
    <>
      <PageHead crumb="What we do" title="What we do" lead="Seven services that work independently or as one programme. Each pairs automation with a qualified professional who reviews the result." />
      <div className="wrap grid gap-12 pb-20 pt-12 lg:grid-cols-[240px_1fr] lg:gap-20">
        <aside className="sticky top-[110px] hidden self-start lg:block" aria-label="Services">
          <ul className="border-l-2 border-line">
            {SERVICES.map((s) => (
              <li key={s.id}><a href={`#/services#${s.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }) }} className={`-ml-0.5 block border-l-2 py-2.5 pl-[18px] text-[.98rem] leading-snug transition ${cur === s.id ? 'border-orange bg-gradient-to-r from-wash to-transparent font-semibold text-ink' : 'border-transparent text-ink-2 hover:text-ink'}`}>{s.title}</a></li>
            ))}
          </ul>
        </aside>
        <div>
          {SERVICES.map((s, i) => (
            <section key={s.id} id={s.id} className={`grid gap-6 py-12 md:grid-cols-[200px_1fr] md:gap-10 ${i === 0 ? 'border-t-2 border-ink' : 'border-t border-line'}`}>
              <div><b className="block font-serif text-[3.6rem] font-normal leading-none tracking-tight text-orange">{s.stat}</b><span className="mt-2 block text-[.95rem] leading-snug text-mute">{s.statLabel}</span></div>
              <div>
                <h2 className="mb-4 text-[clamp(1.8rem,2.8vw,2.5rem)]">{s.title}</h2>
                <p className="big mb-4">{s.lead}</p>
                <p className="max-w-[62ch] text-ink-2">{s.text}</p>
                <ul className="mb-7 mt-6 grid gap-2.5">{s.points.map((p) => <li key={p} className="relative pl-[30px] before:absolute before:left-0 before:top-[.5em] before:h-[9px] before:w-4 before:-rotate-45 before:border-b-2 before:border-l-2 before:border-orange">{p}</li>)}</ul>
                <Link to={`/contact?topic=${encodeURIComponent(s.title)}`} className="lnk">Discuss {s.title.toLowerCase()}<span className="arr">→</span></Link>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  )
}
