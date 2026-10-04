import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Code, FileCode2, Rocket, ShieldCheck } from 'lucide-react'
import { APPLE_EASE, cn } from '../lib/utils'
import { SEO } from '../components/SEO'
import { portfolioData } from '../data/portfolioData'
import { AboutIntro } from '../components/sections/about/AboutIntro'
import { AboutTimeline } from '../components/sections/about/AboutTimeline'
import { AboutValues } from '../components/sections/about/AboutValues'
import { CreativeStatsBar, type StatItem } from '../components/sections/home/CreativeStatsBar'
import { TechScene } from '../components/sections/home/TechScene'
import { SectionDivider } from '../components/ui/SectionDivider'
import { useMagnetic } from '../hooks/useMagnetic'

const { about } = portfolioData

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Usman Khatri',
  url: 'https://usmankhatri.dev',
  image: 'https://usmankhatri.dev/usman.png',
  jobTitle: 'Full-Stack Architect',
  description: about.bio,
  email: `mailto:${about.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyderabad',
    addressCountry: 'PK',
  },
  sameAs: [about.github],
  knowsAbout: about.skills,
}

const ABOUT_STATS: StatItem[] = [
  {
    value: about.stats[0].value,
    label: about.stats[0].label,
    sublabel: 'Full-Stack MERN & PWAs',
    icon: Rocket,
    color: '#60A5FA',
    borderColor: 'rgba(96,165,250,0.25)',
    bgColor: 'rgba(96,165,250,0.08)',
  },
  {
    value: about.stats[1].value,
    label: about.stats[1].label,
    sublabel: 'Web & AI Product Engineering',
    icon: Code,
    color: '#3B82F6',
    borderColor: 'rgba(59,130,246,0.25)',
    bgColor: 'rgba(59,130,246,0.08)',
  },
  {
    value: about.stats[2].value,
    label: about.stats[2].label,
    sublabel: 'On-time Delivery & Clean Code',
    icon: ShieldCheck,
    color: '#2563EB',
    borderColor: 'rgba(37,99,235,0.25)',
    bgColor: 'rgba(37,99,235,0.08)',
  },
  {
    value: '25k+',
    label: 'Lines of Code Shipped',
    sublabel: 'Across Products & Tooling',
    icon: FileCode2,
    color: '#93C5FD',
    borderColor: 'rgba(147,197,253,0.25)',
    bgColor: 'rgba(147,197,253,0.08)',
  },
]

export const About = () => {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.06)

  return (
    <>
      <SEO
        title="About"
        description="Learn about Usman Khatri — Full-Stack Architect, MERN specialist, and AI workflow designer based in Hyderabad, Pakistan."
        url="/about"
        jsonLd={personJsonLd}
      />

      <main className="min-h-screen pt-16 sm:pt-20 pb-0 overflow-hidden">
        {/* ============================================================= */}
        {/* AMBIENT BACKGROUND — engineering grid + aurora orbs            */}
        {/* ============================================================= */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none fixed -top-40 left-[15%] size-[500px] rounded-full opacity-20 blur-[140px]"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, rgba(37,99,235,0) 70%)' }}
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none fixed bottom-0 right-[10%] size-[400px] rounded-full opacity-15 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #60A5FA 0%, rgba(96,165,250,0) 70%)' }}
          animate={{ y: [0, -24, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="relative z-10">
          {/* ============================================================= */}
          {/* CINEMATIC HEADER — word cascade + ambient glow                 */}
          {/* ============================================================= */}
          <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
              <div className="relative pt-10 sm:pt-16 pb-12 sm:pb-20">
                {/* Massive ambient glow behind headline */}
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.4, ease: APPLE_EASE }}
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
                  style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 70%)' }}
                />

                {/* Section kicker */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: APPLE_EASE }}
                  className="mb-6 flex items-center gap-3"
                >
                  <span className="h-px w-10 bg-gradient-to-r from-transparent to-blue-500/50" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-blue-300">
                    About Me
                  </span>
                  <span className="h-px w-10 bg-gradient-to-r from-blue-500/50 to-transparent" />
                </motion.div>

                {/* Giant word-cascade headline */}
                <h1 className="font-heading font-black tracking-tighter text-white leading-[0.95]" style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}>
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: '112%' }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.1, duration: 0.8, ease: APPLE_EASE }}
                    >
                      USMAN
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block text-gradient-blue animate-gradient-shift"
                      initial={{ y: '112%' }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.22, duration: 0.8, ease: APPLE_EASE }}
                    >
                      KHATRI.
                    </motion.span>
                  </span>
                </h1>

                {/* Subtitle row */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: APPLE_EASE }}
                  className="mt-6 flex flex-wrap items-center gap-4"
                >
                  <span className="text-zinc-500 text-sm sm:text-base leading-relaxed max-w-xl">
                    Turning complex problems into fast, cinematic product experiences — one commit at a time.
                  </span>
                  <span className="hidden sm:block h-px flex-1 max-w-[120px] bg-gradient-to-r from-blue-500/40 to-transparent" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                    Full-Stack Architect & Engineer
                  </span>
                </motion.div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ============================================================= */}
          {/* INTRO — photo + bio split                                      */}
          {/* ============================================================= */}
          <AboutIntro />

          <SectionDivider />

          {/* ============================================================= */}
          {/* STATS — instrument board                                       */}
          {/* ============================================================= */}
          <section className="py-16 sm:py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
              <CreativeStatsBar data={ABOUT_STATS} />
            </div>
          </section>

          <SectionDivider />

          {/* ============================================================= */}
          {/* TIMELINE — career milestones                                   */}
          {/* ============================================================= */}
          <AboutTimeline />

          <SectionDivider />

          {/* ============================================================= */}
          {/* TECH STACK — arsenal                                           */}
          {/* ============================================================= */}
          <TechScene />

          <SectionDivider />

          {/* ============================================================= */}
          {/* PRINCIPLES — values                                            */}
          {/* ============================================================= */}
          <AboutValues />

          {/* ============================================================= */}
          {/* CLOSING CTA — glass board                                      */}
          {/* ============================================================= */}
          <section className="relative bg-[#030712] overflow-hidden" aria-label="Call to Action">
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] pointer-events-none opacity-25"
              style={{
                background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.8, ease: APPLE_EASE }}
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B1220]/60 backdrop-blur-md pt-16 pb-12 sm:pt-20 text-center my-12 sm:my-16"
              >
                {/* Engineering grid */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.04)_1px,transparent_1px)] bg-[size:48px_48px]"
                />
                {/* Top hairline */}
                <div aria-hidden className="absolute left-[20%] right-[20%] top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                {/* Corner ticks */}
                {[
                  'top-0 left-0 border-t border-l',
                  'top-0 right-0 border-t border-r',
                  'bottom-0 left-0 border-b border-l',
                  'bottom-0 right-0 border-b border-r',
                ].map((pos) => (
                  <span
                    key={pos}
                    aria-hidden
                    className={cn(
                      'pointer-events-none absolute z-10 size-3.5 border-blue-400/0 transition-colors duration-300 hover:border-blue-400/60',
                      pos,
                    )}
                  />
                ))}

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-md mb-5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300 font-heading">
                      Available for New Projects
                    </span>
                  </div>

                  <h2
                    className="font-heading font-extrabold tracking-tighter text-white mb-4"
                    style={{ fontSize: 'clamp(2rem, 5.5vw, 3.5rem)' }}
                  >
                    Ready to build{' '}
                    <span className="text-gradient-blue">something bold?</span>
                  </h2>

                  <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-7">
                    If you're after engineering precision with a cinematic finish, let's turn your idea into a shipped product.
                  </p>

                  <Link
                    ref={ctaRef}
                    to="/contact"
                    className="shine-sweep group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white font-heading transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] will-change-transform"
                    style={{
                      background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                      boxShadow: '0 0 32px rgba(37,99,235,0.4)',
                    }}
                  >
                    <span>Let's Work Together</span>
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}