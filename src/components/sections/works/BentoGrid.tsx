import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, ExternalLink, Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { TechBadge } from '../../ui/TechBadge'
import { APPLE_EASE } from '../../../lib/utils'
import type { portfolioData } from '../../../data/portfolioData'

type Project = (typeof portfolioData.projects)[number]

interface BentoGridProps {
  projects: Project[]
}

const CATEGORIES = ['All', 'SaaS Platform', 'Content Platform', 'Developer Tooling', 'AI Integration']
const PER_PAGE = 15

export function BentoGrid({ projects }: BentoGridProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [hovered, setHovered] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory
      const matchesSearch =
        search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [projects, activeCategory, search])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // Reset to page 1 when filters change
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setPage(1)
  }
  const handleSearchChange = (val: string) => {
    setSearch(val)
    setPage(1)
  }

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: APPLE_EASE }}
        className="mb-8 sm:mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-blue-500/50" />
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-blue-300">Browse All</span>
          <span className="h-px w-10 bg-gradient-to-r from-blue-500/50 to-transparent" />
        </div>
        <h2 className="font-heading font-black tracking-tighter text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
          All Projects
        </h2>
      </motion.div>

      {/* Search + Filters */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, ease: APPLE_EASE }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
      >
        {/* Search bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search projects, tech..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.06] transition-all duration-300 font-heading"
          />
          {search && (
            <button onClick={() => handleSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className="px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all duration-300"
              style={{
                background: activeCategory === cat ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.04)',
                color: activeCategory === cat ? '#60A5FA' : '#71717a',
                border: `1px solid ${activeCategory === cat ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Result count */}
        <span className="text-[11px] text-zinc-600 ml-auto hidden sm:block">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}{totalPages > 1 && ` · Page ${page} of ${totalPages}`}
        </span>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pb-16 sm:pb-24">
        <AnimatePresence mode="popLayout">
          {paginated.map((project, i) => {
            const displayIndex = projects.indexOf(project)
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: APPLE_EASE }}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                className="group"
              >
                <div
                  role="link"
                  tabIndex={0}
                  onClick={() => navigate(`/works/${project.id}`)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/works/${project.id}`)}
                  aria-label={`View case study: ${project.title}`}
                  className="relative rounded-2xl overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all duration-500 h-full flex flex-col"
                  style={{
                    border: `1px solid ${hovered === project.id ? `${project.color}30` : 'rgba(255,255,255,0.06)'}`,
                    boxShadow: hovered === project.id ? `0 0 40px ${project.color}10, 0 8px 30px rgba(0,0,0,0.3)` : '0 4px 20px rgba(0,0,0,0.2)',
                  }}
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out"
                      style={{ transform: hovered === project.id ? 'scale(1.06)' : 'scale(1)' }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,12,26,0.85) 0%, rgba(6,12,26,0.2) 40%, transparent 60%)' }} />

                    {/* Ghost number */}
                    <div
                      className="absolute top-4 right-4 font-display text-5xl leading-none select-none pointer-events-none transition-opacity duration-500"
                      style={{ color: project.color, opacity: hovered === project.id ? 0.15 : 0.06 }}
                      aria-hidden
                    >
                      {String(displayIndex + 1).padStart(2, '0')}
                    </div>

                    {/* Category badge */}
                    <div className="absolute bottom-4 left-4">
                      <span
                        className="text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full font-heading"
                        style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}30` }}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 bg-[#0a1525]/80">
                    <h3 className="font-heading font-bold tracking-tight text-white mb-2" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {project.description}
                    </p>

                    {/* Results */}
                    {project.results && project.results.length > 0 && (
                      <div className="flex flex-wrap gap-3 mb-4">
                        {project.results.slice(0, 3).map((r) => (
                          <div key={r.label}>
                            <span className="font-heading text-base font-bold" style={{ color: project.color }}>{r.value}</span>
                            <span className="text-[9px] text-zinc-500 uppercase ml-1">{r.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, 3).map((t, ti) => (
                        <TechBadge key={t} label={t} index={ti} />
                      ))}
                      {project.tech.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 text-[9px] text-zinc-500">+{project.tech.length - 3}</span>
                      )}
                    </div>

                    {/* Bottom row */}
                    <div className="flex items-center gap-3 pt-4 mt-auto border-t border-white/5">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-white font-heading">
                        View Project
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>

                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label={`${project.title} GitHub`} className="text-zinc-600 hover:text-zinc-300 transition-colors">
                          <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label={`${project.title} live`} className="text-zinc-600 hover:text-zinc-300 transition-colors">
                          <ExternalLink className="size-3.5" />
                        </a>
                      )}
                      <span className="text-[10px] text-zinc-600 ml-auto">{project.role}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 pb-16 sm:pb-24"
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="size-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-xs font-heading font-semibold transition-all duration-300"
              style={{
                background: p === page ? 'rgba(37,99,235,0.2)' : 'transparent',
                color: p === page ? '#60A5FA' : '#71717a',
                border: `1px solid ${p === page ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="size-4" />
          </button>
        </motion.div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
          <SlidersHorizontal className="size-8 text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-400 text-sm font-heading">No projects match your search</p>
          <button onClick={() => { handleSearchChange(''); handleCategoryChange('All') }} className="mt-3 text-xs text-blue-400 hover:text-blue-300 font-heading transition-colors">
            Clear filters
          </button>
        </motion.div>
      )}
    </div>
  )
}
