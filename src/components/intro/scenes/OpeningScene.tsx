import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { APPLE_EASE } from '../../../lib/utils'
import { FilmScene } from './FilmScene'
import { Starfield } from './Starfield'

const TITLE = 'USMAN KHATRI'.split('')
const WAVE_ORDER = [4, 5, 3, 6, 2, 7, 1, 8, 0, 9, 10]

const CORNERS = [
  'top-4 left-4 sm:top-6 sm:left-6 origin-top-left border-t-2 border-l-2',
  'top-4 right-4 sm:top-6 sm:right-6 origin-top-right border-t-2 border-r-2',
  'bottom-4 left-4 sm:bottom-6 sm:left-6 origin-bottom-left border-b-2 border-l-2',
  'bottom-4 right-4 sm:bottom-6 sm:right-6 origin-bottom-right border-b-2 border-r-2',
]

/**
 * Scene 0 — "Roll camera". The full-bleed portrait page spins in edge-on
 * like a camera rolling, lands with a flash, locks into a viewfinder frame
 * (corner brackets + one scan line), then the lower-third nameplate cascades
 * in with tracking condense. One continuous 6.5s moment.
 */
export function OpeningScene({ fontsReady }: { fontsReady: boolean }) {
  const prefersReducedMotion = useReducedMotion()
  const frameRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(mouseX, { stiffness: 110, damping: 18 })
  const rotateY = useSpring(mouseY, { stiffness: 110, damping: 18 })

  const handleMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return
    const rect = frameRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientY - rect.top) / rect.height - 0.5) * 4)
    mouseY.set(((e.clientX - rect.left) / rect.width - 0.5) * -5)
  }

  const handleLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const letterFlip = (order: number) => ({
    initial: { rotateY: 92, opacity: 0, filter: 'blur(8px)' },
    animate: {
      rotateY: [92, -5, 0],
      opacity: [0, 1, 1],
      filter: ['blur(8px)', 'blur(0px)', 'blur(0px)'],
    },
    transition: {
      delay: 2.25 + order * 0.045,
      duration: 0.8,
      times: [0, 0.75, 1],
      ease: APPLE_EASE,
    },
  })

  return (
    <FilmScene exitDelay={0.65}>
      <div
        ref={frameRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: 1200 }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <Starfield />

        {/* Base — full-bleed photo that always covers the entire viewport,
            so the intro never shows uncovered dark edges on any display */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/3potrait.png"
            alt=""
            decoding="async"
            className="absolute inset-0 h-full w-full scale-[1.1] object-cover object-center blur-[10px]"
          />
          <div className="absolute inset-0 bg-[#020409]/50" />
        </motion.div>

        {/* Beat 1 — the page fades in, clean and quiet */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <motion.img
            src="/3potrait.png"
            alt=""
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
            animate={{ scale: [1.1, 1.16] }}
            transition={{ duration: 6.5, ease: 'linear' }}
          />
          <div className="absolute inset-0 bg-[#020409]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020409]/90 via-[#020409]/25 to-[#020409]/35" />
        </motion.div>

        {/* Viewfinder corner brackets */}
        {CORNERS.map((c, i) => (
          <motion.div
            key={i}
            aria-hidden
            className={`absolute h-9 w-9 border-white/35 ${c}`}
            initial={prefersReducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
            transition={{ delay: 1.45 + i * 0.06, duration: 0.5, ease: APPLE_EASE }}
          />
        ))}

        {/* One scan line across the frame */}
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden
            className="absolute inset-x-0 top-0 z-10 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(191,219,254,0.45) 30%, rgba(255,255,255,0.75) 50%, rgba(191,219,254,0.45) 70%, transparent)',
            }}
            initial={{ y: '-4vh', opacity: 0 }}
            animate={{ y: '104vh', opacity: [0, 1, 1, 0] }}
            transition={{ delay: 1.9, duration: 1.1, times: [0, 0.08, 0.92, 1], ease: 'easeInOut' }}
          />
        )}

        {/* TAKE 1 — rolling */}
        <motion.div
          className="absolute top-[8vh] left-6 sm:left-10 z-10 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 0 } : { opacity: [0, 1, 1, 0] }}
          transition={{ delay: 0.1, duration: 1.25, times: [0, 0.1, 0.55, 1], ease: 'easeInOut' }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-red-500"
            style={{ animation: 'pulse 1.1s ease-in-out infinite' }}
          />
          <span className="text-[9px] uppercase tracking-[0.45em] text-white/50">Portfolio Introduction</span>
        </motion.div>

        {/* Beat 2 — nameplate, centered so the composition fits any display */}
        <motion.div
          className="relative z-10 flex w-full max-w-[min(92vw,880px)] flex-col items-center px-6 pb-[6vh] text-center"
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.95, duration: 0.7, ease: APPLE_EASE }}
            className="mb-4 text-[10px] sm:text-xs uppercase tracking-[0.6em] text-blue-200/50"
          >
            Portfolio Overview
          </motion.p>

          {fontsReady && (
            <motion.h1
              aria-label="Usman Khatri"
              className="font-heading font-black uppercase leading-[1.02] text-white"
              style={{ fontSize: 'clamp(1.4rem, min(4.8vw, 6.5vh), 3.4rem)', perspective: 900 }}
              initial={{ letterSpacing: '0.32em' }}
              animate={{ letterSpacing: '0.055em' }}
              transition={{ delay: 2.25, duration: 1.2, ease: APPLE_EASE }}
            >
              {TITLE.map((char, i) =>
                char === ' ' ? (
                  <span key={i} className="inline-block w-2.5 sm:w-4" />
                ) : (
                  <motion.span
                    key={i}
                    className={`inline-block ${i > 5 ? 'text-gradient-blue' : ''}`}
                    {...(prefersReducedMotion
                      ? {
                          initial: { opacity: 0 },
                          animate: { opacity: 1 },
                          transition: { delay: 1.9, duration: 0.6 },
                        }
                      : letterFlip(WAVE_ORDER.indexOf(i)))}
                  >
                    {char}
                  </motion.span>
                )
              )}
            </motion.h1>
          )}

          <motion.div
            aria-hidden
            className="h-px mt-[clamp(0.9rem,2vw,1.5rem)] origin-center"
            style={{
              width: 'clamp(90px, min(16vw, 22vh), 220px)',
              background:
                'linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.3), rgba(255,255,255,0.05))',
            }}
            initial={{ scaleX: 0.2, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 3.4, duration: 0.8, ease: APPLE_EASE }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.9, duration: 0.7 }}
            className="mt-3 text-[9px] uppercase tracking-[0.5em] text-white/30"
          >
            Portfolio — MMXXVI
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.15, duration: 0.7 }}
            className="mt-4 text-[9px] uppercase tracking-[0.35em] text-white/40"
          >
            Dir. Usman Khatri · Hyderabad, PK
          </motion.p>
        </motion.div>
      </div>
    </FilmScene>
  )
}