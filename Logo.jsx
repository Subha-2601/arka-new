import logoImg from './logo.png'
import { useState } from 'react'

// Shows /logo.png if you have added one (public/logo.png in the source, or logo.png beside index.html
// in the built website). If the file is missing, the orange "A" mark is shown instead.
export default function Logo({ className = 'h-10' }) {
  const [missing, setMissing] = useState(false)
  if (missing) {
    return (
      <>
        <span className="grid h-10 w-10 place-items-center bg-orange font-serif text-2xl font-semibold text-ink">A</span>
        <span className="flex flex-col font-serif text-xl font-semibold leading-none">Arka<small className="mt-[3px] font-sans text-[.78rem] font-medium text-orange-ink">Fintech</small></span>
      </>
    )
  }
  return <img src={logoImg} alt="Arka Fintech" className={`${className} w-auto max-w-[220px] object-contain`} onError={() => setMissing(true)} />
}
