import { useParams, useNavigate, Link, Navigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import type { MouseEvent } from 'react'
import { APPLE_EASE, cn } from '../lib/utils'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, User, Clock, Target, Compass, Trophy } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { SEO } from '../components/SEO'
import { portfolioData } from '../data/portfolioData'
import { TechBadge } from '../components/ui/TechBadge'
import { SpotlightCard } from '../components/ui/SpotlightCard'
import { SectionDivider } from '../components/ui/SectionDivider'

const { projects } = portfolioData

const TiltHeroImage = ({ src, alt, color }: { src: string; alt: string; color: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [canTilt, setCanTilt] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const handle = requestAnimationFrame(() => {
      setCanTilt(fine.matches && !prefersReducedMotion)
    })
    return () => cancelAnimationFrame(handle)
  }, [prefersReducedMotion])

  const rawRX = useMotionValue(0)
  const rawRY = useMotionValue(0)
  const rotateX = useSpring(rawRX, { stiffness: 200, damping: 22 })
  const rotateY = useSpring(rawRY, { stiffness: 200, damping: 22 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!canTilt || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rawRY.set(px * 10)
    rawRX.set(py * -10)
  }

  const handleMouseLeave = () => {
    rawRX.set(0)
    rawRY.set(0)
  }

  return (
    <div style={{ perspective: 1400 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
      >
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/8]"
          style={{ border: `1px solid ${color}20` }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            style={{ transform: 'translateZ(0)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(6,12,26,0.85) 0%, rgba(6,12,26,0.15) 55%, transparent 100%)' }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 40%, ${color}22 0%, transparent 60%)`,
              opacity: canTilt ? 1 : 0,
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  if (!project) return <Navigate to="/works" replace />

  const index = projects.findIndex((p) => p.id === id)
  const prevProject = projects[(index - 1 + projects.length) % projects.length]
  const nextProject = projects[(index + 1) % projects.length]

  const meta = [
    { icon: User, label: 'Role', value: project.role },
    { icon: Clock, label: 'Timeline', value: project.timeline },
    { icon: Calendar, label: 'Year', value: project.year },
  ]

  const overview = [
    { icon: Target, label: 'Problem', copy: project.problem },
    { icon: Compass, label: 'Approach', copy: project.approach },
    { icon: Trophy, label: 'Outcome', copy: project.outcome },
  ]

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.image,
    url: `https://usmankhatri.vercel.app/works/${project.id}`,
    dateCreated: project.year,
    creator: {
      '@type': 'Person',
      name: 'Usman Khatri',
      url: 'https://usmankhatri.vercel.app',
    },
    keywords: project.tech.join(', '),
  }

  return (
    <>
      <SEO
        title={project.title}
        description={project.description}
        image={project.image}
        url={`/works/${project.id}`}
        article
        jsonLd={projectJsonLd}
      />

      <main id="main-content" className="min-h-screen pt-16 sm:pt-20 pb-16">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-8 sm:pt-12 mb-6 sm:mb-10"
          >
            <Link
              to="/works"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-500 hover:text-white transition-colors font-heading group"
            >
              <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
              All Projects
            </Link>
          </motion.div>

          {/* Full-bleed hero with tilt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: APPLE_EASE }}
            className="relative mb-8 sm:mb-12"
          >
            <TiltHeroImage src={project.image} alt={`${project.title} project preview`} color={project.color} />

            {/* Category badge */}
            <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10">
              <span
                className="text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-heading"
                style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}30`, backdropFilter: 'blur(12px)' }}
              >
                {project.category}
              </span>
            </div>
          </motion.div>

          {/* Title + description + links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.1 }}
            className="mb-8 sm:mb-10"
          >
            <h1
              className="font-heading font-extrabold tracking-tighter text-white mb-2 sm:mb-3"
              style={{ fontSize: 'clamp(1.5rem, 3.8vw, 4.5rem)' }}
            >
              {project.title}
            </h1>
            <p className="text-zinc-400 text-sm sm:text-lg max-w-2xl mb-6 leading-relaxed">
              {project.role} · {project.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white font-heading transition-all hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}CC 100%)`, boxShadow: `0 0 24px ${project.color}40` }}
                >
                  <ExternalLink className="size-3.5 sm:size-4" />
                  View Live
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold text-zinc-300 font-heading hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <FiGithub className="size-3.5 sm:size-4" />
                  Source Code
                </a>
              )}
            </div>
          </motion.div>

          {/* Meta cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-3 sm:gap-4 mb-12 sm:mb-16"
          >
            {meta.map(({ icon: Icon, label, value }) => (
              <SpotlightCard key={label} className="p-4 sm:p-5 text-center">
                <Icon className="size-4 text-primary-light mx-auto mb-1.5 sm:mb-2" />
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-500 font-heading mb-1">{label}</p>
                <p className="font-heading font-bold text-white text-xs sm:text-sm">{value}</p>
              </SpotlightCard>
            ))}
          </motion.div>

          {/* Overview */}
          <section aria-labelledby="overview-heading" className="mb-12 sm:mb-16">
            <h2 id="overview-heading" className="font-heading font-bold text-white text-xl sm:text-2xl mb-4 sm:mb-6">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {overview.map(({ icon: Icon, label, copy }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.6, ease: APPLE_EASE, delay: i * 0.1 }}
                >
                  <SpotlightCard className="h-full p-5 sm:p-6">
                    <div
                      className="size-8 sm:size-9 rounded-lg flex items-center justify-center mb-3 sm:mb-4"
                      style={{ background: `${project.color}15`, border: `1px solid ${project.color}25` }}
                    >
                      <Icon className="size-4" style={{ color: project.color }} />
                    </div>
                    <p className="text-[10px] sm:text-xs tracking-widest uppercase text-zinc-500 font-heading mb-2">{label}</p>
                    <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">{copy}</p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base max-w-3xl">{project.longDescription}</p>
          </section>

          <SectionDivider />

          {/* Tech stack */}
          <section aria-labelledby="stack-heading" className="mb-12 sm:mb-16">
            <h2 id="stack-heading" className="font-heading font-bold text-white text-xl sm:text-2xl mb-4 sm:mb-5">Tech Stack</h2>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tech.map((t, i) => (
                <TechBadge key={t} label={t} index={i} />
              ))}
            </div>
          </section>

          <SectionDivider />

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section aria-labelledby="gallery-heading" className="mb-12 sm:mb-16">
              <h2 id="gallery-heading" className="font-heading font-bold text-white text-xl sm:text-2xl mb-4 sm:mb-6">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {project.gallery.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.7, ease: APPLE_EASE, delay: (i % 2) * 0.08 }}
                    className={cn('relative rounded-xl sm:rounded-2xl overflow-hidden', i === 0 && 'sm:col-span-2')}
                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <img
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="w-full h-full object-cover"
                      style={{ aspectRatio: i === 0 ? '16/8' : '4/3' }}
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          <SectionDivider />

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <section aria-labelledby="results-heading" className="mb-16 sm:mb-20">
              <h2 id="results-heading" className="font-heading font-bold text-white text-xl sm:text-2xl mb-4 sm:mb-6">What Shipped</h2>
              <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-3 sm:gap-4">
                {project.results.map((r, i) => (
                  <motion.div
                    key={r.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.6, ease: APPLE_EASE, delay: i * 0.08 }}
                  >
                    <SpotlightCard className="p-5 sm:p-6 text-center h-full">
                      <p className="font-display text-2xl sm:text-4xl tracking-wide mb-1" style={{ color: project.color }}>
                        {r.value}
                      </p>
                      <p className="text-[10px] sm:text-[11px] tracking-widest uppercase text-zinc-500 font-heading">{r.label}</p>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          <SectionDivider />

          {/* Previous / Next navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, ease: APPLE_EASE }}
            aria-label="More projects"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-6 sm:pt-8 pb-12 sm:pb-16"
          >
            <button
              onClick={() => navigate(`/works/${prevProject.id}`)}
              className="group text-left p-4 sm:p-5 rounded-2xl transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="flex items-center gap-1.5 text-[10px] sm:text-xs tracking-widest uppercase text-zinc-500 font-heading mb-1.5 sm:mb-2">
                <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Previous
              </span>
              <span className="font-heading font-bold text-white text-base sm:text-lg">{prevProject.title}</span>
            </button>
            <button
              onClick={() => navigate(`/works/${nextProject.id}`)}
              className="group text-right p-4 sm:p-5 rounded-2xl transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="flex items-center justify-end gap-1.5 text-[10px] sm:text-xs tracking-widest uppercase text-zinc-500 font-heading mb-1.5 sm:mb-2">
                Next
                <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="font-heading font-bold text-white text-base sm:text-lg">{nextProject.title}</span>
            </button>
          </motion.nav>
        </div>
      </main>
    </>
  )
}
