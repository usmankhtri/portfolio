import { motion } from 'framer-motion'
import { APPLE_EASE } from '../../../lib/utils'
import { getTechIcon } from '../../../lib/techIcons'
import { portfolioData } from '../../../data/portfolioData'
import { Layers, Cpu, Database, Wrench } from 'lucide-react'
import { SceneShell } from '../../ui/SceneShell'
import { SceneHeader } from '../../ui/SceneHeader'
import { SpotGlow } from '../../ui/SpotGlow'

const TECH_ITEMS = portfolioData.techStack

const CATEGORIES = [
  {
    name: 'Frontend & UI',
    icon: Layers,
    description: 'Component-driven, pixel-perfect, accessible Web Apps & PWAs',
    filter: (t: (typeof TECH_ITEMS)[number]) => t.category === 'Frontend',
  },
  {
    name: 'Backend & APIs',
    icon: Cpu,
    description: 'Scalable RESTful & GraphQL web services and microservices',
    filter: (t: (typeof TECH_ITEMS)[number]) => t.category === 'Backend',
  },
  {
    name: 'Databases & Caching',
    icon: Database,
    description: 'Relational & NoSQL persistence with high-throughput query caching',
    filter: (t: (typeof TECH_ITEMS)[number]) => t.category === 'Database',
  },
  {
    name: 'DevOps, AI & Tooling',
    icon: Wrench,
    description: 'Modern workflow automation, containerization & AI model integrations',
    filter: (t: (typeof TECH_ITEMS)[number]) => t.category === 'Tools & Cloud',
  },
]

export const TechScene = () => (
  <SceneShell label="Tech Stack" accent="#3B82F6">
    <SceneHeader
      eyebrow="Technologies"
      title={
        <>
          Engineering with <span className="text-gradient">Modern Tech Stack.</span>
        </>
      }
      sub="Crafting resilient digital products powered by battle-tested frameworks, typed languages, and high-performance cloud tooling."
    />

    {/* Creative chip ticker — instrument tiles, not plain pills */}
    <div className="relative w-full overflow-hidden mb-14" aria-hidden="true">
      <div className="flex w-full overflow-hidden group">
        <div className="flex items-center gap-3 shrink-0 min-w-full animate-marquee group-hover:[animation-play-state:paused]">
          {TECH_ITEMS.concat(TECH_ITEMS, TECH_ITEMS, TECH_ITEMS).map((item, idx) => {
            const Icon = getTechIcon(item.name)
            return (
              <div
                key={`tick-${idx}-${item.name}`}
                className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] py-2 pl-2 pr-4 shrink-0 transition-colors duration-300 hover:border-blue-500/30"
              >
                <span
                  className="flex size-7 items-center justify-center rounded-lg"
                  style={{ background: `${item.color}14`, border: `1px solid ${item.color}30` }}
                >
                  <Icon className="size-3.5" style={{ color: item.color }} />
                </span>
                <span className="font-heading text-[11px] font-semibold text-zinc-200 whitespace-nowrap">
                  {item.name}
                </span>
                <span className="pl-2 border-l border-white/10 font-mono text-[8px] tracking-[0.18em] text-zinc-500 uppercase">
                  {item.level}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 xs:w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 xs:w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />
    </div>

    {/* Four numbered pillars — hairline rows */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
      {CATEGORIES.map((cat, i) => {
        const Icon = cat.icon
        const items = TECH_ITEMS.filter(cat.filter)
        return (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.07, duration: 0.6, ease: APPLE_EASE }}
            className="bg-background group"
          >
            <SpotGlow className="p-6 sm:p-7 flex flex-col gap-4 h-full">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="size-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}
                  >
                    <Icon className="size-4.5 text-primary-light" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-base tracking-tight">{cat.name}</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{cat.description}</p>

              <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/5">
                {items.map((t) => (
                  <span
                    key={t.name}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.06] group-hover:border-primary/25 group-hover:text-zinc-200 transition-colors duration-300"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </SpotGlow>
          </motion.div>
        )
      })}
    </div>
  </SceneShell>
)