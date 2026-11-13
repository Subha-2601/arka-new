import { Link } from 'react-router-dom'
import { SERVICES, INDUSTRIES, SITE } from './content'
import Logo from './Logo'

export default function Footer() {
  const h = 'mb-4 font-sans text-base font-semibold text-orange-ink'
  const li = 'mb-2.5 text-[.98rem] leading-snug text-ink-2'
  const a = 'hover:text-ink hover:underline'
  return (
    <footer className="border-t-[6px] border-orange bg-wash pb-7 pt-16 text-ink sm:pt-20">
      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-ink/15 pb-12">
          <div><div className="mb-6 flex items-center gap-3"><Logo className="h-9" /></div><p className="max-w-[26ch] font-serif text-[clamp(1.6rem,3vw,2.6rem)] leading-tight">Finance you can rely on, reviewed by people who answer for it.</p></div>
          <Link to="/contact" className="btn">Arrange a consultation</Link>
        </div>
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div><h3 className={h}>What we do</h3><ul>{SERVICES.map((s) => <li key={s.id} className={li}><Link className={a} to={`/services#${s.id}`}>{s.title}</Link></li>)}</ul></div>
          <div><h3 className={h}>Industries</h3><ul>{INDUSTRIES.slice(0, 5).map((s) => <li key={s.id} className={li}><Link className={a} to={`/industries#${s.id}`}>{s.title}</Link></li>)}<li className={li}><Link className={a} to="/industries">All industries</Link></li></ul></div>
          <div><h3 className={h}>Company</h3><ul>
            <li className={li}><Link className={a} to="/about">About Arka</Link></li>
            <li className={li}><Link className={a} to="/insights">Insights</Link></li>
            <li className={li}><Link className={a} to="/contact">Contact</Link></li>
            <li className={li}><a className={a} href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li></ul></div>
          <div><h3 className={h}>Contact</h3><ul>
            <li className={li}><a className={a} href="tel:+61466799077">{SITE.phoneAU}</a> (Australia)</li>
            <li className={li}><a className={a} href="tel:+919427717769">{SITE.phoneIN}</a> (India)</li>
            <li className={li}><a className={a} href={`mailto:${SITE.email}`}>{SITE.email}</a></li></ul></div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-ink/15 pt-6 text-sm text-mute">
          <span>© {new Date().getFullYear()} Arka Fintech. All rights reserved.</span>
          <span>Arka Fintech reports ISO 27001 certification and GDPR compliance.</span>
        </div>
      </div>
    </footer>
  )
}
