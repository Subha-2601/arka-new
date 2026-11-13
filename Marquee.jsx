// A slowly sliding ticker. Pauses on hover. Content is duplicated for a seamless loop.
export default function Marquee({ items }) {
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-12 whitespace-nowrap font-serif text-[clamp(1.6rem,3vw,2.6rem)]">
          {t}<span className="h-2.5 w-2.5 bg-orange" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="overflow-hidden border-y border-line bg-white py-7" role="region" aria-label="Industries we serve">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">{row(false)}{row(true)}</div>
    </div>
  )
}
