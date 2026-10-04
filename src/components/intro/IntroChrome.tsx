import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'

const TOTAL_MS = 35900

/**
 * Film chrome — the layer that makes it feel like a picture: film grain,
 * vignette, letterbox bars, a hairline progress track, the pause control and
 * the quiet skip pill. Owns its own clocks so the scene conductor never
 * re-renders on the 250ms progress tick.
 */
export function IntroChrome({
  skipped,
  hidden,
  paused,
  onTogglePause,
  onSkip,
}: {
  skipped: boolean
  hidden: boolean
  paused: boolean
  onTogglePause: () => void
  onSkip: () => void
}) {
  const [pillVisible, setPillVisible] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const t = window.setTimeout(() => setPillVisible(true), 2500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (paused) return
    const iv = window.setInterval(() => setElapsed((e) => e + 250), 250)
    return () => clearInterval(iv)
  }, [paused])

  const handleSkip = () => {
    onSkip()
    setElapsed((e) => e * 5)
  }

  const progress = Math.min(100, (elapsed / TOTAL_MS) * 100)

  return (
    <>
      <div aria-hidden className="absolute inset-0 z-20 pointer-events-none film-grain" />
      <div
        aria-hidden
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 62%, rgba(2,4,9,0.4) 100%)' }}
      />

      <div className="absolute bottom-[8.5vh] left-1/2 z-40 h-px w-40 -translate-x-1/2 overflow-hidden bg-white/10">
        <div className="h-full bg-white/70" style={{ width: `${progress}%`, transition: 'width 0.3s linear' }} />
      </div>

      {!hidden && (
        <button
          onClick={onTogglePause}
          className="absolute bottom-[8vh] left-6 sm:left-10 z-40 flex cursor-pointer items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white/90"
        >
          {paused ? <Play size={11} /> : <Pause size={11} />}
          {paused ? 'Resume' : 'Pause'}
        </button>
      )}

      {pillVisible && !skipped && !hidden && (
        <motion.button
          onClick={handleSkip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-[8vh] right-6 sm:right-10 z-40 cursor-pointer px-3 py-2 text-[11px] uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white/90"
        >
          Skip Intro →
        </motion.button>
      )}
    </>
  )
}