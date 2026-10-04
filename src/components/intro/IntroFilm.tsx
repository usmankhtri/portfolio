import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { filmImageUrls, preloadImages, preloadPortfolioAssets, waitForIntroFonts } from '../../lib/preload'
import { OpeningScene } from './scenes/OpeningScene'
import { IdentityScene } from './scenes/IdentityScene'
import { CraftScene } from './scenes/CraftScene'
import { WorkScene } from './scenes/WorkScene'
import { PromiseScene } from './scenes/PromiseScene'
import { HandoffScene } from './scenes/HandoffScene'
import { IntroChrome } from './IntroChrome'

const DURATIONS = [6500, 5000, 7000, 9000, 5000, 3400]
const SKIP_ACCEL = 0.2

/**
 * The Director's Reel — a ~34s first-visit film. Six scenes, fast-forward
 * skip, a pause/resume control (freezes the timeline exactly where it is),
 * a projector sweep between cuts, and a handoff that zooms through the name
 * into the home hero.
 *
 * Preloading: the scene-0 title waits (max 400ms) for Outfit 800/900 so the
 * flip cascade renders in the real typeface; project covers + the portrait
 * warm up at t=0; then the entire portfolio preloads in the background.
 */
export function IntroFilm() {
  const prefersReducedMotion = useReducedMotion()
  const beginHandoff = useAppStore((s) => s.beginHandoff)
  const navigate = useNavigate()

  const [scene, setScene] = useState(0)
  const [skipped, setSkipped] = useState(false)
  const [paused, setPaused] = useState(false)
  const [fontsReady, setFontsReady] = useState(false)
  const [handoffStarted, setHandoffStarted] = useState(false)

  const skippedRef = useRef(false)
  const handoffRef = useRef(false)
  const pausedRef = useRef(false)
  const sceneElapsedRef = useRef(0)
  const lastTickRef = useRef(0)

  useEffect(() => {
    let alive = true
    void preloadImages(['/3potrait.png', ...filmImageUrls()])
    void waitForIntroFonts(400).then(() => {
      if (alive) setFontsReady(true)
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (!fontsReady) return
    preloadPortfolioAssets()
  }, [fontsReady])

  // Accumulate real time spent in the current scene; stops while paused so
  // the scene resumes exactly where it was.
  useEffect(() => {
    if (paused) return
    const iv = window.setInterval(() => {
      const now = performance.now()
      if (lastTickRef.current === 0) lastTickRef.current = now
      sceneElapsedRef.current += now - lastTickRef.current
      lastTickRef.current = now
    }, 100)
    return () => clearInterval(iv)
  }, [paused])

  useEffect(() => {
    if (handoffStarted) return
    if (scene >= DURATIONS.length - 1) return
    if (paused) return
    const full = DURATIONS[scene] * (skipped ? SKIP_ACCEL : 1)
    const remaining = Math.max(0, full - sceneElapsedRef.current)
    const t = window.setTimeout(() => {
      sceneElapsedRef.current = 0
      lastTickRef.current = performance.now()
      setScene((s) => s + 1)
    }, remaining)
    return () => clearTimeout(t)
  }, [scene, skipped, paused, handoffStarted])

  const handleSkip = useCallback(() => {
    if (skippedRef.current || handoffRef.current) return
    skippedRef.current = true
    setSkipped(true)
  }, [])

  const togglePause = useCallback(() => {
    lastTickRef.current = performance.now()
    setPaused((p) => {
      pausedRef.current = !p
      return !p
    })
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (pausedRef.current) {
        lastTickRef.current = performance.now()
        pausedRef.current = false
        setPaused(false)
      } else {
        handleSkip()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleSkip])

  const handleHandoff = useCallback(() => {
    if (handoffRef.current) return
    handoffRef.current = true
    setHandoffStarted(true)
    beginHandoff()
    navigate('/', { replace: true })
  }, [beginHandoff, navigate])

  return (
    <motion.div
      key="intro-film"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0.4 : 1.1, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#020409] select-none font-['Outfit',sans-serif]"
      aria-label="Usman Khatri — portfolio film"
    >
      <AnimatePresence>
        {scene === 0 && <OpeningScene key="s0" fontsReady={fontsReady} />}
        {scene === 1 && <IdentityScene key="s1" paused={paused} />}
        {scene === 2 && <CraftScene key="s2" paused={paused} />}
        {scene === 3 && <WorkScene key="s3" paused={paused} />}
        {scene === 4 && <PromiseScene key="s4" />}
        {scene === 5 && <HandoffScene key="s5" skipped={skipped} onComplete={handleHandoff} />}
      </AnimatePresence>

      {/* Projector sweep between cuts — keyed by scene so it re-fires; gated off
          for the 0→1 push-through, which carries its own bloom */}
      {scene >= 3 && (
        <motion.div
          key={`wipe-${scene}`}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          initial={{ x: '-75%' }}
          animate={{ x: '175%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:
              'linear-gradient(105deg, transparent 0%, rgba(147,197,253,0.09) 42%, rgba(255,255,255,0.14) 50%, rgba(147,197,253,0.09) 58%, transparent 100%)',
          }}
        />
      )}

      <IntroChrome
        skipped={skipped}
        hidden={handoffStarted}
        paused={paused}
        onTogglePause={togglePause}
        onSkip={handleSkip}
      />
    </motion.div>
  )
}