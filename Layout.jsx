import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Chatbot from './Chatbot'
import SearchModal from './SearchModal'

export default function Layout() {
  const [search, setSearch] = useState(false)
  const [prog, setProg] = useState(0)
  const [top, setTop] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) { const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 80); return () => clearTimeout(t) }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  useEffect(() => {
    let ticking = false
    const f = () => {
      ticking = false
      const max = document.documentElement.scrollHeight - innerHeight
      setProg(max > 0 ? scrollY / max : 0); setTop(scrollY > 900)
    }
    const on = () => { if (!ticking) { ticking = true; requestAnimationFrame(f) } }
    addEventListener('scroll', on, { passive: true }); f()
    return () => removeEventListener('scroll', on)
  }, [pathname])

  useEffect(() => {
    const f = (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearch(true) } }
    addEventListener('keydown', f); return () => removeEventListener('keydown', f)
  }, [])

  return (
    <>
      <a href="#main" className="absolute -left-[999px] top-2 z-[200] bg-ink px-4 py-2.5 text-white focus:left-2">Skip to content</a>
      <div className="fixed inset-x-0 top-0 z-[130] h-[3px]" aria-hidden="true"><div className="h-full origin-left bg-orange" style={{ transform: `scaleX(${prog})` }} /></div>
      <Header onSearch={() => setSearch(true)} />
      <main id="main"><Outlet /></main>
      <Footer />
      <Chatbot />
      <SearchModal open={search} onClose={() => setSearch(false)} />
      {top && (
        <button onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"
          className="fixed bottom-24 right-6 z-[80] hidden h-12 w-12 place-items-center border border-ink bg-white text-xl transition hover:bg-orange sm:grid">↑</button>
      )}
    </>
  )
}
