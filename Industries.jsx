import { Link } from 'react-router-dom'
import PageHead from './PageHead'
import { INDUSTRIES } from './content'

export default function Industries() {
  return (
    <>
      <PageHead crumb="Industries" title="Industries we know" lead="Industry knowledge is what gives financial figures their meaning. We support more than twelve industries for organisations in Australia, India, Singapore and the United Arab Emirates, and we are extending our work into new sectors." />
      <div className="wrap pb-20 pt-12">
        {INDUSTRIES.map((i, k) => (
          <section key={i.id} id={i.id} className={`grid gap-6 py-11 md:grid-cols-[.9fr_1.5fr] md:gap-20 ${k === 0 ? 'border-t-2 border-ink' : 'border-t border-line'}`}>
            <div className="flex flex-col items-start gap-3">
              <h2 className="text-[clamp(1.9rem,3.2vw,2.9rem)]">{i.title}</h2>
              <span className={`px-2.5 py-1 text-[.85rem] font-semibold ${i.live ? 'bg-orange text-ink' : 'bg-white text-ink shadow-[inset_0_0_0_1px_#0b0b0b]'}`}>{i.live ? 'Serving today' : 'Expanding into'}</span>
            </div>
            <div className="flex flex-col items-start gap-4">
              <p className="big">{i.text}</p>
              <p className="max-w-[60ch] text-ink-2">Our teams combine financial expertise with a working knowledge of how {i.title.toLowerCase()} organisations operate, so that reporting and compliance reflect the way you actually work.</p>
              <Link to={`/contact?topic=General+enquiry`} className="lnk">Talk to us about {i.title.toLowerCase()}<span className="arr">→</span></Link>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
