// All site content lives here. Edit this file to change text, links, photos and contact details.

export const SITE = {
  name: 'Arka Fintech',
  email: 'info@arkafintech.com.au',
  phoneAU: '+61 466 799 077',
  phoneIN: '+91 94277 17769',
  linkedin: 'https://www.linkedin.com/company/arka-fintech/',
}

/*
  PHOTOS: swap these URLs for your own licensed photography (a /public/photos/ folder works too,
  e.g. '/photos/team.jpg'). If an image fails to load, the site shows a branded illustration instead.
  `alt` is read by screen readers. `art` picks the fallback illustration (1 to 4).
*/
const u = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`
export const PHOTOS = {
  hero1: { src: u('photo-1497366216548-37526070297c'), alt: 'A modern office with people at work', art: 1 },
  hero2: { src: u('photo-1551288049-bebda4e38f71'), alt: 'Financial dashboards on a laptop screen', art: 4 },
  hero3: { src: u('photo-1522071820081-009f0129c71c'), alt: 'A finance team reviewing figures together', art: 2 },
  hero4: { src: u('photo-1486406146926-c627a92ad1ab'), alt: 'City office towers at dusk', art: 3 },
  a1: { src: u('photo-1460925895917-afdab827c52f', 900), alt: 'Analytics on a laptop', art: 1 },
  a2: { src: u('photo-1454165804606-c3d57bc86b40', 900), alt: 'A desk with reports and a calculator', art: 2 },
  a3: { src: u('photo-1556761175-5973dc0f32e7', 900), alt: 'A client meeting', art: 3 },
  a4: { src: u('photo-1507679799987-c73779587ccf', 900), alt: 'A finance leader in a boardroom', art: 4 },
}

export const SLIDES = [
  { photo: 'hero1', title: 'Finance that stands up to scrutiny.', text: 'Arka Fintech pairs AI-driven analytics with certified finance professionals, so the figures behind your decisions are accurate, compliant and ready when the board, the lender or the auditor asks.', cta: { label: 'Arrange a consultation', to: '/contact' }, tab: 'Our approach' },
  { photo: 'hero2', title: 'Foresight, not hindsight.', text: 'Live dashboards and predictive models, built on your own financial data and reviewed by qualified accountants before they reach the boardroom.', cta: { label: 'Explore analytics', to: '/services#analytics' }, tab: 'Analytics' },
  { photo: 'hero3', title: 'Routine work automated. Judgement retained.', text: 'Approvals, reconciliations and reporting run on defined rules. Your people step in for the exceptions, which is where experience counts.', cta: { label: 'See how automation works', to: '/services#automation' }, tab: 'Automation' },
  { photo: 'hero4', title: 'One accountable team across four countries.', text: 'Offices in Sydney, Melbourne, Canberra and Ahmedabad, serving clients in Australia, India, Singapore and the United Arab Emirates.', cta: { label: 'Find an office', to: '/about#offices' }, tab: 'Where we work' },
]

export const SERVICES = [
  { id: 'analytics', title: 'AI-powered financial analytics', lead: 'Plan around the future, not the last quarter.',
    text: 'Live dashboards and predictive models draw on your own financial data to project cash flow, margin and performance. Qualified accountants test the outputs against your records before they reach decision-makers, so the figures can be defended in the boardroom as well as read on a screen.',
    points: ['Real-time dashboards', 'Predictive analytics', 'Decision-ready reporting'], stat: '95%', statLabel: 'prediction accuracy, as reported by Arka' },
  { id: 'transformation', title: 'End-to-end finance transformation', lead: 'One programme, from system selection to steady state.',
    text: 'System implementation, process automation and outsourcing are planned and delivered together rather than as disconnected projects. The outcome is a single roadmap, one accountable team and a clear view of what changes, when and why.',
    points: ['System implementation', 'Process automation', 'Outsourcing where it adds value'], stat: '98%', statLabel: 'digital transformation project satisfaction, as reported by Arka' },
  { id: 'outsourcing', title: 'Finance outsourcing', lead: 'Delegate the bookkeeping. Retain the oversight.',
    text: 'Expert-led accounting management keeps your books accurate and your own people focused on analysis and strategy rather than data entry. Every close passes through qualified review before it reaches you.',
    points: ['Bookkeeping and reconciliations', 'Expert review of every close', 'Clear, regular reporting'], stat: '99.7%', statLabel: 'accuracy rate, as reported by Arka' },
  { id: 'compliance', title: 'Compliance advisory', lead: 'Meet the standard that applies, and be able to show it.',
    text: 'We help you align with global standards and with the local rules of each jurisdiction in which you operate, supported by certified professionals and records that are ready for inspection.',
    points: ['Global compliance standards', 'Certified finance professionals', 'Audit-ready records'], stat: '99.9%', statLabel: 'compliance accuracy, as reported by Arka' },
  { id: 'automation', title: 'Process automation', lead: 'Automate the routine. Reserve people for the exceptions.',
    text: 'Approvals, reconciliations and reporting run on defined rules, with exceptions routed to a reviewer. Teams close faster, make fewer manual errors and spend their time where judgement is required.',
    points: ['Approvals and reconciliations', 'Automated reporting', 'Exceptions flagged for review'], stat: '42%', statLabel: 'operational efficiency gains, as reported by Arka' },
  { id: 'consulting', title: 'Strategic consulting', lead: 'Counsel from experienced finance leaders.',
    text: 'Practical advice on growth, cost and corporate structure, grounded in your own numbers and the realities of your industry rather than a generic framework.',
    points: ['Growth and cost strategy', 'Structure and planning', 'Industry-specific advice'], stat: '30%', statLabel: 'growth acceleration, as reported by Arka' },
  { id: 'managed', title: 'Managed services', lead: 'A finance function that is always accountable.',
    text: 'We operate your finance function day to day, with support available around the clock and a single team answerable for the outcome.',
    points: ['Day-to-day finance operations', 'Round-the-clock support', 'One accountable team'], stat: '24/7', statLabel: 'support availability' },
]

export const INDUSTRIES = [
  { id: 'technology', title: 'Technology', text: 'Recurring revenue, multi-entity consolidation and cost bases that shift from quarter to quarter.', live: true },
  { id: 'healthcare', title: 'Healthcare', text: 'Compliance-intensive operations and consistent reporting across multiple sites.', live: true },
  { id: 'aged-care', title: 'Aged care', text: 'Clear visibility of funding, compliance obligations and the true cost of each service.', live: true },
  { id: 'retail', title: 'Retail', text: 'Margin, inventory and cash flow understood by location and by channel.', live: true },
  { id: 'professional-services', title: 'Professional services', text: 'Billing, utilisation and profitability measured by client and by engagement.', live: true },
  { id: 'education', title: 'Education', text: 'Funding cycles, grants and reporting obligations to several stakeholders.', live: false },
  { id: 'renewable-energy', title: 'Renewable energy', text: 'Project finance, capital planning and forecasting over long horizons.', live: false },
  { id: 'e-commerce', title: 'E-commerce', text: 'Marketplace reconciliation, returns and cash flow at volume.', live: false },
]

// Regulatory briefings. Each carries its source and the date it was last checked (5 November 2026).
// General information only. Rules change, so confirm current requirements before acting.
export const CHECKED = '5 November 2026'
export const INSIGHTS = [
  { id: 1, topic: 'Australia', title: 'Mandatory climate reporting moves into its second phase', dek: 'Sustainability reporting applies in stages: to financial years beginning on or after 1 January 2025 (Group 1), 1 July 2026 (Group 2) and 1 July 2027 (Group 3). Finance teams need audit-ready data well before their first reporting year.', read: 'Source: BDO Australia', photo: 'a2', url: 'https://www.bdo.com.au/en-au/insights/esg-sustainability/aasb-approves-final-sustainability-reporting-standards' },
  { id: 2, topic: 'Data protection', title: 'GDPR penalties: two tiers, and the greater amount applies', dek: 'The lower tier reaches €10 million or 2% of worldwide annual turnover. The higher tier reaches €20 million or 4%. In each case the higher of the two figures is the cap.', read: 'Source: McCann FitzGerald', photo: 'a1', url: 'https://www.mccannfitzgerald.com/knowledge/gdpr/administrative-fines-under-article-83-gdpr' },
  { id: 3, topic: 'United Arab Emirates', title: 'UAE corporate tax: a 0% band to AED 375,000, then 9%', dek: 'The regime applies to financial years starting on or after 1 June 2023. Groups with UAE operations need reliable profit records by legal entity.', read: 'Source: Healy Consultants. Confirm with the Federal Tax Authority.', photo: 'a3', url: 'https://www.healyconsultants.com/uae-company-registration/uae-federal-corporate-tax/' },
  { id: 4, topic: 'India', title: 'E-invoicing in India: the ₹5 crore and ₹10 crore thresholds', dek: 'Businesses with turnover above ₹5 crore must generate invoices through the Invoice Registration Portal. Those above ₹10 crore must report invoices within 30 days of issuance.', read: 'Source: VATupdate. Thresholds have changed before, so confirm the current rules.', photo: 'a4', url: 'https://www.vatupdate.com/2026/02/23/indias-2026-e-invoicing-rules-turnover-limits-30-day-reporting-and-mandatory-2fa-explained' },
  { id: 5, topic: 'Information security', title: 'ISO/IEC 27001:2022: the transition period has closed', dek: 'The three-year transition from the 2013 edition ended on 31 October 2025. When relying on a provider’s ISO 27001 certificate, ask which edition it reflects and what it covers.', read: 'Source: LRQA', photo: 'a2', url: 'https://www.lrqa.com/en/insights/articles/preparing-for-iso-270012022-transition-by-october-2025/' },
]

// Illustrative scenarios, not client results. Replace with real, approved case studies.
export const CASES = [
  { tag: 'Aged care', title: 'Seeing the true cost of each service', text: 'Funding, rostering and compliance data brought into a single monthly view, so leaders can see where each service earns and where it does not.', photo: 'a3' },
  { tag: 'Technology', title: 'Closing the books in fewer days', text: 'Reconciliations automated and exceptions routed to a reviewer, shortening the close without loosening the controls.', photo: 'a1' },
  { tag: 'Retail', title: 'One version of the margin', text: 'Inventory, sales and cash flow reported on a common footing across every location and channel.', photo: 'a2' },
  { tag: 'Healthcare', title: 'Consistent reporting across sites', text: 'A single set of rules applied to every clinic, with compliance reporting that reconciles to the ledger.', photo: 'a4' },
]

export const STEPS = [
  ['Discover', 'A short consultation to understand your processes, systems and objectives.'],
  ['Design', 'We determine the right combination of analytics, outsourcing and automation for your organisation.'],
  ['Implement', 'Systems, processes and reporting are configured and tested alongside your team.'],
  ['Optimise', 'Managed support, with insight that continues to improve results.'],
]

export const OFFICES = [
  { name: 'Sydney, head office', address: '607/19-21 Good St, Parramatta NSW 2150, Australia', phone: '+61 466 799 077', query: '607/19-21 Good St Parramatta NSW 2150' },
  { name: 'Melbourne', address: '29 Seymore Street, Preston VIC 3072, Australia', phone: '+61 466 799 077', query: '29 Seymore Street Preston VIC 3072' },
  { name: 'Canberra', address: '125A Anthony Rolfe Avenue, Gungahlin ACT 2912, Australia', phone: '+61 466 799 077', query: '125A Anthony Rolfe Avenue Gungahlin ACT 2912' },
  { name: 'India', address: 'Office #1310, Westside Shilip Zaveri, Ahmedabad 380051, Gujarat', phone: '+91 94277 17769', query: 'Shilip Zaveri Westside Ahmedabad 380051' },
]

export const FIGURES = [
  { value: 15, suffix: '+', label: 'years of financial expertise' },
  { value: 12, suffix: '+', label: 'industries supported' },
  { value: 99.7, dec: 1, suffix: '%', label: 'accuracy rate, as reported by Arka' },
  { text: '24/7', label: 'support, every day of the year' },
]

export const LEADERS = [1, 2, 3, 4].map((n) => ({ name: 'Name Surname', role: 'Role title', n }))

// Used by the site search (Ctrl/Cmd + K).
export const SEARCH_INDEX = [
  { title: 'Home', to: '/', kind: 'Page' },
  { title: 'What we do', to: '/services', kind: 'Page' },
  { title: 'Industries', to: '/industries', kind: 'Page' },
  { title: 'Insights', to: '/insights', kind: 'Page' },
  { title: 'About Arka', to: '/about', kind: 'Page' },
  { title: 'Contact us', to: '/contact', kind: 'Page' },
  ...SERVICES.map((s) => ({ title: s.title, to: `/services#${s.id}`, kind: 'Service', hint: s.lead })),
  ...INDUSTRIES.map((i) => ({ title: i.title, to: `/industries#${i.id}`, kind: 'Industry', hint: i.text })),
  ...INSIGHTS.map((i) => ({ title: i.title, to: '/insights', kind: 'Briefing', hint: i.topic })),
]
