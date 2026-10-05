import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowUpRight, Clock, Mail, MapPin } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { APPLE_EASE } from '../../../lib/utils'
import { portfolioData } from '../../../data/portfolioData'
import { SpotlightCard } from '../../ui/SpotlightCard'
import { useMagnetic } from '../../../hooks/useMagnetic'

const { about } = portfolioData

const TiltPhoto = () => {
  const ref = useRef<HTMLDivElement>(null)
  const finePointer = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    finePointer.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  }, [])

  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 22 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 22 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !finePointer.current || prefersReducedMotion) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 10)
    rotateX.set(-py * 10)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div style={{ perspective: 1400 }} className="w-full max-w-[280px] xs:max-w-[340px] sm:max-w-[400px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <SpotlightCard
          spotlightColor="rgba(96,165,250,0.2)"
          className="rounded-3xl shadow-[0_32px_60px_rgba(6,12,26,0.6)]"
        >
          <motion.div
            className="relative aspect-[3/4]"
            initial={{ scale: 1.12, opacity: 0.35 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.6, ease: APPLE_EASE }}
          >
            <img
              src="/usman.png"
              alt="Usman Khatri"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(6,12,26,0.95) 0%, transparent 100%)' }}
            />

            {/* Decorative inner frame */}
            <div className="absolute inset-3 rounded-2xl border border-white/10 pointer-events-none" />

            {/* Availability badge */}
            <div className="absolute top-5 right-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#060C1A]/70 backdrop-blur-md border border-blue-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
              </span>
              <span className="text-[10px] font-semibold text-blue-300 font-heading tracking-widest uppercase">
                Available
              </span>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-1">
              <span className="font-heading font-bold text-white text-lg tracking-tight">
                Usman Khatri
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-blue-300 font-mono">
                Precision in every pixel &amp; function
              </span>
            </div>
          </motion.div>
        </SpotlightCard>
      </motion.div>
    </div>
  )
}

export const AboutIntro = () => {
  const workRef = useMagnetic<HTMLAnchorElement>(0.06)
  const connectRef = useMagnetic<HTMLAnchorElement>(0.06)

  return (
    <section className="relative py-20 sm:py-28 bg-background overflow-hidden" aria-label="Introduction">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div
          className="absolute -top-32 -left-32 size-[500px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.35) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-0 -right-32 size-[460px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(96,165,250,0.3) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        {/* Spinning dashed ring */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-[6%] size-[560px] rounded-full opacity-[0.16]"
          style={{ border: '1px dashed rgba(96,165,250,0.25)', animation: 'spin 55s linear infinite' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.9, ease: APPLE_EASE }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <TiltPhoto />
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 sm:gap-8">
            {/* Section kicker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, ease: APPLE_EASE }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500/50" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
                01
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-blue-500/50 to-transparent" />
            </motion.div>

            {/* Giant heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.7, ease: APPLE_EASE, delay: 0.05 }}
              className="font-heading font-black tracking-tighter text-white leading-[0.95]"
              style={{ fontSize: 'clamp(1.5rem, 3.8vw, 3.8rem)' }}
            >
              <span className="block">THE ARCHITECT</span>
              <span className="block text-transparent [-webkit-text-stroke:1.5px_rgba(96,165,250,0.55)]">
                BEHIND THE CODE.
              </span>
            </motion.h2>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.1 }}
              className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl"
            >
              {about.bio}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.15 }}
              className="text-zinc-500 text-sm leading-relaxed max-w-xl"
            >
              Currently focused on AI-integrated product engineering — shipping full-stack apps with
              LLM-powered features, real-time sync, and interfaces that feel alive.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                ref={workRef}
                to="/works"
                className="shine-sweep group inline-flex items-center gap-2.5 px-7 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white font-heading transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] will-change-transform"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  boxShadow: '0 0 25px rgba(37,99,235,0.3)',
                }}
              >
                <span>View My Work</span>
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <Link
                ref={connectRef}
                to="/contact"
                className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-xl font-semibold text-xs sm:text-sm text-zinc-300 hover:text-white font-heading transition-all duration-300 border border-white/10 hover:border-blue-500/40 hover:shadow-[0_0_16px_rgba(37,99,235,0.2)]"
              >
                <span>Let's Connect</span>
              </Link>

              <a
                href={`mailto:${about.email}`}
                className="group/email inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium font-heading text-zinc-300 hover:text-white transition-all duration-300 border border-white/10 hover:border-blue-500/40 hover:shadow-[0_0_16px_rgba(37,99,235,0.15)]"
              >
                <Mail className="size-4 text-blue-400" />
                <span className="relative">
                  Email
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-300 group-hover/email:w-full" />
                </span>
              </a>

              <a
                href={about.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/gh inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium font-heading text-zinc-300 hover:text-white transition-all duration-300 border border-white/10 hover:border-blue-500/40 hover:shadow-[0_0_16px_rgba(37,99,235,0.15)]"
              >
                <FiGithub className="size-4 text-blue-400" />
                <span className="relative">
                  GitHub
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-300 group-hover/gh:w-full" />
                </span>
              </a>
            </motion.div>

            {/* Location / timezone — compact meta row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, ease: APPLE_EASE, delay: 0.3 }}
              className="flex flex-wrap gap-4 text-xs text-zinc-500 font-mono"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5 text-blue-400" />
                {about.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5 text-blue-400" />
                {about.timezone}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}