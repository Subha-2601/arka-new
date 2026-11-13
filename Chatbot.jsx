import logoImg from './logo.png'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GREETING, getReply } from './bot'

const KEY = 'arka-chat-v1'
const load = () => { try { return JSON.parse(sessionStorage.getItem(KEY)) } catch { return null } }

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState(() => load() || [{ role: 'bot', ...GREETING }])
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const end = useRef(null)
  const input = useRef(null)

  useEffect(() => { try { sessionStorage.setItem(KEY, JSON.stringify(msgs.slice(-30))) } catch { /* private mode */ } }, [msgs])
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }) }, [msgs, busy, open])
  useEffect(() => { if (open) setTimeout(() => input.current?.focus(), 200) }, [open])
  useEffect(() => { const f = (e) => e.key === 'Escape' && setOpen(false); window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f) }, [])

  const send = async (t) => {
    const v = (t ?? text).trim()
    if (!v || busy) return
    const next = [...msgs.map((m) => ({ ...m, chips: undefined })), { role: 'user', text: v }]
    setMsgs(next); setText(''); setBusy(true)
    const r = await getReply(next)
    setMsgs((m) => [...m, { role: 'bot', ...r }])
    setBusy(false)
  }
  const reset = () => setMsgs([{ role: 'bot', ...GREETING }])

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} aria-label="Open chat assistant"
          className="fixed bottom-5 right-5 z-[90] flex items-center gap-3 border border-ink/10 bg-white py-3 pl-4 pr-5 font-semibold text-ink shadow-[0_12px_32px_rgba(0,0,0,.18)] transition hover:bg-wash sm:bottom-6 sm:right-6">
          <span className="relative grid h-9 w-9 place-items-center bg-orange text-ink">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.2A8 8 0 1 1 21 12z" /></svg>
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#2fbf71]" aria-hidden="true" />
          </span>
          <span className="hidden sm:inline">Ask Arka</span>
        </button>
      )}

      {open && (
        <section role="dialog" aria-label="Arka assistant"
          className="fixed inset-x-0 bottom-0 z-[95] flex h-[100svh] flex-col overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,.3)] animate-pop sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[min(640px,calc(100svh-48px))] sm:w-[400px]">
          <header className="flex items-center justify-between gap-3 border-b-4 border-orange bg-white px-5 py-4 text-ink">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Arka Fintech" width="250" height="100" className="h-7 w-auto" />
              <div className="border-l border-line pl-3 leading-tight">
                <p className="font-semibold">Assistant</p>
                <p className="flex items-center gap-1.5 text-xs text-mute"><span className="h-2 w-2 rounded-full bg-[#2fbf71]" />Automated, answers from our website</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={reset} className="whitespace-nowrap px-2 py-1 text-sm text-mute hover:text-ink" aria-label="Start a new chat">New chat</button>
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center text-xl hover:bg-wash" aria-label="Close chat">×</button>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-wash/50 px-4 py-5" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`flex animate-pop ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] px-4 py-3 text-[.97rem] leading-relaxed ${m.role === 'user' ? 'bg-orange text-ink' : 'border border-line bg-white'}`}>
                  <p>{m.text}</p>
                  {m.links?.length > 0 && (
                    <div className="mt-3 flex flex-col items-start gap-2">
                      {m.links.map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="lnk text-[.92rem]">{l.label}<span className="arr">→</span></Link>)}
                    </div>
                  )}
                  {m.chips?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.chips.map((c) => <button key={c} onClick={() => send(c)} className="border border-ink/25 bg-white px-3 py-1.5 text-sm transition hover:border-orange hover:bg-orange">{c}</button>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start"><div className="flex gap-1.5 border border-line bg-white px-4 py-4" aria-label="Assistant is typing">
                {[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 animate-bounce3 rounded-full bg-orange" style={{ animationDelay: `${d * 0.15}s` }} />)}
              </div></div>
            )}
            <div ref={end} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send() }} className="flex gap-2 border-t border-line bg-white p-3">
            <label htmlFor="chat-in" className="sr-only">Type your question</label>
            <input id="chat-in" ref={input} value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your question" autoComplete="off" className="field flex-1" />
            <button className="btn btn-orange px-5" disabled={busy || !text.trim()} aria-label="Send">Send</button>
          </form>
        </section>
      )}
    </>
  )
}
