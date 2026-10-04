import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { portfolioData } from '../../../data/portfolioData'
import { APPLE_EASE } from '../../../lib/utils'
import { FilmScene } from './FilmScene'
import { Starfield } from './Starfield'

const PROJECTS = portfolioData.projects
const SLIDE_MS = 2300

/**
 * Scene 3 — The work. Slides sweep in one by one like film frames, each with
 * a slow Ken Burns drift on the cover and a linear per-slide progress track,
 * so the scene always knows where it is in the reel.
 */
export function WorkScene({ paused }: { paused: boolean }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (paused) return
    const iv = window.setInterval(() => setIdx((i) => (i + 1) % PROJECTS.length), SLIDE_MS)
    return () => clearInterval(iv)
  }, [paused])

  const project = PROJECTS[idx]

  return (
    <FilmScene>
      <Starfield />
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6">
        <div className="mb-5 flex w-full items-end justify-between">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.6em] text-blue-200/50">Selected Work</p>
          <span className="font-mono text-xs tracking-[0.35em] text-white/50">
            0{idx + 1} / 0{PROJECTS.length}
          </span>
        </div>

        <div
          className="relative h-[min(56vh,420px)] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a1226] shadow-[0_24px_80px_-24px_rgba(2,4,9,0.9)]"
          style={{ perspective: 1100 }}
        >
          {/* Projector shutter flicker at every slide cut */}
          <motion.div
            key={idx}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-30"
            style={{ background: 'linear-gradient(180deg, rgba(219,234,254,0.75), rgba(147,197,253,0.55))' }}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
          />

          <AnimatePresence mode="wait">
            <motion.figure
              key={project.id}
              className="absolute inset-0 m-0"
              initial={{ opacity: 0, x: 70, rotateY: 8, scale: 1.04 }}
              animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, x: -70, rotateY: -8 }}
              transition={{ duration: 0.6, ease: APPLE_EASE }}
            >
              <motion.img
                src={project.image}
                alt={project.title}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.9, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020409]/95 via-[#020409]/30 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <motion.p
                  initial={{ opacity: 0, letterSpacing: '0.6em' }}
                  animate={{ opacity: 1, letterSpacing: '0.3em' }}
                  transition={{ delay: 0.15, duration: 0.5, ease: APPLE_EASE }}
                  className="mb-2 text-[10px] sm:text-xs uppercase"
                  style={{ color: project.color }}
                >
                  {project.category}
                </motion.p>
                <h3 className="font-heading font-black tracking-tight text-white text-2xl sm:text-4xl">
                  {project.title.split(' ').map((word, wi) => (
                    <span key={wi} className="inline-block overflow-hidden align-bottom">
                      <motion.span
                        className="inline-block"
                        initial={{ y: '110%', filter: 'blur(6px)' }}
                        animate={{ y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 0.3 + wi * 0.09, duration: 0.55, ease: APPLE_EASE }}
                      >
                        {word}&nbsp;
                      </motion.span>
                    </span>
                  ))}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((t, ti) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.55 + ti * 0.08, duration: 0.4, ease: APPLE_EASE }}
                      className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[10px] text-white/70"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <span className="absolute top-4 right-5 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] text-white/75">
            {project.year}
          </span>
        </div>

        {/* Per-slide progress hairline */}
        <div className="mt-4 h-px w-full overflow-hidden bg-white/10">
          <motion.div
            key={idx}
            className="h-full bg-gradient-to-r from-blue-300/70 to-white/70"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
          />
        </div>
      </div>
    </FilmScene>
  )
}