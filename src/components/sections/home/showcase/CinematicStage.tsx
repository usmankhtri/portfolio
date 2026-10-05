import { useRef } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, ExternalLink, MoveUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProjectScrub, type Project } from './useProjectScrub'

interface CinematicStageProps {
  project: Project
  index: number
}

export const CinematicStage = ({ project, index }: CinematicStageProps) => {
  const ref = useRef<HTMLElement | null>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const s = useProjectScrub(ref)
  const accent = project.color ?? '#2563EB'
  const flip = index % 2 === 1

  const imageFilter = useTransform(s.brightness, (b) => `brightness(${b})`)

  const handleGlare = (e: React.MouseEvent) => {
    const el = glareRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--gx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--gy', `${e.clientY - rect.top}px`)
  }

  return (
    <section
      ref={ref}
      className="
        relative
        h-auto
        py-8
        sm:py-12
        md:py-0
        md:h-[74vh]
        md:min-h-[480px]
        md:max-h-[860px]
        w-full
        flex
        items-center
        justify-center
        px-3
        xs:px-4
        sm:px-8
      "
      aria-label={`Project ${index + 1}: ${project.title}`}
    >
      {/* Accent glow bloom — per-project color grading */}
      <motion.div
        style={{
          opacity: s.glowOpacity,
          background: `radial-gradient(circle, ${accent}1F 0%, transparent 70%)`,
        }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-[min(96vw,1280px)] h-[480px] rounded-full blur-[110px] pointer-events-none"
      />

      <motion.article
        onMouseMove={handleGlare}
        style={{
          opacity: s.cardOpacity,
          y: s.cardY,
          scale: s.cardScale,
          rotateX: s.cardRotateX,
          clipPath: s.cardClip,
        }}
        className="
          group
          relative
          w-full
          max-w-7xl
          h-auto
          pb-6
          sm:pb-8
          md:pb-0
          md:h-[min(72vh,640px)]
          md:min-h-[520px]
          rounded-[24px]
          sm:rounded-[28px]
          overflow-hidden
          border
          border-white/[0.09]
          bg-[#07101f]
          shadow-[0_35px_100px_rgba(0,0,0,0.55)]
          will-change-transform
        "
      >
        {/* Card glass highlight */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(120deg, rgba(255,255,255,0.045), transparent 25%, transparent 75%, rgba(37,99,235,0.035))',
          }}
        />

        {/* Top edge light — accent tinted */}
        <div
          className="absolute z-30 top-0 left-[12%] right-[12%] h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}B3, transparent)`,
          }}
        />

        {/* ===================================================== */}
        {/* IMAGE — full-bleed cinematic frame                    */}
        {/* ===================================================== */}

        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full md:aspect-auto md:absolute md:inset-0 md:h-full overflow-hidden">
          <motion.img
            src={project.image}
            alt={`${project.title} screenshot`}
            style={{
              scale: s.imageScale,
              x: s.imageX,
              y: s.imageY,
              rotate: s.imageRotate,
              filter: imageFilter,
            }}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              object-top
              will-change-transform
            "
            loading={index === 0 ? 'eager' : 'lazy'}
          />

          {/* Letterbox top bar */}
          <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-black/55 to-transparent pointer-events-none" />

          {/* Bottom cinematic scrim */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

          {/* Category chip */}
          <div className="absolute top-4 sm:top-5 left-4 sm:left-5">
            <span
              className="px-3 py-1.5 rounded-full backdrop-blur-xl text-[11px] font-semibold"
              style={{
                color: accent,
                background: `${accent}1A`,
                border: `1px solid ${accent}40`,
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Year */}
          <div className="absolute top-4 sm:top-5 right-4 sm:right-5">
            <span className="px-2.5 py-1.5 rounded-lg bg-black/50 backdrop-blur-xl border border-white/10 text-[11px] text-zinc-300">
              {project.year}
            </span>
          </div>
        </div>

        {/* ===================================================== */}
        {/* CAPTION — cinematic overlay on desktop, stack on mobile     */}
        {/* ===================================================== */}

        <div className="relative z-10 p-5 sm:p-6 md:absolute md:inset-x-0 md:bottom-0 md:p-0">
          <motion.div
            style={{ y: s.captionY, opacity: s.captionOpacity }}
            className={`
              flex
              flex-col
              gap-3.5
              md:bg-gradient-to-t
              md:from-[#07101f]
              md:via-[#07101f]/85
              md:to-transparent
              md:pt-28
              md:pb-7
              md:px-8
              lg:px-12
              ${flip ? 'md:items-end md:text-right' : ''}
            `}
          >
            {/* Eyebrow */}
            <div className={`flex items-center gap-2 ${flip ? 'md:flex-row-reverse' : ''}`}>
              <span className="relative flex w-2 h-2">
                <span
                  className="absolute inline-flex w-full h-full rounded-full opacity-40 animate-ping"
                  style={{ background: accent }}
                />
                <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: accent }} />
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-semibold">
                Featured Build · {project.role}
              </span>
            </div>

            {/* Title + accent rule */}
            <h3 className="font-heading font-extrabold text-white text-xl sm:text-2xl lg:text-[2.65rem] leading-[1.02] tracking-tight">
              {project.title}
            </h3>
            <div
              className={`h-px w-16 ${flip ? 'md:ml-auto' : ''}`}
              style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
            />

            <p className="text-xs sm:text-sm leading-[1.7] text-zinc-400 line-clamp-2 md:line-clamp-3 max-w-xl">
              {project.description}
            </p>

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.results.slice(0, 2).map((result) => (
                  <div
                    key={result.label}
                    className="
                      flex
                      items-center
                      gap-2
                      px-3
                      py-2
                      rounded-xl
                      bg-white/[0.035]
                      border
                      border-white/[0.07]
                    "
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                    <span className="text-[9px] text-zinc-600 font-mono">{result.label}</span>
                    <span className="text-[10px] text-zinc-100 font-bold font-mono">{result.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Technologies */}
            <div className="hidden sm:flex flex-wrap gap-1.5">
              {project.tech.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="
                    px-2.5
                    py-1
                    rounded-lg
                    bg-white/[0.03]
                    border
                    border-white/[0.06]
                    text-[9px]
                    sm:text-[10px]
                    text-zinc-400
                    font-medium
                  "
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className={`flex flex-wrap items-center gap-2.5 pt-1 ${flip ? 'md:justify-end' : ''}`}>
              <Link
                to={`/works/${project.id}`}
                className="
                  group/button
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-full
                  text-xs
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:scale-[1.035]
                "
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  boxShadow: '0 0 25px rgba(37,99,235,0.25)',
                }}
              >
                <span>Read Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
              </Link>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group/live
                    inline-flex
                    items-center
                    gap-1.5
                    px-4
                    py-2.5
                    rounded-full
                    text-xs
                    font-semibold
                    transition-all
                    duration-300
                    hover:bg-white/[0.04]
                    hover:border-white/25
                    hover:text-white
                  "
                  style={{ color: accent, borderColor: `${accent}40`, background: `${accent}0A` }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom progress line — accent tinted */}
        <div className="absolute z-30 bottom-0 left-0 right-0 h-px bg-white/[0.05]">
          <StageProgress progress={s.progress} accent={accent} />
        </div>

        {/* Mouse glare — light follows the cursor across the still */}
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.055) 0%, transparent 60%)',
          }}
        />

        {/* Corner decoration */}
        <MoveUpRight
          className="absolute z-30 bottom-5 right-5 w-4 h-4 text-white/10 transition-colors duration-500 group-hover:text-blue-400/40"
        />
      </motion.article>
    </section>
  )
}

/* ================================================================= */
/* STAGE PROGRESS LINE                                                */
/* ================================================================= */

const StageProgress = ({
  progress,
  accent,
}: {
  progress: MotionValue<number>
  accent: string
}) => {
  const width = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 1],
    ['0%', '35%', '65%', '85%', '100%'],
  )

  const opacity = useTransform(
    progress,
    [0, 0.2, 0.5, 0.85, 1],
    [0.2, 0.8, 1, 0.8, 0.2],
  )

  return (
    <motion.div
      style={{ width, opacity, background: `linear-gradient(90deg, ${accent}, #93C5FD)` }}
      className="h-full"
    />
  )
}
