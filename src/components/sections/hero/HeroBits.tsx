import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { useMagnetic } from '../../../hooks/useMagnetic'

const METRICS = ['12+ Projects Shipped', '3+ Yrs Experience', '100% Client Satisfaction']

export const AvailabilityBadge = () => (
  <div
    className="relative inline-flex items-center gap-3 pl-3.5 pr-5 py-2 rounded-full animate-float will-change-transform"
    style={{
      background: 'linear-gradient(135deg, rgba(37,99,235,0.16) 0%, rgba(96,165,250,0.07) 100%)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      boxShadow:
        'inset 0 0 0 1px rgba(96,165,250,0.35), inset 0 0 26px rgba(37,99,235,0.18), 0 10px 28px rgba(0,0,0,0.4), 0 0 22px rgba(37,99,235,0.16)',
    }}
  >
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
      <span
        className="relative inline-flex rounded-full h-2.5 w-2.5 ring-2 ring-blue-300/60"
        style={{
          background: 'linear-gradient(135deg, #93C5FD 0%, #2563EB 100%)',
          boxShadow: '0 0 12px rgba(96,165,250,0.95)',
        }}
      />
    </span>
    <span className="font-['Poppins',sans-serif] font-bold uppercase tracking-[0.16em] text-[10px] sm:text-[11px] text-blue-100 whitespace-nowrap">
      Available for Projects
    </span>
  </div>
)

export const MetricsStrip = () => (
  <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-0 gap-y-2.5">
    {METRICS.map((metric, i) => (
      <div key={metric} className="flex items-center">
        {i > 0 && <span className="mx-4 sm:mx-6 h-4 w-px bg-white/10 hidden sm:block" />}
        <span className="text-[11px] sm:text-xs font-medium text-zinc-400">{metric}</span>
      </div>
    ))}
  </div>
)

export const HeroCTAs = () => {
  const primaryCtaRef = useMagnetic<HTMLAnchorElement>(0.07)
  const secondaryCtaRef = useMagnetic<HTMLAnchorElement>(0.07)
  const githubRef = useMagnetic<HTMLAnchorElement>(0.07)

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      <Link
        to="/works"
        ref={primaryCtaRef}
        className="shine-sweep group min-h-[44px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white font-heading flex items-center justify-center gap-2.5 will-change-transform w-full xs:w-auto"
        style={{
          background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
          boxShadow: '0 0 28px rgba(37,99,235,0.35), 0 4px 14px rgba(37,99,235,0.2)',
        }}
      >
        <span>View Selected Works</span>
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>

      <Link
        to="/contact"
        ref={secondaryCtaRef}
        className="min-h-[44px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm text-zinc-200 font-heading border border-white/12 hover:border-white/25 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center text-center will-change-transform w-full xs:w-auto"
      >
        Let's Connect
      </Link>

      <div className="flex items-center justify-center gap-4 w-full sm:w-auto sm:ml-2 pt-1 sm:pt-0">
        <a
          href="https://github.com/usmankhtri"
          target="_blank"
          rel="noopener noreferrer"
          ref={githubRef}
          aria-label="GitHub profile"
          className="min-h-[40px] flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all text-xs font-medium will-change-transform"
        >
          <FiGithub className="size-4" />
          <span>GitHub</span>
        </a>
        <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
          <MapPin className="size-3.5 text-blue-400" />
          <span>Hyderabad, PK</span>
        </div>
      </div>
    </div>
  )
}