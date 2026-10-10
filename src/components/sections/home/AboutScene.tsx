import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Terminal, Gauge, Cpu } from 'lucide-react'
import { APPLE_EASE } from '../../../lib/utils'
import { portfolioData } from '../../../data/portfolioData'
import { SceneShell } from '../../ui/SceneShell'
import { SceneHeader } from '../../ui/SceneHeader'

const { about } = portfolioData

const PILLARS = [
  {
    icon: Terminal,
    title: 'Architecture & Systems',
    description: 'Scalable MERN, Next.js, and TypeScript architectures built with maintainability and type safety.',
  },
  {
    icon: Gauge,
    title: 'Speed & Resilience',
    description: 'Sub-100ms interactions, transform-only animations, and offline-capable PWA engineering.',
  },
  {
    icon: Cpu,
    title: 'Developer Tooling',
    description: 'Creating practical tools for migrations, webhooks, and code impact review that ship to production.',
  },
]

export const AboutScene = () => {
  return (
    <SceneShell label="About Me" accent="#60A5FA">
      <SceneHeader
        eyebrow="About Me"
        title={
          <>
            Engineer by craft.{' '}
            <span className="text-gradient">Designer by instinct.</span>
          </>
        }
        sub="Merging full-stack technical precision with cinematic, human-centered interfaces."
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Authentic Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: APPLE_EASE }}
          className="lg:col-span-5"
        >
          <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-white/[0.08] bg-[#07101f] shadow-2xl group">
            {/* Ambient inner gradient */}
            <div
              aria-hidden
              className="absolute -top-24 -left-24 size-48 rounded-full bg-blue-500/15 blur-2xl pointer-events-none"
            />

            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
              <img
                src="/3potrait.png"
                alt="Usman Khatri — Full-Stack Architect"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
              />

              {/* Cinematic bottom scrim */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#050b17] via-[#050b17]/50 to-transparent"
              />

              {/* Bottom Details Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 z-10">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full size-2 bg-emerald-400" />
                  </span>
                  <span className="text-[11px] font-medium text-emerald-300 tracking-wide">
                    Available for select projects
                  </span>
                </div>

                <p className="font-heading font-black text-2xl sm:text-3xl text-white">Usman Khatri</p>
                <p className="text-xs text-zinc-400 mt-1.5">
                  Full-Stack Architect · Hyderabad, Pakistan
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Clean Editorial Story & Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: APPLE_EASE, delay: 0.1 }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Philosophy Statement */}
          <div className="relative pl-6 border-l-2 border-blue-500/70 mb-8">
            <p className="font-heading font-bold text-white text-lg sm:text-xl lg:text-2xl leading-snug tracking-tight">
              &ldquo;{about.philosophy}&rdquo;
            </p>
          </div>

          {/* Narrative Paragraphs */}
          <div className="space-y-5 text-zinc-300 text-sm sm:text-base leading-relaxed mb-10">
            <p>
              I build web applications and developer tools with a focus on speed, clarity, and structural longevity. Whether architecting scalable MERN systems, deploying offline-ready PWAs, or streamlining workflows, I bridge raw engineering depth with clean aesthetic execution.
            </p>
            <p className="text-zinc-400">
              Every detail is deliberate: lean client bundles, sub-100ms response targets, and rock-solid state management so applications remain reliable and enjoyable long after launch.
            </p>
          </div>

          {/* Core Pillars — Open, minimalist, and spacious */}
          <div className="space-y-6 sm:space-y-7 border-t border-white/[0.08] pt-8 mb-10">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div key={pillar.title} className="flex items-start gap-4 sm:gap-5">
                  <div className="size-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="size-4.5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white text-sm sm:text-base">
                      {pillar.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mt-1">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Single Focused Call to Action */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white font-heading transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                boxShadow: '0 0 24px rgba(37,99,235,0.3)',
              }}
            >
              <span>Explore My Full Journey</span>
              <ArrowUpRight className="size-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white font-heading transition-colors border border-white/10 hover:border-white/20 bg-white/[0.03]"
            >
              <span>Get in Touch</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </SceneShell>
  )
}