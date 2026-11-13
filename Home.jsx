import { Link } from 'react-router-dom'
import HeroSlider from './HeroSlider'
import Carousel from './Carousel'
import Marquee from './Marquee'
import CountUp from './CountUp'
import Reveal from './Reveal'
import { InsightCard, CaseCard } from './Cards'
import { SERVICES, INDUSTRIES, INSIGHTS, CASES, FIGURES } from './content'

export default function Home() {
  return (
    <>
      <HeroSlider />

      <Marquee items={INDUSTRIES.map((i) => i.title)} />

      <section className="bg-orange py-16 text-ink sm:py-24 lg:py-32" id="who">
        <div className="wrap grid items-start gap-10 lg:grid-cols-2 lg:gap-24">
          <Reveal><p className="font-serif text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.08] tracking-tight">Finance professionals first. Technologists second.</p></Reveal>
          <Reveal delay={120}>
            <p className="big">Software can match, reconcile and forecast at a speed no team can equal. It cannot judge whether a result makes sense for your business. Every Arka service therefore pairs automation with a qualified professional who is accountable for the work.</p>
            <ul className="mt-9">
              {[['Accurate', 'Every close passes through expert review before it reaches you.'], ['Accountable', 'A single team answers for the outcome, from first conversation to month-end.'], ['Always available', 'Support is on hand around the clock, across four countries.']].map(([b, t]) => (
                <li key={b} className="grid gap-1 border-t-2 border-ink py-[18px] sm:grid-cols-[150px_1fr] sm:gap-5"><b className="font-serif text-[1.35rem] font-medium">{b}</b><span>{t}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-28">
        <div className="wrap">
          <div className="rule-head"><h2 className="text-[clamp(1.9rem,3.2vw,2.9rem)]">Regulatory briefings</h2><Link to="/insights" className="lnk">All briefings<span className="arr">→</span></Link></div>
          <Carousel label="Regulatory briefings">{INSIGHTS.map((a) => <InsightCard key={a.id} a={a} />)}</Carousel>
        </div>
      </section>

      <section className="bg-wash py-16 sm:py-24 lg:py-28">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div className="flex flex-col items-start gap-6 border-t-[3px] border-orange pt-5">
            <h2 className="text-[clamp(1.9rem,3.2vw,2.9rem)]">What we do</h2>
            <p className="big">Seven services, held to one standard: accurate figures, reviewed by qualified people and delivered on time.</p>
            <Link to="/services" className="lnk">Explore all services<span className="arr">→</span></Link>
          </div>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.id} className="border-b border-line first:border-t">
                <Link to={`/services#${s.id}`} className="group flex items-center justify-between gap-5 px-0 py-[22px] font-serif text-[clamp(1.3rem,2.2vw,1.8rem)] leading-tight transition-all duration-300 hover:bg-orange hover:px-5">
                  <span>{s.title}</span><span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute -right-28 -top-28 h-[420px] w-[420px] rounded-full bg-wash opacity-80" aria-hidden="true" />
        <div className="wrap relative">
          <h2 className="mb-12 max-w-[22ch] border-t-[3px] border-orange pt-5 text-[clamp(1.9rem,3.2vw,2.9rem)]">The substance behind the work</h2>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {FIGURES.map((f) => (
              <div key={f.label} className="flex flex-col-reverse justify-end gap-2.5 border-t border-ink/20 pt-5">
                <dt className="max-w-[24ch] text-ink-2">{f.label}</dt>
                <dd className="font-serif text-[clamp(2.8rem,5vw,4.6rem)] leading-none tracking-tight text-orange">{f.text ? f.text : <CountUp value={f.value} dec={f.dec} suffix={f.suffix} />}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-9 max-w-[70ch] text-sm text-mute">Figures are reported by Arka Fintech and have not been independently audited.</p>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-28">
        <div className="wrap">
          <div className="rule-head"><h2 className="text-[clamp(1.9rem,3.2vw,2.9rem)]">Industries we serve</h2><Link to="/industries" className="lnk">All industries<span className="arr">→</span></Link></div>
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.slice(0, 6).map((i) => (
              <li key={i.id}>
                <Link to={`/industries#${i.id}`} className="group -mx-5 block border-t border-line px-5 py-6 transition-colors hover:bg-wash">
                  <b className="mb-1.5 block font-serif text-2xl font-normal transition-colors group-hover:text-orange-ink">{i.title}</b>
                  <span className="text-[.98rem] leading-snug text-mute">{i.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-wash py-16 sm:py-24 lg:py-28">
        <div className="wrap">
          <div className="rule-head"><h2 className="text-[clamp(1.9rem,3.2vw,2.9rem)]">Challenges we are asked to solve</h2><span className="text-[.9rem] font-medium text-orange-ink">Illustrative scenarios, not client results.</span></div>
          <Carousel label="Case studies" itemClass="w-[86%] sm:w-[60%] lg:w-[40%]">{CASES.map((c) => <CaseCard key={c.title} c={c} />)}</Carousel>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-28">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <h2 className="border-t-[3px] border-orange pt-5 text-[clamp(1.9rem,3.2vw,2.9rem)]">Speak with finance leaders who check the detail</h2>
          <div className="flex flex-col gap-7 border-t border-line pt-5">
            <p className="big">Tell us about your finance operations. We will reply within one working day with a considered view on where to begin.</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4"><Link to="/contact" className="btn">Arrange a consultation</Link><a href="tel:+61466799077" className="lnk">Call +61 466 799 077<span className="arr">→</span></a></div>
          </div>
        </div>
      </section>
    </>
  )
}
