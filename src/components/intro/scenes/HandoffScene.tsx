import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { APPLE_EASE } from '../../../lib/utils'
import { FilmScene } from './FilmScene'
import { Starfield } from './Starfield'

const TITLE = 'USMAN KHATRI'.split('')

/**
 * Scene 5 — Handoff. The name reassembles from the corners with an overshoot
 * settle, then the frame zooms THROUGH it into a white bloom. The parent
 * fades that bloom out over the freshly-mounted home hero, so we land inside
 * the site.
 */
export function HandoffScene({
  skipped,
  onComplete,
}: {
  skipped: boolean
  onComplete: () => void
}) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const t = window.setTimeout(onComplete, prefersReducedMotion ? 900 : skipped ? 1100 : 3300)
    return () => clearTimeout(t)
  }, [skipped, onComplete, prefersReducedMotion])

  const letterSettle = (i: number) => ({
    initial: { opacity: 0, x: (i % 3) * 90 - 90, y: ((i + 1) % 3) * 70 - 70, scale: 1.5 },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: [1.5, 0.94, 1],
    },
    transition: { delay: i * 0.05, duration: 0.7, times: [0, 0.78, 1], ease: APPLE_EASE },
  })

  return (
    <FilmScene>
      {/* Starfield fades out as the zoom begins — keeps the composite light */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: skipped ? 0.35 : 1.15, duration: 0.6 }}
      >
        <Starfield />
      </motion.div>

      <motion.div
        className="relative z-10 origin-center"
        style={{ willChange: 'transform' }}
        initial={{ scale: 1 }}
        animate={prefersReducedMotion ? { opacity: 0.95 } : { scale: 26 }}
        transition={{ delay: skipped ? 0.45 : 1.3, duration: skipped ? 0.5 : 2.0, ease: 'easeIn' }}
      >
        <h1
          className="font-heading font-black uppercase leading-[0.95] tracking-[0.045em] text-white whitespace-nowrap"
          style={{ fontSize: 'clamp(2.4rem, 8vw, 6.5rem)' }}
        >
          {TITLE.map((char, i) =>
            char === ' ' ? (
              <span key={i} className="inline-block w-3 sm:w-5" />
            ) : (
              <motion.span key={i} className={`inline-block ${i > 5 ? 'text-gradient-blue' : ''}`} {...letterSettle(i)}>
                {char}
              </motion.span>
            )
          )}
        </h1>
      </motion.div>

      {/* The flood — instead of a white flash, the portfolio's own background
          colour surges from the centre and scales out to cover the whole
          page as the letters fly past, then the film hands off into the home
          hero over that same surface. */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-20"
        style={{
          willChange: 'transform',
          background:
            'radial-gradient(circle at center, #020409 0%, #020409 55%, rgba(2,4,9,0.9) 80%, rgba(2,4,9,0) 141%)',
        }}
        initial={{ opacity: 0, scale: 0.55 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1.5 }}
        transition={
          prefersReducedMotion
            ? { delay: 0.4, duration: 0.6, ease: 'easeIn' }
            : { delay: skipped ? 0.45 : 1.35, duration: 1.3, ease: 'easeIn' }
        }
      />
    </FilmScene>
  )
}