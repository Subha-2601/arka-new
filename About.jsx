import PageHead from './PageHead'
import Carousel from './Carousel'
import CountUp from './CountUp'
import { STEPS, OFFICES, LEADERS } from './content'

export default function About() {
  return (
    <>
      <PageHead crumb="About" title="Finance that runs smoothly, reviewed by people who understand it" lead="Arka Fintech brings AI-driven analytics together with certified finance professionals. We help organisations in Australia, India, Singapore and the United Arab Emirates keep their figures accurate, compliant and useful to the people who rely on them. We are expanding into Europe and North America through remote services." />

      <section className="py-16 sm:py-24">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <h2 className="border-t-[3px] border-orange pt-5 text-[clamp(1.9rem,3.2vw,2.9rem)]">How we work</h2>
          <ol>
            {STEPS.map(([t, d], i) => (
              <li key={t} className={`grid gap-1.5 border-t border-line py-6 sm:grid-cols-[180px_1fr] sm:gap-6 ${i === STEPS.length - 1 ? 'border-b' : ''}`}><h3 className="text-2xl">{t}</h3><p className="text-ink-2">{d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-wash py-16 sm:py-24">
        <div className="wrap">
          <h2 className="mb-12 max-w-[22ch] border-t-[3px] border-orange pt-5 text-[clamp(1.9rem,3.2vw,2.9rem)]">What you can expect from us</h2>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {[[15, '+', 'years of financial expertise'], [12, '+', 'industries supported'], [25, '+', 'technology provider partnerships'], [256, '-bit', 'encryption on your financial data']].map(([v, s, l]) => (
              <div key={l} className="flex flex-col-reverse justify-end gap-2.5 border-t border-ink/20 pt-5"><dt className="max-w-[24ch] text-ink-2">{l}</dt><dd className="font-serif text-[clamp(2.8rem,5vw,4.6rem)] leading-none text-orange"><CountUp value={v} suffix={s} /></dd></div>
            ))}
          </dl>
          <p className="mt-9 max-w-[70ch] text-sm text-mute">Arka Fintech states that it is ISO 27001 certified and GDPR compliant. Figures are reported by Arka and have not been independently audited.</p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="wrap">
          <div className="rule-head"><h2 className="text-[clamp(1.9rem,3.2vw,2.9rem)]">Leadership</h2><span className="text-[.9rem] font-medium text-orange-ink">Placeholders. Add names, photos and short bios.</span></div>
          <Carousel label="Leadership team" itemClass="w-[62%] sm:w-[32%] lg:w-[23.5%]">
            {LEADERS.map((p) => (
              <div key={p.n}>
                <div className="relative mb-3.5 aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#e4e4e2] to-[#cfcfcc]" aria-hidden="true">
                  <span className="absolute left-1/2 top-[30%] aspect-square w-[34%] -translate-x-1/2 rounded-full bg-[#bdbdb9]" />
                  <span className="absolute left-1/2 top-[62%] h-[60%] w-[70%] -translate-x-1/2 rounded-t-full bg-[#bdbdb9]" />
                </div>
                <h3 className="text-xl">{p.name}</h3><p className="text-[.95rem] text-mute">{p.role}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section id="offices" className="bg-wash py-16 sm:py-24">
        <div className="wrap">
          <div className="rule-head"><h2 className="text-[clamp(1.9rem,3.2vw,2.9rem)]">Our offices</h2></div>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"><Offices /></ul>
        </div>
      </section>
    </>
  )
}

export function Offices() {
  return OFFICES.map((o) => (
    <li key={o.name} className="flex flex-col items-start gap-2 border-t-[3px] border-orange pt-[18px]">
      <h3 className="text-[1.3rem]">{o.name}</h3>
      <p className="text-[.98rem] leading-snug text-ink-2">{o.address}</p>
      <a className="font-semibold hover:underline" href={`tel:${o.phone.replace(/\s/g, '')}`}>{o.phone}</a>
      <a className="lnk" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.query)}`} target="_blank" rel="noopener noreferrer">Get directions<span className="arr">→</span></a>
    </li>
  ))
}
