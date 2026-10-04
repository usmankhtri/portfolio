import { useRef } from 'react'
import type { ElementType } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { BrainCircuit, Briefcase, Code2, Flag, Hourglass, Rocket } from 'lucide-react'
import { APPLE_EASE } from '../../../lib/utils'
import { portfolioData } from '../../../data/portfolioData'

const { about } = portfolioData
const milestones = about.timeline.filter((m) => m.title !== 'Coming Soon')

const iconMap: Record<string, ElementType> = {
  Code2,
  Briefcase,
  Rocket,
  BrainCircuit,
  Hourglass,
}

export const AboutTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  /*
   * ONE scrolling indicator for the entire timeline:
   * a single gradient fill that grows down the spine as
   * the whole column scrolls through the viewport.
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  })

  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 })
  const lineScale = useTransform(progress, [0.05, 0.95], [0, 1])

  if (!milestones.length) {
    return null
  }

  return (
    <section className="relative w-full overflow-hidden bg-background" aria-label="Career milestones">
      {/* ========================================================= */}
      {/* AMBIENT BACKGROUND                                         */}
      {/* ========================================================= */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-[0.16]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle 700px at 10% 30%, rgba(37,99,235,0.10), transparent 65%), radial-gradient(circle 600px at 90% 65%, rgba(37,99,235,0.06), transparent 65%)',
          }}
        />
      </div>

      {/* ========================================================= */}
      {/* HEADER                                                      */}
      {/* ========================================================= */}

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 pt-16 sm:pt-24 pb-8 sm:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.08]"
        >
          <Flag className="w-3 h-3 text-blue-400" />
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">
            The Journey
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          <h2 className="mt-3 font-heading font-extrabold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl">
            Milestones that <span className="text-gradient">moved the needle.</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            From first commit to shipped products — the moments that shaped how I build.
          </p>
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* CONNECTED TIMELINE                                          */}
      {/* ========================================================= */}

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pb-20 sm:pb-28">
        <div className="relative ml-12 sm:ml-16">
          {/* Spine track */}
          <div className="absolute -left-6 sm:-left-8 top-0 bottom-0 w-px bg-white/10" aria-hidden="true" />

          {/* ONE scrolling indicator — gradient fill on the spine */}
          <motion.div
            className="absolute -left-6 sm:-left-8 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-blue-600 via-blue-400 to-blue-300"
            style={{ scaleY: lineScale, boxShadow: '0 0 10px rgba(37,99,235,0.6)' }}
            aria-hidden="true"
          />

          {/* End cap */}
          <div
            className="absolute -left-6 sm:-left-8 bottom-0 -translate-x-1/2 translate-y-1/2 size-3 rounded-full border-2 border-blue-400 bg-[#030712]"
            style={{ boxShadow: '0 0 10px rgba(96,165,250,0.8)' }}
            aria-hidden="true"
          />

          {/* One joined column — zero gaps between milestones */}
          <div className="relative rounded-[28px] border border-white/[0.09] bg-[#07101f] shadow-[0_35px_100px_rgba(0,0,0,0.55)] divide-y divide-white/[0.06] overflow-hidden">
            {milestones.map((milestone, index) => {
              const Icon = iconMap[milestone.icon] ?? Hourglass
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, ease: APPLE_EASE }}
                  className="relative p-5 sm:p-6 lg:p-7 hover:bg-white/[0.02] transition-colors"
                >
                  {/* Node on the spine */}
                  <div
                    className="absolute -left-6 sm:-left-8 -translate-x-1/2 -translate-y-1/2 top-1/2 size-3 rounded-full bg-blue-400 border-2 border-[#07101f]"
                    style={{ boxShadow: '0 0 12px rgba(96,165,250,0.9)' }}
                    aria-hidden="true"
                  />

                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Year */}
                    <span className="font-display text-xl sm:text-2xl lg:text-3xl text-gradient-blue leading-none pt-1 w-14 sm:w-20 shrink-0">
                      {milestone.year}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <div
                          className="size-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}
                        >
                          <Icon className="size-4 text-primary-light" />
                        </div>
                        <h3 className="font-heading font-extrabold tracking-tight text-white text-base sm:text-lg lg:text-xl">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-zinc-400">{milestone.desc}</p>
                      <span className="sm:hidden inline-block mt-2.5 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[9px] uppercase tracking-[0.18em] text-blue-300 font-heading">
                        {milestone.tag}
                      </span>
                    </div>

                    {/* Tag + counter */}
                    <div className="hidden sm:flex flex-col items-end gap-2 shrink-0 pt-1">
                      <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.18em] text-blue-300 font-heading">
                        {milestone.tag}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-600">
                        {String(index + 1).padStart(2, '0')} / {String(milestones.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
