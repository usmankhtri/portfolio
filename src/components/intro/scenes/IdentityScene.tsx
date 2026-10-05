import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { portfolioData } from '../../../data/portfolioData'
import { APPLE_EASE } from '../../../lib/utils'
import { FilmScene } from './FilmScene'
import { Starfield } from './Starfield'

const ROLES = portfolioData.hero.roles
const WORDS = ['Architecting', 'Digital', 'Ecosystems.']
const STATS = portfolioData.about.stats

/**
 * Scene 1 — Identity. The transition is the beat: a blue surface rises and
 * covers scene 0, then the starfield rises over the blue, then the content
 * plays on the fresh set: "WHO I AM" → the tagline rising word by word → the
 * roles rotating with a film counter → proof (stats) → location.
 */
export function IdentityScene({ paused }: { paused: boolean }) {
  const [roleIdx, setRoleIdx] = useState(0)

  useEffect(() => {
    if (paused) return
    const iv = window.setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 3000)
    return () => clearInterval(iv)
  }, [paused])

  return (
    <FilmScene>
      {/* Beat 1 — the dark fade. A full-screen fade to the portfolio's own
          background (deep near-black with a faint vignette), so the film and
          the site feel like one continuous surface. */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-30"
        style={{
          background:
            'radial-gradient(ellipse at center, #020409 0%, #020409 60%, rgba(7,12,26,0.98) 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, times: [0, 0.33, 0.6, 1], ease: 'easeInOut' }}
      />

      {/* Beat 2 — the set: starfield, revealed as the fade lifts */}
      <Starfield />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, rgba(2,4,9,0.1) 0%, rgba(2,4,9,0.55) 100%)' }}
      />

      {/* Ambient glow breathing behind the title */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.6, 0.9] }}
        transition={{ delay: 1.1, duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="h-[55vh] w-[55vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)' }}
        />
      </motion.div>

      <div className="relative z-50 flex w-full max-w-[min(92vw,880px)] flex-col items-center px-6 pb-[6vh] text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7, ease: APPLE_EASE }}
          className="mb-5 text-[10px] sm:text-xs uppercase tracking-[0.6em] text-blue-200/50"
        >
          Who I Am
        </motion.p>

        <h2
          className="font-heading font-black leading-[1.05] tracking-tight text-white"
          style={{
            fontSize: 'clamp(1.5rem, min(5.2vw, 6.5vh), 4.2rem)',
            textShadow: '0 0 22px rgba(96,165,250,0.18)',
          }}
        >
          {WORDS.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className={`inline-block ${i === 1 ? 'text-gradient-blue' : ''}`}
                initial={{ y: '105%', filter: 'blur(10px)' }}
                animate={{ y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 1.15 + i * 0.1, duration: 0.7, ease: APPLE_EASE }}
              >
                {word}&nbsp;
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.div
          className="mt-6 flex h-9 items-center gap-3"
          style={{ perspective: 500 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.5, ease: APPLE_EASE }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIdx}
              initial={{ y: 26, opacity: 0, filter: 'blur(8px)', rotateX: -35, letterSpacing: '0.4em' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)', rotateX: 0, letterSpacing: '0.22em' }}
              exit={{ y: -26, opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="text-xs sm:text-sm font-semibold uppercase text-white"
            >
              {ROLES[roleIdx]}
            </motion.span>
          </AnimatePresence>
          <span className="rounded border border-white/15 bg-white/[0.04] px-2 py-1 font-mono text-[8px] tracking-[0.25em] text-blue-200/60">
            Role 0{roleIdx + 1} / 0{ROLES.length}
          </span>
        </motion.div>

        <motion.div
          aria-hidden
          className="mt-5 h-px w-10 origin-center bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.9, duration: 0.6, ease: APPLE_EASE }}
        />

        <div className="mt-6 flex items-center gap-8 sm:gap-12">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.15 + i * 0.1, duration: 0.5, ease: APPLE_EASE }}
              className="flex flex-col items-center"
            >
              <span className="font-heading text-gradient-blue font-black text-xl sm:text-2xl">{s.value}</span>
              <span className="mt-1 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-white/40">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.7, ease: APPLE_EASE }}
          className="mt-6 text-xs sm:text-sm tracking-wide text-white/45"
        >
          {portfolioData.about.location} · {portfolioData.about.email}
        </motion.p>
      </div>
    </FilmScene>
  )
}