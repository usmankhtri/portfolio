import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, ExternalLink, ChevronDown } from 'lucide-react'
import { TechBadge } from '../../ui/TechBadge'
import { APPLE_EASE } from '../../../lib/utils'
import type { portfolioData } from '../../../data/portfolioData'

type Project = (typeof portfolioData.projects)[number]

interface CinematicShowcaseProps {
  projects: Project[]
}

export function CinematicShowcase({ projects }: CinematicShowcaseProps) {
  const featured = projects.filter((p) => p.featured)
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()

  const scrollToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, featured.length - 1))
    setActiveIndex(clamped)
  }, [featured.length])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let accumulated = 0
    const THRESHOLD = 60

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      accumulated += e.deltaY

      if (scrollTimeout.current) return

      if (Math.abs(accumulated) >= THRESHOLD) {
        if (accumulated > 0) {
          scrollToIndex(activeIndex + 1)
        } else {
          scrollToIndex(activeIndex - 1)
        }
        accumulated = 0
        scrollTimeout.current = setTimeout(() => {
          scrollTimeout.current = null
        }, 600)
      }

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
        scrollTimeout.current = setTimeout(() => {
          scrollTimeout.current = null
          accumulated = 0
        }, 200)
      }
    }

    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(diff) > 50) {
        scrollToIndex(diff > 0 ? activeIndex + 1 : activeIndex - 1)
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [activeIndex, scrollToIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        scrollToIndex(activeIndex + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        scrollToIndex(activeIndex - 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, scrollToIndex])

  const prevIndex = activeIndex > 0 ? activeIndex - 1 : null
  const nextIndex = activeIndex < featured.length - 1 ? activeIndex + 1 : null

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background — active project image */}
      <AnimatePresence mode="sync">
        <motion.div
          key={featured[activeIndex].id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: APPLE_EASE }}
        >
          <img
            src={featured[activeIndex].image}
            alt={featured[activeIndex].title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(6,12,26,0.92) 0%, rgba(6,12,26,0.55) 40%, rgba(6,12,26,0.15) 70%, rgba(6,12,26,0.35) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,12,26,0.95) 0%, rgba(6,12,26,0.3) 30%, transparent 50%)' }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 70%, ${featured[activeIndex].color}15, transparent 60%)` }} />
        </motion.div>
      </AnimatePresence>

      {/* Main content — active project */}
      <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-20 sm:pb-24">
        {/* Ghost number */}
        <div
          className="absolute bottom-16 right-12 sm:right-20 font-display leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(44px, 10vw, 200px)', color: featured[activeIndex].color, opacity: 0.12 }}
          aria-hidden
        >
          {String(activeIndex + 1).padStart(2, '0')}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={featured[activeIndex].id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: APPLE_EASE }}
          >
            {/* Mobile/Tablet integrated index counter */}
            <div className="flex lg:hidden items-center gap-2 mb-3">
              <span className="font-heading font-black text-sm text-white">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-zinc-600 text-xs">/</span>
              <span className="font-heading text-xs text-zinc-500">
                {String(featured.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-1.5 ml-3">
                {featured.map((p, pi) => (
                  <button
                    key={p.id}
                    onClick={() => scrollToIndex(pi)}
                    aria-label={`Go to slide ${pi + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      pi === activeIndex ? 'w-5 bg-blue-400' : 'w-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="mb-4">
              <span
                className="text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full font-heading inline-block"
                style={{ background: `${featured[activeIndex].color}15`, color: featured[activeIndex].color, border: `1px solid ${featured[activeIndex].color}30` }}
              >
                {featured[activeIndex].category}
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-heading font-black tracking-tight text-white mb-3"
              style={{ fontSize: 'clamp(1.5rem, 3.8vw, 4rem)' }}
            >
              {featured[activeIndex].title}
            </h2>

            {/* Description */}
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
              {featured[activeIndex].description}
            </p>

            {/* Results */}
            {featured[activeIndex].results && featured[activeIndex].results.length > 0 && (
              <div className="flex flex-wrap gap-6 sm:gap-8 mb-6">
                {featured[activeIndex].results.map((r) => (
                  <div key={r.label}>
                    <span className="block font-heading text-2xl sm:text-3xl font-bold" style={{ color: featured[activeIndex].color }}>{r.value}</span>
                    <span className="text-[11px] text-zinc-500 uppercase tracking-wide">{r.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech + actions */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {featured[activeIndex].tech.slice(0, 5).map((t, ti) => (
                  <TechBadge key={t} label={t} index={ti} />
                ))}
                {featured[activeIndex].tech.length > 5 && (
                  <span className="inline-flex items-center px-2 py-0.5 text-[10px] text-zinc-500">+{featured[activeIndex].tech.length - 5}</span>
                )}
              </div>

              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={() => navigate(`/works/${featured[activeIndex].id}`)}
                  className="shine-sweep flex items-center gap-2 px-6 py-2.5 rounded-lg font-heading font-bold text-xs text-white transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${featured[activeIndex].color} 0%, ${featured[activeIndex].color}CC 100%)`, boxShadow: `0 0 20px ${featured[activeIndex].color}30` }}
                >
                  View Case Study
                  <ArrowUpRight className="size-3.5" />
                </button>

                {featured[activeIndex].github && (
                  <a href={featured[activeIndex].github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label={`${featured[activeIndex].title} GitHub`} className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300">
                    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                )}
                {featured[activeIndex].live && (
                  <a href={featured[activeIndex].live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label={`${featured[activeIndex].title} live`} className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300">
                    <ExternalLink className="size-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Role + timeline */}
            <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/5">
              <span className="text-[11px] text-zinc-500">{featured[activeIndex].role}</span>
              <span className="text-zinc-700">·</span>
              <span className="text-[11px] text-zinc-500">{featured[activeIndex].timeline}</span>
              <span className="text-zinc-700">·</span>
              <span className="text-[11px] text-zinc-500">{featured[activeIndex].year}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ============================================================= */}
      {/* SIDE NAVIGATION — centered dots + number strip                 */}
      {/* ============================================================= */}
      <div className="hidden lg:flex fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-0">
        {/* Prev number */}
        {prevIndex !== null && (
          <span className="text-[10px] font-heading text-zinc-600 mb-1 transition-opacity duration-300">
            {String(prevIndex + 1).padStart(2, '0')}
          </span>
        )}
        {prevIndex === null && <span className="mb-1" />}

        {/* Dots cluster: prev → active → next */}
        <div className="flex flex-col items-center gap-2.5">
          {/* Prev dot */}
          {prevIndex !== null && (
            <button onClick={() => scrollToIndex(prevIndex)} aria-label={`Go to ${featured[prevIndex].title}`} className="block w-1.5 h-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300" />
          )}
          {prevIndex === null && <span className="block w-1.5 h-1.5" />}

          {/* Active dot */}
          <span
            className="block rounded-full transition-all duration-500"
            style={{ width: '10px', height: '10px', background: featured[activeIndex].color, boxShadow: `0 0 14px ${featured[activeIndex].color}70` }}
          />

          {/* Next dot */}
          {nextIndex !== null && (
            <button onClick={() => scrollToIndex(nextIndex)} aria-label={`Go to ${featured[nextIndex].title}`} className="block w-1.5 h-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300" />
          )}
          {nextIndex === null && <span className="block w-1.5 h-1.5" />}
        </div>

        {/* Next number */}
        {nextIndex !== null && (
          <span className="text-[10px] font-heading text-zinc-600 mt-1 transition-opacity duration-300">
            {String(nextIndex + 1).padStart(2, '0')}
          </span>
        )}
        {nextIndex === null && <span className="mt-1" />}
      </div>

      {/* ============================================================= */}
      {/* CENTER COUNTER — large display                                 */}
      {/* ============================================================= */}
      <div className="hidden lg:flex fixed left-6 sm:left-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center">
        <span className="font-heading text-2xl sm:text-3xl font-bold text-white leading-none">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <span className="w-px h-6 bg-white/15 my-1.5" />
        <span className="font-heading text-sm text-zinc-600 leading-none">
          {String(featured.length).padStart(2, '0')}
        </span>
      </div>

      {/* Scroll hint */}
      {activeIndex === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-heading text-zinc-500 uppercase tracking-widest">Scroll to explore</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown className="size-4 text-zinc-500" />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
