import { useState } from 'react'
import PageHead from './PageHead'
import { InsightCard } from './Cards'
import { INSIGHTS } from './content'

export default function Insights() {
  const topics = ['All', ...new Set(INSIGHTS.map((i) => i.topic))]
  const [f, setF] = useState('All')
  const list = INSIGHTS.filter((i) => f === 'All' || i.topic === f)
  return (
    <>
      <PageHead crumb="Insights" title="Regulatory briefings" lead="Concise notes on developments that matter to finance leaders in the markets we serve. Each briefing names its source and the date we last checked it." note="General information only. It is not tax, legal or financial advice, and rules change, so confirm current requirements before acting." />
      <div className="wrap pb-20">
        <div className="flex flex-wrap gap-2.5 py-8" role="group" aria-label="Filter by topic">
          {topics.map((t) => (
            <button key={t} onClick={() => setF(t)} aria-pressed={f === t} className={`border px-[18px] py-3 text-[.95rem] font-medium transition ${f === t ? 'border-orange bg-orange text-ink' : 'border-line bg-white hover:border-ink'}`}>{t}</button>
          ))}
        </div>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{list.map((a) => <InsightCard key={a.id} a={a} />)}</div>
      </div>
    </>
  )
}
