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

      {/* The offering board */}
      <div className="relative -mx-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]/60 backdrop-blur-md sm:-mx-10 lg:-mx-12">
        {/* Engineering grid */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.05)_1px,transparent_1px)] bg-[size:48px_48px]"
        />
        {/* Center glow */}
        <div
          aria-hidden
          className="absolute -top-28 left-1/2 -translate-x-1/2 size-72 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #93C5FD 0%, rgba(147,197,253,0) 70%)' }}
        />
        {/* Bottom accent hairline */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
        />

        {/* Board header */}
        <div className="relative flex items-center justify-between border-b border-white/[0.06] px-6 py-4 sm:px-8">
          <span className="font-mono text-[10px] tracking-[0.3em] text-blue-400/80">THE OFFERING</span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
            {services.length} capabilities
          </span>
        </div>

        {/* Service rows */}
        <div className="relative">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: APPLE_EASE }}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/[0.06] px-6 py-6 transition-colors duration-300 hover:bg-white/[0.02] last:border-b-0 sm:gap-6 sm:px-8 sm:py-7"
              >
                <Ticks />

                {/* Ghost index */}
                <span className="w-12 select-none font-display font-black text-3xl leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-blue-500/[0.15] sm:text-4xl">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon + title + description */}
                <div className="flex min-w-0 items-center gap-4">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.18)' }}
                  >
                    <Icon className="size-4.5 text-primary-light" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-heading font-bold text-white text-base tracking-tight sm:text-lg">
                        {service.title}
                      </h3>
                      <span className="rounded-full border border-blue-500/25 bg-blue-950/40 px-2 py-0.5 font-mono text-[9px] tracking-[0.2em] text-blue-400 uppercase">
                        {service.highlight}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Arrow chip */}
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/[0.08]">
                  <ArrowUpRight className="size-4 text-zinc-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-light" />
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* CTA row */}
        <Link
          to="/services"
          className="group relative flex items-center justify-between gap-3 border-t border-white/[0.06] p-5 transition-colors duration-300 hover:bg-white/[0.02] sm:p-6"
        >
          <Ticks />
          <div>
            <p className="font-heading font-bold text-white text-sm sm:text-base">
              Explore the full service catalog
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Architecture · Apps · AI · Motion
            </p>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full transition-all group-hover:scale-110" style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}>
            <ArrowUpRight className="size-4 text-primary-light transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </SceneShell>
  )
}