import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { preloadPortfolioAssets } from '../lib/preload'

const APPLE_EASE = [0.16, 1, 0.3, 1] as const

const BUILD_MS = 2300 // title entrance + settle
const EXIT_MS = 700 // single push + fade to black
const TOTAL_MS = BUILD_MS + EXIT_MS // 3.0s

/**
 * Minimal luxury intro — one typographic moment on black:
 * USMAN in white, KHATRI in a quiet blue gradient, a hairline drawing beneath,
 * then a single slow push while the screen falls to black. No effects.
 */
export function LoadingScreen() {
  const isLoading = useAppStore((s) => s.isLoading)
  const finishLoading = useAppStore((s) => s.finishLoading)
  const prefersReducedMotion = useReducedMotion()

  const [isExiting, setIsExiting] = useState(false)
  const finishedRef = useRef(false)

  const finish = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    finishLoading()
  }, [finishLoading])

  // ESC to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finish()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [finish])

  // Returning visitors get 3s here — warm the whole portfolio meanwhile
  useEffect(() => {
    preloadPortfolioAssets()
  }, [])

  // Timeline: entrance settle → push & fade → finish
  useEffect(() => {
    if (!isLoading || finishedRef.current) return
    if (prefersReducedMotion) {
      const t = window.setTimeout(finish, 600)
      return () => clearTimeout(t)
    }

    const exitT = window.setTimeout(() => setIsExiting(true), BUILD_MS)
    const finishT = window.setTimeout(finish, TOTAL_MS)
    return () => {
      clearTimeout(exitT)
      clearTimeout(finishT)
    }
  }, [isLoading, prefersReducedMotion, finish])

  if (!isLoading) return null

  const entrance = (delay: number) => ({
    initial: { opacity: 0, y: 22, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.9, delay, ease: APPLE_EASE },
  })

  return (
    <motion.div
      key="luxury-intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0.2 : 0.5, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] bg-[#030712] flex items-center justify-center overflow-hidden select-none font-['Outfit',sans-serif]"
    >
      {/* The whole title moves as one unit during the exit */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        animate={
          isExiting
            ? { opacity: 0, scale: 1.05, y: -14 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ duration: 0.7, ease: APPLE_EASE }}
      >
        {/* USMAN */}
        <motion.div
          aria-hidden="true"
          {...(prefersReducedMotion ? { initial: { opacity: 1 }, animate: { opacity: 1 } } : entrance(0.15))}
          className="font-black uppercase leading-none text-white select-none"
          style={{ fontSize: 'clamp(2.75rem, 9.5vw, 7.75rem)', letterSpacing: '0.045em' }}
        >
          Usman
        </motion.div>

        {/* KHATRI */}
        <motion.div
          aria-hidden="true"
          {...(prefersReducedMotion ? { initial: { opacity: 1 }, animate: { opacity: 1 } } : entrance(0.42))}
          className="font-black uppercase leading-none text-gradient-blue mt-[0.14em] select-none"
          style={{ fontSize: 'clamp(2.75rem, 9.5vw, 7.75rem)', letterSpacing: '0.045em' }}
        >
          Khatri
        </motion.div>

        {/* Hairline */}
        <motion.div
          aria-hidden
          className="h-px mt-[clamp(1.25rem,3vw,2.25rem)] origin-center"
          style={{
            width: 'clamp(140px, 24vw, 360px)',
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.32), rgba(255,255,255,0.05))',
          }}
          initial={prefersReducedMotion ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.2 }}
          animate={prefersReducedMotion ? { opacity: 1, scaleX: 1 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.85, ease: APPLE_EASE }}
        />
      </motion.div>

      {/* Fade to black */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-20 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isExiting ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}