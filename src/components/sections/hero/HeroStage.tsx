import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion'
import { APPLE_EASE } from '../../../lib/utils'
import { AvailabilityBadge, MetricsStrip, HeroCTAs } from './HeroBits'
import { StageRotator } from './StageRotator'
import { useAppStore } from '../../../store/useAppStore'

const FIRST = 'USMAN'.split('')
const LAST = 'KHATRI'.split('')

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 34, rotateX: 18 },
  animate: { opacity: 1, y: 0, rotateX: 18 },
  transition: { duration: 0.9, ease: APPLE_EASE, delay },
})

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: APPLE_EASE, delay },
})

export const HeroStage = () => {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Zoom-through arrival when the intro film hands off into the hero.
  // `fromIntro` is captured once at mount: acknowledging the flag re-renders
  // with it false, which would otherwise freeze the arrival animation mid-air
  // (framer stops when `animate` becomes undefined) and leave the hero black.
  const fromIntro = useAppStore((s) => s.fromIntro)
  const acknowledgeIntro = useAppStore((s) => s.acknowledgeIntro)
  const [arrive] = useState(() => fromIntro)
  useEffect(() => {
    if (fromIntro) acknowledgeIntro()
  }, [fromIntro, acknowledgeIntro])

  // Cursor spotlight — follows the cursor, fades out when it leaves the hero
  const spotX = useMotionValue(50)
  const spotY = useMotionValue(50)
  const springX = useSpring(spotX, { stiffness: 110, damping: 22, mass: 0.8 })
  const springY = useSpring(spotY, { stiffness: 110, damping: 22, mass: 0.8 })
  const spotlight = useMotionTemplate`radial-gradient(circle 420px at ${springX}% ${springY}%, rgba(219,234,254,0.22) 0%, rgba(147,197,253,0.1) 45%, transparent 70%)`
  const spotOpacity = useSpring(useMotionValue(0), { stiffness: 140, damping: 26 })

  const handleMouseEnter = () => {
    spotOpacity.set(1)
  }

  const handleMouseLeave = () => {
    spotOpacity.set(0)
    spotX.set(50)
    spotY.set(50)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    spotX.set(((e.clientX - rect.left) / rect.width) * 100)
    spotY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  // Scroll: backdrop brightens + Ken Burns scale
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const brightness = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0.45, 0.45] : [0.45, 0.6])
  const backdropScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 1.08])
  const backdropFilter = useMotionTemplate`brightness(${brightness}) blur(2px)`

  return (
    <section
      ref={sectionRef}
      onMouseEnter={prefersReducedMotion ? undefined : handleMouseEnter}
      onMouseLeave={prefersReducedMotion ? undefined : handleMouseLeave}
      onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      style={{ minHeight: '100svh' }}
      aria-label="Hero — Spotlight Stage"
    >
      {/* Dimmed backdrop photo — brightens on scroll (Ken Burns); the inner
          wrapper carries the zoom-through arrival when the film hands off */}
      <motion.div className="absolute inset-0" style={{ scale: backdropScale }}>
        <motion.div
          className="absolute inset-0"
          initial={arrive ? { opacity: 0, scale: 1.14 } : false}
          animate={arrive ? { opacity: 1, scale: 1 } : undefined}
          transition={arrive ? { duration: 1.6, ease: APPLE_EASE } : undefined}
        >
          <motion.img
            src="/3potrait.png"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: backdropFilter }}
            loading="eager"
            decoding="async"
          />
        </motion.div>
      </motion.div>

      {/* Dark base so the content reads */}
      <div className="absolute inset-0 pointer-events-none bg-[#020409]/35" />

      {/* Content — sits above the spotlight so the cursor beam lights the
          backdrop only, never the type */}
      <motion.div
        className="relative z-30 w-full max-w-5xl mx-auto px-4 xs:px-6 sm:px-10 text-center flex flex-col items-center"
        style={{ paddingTop: 'clamp(5.5rem, 14vh, 8.5rem)', paddingBottom: 'clamp(3.5rem, 10vh, 7rem)' }}
        initial={arrive ? { opacity: 0, y: 26, filter: 'blur(10px)' } : false}
        animate={arrive ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
        transition={arrive ? { duration: 1.1, delay: 0.35, ease: APPLE_EASE } : undefined}
      >
        <motion.div {...fadeUp(0.1)} className="mb-6 sm:mb-7">
          <AvailabilityBadge />
        </motion.div>

        {/* 3D standing letters — light up in a wave on hover */}
        <h1
          className="hero-title font-heading font-black leading-[0.92] tracking-tighter text-white"
          style={{ fontSize: 'clamp(1.85rem, 5.6vw, 7.5rem)', perspective: 900 }}
        >
          <span className="flex flex-wrap justify-center items-center">
            {FIRST.map((char, i) => (
              <motion.span
                key={`f-${i}`}
                {...rise(0.15 + i * 0.05)}
                className="hero-letter inline-block"
                style={{ transitionDelay: `${i * 45}ms` }}
              >
                {char}
              </motion.span>
            ))}
            <span className="w-3 sm:w-5" />
            {LAST.map((char, i) => (
              <motion.span
                key={`l-${i}`}
                {...rise(0.15 + (FIRST.length + i) * 0.05)}
                className="hero-letter inline-block text-gradient-blue"
                style={{ transitionDelay: `${(FIRST.length + i) * 45}ms` }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.div {...fadeUp(0.75)} className="mt-6 mb-6">
          <StageRotator />
        </motion.div>

        <motion.p
          {...fadeUp(0.82)}
          className="text-zinc-400 max-w-xl leading-relaxed mb-9 text-sm sm:text-base md:text-lg"
        >
          Architecting high-performance digital products where robust engineering precision meets
          seamless user experiences. Specializing in MERN Stack, PWAs &amp; AI Workflows.
        </motion.p>

        <motion.div {...fadeUp(0.9)} className="mb-10 flex justify-center">
          <MetricsStrip />
        </motion.div>

        <motion.div {...fadeUp(0.95)} className="flex justify-center">
          <HeroCTAs />
        </motion.div>
      </motion.div>

      {/* Cursor spotlight — screen blend over letters, fades out on leave */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-20"
        style={{ background: spotlight, mixBlendMode: 'screen', opacity: spotOpacity }}
      />
    </section>
  )
}