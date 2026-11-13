import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SEARCH_INDEX } from './content'

export default function SearchModal({ open, onClose }) {
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const nav = useNavigate()
  const ref = useRef(null)

  const results = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return SEARCH_INDEX.slice(0, 8)
    // Match on word starts, so "aged" finds "Aged care" and not "Managed services". Title hits rank first.
    const re = new RegExp('(^|[^a-z0-9])' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    const score = (r) => (re.test(r.title.toLowerCase()) ? 0 : re.test(`${r.hint || ''} ${r.kind}`.toLowerCase()) ? 1 : 9)
    return SEARCH_INDEX.map((r) => [score(r), r]).filter(([s]) => s < 9).sort((a, b) => a[0] - b[0]).map(([, r]) => r).slice(0, 8)
  }, [q])

  useEffect(() => { if (open) { setQ(''); setIdx(0); setTimeout(() => ref.current?.focus(), 50) } }, [open])
  useEffect(() => { setIdx(0) }, [q])

  if (!open) return null
  const go = (r) => { onClose(); nav(r.to) }
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && results[idx]) go(results[idx])
    if (e.key === 'Escape') onClose()
  }
  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center bg-white/80 px-4 pt-[12vh] backdrop-blur-md" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-label="Search the site" className="w-full max-w-2xl animate-pop border border-line bg-white shadow-[0_30px_80px_rgba(0,0,0,.18)]" onKeyDown={onKey}>
        <div className="flex items-center gap-3 border-b border-line px-5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          <label htmlFor="site-search" className="sr-only">Search</label>
          <input id="site-search" ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services, industries and insights"
            className="h-16 flex-1 bg-transparent font-serif text-xl outline-none placeholder:text-mute" autoComplete="off" />
          <button onClick={onClose} className="text-sm text-mute hover:text-ink">Close</button>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto py-2" role="listbox">
          {results.length === 0 && <li className="px-5 py-8 text-mute">No results for “{q}”. Try “compliance”, “aged care” or “contact”.</li>}
          {results.map((r, i) => (
            <li key={r.to + r.title} role="option" aria-selected={i === idx}>
              <button onClick={() => go(r)} onMouseEnter={() => setIdx(i)} className={`flex w-full items-baseline justify-between gap-4 px-5 py-3 text-left ${i === idx ? 'bg-wash' : ''}`}>
                <span><span className="block font-serif text-lg">{r.title}</span>{r.hint && <span className="block text-sm text-mute">{r.hint}</span>}</span>
                <span className="shrink-0 text-sm text-orange-ink">{r.kind}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="border-t border-line px-5 py-3 text-sm text-mute">Use the arrow keys to move and Enter to open.</p>
      </div>
    </div>
  )
}
