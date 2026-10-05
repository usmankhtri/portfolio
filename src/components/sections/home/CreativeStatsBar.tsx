import React, { useEffect, useRef } from 'react'
import { motion, animate, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '../../../lib/utils'
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
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]/60 backdrop-blur-md">
        {/* Engineering grid */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.05)_1px,transparent_1px)] bg-[size:48px_48px]"
        />
        {/* Center glow */}
        <div
          aria-hidden
          className="absolute -top-28 left-1/2 -translate-x-1/2 size-72 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, rgba(59,130,246,0) 70%)' }}
        />
        {/* Radial gradient glow behind the stats grid */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"
        />
        {/* Bottom accent hairline */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
        />

        <div className="relative grid grid-cols-2 lg:grid-cols-4 py-8 sm:py-10">
          {data.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut', delay: index * 0.08 }}
                className={cn(
                  'group relative flex flex-col justify-between gap-4 xs:gap-5 sm:gap-6 p-3.5 xs:p-5 sm:p-7 lg:p-10 cursor-default will-change-transform',
                  'hover:border-blue-500/30 hover:bg-blue-950/20 transition-colors duration-300',
                  index % 2 === 1 && 'border-l border-white/[0.06]',
                  index > 0 && 'lg:border-l border-white/[0.06]',
                  index >= 2 && 'border-t lg:border-t-0 border-white/[0.06]',
                )}
              >
                {/* Film-style corner ticks, appear on hover */}
                <span className="pointer-events-none absolute left-2.5 top-2.5 size-2.5 border-l border-t border-blue-400/0 group-hover:border-blue-400/50 transition-colors duration-500" />
                <span className="pointer-events-none absolute bottom-2.5 right-2.5 size-2.5 border-b border-r border-blue-400/0 group-hover:border-blue-400/50 transition-colors duration-500" />

                {/* Index + icon chip */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-blue-400/80">
                    0{index + 1}
                  </span>
                  <span
                    className="flex size-8 xs:size-9 sm:size-11 items-center justify-center rounded-lg border transition-colors duration-500 group-hover:bg-white/[0.04]"
                    style={{ borderColor: stat.borderColor, background: stat.bgColor }}
                  >
                    <Icon
                      className="size-4 sm:size-5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                      style={{ color: stat.color }}
                    />
                  </span>
                </div>

                {/* Gradient count-up value */}
                <div
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(135deg, #E0F2FE 0%, ${stat.color} 60%)` }}
                >
                  <span className="font-display font-black text-2xl xs:text-3xl sm:text-4xl lg:text-6xl leading-none tracking-tighter">
                    <Counter value={stat.value} />
                  </span>
                </div>

                {/* Label + sublabel */}
                <div className="space-y-1">
                  <span className="block font-heading font-semibold text-xs uppercase tracking-[0.18em] text-white">
                    {stat.label}
                  </span>
                  <span className="block font-mono text-[10px] text-zinc-400">{stat.sublabel}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
