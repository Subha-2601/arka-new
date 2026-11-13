import { SERVICES, INDUSTRIES, OFFICES, SITE } from './content'

/*
  The assistant answers from the site's own content, so it never invents prices or promises.
  To connect a real AI model, set VITE_CHAT_ENDPOINT (see README). The endpoint receives
  { messages: [{ role, text }] } and must return { reply: "..." }. If it is missing or fails,
  the built-in answers below are used.
*/
const link = (label, to) => ({ label, to })

export const GREETING = {
  text: 'Good day, and welcome to Arka Fintech. I can introduce our services, outline the industries we serve, share office details or help you arrange a consultation. How may I help?',
  chips: ['What services do you offer?', 'Which industries do you serve?', 'Where are your offices?', 'How do I book a consultation?'],
}

const INTENTS = [
  { keys: ['hello', 'hi ', 'hey', 'good morning', 'good afternoon'], reply: () => ({ text: 'Good day. How may I help?', chips: GREETING.chips }) },
  { keys: ['service', 'offer', 'what do you do', 'help with', 'provide'],
    reply: () => ({ text: `We offer ${SERVICES.length} services: ${SERVICES.map((s) => s.title).join(', ')}. Each pairs automation with a qualified professional who checks the result.`, links: [link('See all services', '/services')], chips: ['Tell me about automation', 'Tell me about compliance', 'How do I book a consultation?'] }) },
  { keys: ['analytic', 'forecast', 'dashboard', 'predict'], reply: () => svc('analytics') },
  { keys: ['transformation', 'implement', 'system'], reply: () => svc('transformation') },
  { keys: ['outsourc', 'bookkeep', 'accounting', 'accounts'], reply: () => svc('outsourcing') },
  { keys: ['briefing', 'insight', 'article', 'latest', 'news', 'e-invoic', 'corporate tax', 'climate'],
    reply: () => ({ text: 'Our regulatory briefings summarise recent developments in Australia, India, the UAE and in data protection and information security. Each names its source and the date it was checked. They are general information, not tax, legal or financial advice.', links: [link('Read the briefings', '/insights')], chips: ['What services do you offer?', 'How do I book a consultation?'] }) },
  { keys: ['complian', 'audit', 'regulat', 'gdpr', 'iso'],
    reply: () => ({ text: 'Arka reports ISO 27001 certification and GDPR compliance. Our compliance advisory helps you align with global standards and local requirements, supported by certified professionals and audit-ready records.', links: [link('Compliance advisory', '/services#compliance'), link('Regulatory briefings', '/insights')], chips: ['How do I book a consultation?'] }) },
  { keys: ['automat', 'reconcil', 'approval'], reply: () => svc('automation') },
  { keys: ['consult', 'strategy', 'advice', 'advis'], reply: () => svc('consulting') },
  { keys: ['managed', '24/7', 'support'], reply: () => svc('managed') },
  { keys: ['industr', 'sector', 'aged care', 'healthcare', 'retail', 'technology', 'education', 'energy', 'commerce'],
    reply: () => ({ text: `We serve ${INDUSTRIES.filter((i) => i.live).map((i) => i.title.toLowerCase()).join(', ')}, and are expanding into ${INDUSTRIES.filter((i) => !i.live).map((i) => i.title.toLowerCase()).join(', ')}.`, links: [link('See industries', '/industries')], chips: ['What services do you offer?', 'How do I book a consultation?'] }) },
  { keys: ['office', 'location', 'where', 'address', 'sydney', 'melbourne', 'canberra', 'india', 'ahmedabad', 'singapore', 'dubai', 'uae'],
    reply: () => ({ text: `We have offices in ${OFFICES.map((o) => o.name).join(', ')}. We serve clients in Australia, India, Singapore and the United Arab Emirates. Our head office is at ${OFFICES[0].address}.`, links: [link('Offices and contact details', '/about#offices')], chips: ['How do I book a consultation?'] }) },
  { keys: ['phone', 'call', 'email', 'contact', 'reach', 'number'],
    reply: () => ({ text: `You can call ${SITE.phoneAU} (Australia) or ${SITE.phoneIN} (India), or email ${SITE.email}. We reply within one working day.`, links: [link('Contact form', '/contact')] }) },
  { keys: ['book', 'schedule', 'meeting', 'demo', 'appointment', 'talk to'],
    reply: () => ({ text: 'The most direct route is the contact form. Tell us a little about your finance operations and we will reply within one working day. You may also telephone either office.', links: [link('Book a consultation', '/contact')], chips: ['Where are your offices?'] }) },
  { keys: ['price', 'cost', 'fee', 'quote', 'how much', 'pricing'],
    reply: () => ({ text: 'Pricing depends on your systems, transaction volumes and the services you choose, so we do not publish a price list. A short consultation gives you a considered estimate.', links: [link('Request an estimate', '/contact')] }) },
  { keys: ['secure', 'security', 'safe', 'data', 'encrypt', 'privacy'],
    reply: () => ({ text: 'Arka reports that your data is protected with 256-bit encryption and bank-grade security, and that it is ISO 27001 certified and GDPR compliant. You are welcome to request the certificate and its scope during a consultation.', links: [link('About Arka', '/about')] }) },
  { keys: ['human', 'person', 'agent', 'someone', 'speak to'],
    reply: () => ({ text: `Of course. Call ${SITE.phoneAU} or ${SITE.phoneIN}, or email ${SITE.email}, and a member of the team will help.`, links: [link('Contact us', '/contact')] }) },
  { keys: ['thank', 'thanks', 'cheers'], reply: () => ({ text: 'You are welcome. Is there anything else I can help with?', chips: GREETING.chips }) },
]

function svc(id) {
  const s = SERVICES.find((x) => x.id === id)
  return { text: `${s.title}: ${s.lead} ${s.text}`, links: [link(`Read about ${s.title.toLowerCase()}`, `/services#${id}`), link('Talk to us', '/contact')], chips: ['What services do you offer?', 'How do I book a consultation?'] }
}

export function localReply(input) {
  const q = ` ${input.toLowerCase()} `
  const hit = INTENTS.find((it) => it.keys.some((k) => q.includes(k)))
  if (hit) return hit.reply()
  return {
    text: `I do not have a reliable answer to that. A member of the team will be glad to help: telephone ${SITE.phoneAU}, email ${SITE.email}, or send us a message.`,
    links: [link('Contact us', '/contact')],
    chips: ['What services do you offer?', 'Where are your offices?'],
  }
}

export async function getReply(history) {
  const endpoint = import.meta.env.VITE_CHAT_ENDPOINT
  const last = history[history.length - 1]?.text || ''
  if (endpoint) {
    try {
      const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history.map(({ role, text }) => ({ role, text })) }) })
      if (r.ok) { const j = await r.json(); if (j.reply) return { text: j.reply } }
    } catch { /* fall through to built-in answers */ }
  }
  await new Promise((res) => setTimeout(res, 650))
  return localReply(last)
}
