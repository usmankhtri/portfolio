import React, { useEffect, useRef } from 'react'
import { motion, animate, useInView, useReducedMotion } from 'framer-motion'
import { Rocket, ShieldCheck, Zap, Code } from 'lucide-react'

export interface StatItem {
  value: string
  label: string
  sublabel: string
  icon: React.ElementType
  color: string
  borderColor: string
  bgColor: string
}

const STATS_DATA: StatItem[] = [
  {
    value: '12+',
    label: 'Production Apps Shipped',
    sublabel: 'Full-Stack MERN & PWAs',
    icon: Rocket,
    color: '#60A5FA',
    borderColor: 'rgba(96,165,250,0.25)',
    bgColor: 'rgba(96,165,250,0.08)',
  },
  {
    value: '3+ Yrs',
    label: 'Professional Experience',
    sublabel: 'Web & AI Product Engineering',
    icon: Code,
    color: '#3B82F6',
    borderColor: 'rgba(59,130,246,0.25)',
    bgColor: 'rgba(59,130,246,0.08)',
  },
  {
    value: '100%',
    label: 'Client Satisfaction Rate',
    sublabel: 'On-time Delivery & Clean Code',
    icon: ShieldCheck,
    color: '#2563EB',
    borderColor: 'rgba(37,99,235,0.25)',
    bgColor: 'rgba(37,99,235,0.08)',
  },
  {
    value: '<100ms',
    label: 'Avg Performance Latency',
    sublabel: 'Optimized Vitals & WebSockets',
    icon: Zap,
    color: '#93C5FD',
    borderColor: 'rgba(147,197,253,0.25)',
    bgColor: 'rgba(147,197,253,0.08)',
  },
]

/* Count-up value — pulls the leading number out of a string like "12+"
   or "<100ms" and animates it once the cell scrolls into view. */
const Counter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    const match = value.match(/^(<)?([\d.]+)(.*)$/)
    if (!match || reduced) {
      el.textContent = value
      return
    }
    const [, prefix = '', raw, suffix = ''] = match
    const target = parseFloat(raw)
    if (Number.isNaN(target)) {
      el.textContent = value
      return
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`
      },
      onComplete: () => {
        el.textContent = value
      },
    })
    return () => controls.stop()
  }, [inView, reduced, value])

  return <span ref={ref}>{value}</span>
}

/**
 * Impact counter panel — a glassy blue instrument board: faint engineering
 * grid, center glow, hairline cells with index chips, icons, gradient
 * count-up values and film-style corner ticks on hover.
 */
export const CreativeStatsBar = ({ data = STATS_DATA }: { data?: StatItem[] }) => {
  return (
    <div className="relative w-full" aria-label="Key Performance Indicators">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {data.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut', delay: index * 0.08 }}
              className="group relative rounded-2xl border border-white/[0.08] bg-[#07101f]/90 p-5 xs:p-6 sm:p-7 flex flex-col justify-between gap-5 hover:border-blue-500/35 hover:bg-[#07101f] transition-all duration-300 shadow-xl overflow-hidden cursor-default will-change-transform"
            >
              {/* Engineering grid subtle pattern */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
              />

              {/* Ambient hover bloom */}
              <div
                aria-hidden
                className="absolute -top-12 -right-12 size-32 rounded-full opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 pointer-events-none"
                style={{ background: stat.color }}
              />

              {/* Film-style corner ticks */}
              <span className="pointer-events-none absolute left-3 top-3 size-2.5 border-l border-t border-blue-400/0 group-hover:border-blue-400/60 transition-colors duration-300" />
              <span className="pointer-events-none absolute bottom-3 right-3 size-2.5 border-b border-r border-blue-400/0 group-hover:border-blue-400/60 transition-colors duration-300" />

              {/* Index + icon chip */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.3em] text-blue-400/80">
                  0{index + 1}
                </span>
                <span
                  className="flex size-9 sm:size-11 items-center justify-center rounded-xl border transition-colors duration-500 group-hover:bg-white/[0.06]"
                  style={{ borderColor: stat.borderColor, background: stat.bgColor }}
                >
                  <Icon
                    className="size-4.5 sm:size-5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                    style={{ color: stat.color }}
                  />
                </span>
              </div>

              {/* Gradient count-up value */}
              <div
                className="relative z-10 bg-clip-text text-transparent my-1"
                style={{ backgroundImage: `linear-gradient(135deg, #E0F2FE 0%, ${stat.color} 70%)` }}
              >
                <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl leading-none tracking-tighter">
                  <Counter value={stat.value} />
                </span>
              </div>

              {/* Label + sublabel */}
              <div className="relative z-10 space-y-1">
                <span className="block font-heading font-semibold text-xs uppercase tracking-[0.16em] text-white">
                  {stat.label}
                </span>
                <span className="block font-mono text-[10px] text-zinc-400">{stat.sublabel}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
