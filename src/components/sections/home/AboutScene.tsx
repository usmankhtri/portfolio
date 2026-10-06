import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Clock, Mail, Code2, Layers, BrainCircuit, Workflow } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { APPLE_EASE } from '../../../lib/utils'
import { portfolioData } from '../../../data/portfolioData'
import { SceneShell } from '../../ui/SceneShell'
import { SceneHeader } from '../../ui/SceneHeader'
import { useMagnetic } from '../../../hooks/useMagnetic'

const { about } = portfolioData

const META = [
  { icon: MapPin, label: 'Location', value: about.location },
  { icon: Clock, label: 'Timezone', value: about.timezone },
  { icon: Mail, label: 'Email', value: about.email },
  { icon: FiGithub, label: 'GitHub', value: 'usmankhatri' },
]

const TOP_SKILLS = [
  { title: 'Software Development', sub: 'Clean · Scalable · Tested', icon: Code2 },
  { title: 'Full Stack Development', sub: 'Frontend · Backend · APIs', icon: Layers },
  { title: 'Artificial Intelligence (AI)', sub: 'LLMs · RAG · Prompt Systems', icon: BrainCircuit },
  { title: 'Automation', sub: 'Workflows · Pipelines · Bots', icon: Workflow },
]

/* Film-style corner ticks, fade in on hover — same language as the stats */
const Ticks = () => (
  <>
    <span className="pointer-events-none absolute left-3 top-3 size-2.5 border-l border-t border-blue-400/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <span className="pointer-events-none absolute right-3 top-3 size-2.5 border-r border-t border-blue-400/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <span className="pointer-events-none absolute bottom-3 left-3 size-2.5 border-b border-l border-blue-400/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <span className="pointer-events-none absolute bottom-3 right-3 size-2.5 border-b border-r border-blue-400/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  </>
)

/* Mono section kicker — index + hairline + label */
const Kicker = ({ index, text }: { index: string; text: string }) => (
  <div className="mb-4 flex items-center gap-3">
    <span className="font-mono text-[10px] tracking-[0.3em] text-blue-400/80">{index}</span>
    <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
    <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 uppercase">{text}</span>
  </div>
)

export const AboutScene = () => {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.07)

  return (
    <SceneShell label="About Me" accent="#60A5FA">
      <SceneHeader
        eyebrow="About Me"
        title={
          <>
            Engineer by craft.
            <br />
            <span className="text-gradient">Designer by instinct.</span>
          </>
        }
        sub="A look into my background, engineering philosophy, and how I build digital products."
      />

      {/* Profile board */}
      <div className="relative mx-0 sm:-mx-6 lg:-mx-12 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]/60 backdrop-blur-md">
        {/* Engineering grid */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.05)_1px,transparent_1px)] bg-[size:48px_48px]"
        />
        {/* Center glow */}
        <div
          aria-hidden
          className="absolute -top-28 left-1/2 -translate-x-1/2 size-72 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #60A5FA 0%, rgba(96,165,250,0) 70%)' }}
        />
        {/* Bottom accent hairline */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12">
          {/* PORTRAIT — film still with nameplate */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/[0.06]"
          >
            <div className="relative h-60 xs:h-72 sm:h-80 lg:h-full lg:min-h-[420px] overflow-hidden">
              <img
                src="/3potrait.png"
                alt="Usman Khatri — focused and precise"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />

              {/* Cinematic scrim */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(6,12,26,0.94) 0%, rgba(6,12,26,0.25) 55%, transparent 100%)' }}
              />

              {/* Top hairline */}
              <div className="absolute left-[15%] right-[15%] top-0 z-10 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

              {/* Scene tag */}
              <span className="absolute left-4 top-4 z-10 font-mono text-[9px] tracking-[0.35em] text-white/50">
                PROFILE OVERVIEW
              </span>

              {/* Nameplate */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                <p className="font-heading font-black text-2xl text-white">Usman Khatri</p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.3em] text-blue-300/90">
                  FULL-STACK ARCHITECT · HYDERABAD, PK
                </p>
                <div className="mt-3 h-px bg-gradient-to-r from-blue-400/40 to-transparent" />
              </div>

              {/* Decorative inner frame */}
              <div className="pointer-events-none absolute inset-3 rounded-xl border border-white/[0.07]" />
            </div>
          </motion.div>

          {/* Details — background, philosophy, contact, skills, CTA */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col"
          >
            {/* Background */}
            <div className="group relative border-t border-white/[0.06] first:border-t-0 p-5 xs:p-6 sm:p-7">
              <Ticks />
              <Kicker index="01" text="Background" />
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">{about.bio}</p>
            </div>

            {/* Philosophy */}
            <div className="group relative border-t border-white/[0.06] p-5 xs:p-6 sm:p-7">
              <Ticks />
              <Kicker index="02" text="Philosophy" />
              <div className="relative">
                <span className="absolute -top-7 left-0 select-none font-display text-7xl leading-none text-primary-light/20">
                  &quot;
                </span>
                <p className="relative pl-7 font-heading font-bold text-white text-lg tracking-tight sm:text-xl">
                  {about.philosophy}
                </p>
              </div>
            </div>

            {/* Contact & Location */}
            <div className="group relative border-t border-white/[0.06] p-5 xs:p-6 sm:p-7">
              <Ticks />
              <Kicker index="03" text="Location & Contact" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.06]">
                {META.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3.5 bg-[#07101f] p-4">
                    <div
                      className="flex size-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.18)' }}
                    >
                      <Icon className="size-4 text-primary-light" />
                    </div>
                    <div className="min-w-0">
                      <p className="mb-0.5 font-mono text-[9px] tracking-[0.25em] text-zinc-500 uppercase">
                        {label}
                      </p>
                      <p className="truncate text-xs text-zinc-200 sm:text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specializations — core capabilities */}
            <div className="group relative border-t border-white/[0.06] p-5 xs:p-6 sm:p-7">
              <Ticks />
              <Kicker index="04" text="Specializations" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {TOP_SKILLS.map((skill, i) => {
                  const Icon = skill.icon
                  return (
                    <div
                      key={skill.title}
                      className="group/cell relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#07101f] p-5 transition-colors duration-300 hover:border-blue-500/25 hover:bg-blue-500/[0.04]"
                    >
                      <span className="pointer-events-none absolute -right-1 -top-5 select-none font-display font-black text-6xl leading-none text-white/[0.035] transition-colors duration-500 group-hover/cell:text-blue-500/[0.07]">
                        0{i + 1}
                      </span>
                      <span className="pointer-events-none absolute left-2 top-2 size-1.5 border-l border-t border-blue-400/20 opacity-0 transition-opacity duration-500 group-hover/cell:opacity-100" />
                      <span className="pointer-events-none absolute bottom-2 right-2 size-1.5 border-b border-r border-blue-400/20 opacity-0 transition-opacity duration-500 group-hover/cell:opacity-100" />
                      <span
                        className="flex size-10 items-center justify-center rounded-lg"
                        style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.18)' }}
                      >
                        <Icon className="size-4.5 text-primary-light" />
                      </span>
                      <p className="mt-4 font-heading font-bold text-white text-sm sm:text-base">
                        {skill.title}
                      </p>
                      <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                        {skill.sub}
                      </p>
                    </div>
                  )
                })}
              </div>
              <Link
                to="/about"
                className="group/cell relative mt-3 flex items-center justify-between gap-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.05] p-4 transition-colors duration-300 hover:bg-blue-500/[0.09]"
              >
                <span className="pointer-events-none absolute left-2 top-2 size-1.5 border-l border-t border-blue-400/25 opacity-0 transition-opacity duration-500 group-hover/cell:opacity-100" />
                <span className="pointer-events-none absolute bottom-2 right-2 size-1.5 border-b border-r border-blue-400/25 opacity-0 transition-opacity duration-500 group-hover/cell:opacity-100" />
                <div>
                  <p className="font-heading font-bold text-white text-sm sm:text-base">View all skills &amp; technologies</p>
                  <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                    16+ technologies &amp; tools
                  </p>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-primary-light transition-transform duration-300 group-hover/cell:translate-x-0.5 group-hover/cell:-translate-y-0.5" />
              </Link>
            </div>

            {/* CTA */}
            <Link
              to="/about"
              ref={ctaRef}
              className="group relative flex items-center justify-between gap-3 border-t border-white/[0.06] p-5 transition-colors duration-300 hover:bg-white/[0.02] sm:p-6 will-change-transform"
            >
              <Ticks />
              <div>
                <p className="font-heading font-bold text-white text-sm sm:text-base">Read the full story</p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                  Timeline · Values · Process
                </p>
              </div>
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-full transition-all group-hover:scale-110"
                style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}
              >
                <ArrowUpRight className="size-4 text-primary-light transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </SceneShell>
  )
}