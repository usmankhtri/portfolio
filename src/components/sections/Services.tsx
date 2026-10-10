import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { APPLE_EASE } from '../../lib/utils'
import { Code2, Smartphone, Wand2, Database, Layers, Cpu, ArrowUpRight } from 'lucide-react'
import { portfolioData } from '../../data/portfolioData'
import { SceneShell } from '../ui/SceneShell'
import { SceneHeader } from '../ui/SceneHeader'

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code2, Smartphone, Wand2, Database, Layers, Cpu,
}

const { services } = portfolioData

/* Film-style corner ticks, fade in on hover */
const Ticks = () => (
  <>
    <span className="pointer-events-none absolute left-4 top-4 size-2.5 border-l border-t border-blue-400/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <span className="pointer-events-none absolute bottom-4 right-4 size-2.5 border-b border-r border-blue-400/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  </>
)

export const Services = () => {
  return (
    <SceneShell label="Services" accent="#93C5FD">
      <SceneHeader
        eyebrow="Services"
        title={
          <>
            Built for <span className="text-gradient">ambitious products.</span>
          </>
        }
        sub="From architecture to animation — complete, production-ready digital products that balance engineering precision with exceptional user experience."
      />

      {/* Open service items with generous gaps */}
      <div className="space-y-4 sm:space-y-5">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon] || Code2
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: APPLE_EASE }}
              className="group relative rounded-2xl border border-white/[0.08] bg-[#07101f]/90 p-5 sm:px-8 sm:py-6 transition-all duration-300 hover:border-blue-500/35 hover:bg-[#07101f] shadow-xl flex flex-col sm:grid sm:grid-cols-[auto_1fr_auto] items-start sm:items-center gap-4 sm:gap-6 overflow-hidden"
            >
              <Ticks />

              {/* Mobile header (index + icon + arrow) / Desktop index */}
              <div className="flex w-full items-center justify-between sm:w-auto">
                <div className="flex items-center gap-3">
                  <span className="w-8 sm:w-12 select-none font-display font-black text-2xl sm:text-4xl leading-none text-white/[0.15] sm:text-white/[0.1] transition-colors duration-500 group-hover:text-blue-500/[0.3]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-lg sm:hidden"
                    style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)' }}
                  >
                    <Icon className="size-4 text-blue-400" />
                  </span>
                </div>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/[0.08] sm:hidden">
                  <ArrowUpRight className="size-3.5 text-zinc-400 group-hover:text-blue-300" />
                </span>
              </div>

              {/* Desktop icon + title + description */}
              <div className="flex min-w-0 items-start sm:items-center gap-4 w-full">
                <span
                  className="hidden sm:flex size-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)' }}
                >
                  <Icon className="size-5 text-blue-400" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h3 className="font-heading font-bold text-white text-base tracking-tight sm:text-lg">
                      {service.title}
                    </h3>
                    <span className="rounded-full border border-blue-500/25 bg-blue-950/40 px-2.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-blue-400 uppercase">
                      {service.highlight}
                    </span>
                  </div>
                  <p className="mt-1.5 sm:mt-1 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Desktop Arrow chip */}
              <span className="hidden sm:flex size-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition-all duration-300 group-hover:border-blue-500/35 group-hover:bg-blue-500/[0.1]">
                <ArrowUpRight className="size-4 text-zinc-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-300" />
              </span>
            </motion.div>
          )
        })}

        {/* CTA row — separate card */}
        <Link
          to="/services"
          className="group relative flex items-center justify-between gap-4 rounded-2xl border border-blue-500/25 bg-blue-500/[0.06] hover:bg-blue-500/[0.1] hover:border-blue-500/40 p-5 sm:p-6 transition-all duration-300 shadow-xl"
        >
          <Ticks />
          <div>
            <p className="font-heading font-bold text-white text-sm sm:text-base">
              Explore the full service catalog
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
              Architecture · Apps · AI · Motion
            </p>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full transition-all group-hover:scale-110" style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)' }}>
            <ArrowUpRight className="size-4 text-blue-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </SceneShell>
  )
}