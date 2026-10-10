import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, LayoutGrid, Clapperboard } from 'lucide-react'
import { SEO } from '../components/SEO'
import { portfolioData } from '../data/portfolioData'
import { APPLE_EASE } from '../lib/utils'
import { useMagnetic } from '../hooks/useMagnetic'
import { CinematicShowcase } from '../components/sections/works/CinematicShowcase'
import { BentoGrid } from '../components/sections/works/BentoGrid'

const { projects } = portfolioData

const worksJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Selected Works & Case Studies | Usman Khatri',
  description: 'Production-ready web apps, SaaS platforms, and AI-powered experiences engineered by Usman Khatri.',
  url: 'https://usmankhatri.vercel.app/works',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.title,
      url: `https://usmankhatri.vercel.app/works/${project.id}`,
      description: project.description,
    })),
  },
}

type ViewMode = 'cinematic' | 'grid'

export const Works = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('cinematic')

  return (
    <>
      <SEO
        title="Selected Works & Case Studies"
        description="Selected projects by Usman Khatri — full-stack web apps, SaaS platforms, and AI-powered experiences."
        url="/works"
        jsonLd={worksJsonLd}
      />

      <main id="main-content" className="min-h-screen overflow-hidden">
        {/* Ambient background */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.03)_1px,transparent_1px)] bg-[size:48px_48px] z-0"
        />

        {/* ============================================================= */}
        {/* HEADER + VIEW TOGGLE                                          */}
        {/* ============================================================= */}
        <div className="relative z-20 max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 pt-10 sm:pt-14 pb-4">
          <div className="flex items-end justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: APPLE_EASE }}
                className="mb-4 flex items-center gap-3"
              >
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-blue-500/50" />
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-blue-300">Portfolio</span>
                <span className="h-px w-10 bg-gradient-to-r from-blue-500/50 to-transparent" />
              </motion.div>

              <motion.h1
                className="font-heading font-black tracking-tighter text-white leading-[0.95]"
                style={{ fontSize: 'clamp(1.75rem, 4.8vw, 5rem)' }}
              >
                <span className="inline-block overflow-hidden align-top pb-1 mr-3 sm:mr-4">
                  <motion.span initial={{ y: '112%' }} animate={{ y: 0 }} transition={{ delay: 0.1, duration: 0.8, ease: APPLE_EASE }}>
                    Selected
                  </motion.span>
                </span>
                <span className="inline-block overflow-hidden align-top pb-1">
                  <motion.span
                    className="text-transparent [-webkit-text-stroke:1.5px_rgba(96,165,250,0.55)]"
                    initial={{ y: '112%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.22, duration: 0.8, ease: APPLE_EASE }}
                  >
                    Work
                  </motion.span>
                </span>
              </motion.h1>
            </div>

            {/* View toggle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: APPLE_EASE }}
              className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-2"
            >
              <button
                onClick={() => setViewMode('cinematic')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all duration-300"
                style={{
                  background: viewMode === 'cinematic' ? 'rgba(37,99,235,0.2)' : 'transparent',
                  color: viewMode === 'cinematic' ? '#60A5FA' : '#71717a',
                }}
              >
                <Clapperboard className="size-3.5" />
                <span className="hidden sm:inline">Showcase</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all duration-300"
                style={{
                  background: viewMode === 'grid' ? 'rgba(37,99,235,0.2)' : 'transparent',
                  color: viewMode === 'grid' ? '#60A5FA' : '#71717a',
                }}
              >
                <LayoutGrid className="size-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: APPLE_EASE }}
            className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base pb-6 sm:pb-10"
          >
            Built with intent. Shipped with care. Every project is a case study in engineering precision and cinematic craft.
          </motion.p>
        </div>

        {/* ============================================================= */}
        {/* CINEMATIC SHOWCASE MODE                                        */}
        {/* ============================================================= */}
        {viewMode === 'cinematic' && <CinematicShowcase projects={projects} />}

        {/* ============================================================= */}
        {/* BENTO GRID MODE                                                */}
        {/* ============================================================= */}
        {viewMode === 'grid' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="pt-10 sm:pt-14"
          >
            <BentoGrid projects={projects} />
          </motion.div>
        )}

        {/* ============================================================= */}
        {/* BOTTOM CTA                                                    */}
        {/* ============================================================= */}
        <div className="relative z-10 max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B1220]/60 backdrop-blur-md py-10 sm:py-14 text-center"
          >
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
            <div aria-hidden className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-30 blur-[80px]" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, transparent 70%)' }} />
            <div aria-hidden className="absolute left-[20%] right-[20%] top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            <span className="pointer-events-none absolute left-3 top-3 size-3 border-l border-t border-blue-400/30" />
            <span className="pointer-events-none absolute right-3 top-3 size-3 border-r border-t border-blue-400/30" />
            <span className="pointer-events-none absolute bottom-3 left-3 size-3 border-b border-l border-blue-400/30" />
            <span className="pointer-events-none absolute bottom-3 right-3 size-3 border-b border-r border-blue-400/30" />

            <div className="relative z-10">
              <h2
                className="font-heading font-black tracking-tighter text-white mb-4"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}
              >
                Have a project in mind?{' '}
                <span className="text-transparent [-webkit-text-stroke:1px_rgba(96,165,250,0.55)]">Let's build it.</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to bring your vision to life.
              </p>
              <CtaButton />
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}

const CtaButton = () => {
  const ref = useMagnetic<HTMLAnchorElement>(0.06)
  return (
    <Link
      ref={ref}
      to="/contact"
      className="shine-sweep group inline-flex items-center gap-3 px-10 py-4 rounded-xl font-heading font-bold text-xs sm:text-sm text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] will-change-transform"
      style={{
        background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
        boxShadow: '0 0 32px rgba(37,99,235,0.4)',
      }}
    >
      <span>Let's Talk</span>
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </Link>
  )
}
