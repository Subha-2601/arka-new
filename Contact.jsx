import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHead from './PageHead'
import { Offices } from './About'
import { SERVICES, SITE } from './content'

export default function Contact() {
  const [params] = useSearchParams()
  const topic = params.get('topic')
  const [errs, setErrs] = useState({})
  const [note, setNote] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.target), v = Object.fromEntries(f)
    const er = {}
    if (!v.name?.trim()) er.name = 'Enter your name.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email?.trim() || '')) er.email = 'Enter a valid work email, like name@company.com.'
    if (!v.message?.trim()) er.message = 'Tell us briefly how we can help.'
    if (!v.consent) er.consent = 'Tick the box to let us contact you about this enquiry.'
    setErrs(er)
    if (Object.keys(er).length) { setNote(''); return }
    const body = [`Name: ${v.name}`, `Company: ${v.company}`, `Email: ${v.email}`, `Phone: ${v.phone}`, `Country: ${v.country}`, `Interested in: ${v.interest}`, '', v.message].join('\n')
    location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Enquiry: ' + v.interest)}&body=${encodeURIComponent(body)}`
    setNote(`Your email app should open with the enquiry ready to send. If it does not, write to ${SITE.email}.`)
  }
  const Field = ({ id, label, error, children }) => (
    <div className="flex min-w-0 flex-col gap-2"><label htmlFor={id} className="text-[.95rem] font-semibold">{label}</label>{children}{error && <span className="text-sm text-[#b3261e]">{error}</span>}</div>
  )
  return (
    <>
      <PageHead crumb="Contact" title="Speak with our team" lead="Tell us what you would like to improve. We will reply within one working day." />
      <div className="wrap grid gap-12 pb-24 pt-14 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
        <form onSubmit={submit} noValidate className="grid content-start gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Full name" error={errs.name}><input id="name" name="name" autoComplete="name" className="field" /></Field>
            <Field id="company" label="Company"><input id="company" name="company" autoComplete="organization" className="field" /></Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="email" label="Work email" error={errs.email}><input id="email" name="email" type="email" autoComplete="email" className="field" /></Field>
            <Field id="phone" label="Phone"><input id="phone" name="phone" type="tel" autoComplete="tel" className="field" /></Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="country" label="Country"><select id="country" name="country" className="field">{['Australia', 'India', 'Singapore', 'United Arab Emirates', 'Other'].map((c) => <option key={c}>{c}</option>)}</select></Field>
            <Field id="interest" label="I am interested in"><select id="interest" name="interest" defaultValue={SERVICES.some((s) => s.title === topic) ? topic : 'General enquiry'} className="field"><option>General enquiry</option>{SERVICES.map((s) => <option key={s.id}>{s.title}</option>)}</select></Field>
          </div>
          <Field id="message" label="How can we help?" error={errs.message}><textarea id="message" name="message" rows="5" className="field resize-y" /></Field>
          <label className="flex items-start gap-3 text-[.95rem] text-ink-2"><input type="checkbox" name="consent" className="mt-1 h-5 w-5 accent-orange" /><span>I agree to Arka Fintech contacting me about this enquiry.{errs.consent && <span className="mt-1 block text-sm text-[#b3261e]">{errs.consent}</span>}</span></label>
          <button className="btn justify-self-start max-sm:justify-self-stretch" type="submit">Send enquiry</button>
          <p className="min-h-[1.4em] text-[.95rem]" role="status">{note}</p>
        </form>
        <aside>
          <h2 className="mb-4 border-t-[3px] border-orange pt-[18px] text-[1.7rem]">Reach us directly</h2>
          <ul className="mb-11">
            {[['Australia', SITE.phoneAU, 'tel:+61466799077'], ['India', SITE.phoneIN, 'tel:+919427717769'], ['Email', SITE.email, `mailto:${SITE.email}`], ['LinkedIn', 'Arka Fintech', SITE.linkedin]].map(([k, t, h]) => (
              <li key={k} className="flex flex-wrap justify-between gap-4 border-b border-line py-3.5"><small className="text-[.95rem] text-mute">{k}</small><a className="font-semibold hover:underline" href={h} {...(h.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{t}</a></li>
            ))}
          </ul>
          <h2 className="mb-5 border-t-[3px] border-orange pt-[18px] text-[1.7rem]">Offices</h2>
          <ul className="grid gap-6"><Offices /></ul>
        </aside>
      </div>
    </>
  )
}
