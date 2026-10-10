import type { ElementType } from 'react'
import { motion } from 'framer-motion'
import { Compass, Crosshair, Diamond, Gauge, Lightbulb } from 'lucide-react'
import { APPLE_EASE } from '../../../lib/utils'
import { portfolioData } from '../../../data/portfolioData'
import { SpotlightCard } from '../../ui/SpotlightCard'

const { about } = portfolioData

const iconMap: Record<string, ElementType> = {
  Crosshair,
  Gauge,
  Lightbulb,
  Compass,
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: APPLE_EASE } },
}

export const AboutValues = () => {
  return (
    <section className="relative py-8 sm:py-12 bg-background overflow-hidden" aria-label="My Principles">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div
          className="absolute top-[-20%] right-[-10%] size-[520px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute bottom-[-30%] left-[-10%] size-[420px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(96,165,250,0.25) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="mb-12 sm:mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.08] backdrop-blur-md mb-4"
          >
            <Diamond className="size-3.5 text-primary-light" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300 font-heading">
              Principles
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-heading font-extrabold tracking-tighter text-white"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            What I <span className="text-gradient">value.</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl mt-3">
            Four principles that guide every architecture decision, code review, and pixel I ship.
          </motion.p>
        </motion.div>

        {/* Values grid — open and spacious */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
        >
          {about.values.map((value) => {
            const Icon = iconMap[value.icon] ?? Compass
            return (
              <motion.div key={value.title} variants={itemVariants} className="h-full">
                <SpotlightCard className="p-6 h-full">
                  <div className="flex flex-col gap-4">
                    <div
                      className="size-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}
                    >
                      <Icon className="size-6 text-primary-light" />
                    </div>
                    <h3 className="font-heading font-bold text-white text-lg tracking-tight">{value.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
