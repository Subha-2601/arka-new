import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SERVICES, INDUSTRIES } from './content'
import Logo from './Logo'

function Mega({ id, title, blurb, to, items, base, onNavigate }) {
  return (
    <div id={id} className="absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_24px_40px_rgba(0,0,0,.08)] animate-pop">
      <div className="wrap grid grid-cols-[minmax(0,.8fr)_minmax(0,2fr)] gap-14 py-11">
        <div>
          <h2 className="mb-3 text-3xl">{title}</h2>
          <p className="mb-5 max-w-[34ch] text-ink-2">{blurb}</p>
          <Link to={to} onClick={onNavigate} className="lnk">Explore all {title.toLowerCase() === 'what we do' ? 'services' : 'industries'}<span className="arr">→</span></Link>
        </div>
        <ul className="grid grid-cols-2 gap-x-10">
          {items.map((it) => (
            <li key={it.id}>
              <Link to={`${base}#${it.id}`} onClick={onNavigate} className="group block border-b border-line py-3.5">
                <b className="block font-serif text-[1.15rem] font-medium leading-tight transition-colors group-hover:text-orange-ink">{it.title}</b>
                <span className="mt-0.5 block text-[.92rem] leading-snug text-mute">{it.lead || it.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Header({ onSearch }) {
  const [menu, setMenu] = useState(false)
  const [mega, setMega] = useState(null)
  const [stuck, setStuck] = useState(false)
  const timer = useRef()
  const loc = useLocation()
  const desktop = () => window.matchMedia('(min-width: 1081px)').matches

  useEffect(() => { setMenu(false); setMega(null) }, [loc.pathname, loc.hash])
  useEffect(() => { document.body.style.overflow = menu ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [menu])
  useEffect(() => {
    const f = () => setStuck(window.scrollY > 8)
    f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => { const f = (e) => e.key === 'Escape' && (setMega(null), setMenu(false)); window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f) }, [])

  const open = (k) => { if (!desktop()) return; clearTimeout(timer.current); setMega(k) }
  const leave = () => { timer.current = setTimeout(() => setMega(null), 160) }
  const item = 'relative block px-3.5 py-2.5 font-medium after:absolute after:inset-x-3.5 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-orange after:transition-transform hover:after:scale-x-100 max-[1080px]:border-b max-[1080px]:border-line max-[1080px]:py-[18px] max-[1080px]:font-serif max-[1080px]:text-[2rem] max-[1080px]:font-normal max-[1080px]:after:hidden'
  const active = ({ isActive }) => `${item} ${isActive ? 'after:scale-x-100' : ''}`

  return (
    <header className={`sticky top-0 z-[100] border-b border-line bg-white transition-shadow ${stuck ? 'shadow-[0_6px_24px_rgba(0,0,0,.07)]' : ''}`} onMouseEnter={() => clearTimeout(timer.current)} onMouseLeave={leave}>
      <div className="wrap flex h-[76px] items-center justify-between max-[680px]:h-[68px]">
        <Link to="/" className="flex items-center gap-3" aria-label="Arka Fintech home"><Logo className="h-8 sm:h-9" /></Link>

        <div className="flex items-center gap-2 min-[1081px]:hidden">
          <button onClick={onSearch} aria-label="Search" className="grid h-[46px] w-[46px] place-items-center border border-line">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          </button>
          <button onClick={() => setMenu(!menu)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} className="relative h-[46px] w-[46px] border border-line">
            <span className={`absolute left-3 right-3 h-0.5 bg-ink transition-all ${menu ? 'top-[22px] rotate-45' : 'top-[18px]'}`} />
            <span className={`absolute left-3 right-3 h-0.5 bg-ink transition-all ${menu ? 'top-[22px] -rotate-45' : 'top-[26px]'}`} />
          </button>
        </div>

        <nav aria-label="Primary" className={`flex items-center gap-8 max-[1080px]:fixed max-[1080px]:inset-x-0 max-[1080px]:bottom-0 max-[1080px]:top-[68px] max-[1080px]:flex-col max-[1080px]:items-stretch max-[1080px]:justify-start max-[1080px]:gap-6 max-[1080px]:overflow-y-auto max-[1080px]:bg-white max-[1080px]:px-5 max-[1080px]:py-6 max-[1080px]:transition-all ${menu ? 'max-[1080px]:visible max-[1080px]:opacity-100' : 'max-[1080px]:invisible max-[1080px]:-translate-y-2 max-[1080px]:opacity-0'}`}>
          <ul className="flex gap-1.5 max-[1080px]:flex-col">
            <li onMouseEnter={() => open('svc')}><NavLink to="/services" className={active} onClick={(e) => { if (desktop() && mega !== 'svc') { e.preventDefault(); open('svc') } }} aria-expanded={mega === 'svc'}>What we do</NavLink></li>
            <li onMouseEnter={() => open('ind')}><NavLink to="/industries" className={active} onClick={(e) => { if (desktop() && mega !== 'ind') { e.preventDefault(); open('ind') } }} aria-expanded={mega === 'ind'}>Industries</NavLink></li>
            <li onMouseEnter={() => setMega(null)}><NavLink to="/insights" className={active}>Insights</NavLink></li>
            <li onMouseEnter={() => setMega(null)}><NavLink to="/about" className={active}>About</NavLink></li>
          </ul>
          <div className="flex items-center gap-3">
            <button onClick={onSearch} aria-label="Search the site" className="grid h-11 w-11 place-items-center border border-line transition hover:border-ink max-[1080px]:hidden" title="Search (Ctrl+K)">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
            </button>
            <Link to="/contact" className="btn btn-sm max-[1080px]:self-start">Contact us</Link>
          </div>
        </nav>
      </div>

      {mega === 'svc' && <Mega id="mega-svc" title="What we do" blurb="Seven services with a single aim: finance that is accurate, compliant and ready when it is needed." to="/services" items={SERVICES} base="/services" onNavigate={() => setMega(null)} />}
      {mega === 'ind' && <Mega id="mega-ind" title="Industries" blurb="Industry knowledge gives figures their meaning. Here is where we work today, and where we are extending our reach." to="/industries" items={INDUSTRIES} base="/industries" onNavigate={() => setMega(null)} />}
    </header>
  )
}
