import { motion } from 'framer-motion'
import {
  ArrowRight,
  Code2,
  Compass,
  Cpu,
  Crosshair,
  Database,
  Gauge,
  Layers,
  Lightbulb,
  Smartphone,
  Wand2,
  type LucideIcon,
} from 'lucide-react'
import { portfolioData } from '../../../data/portfolioData'
import { APPLE_EASE } from '../../../lib/utils'
import { FilmScene } from './FilmScene'
import { Starfield } from './Starfield'

const SERVICE_ICONS: Record<string, LucideIcon> = {
  Code2,
  Smartphone,
  Wand2,
  Database,
  Layers,
  Cpu,
}

const VALUE_ICONS: Record<string, LucideIcon> = {
  Crosshair,
  Gauge,
  Lightbulb,
  Compass,
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']
const WORDS = ['Ready', 'to', 'build', 'something', 'bold?']

/**
 * Scene 4 — The promise. The emotional peak: services flip in like the
 * articles of a contract (numbered, ruled), the values seal in beneath,
 * and the closing statement cascades word by word under a breathing glow —
 * the only question the site exists to answer.
 */
export function PromiseScene() {
  const services = portfolioData.services
  const values = portfolioData.about.values

  return (
    <FilmScene>
      <Starfield />

      {/* Film-slate heading */}
      <motion.div
        className="absolute left-6 sm:left-10 top-[9vh] z-10 text-left"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: APPLE_EASE }}
      >
        <h2 className="font-heading font-black tracking-[0.3em] text-white/90 text-base sm:text-lg">
          THE <span className="text-gradient-blue">PROMISE.</span>
        </h2>
        <p className="mt-1.5 text-[9px] uppercase tracking-[0.45em] text-white/35">What you can count on</p>
      </motion.div>

      {/* Breathing glow behind the statement */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.55, 1] }}
        transition={{ delay: 2.5, duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="h-[58vmin] w-[58vmin] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.16) 0%, transparent 65%)' }}
        />
      </motion.div>

      <div
        className="relative z-10 flex w-full max-w-[min(94vw,820px)] flex-col items-center px-5 pb-[5vh]"
        style={{ perspective: 1000 }}
      >
        {/* The articles — services flip in like a signed contract */}
        <div className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon] ?? Code2
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, rotateX: -85, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, rotateX: 0, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.6, ease: APPLE_EASE }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 backdrop-blur-sm transition-colors duration-300 hover:border-blue-300/40"
              >
                <motion.span
                  aria-hidden
                  className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.55 + i * 0.08, duration: 0.5, ease: APPLE_EASE }}
                />
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[9px] text-blue-200/40">{ROMAN[i]}</span>
                  <Icon size={15} className="shrink-0 text-blue-300" />
                  <span className="text-left text-xs sm:text-sm font-medium leading-snug text-white/85">
                    {s.title}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* The values — seals pop in */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {values.map((v, i) => {
            const Icon = VALUE_ICONS[v.icon] ?? Compass
            return (
              <motion.span
                key={v.title}
                initial={{ opacity: 0, scale: 0.6, y: 10 }}
                animate={{ opacity: 1, scale: [0.6, 1.12, 1], y: 0 }}
                transition={{ delay: 1.7 + i * 0.1, duration: 0.5, times: [0, 0.7, 1], ease: APPLE_EASE }}
                className="flex items-center gap-1.5 rounded-full border border-blue-200/15 bg-blue-500/[0.06] px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-blue-200/70"
              >
                <Icon size={11} />
                {v.title}
              </motion.span>
            )
          })}
        </div>

        {/* Sealed divider */}
        <motion.div
          className="mt-8 flex w-full items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 0.6 }}
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <span className="h-1.5 w-1.5 rotate-45 border border-blue-300/50 bg-blue-400/20" />
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </motion.div>

        {/* The question — cascading words under the glow */}
        <h3
          className="mt-7 text-center font-heading font-black tracking-tight text-white"
          style={{
            fontSize: 'clamp(1.5rem, min(4.2vw, 5.5vh), 2.6rem)',
            textShadow: '0 0 30px rgba(96,165,250,0.25)',
          }}
        >
          {WORDS.map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className={`inline-block ${wi >= 3 ? 'text-gradient-blue' : ''}`}
                initial={{ y: '115%', filter: 'blur(8px)' }}
                animate={{ y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 2.6 + wi * 0.12, duration: 0.7, ease: APPLE_EASE }}
              >
                {word}&nbsp;
              </motion.span>
            </span>
          ))}
        </h3>

        {/* The seal — email + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.7, duration: 0.7, ease: APPLE_EASE }}
          className="mt-6 flex items-center gap-2.5 rounded-full border border-blue-300/25 bg-blue-500/10 px-5 py-2.5"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-100/85">
            {portfolioData.about.email}
          </span>
          <ArrowRight size={12} className="text-blue-300" />
        </motion.div>
      </div>
    </FilmScene>
  )
}