import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { portfolioData } from '../../../data/portfolioData'
import { getTechIcon } from '../../../lib/techIcons'
import { APPLE_EASE } from '../../../lib/utils'
import { FilmScene } from './FilmScene'

const STACK = portfolioData.techStack
const byName = (n: string) => STACK.find((t) => t.name === n) ?? STACK[0]

const STAGES = [
  { num: '01', name: 'Ideate', tools: ['Framer Motion', 'AI Workflows (Gemini API)'], line: 'Where every project begins — the spark, the motion, the idea.' },
  { num: '02', name: 'Design', tools: ['Tailwind CSS', 'CSS3', 'HTML5'], line: 'From wireframe to interface — the look, the feel, the detail.' },
  { num: '03', name: 'Build', tools: ['React 19', 'Next.js 15', 'TypeScript', 'Node.js'], line: 'Where the architecture is forged — front to back, line by line.' },
  { num: '04', name: 'Ship', tools: ['MongoDB', 'Docker', 'Git & GitHub'], line: 'Deployed, live, maintained — the final cut, always running.' },
]

const TAB_MS = 1400

/**
 * Scene 2 — The craft. A working draft board: a matte desk panel with
 * editor chrome, four pipeline tabs, and the tools laid out as cards under
 * each stage. The tabs auto-advance through the process — and are fully
 * clickable, so the scene is interactive, not just decorative. Everything
 * is layered and quiet; nothing glows.
 */
export function CraftScene({ paused }: { paused: boolean }) {
  const [tab, setTab] = useState(0)

  useEffect(() => {
    if (paused) return
    const iv = window.setInterval(() => {
      setTab((t) => (t < STAGES.length - 1 ? t + 1 : t))
    }, TAB_MS)
    return () => clearInterval(iv)
  }, [paused])

  const stage = STAGES[tab]

  return (
    <FilmScene>
      {/* Dip to black — covers identity's fade-out, lifts to reveal the board */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-50 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.35, times: [0, 0.38, 0.62, 1], ease: 'easeInOut' }}
      />

      {/* The set — deep near-black, faint drafting grid, soft falloff */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        style={{
          background:
            'linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px), radial-gradient(ellipse 70% 45% at 50% 0%, rgba(30,41,59,0.3) 0%, transparent 100%), radial-gradient(ellipse 55% 45% at 50% 100%, rgba(15,23,42,0.4) 0%, transparent 100%)',
          backgroundSize: '42px 42px, 42px 42px, auto, auto',
        }}
      />

      {/* Section heading */}
      <motion.h2
        className="absolute left-6 sm:left-10 top-[7vh] z-10 font-heading font-black tracking-[0.3em] text-white/90 text-base sm:text-lg"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7, ease: APPLE_EASE }}
      >
        THE <span className="text-gradient-blue">WORKFLOW.</span>
      </motion.h2>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-5 pb-[5vh]">
        {/* The process board */}
        <motion.div
          className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f1a]/95"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7, ease: APPLE_EASE }}
        >
          {/* Corner ticks */}
          <span aria-hidden className="absolute -left-px -top-px h-3.5 w-3.5 rounded-tl-2xl border-l border-t border-white/15" />
          <span aria-hidden className="absolute -right-px -top-px h-3.5 w-3.5 rounded-tr-2xl border-r border-t border-white/15" />
          <span aria-hidden className="absolute -bottom-px -left-px h-3.5 w-3.5 rounded-bl-2xl border-b border-l border-white/15" />
          <span aria-hidden className="absolute -bottom-px -right-px h-3.5 w-3.5 rounded-br-2xl border-b border-r border-white/15" />

          {/* Chrome header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-blue-400/60" />
            </div>
            <span className="font-mono text-[8px] tracking-[0.3em] text-white/30">DEVELOPMENT PROCESS</span>
          </div>

          {/* Pipeline tabs — clickable */}
          <div className="flex border-b border-white/[0.06]">
            {STAGES.map((s, i) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setTab(i)}
                className={`relative flex-1 px-1 py-3 text-[10px] sm:text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${
                  i === tab ? 'text-white' : 'text-white/35 hover:text-white/70'
                }`}
              >
                <span className="mr-1.5 font-mono text-blue-300/60">{s.num}</span>
                {s.name}
                {i === tab && (
                  <motion.span
                    layoutId="pipeline-tab-underline"
                    className="absolute inset-x-3 bottom-0 h-[2px] bg-blue-300/70"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Stage content — the tools */}
          <div className="relative min-h-[272px] p-5 sm:p-7">
            {/* Stage line */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`line-${tab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-5 font-mono text-[9px] leading-relaxed tracking-[0.2em] text-white/35 sm:text-[10px]"
              >
                {stage.line}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid grid-cols-2 gap-3 sm:gap-4"
              >
                {stage.tools.map((name) => {
                  const tool = byName(name)
                  const Icon = getTechIcon(name)
                  return (
                    <div
                      key={name}
                      className="group flex cursor-pointer items-center gap-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/30 hover:bg-white/[0.04]"
                    >
                      <Icon
                        className="shrink-0 text-[20px] opacity-65 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ color: tool.color }}
                      />
                      <div className="flex min-w-0 flex-col items-start">
                        <span className="truncate text-sm font-medium tracking-wide text-white/85 transition-colors duration-300 group-hover:text-white">
                          {name}
                        </span>
                        <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                          {tool.tag}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </AnimatePresence>

            {/* Giant stage watermark */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`wm-${tab}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                aria-hidden
                className="pointer-events-none absolute bottom-2 right-4 font-heading font-black leading-none text-white/[0.045]"
                style={{ fontSize: 'clamp(4rem, 10vw, 7rem)' }}
              >
                {stage.num}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Status rail */}
          <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-2.5">
            <span className="font-mono text-[8px] tracking-[0.3em] text-white/30">STAGE 03 — WORKFLOW</span>
            <span className="flex items-center gap-1.5">
              {STAGES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 w-1 rounded-full transition-colors duration-300 ${
                    i <= tab ? 'bg-blue-300/70' : 'bg-white/15'
                  }`}
                />
              ))}
              <span className="ml-2 font-mono text-[8px] tracking-[0.3em] text-blue-300/50">
                STEP {tab + 1} / {STAGES.length}
              </span>
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.4, duration: 0.7 }}
          className="mt-7 font-mono text-[9px] uppercase tracking-[0.4em] text-white/20"
        >
          Click the tabs — explore the pipeline
        </motion.p>
      </div>

      {/* Closing caption */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5.5, duration: 0.8, ease: APPLE_EASE }}
        className="absolute inset-x-0 bottom-[5vh] z-10 text-center font-heading text-sm sm:text-base tracking-[0.2em] text-white/70"
      >
        Every system, <span className="text-gradient-blue">engineered by hand.</span>
      </motion.p>
    </FilmScene>
  )
}