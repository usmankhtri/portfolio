import { useState, useRef } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, ExternalLink, MoveUpRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useProjectScrub, type Project } from './useProjectScrub'
import { useAppStore } from '../../../../store/useAppStore'

interface CinematicStageProps {
  project: Project
  index: number
}

export const CinematicStage = ({ project, index }: CinematicStageProps) => {
  const ref = useRef<HTMLElement | null>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  const s = useProjectScrub(ref)
  const accent = project.color ?? '#2563EB'
  const flip = index % 2 === 1

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
        w-full
        flex
        items-center
        justify-center
        px-3
        xs:px-4
        sm:px-8
        py-0
      "
      aria-label={`Project ${index + 1}: ${project.title}`}
    >
      {/* Accent glow bloom — per-project color grading */}
      <motion.div
        style={{
          opacity: isHovered ? 0.38 : s.glowOpacity,
          background: `radial-gradient(circle, ${accent}30 0%, transparent 70%)`,
        }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-[min(96vw,1280px)] h-[480px] rounded-full blur-[110px] pointer-events-none transition-opacity duration-500"
      />

      <motion.article
        onMouseMove={handleGlare}
        onMouseEnter={() => {
          setIsHovered(true)
          setCursorVariant('hover')
        }}
        onMouseLeave={() => {
          setIsHovered(false)
          setCursorVariant('default')
        }}
        onClick={(e) => {
          const target = e.target as HTMLElement
          if (target.closest('a, button')) return
          navigate(`/works/${project.id}`)
        }}
        style={{
          transform: isHovered ? 'translateY(-6px) scale(1.008)' : 'translateY(0px) scale(1)',
          borderColor: isHovered ? `${accent}70` : 'rgba(255,255,255,0.09)',
          boxShadow: isHovered
            ? `0 35px 85px -15px rgba(0,0,0,0.85), 0 0 50px ${accent}33, inset 0 1px 0 rgba(255,255,255,0.18)`
            : '0 25px 60px rgba(0,0,0,0.55)',
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
          bg-[#07101f]
          cursor-pointer
          transition-all
          duration-500
          ease-out
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

        {/* Top edge light — accent tinted with hover boost */}
        <div
          className="absolute z-30 top-0 left-[12%] right-[12%] h-px transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${isHovered ? accent : `${accent}B3`}, transparent)`,
            boxShadow: isHovered ? `0 0 12px ${accent}` : 'none',
          }}
        />

        {/* ===================================================== */}
        {/* IMAGE — full-bleed cinematic frame with zoom on hover */}
        {/* ===================================================== */}

        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full md:aspect-auto md:absolute md:inset-0 md:h-full overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            style={{
              transform: isHovered ? 'scale(1.055)' : 'scale(1)',
              filter: isHovered ? 'brightness(1.08)' : 'brightness(1)',
            }}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              object-top
              transition-all
              duration-700
              ease-out
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
              className="px-3 py-1.5 rounded-full backdrop-blur-xl text-[11px] font-semibold transition-all duration-300"
              style={{
                color: accent,
                background: isHovered ? `${accent}30` : `${accent}1A`,
                border: `1px solid ${isHovered ? `${accent}70` : `${accent}40`}`,
                boxShadow: isHovered ? `0 0 14px ${accent}40` : 'none',
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
                Featured Project · {project.role}
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
            background: `radial-gradient(550px circle at var(--gx, 50%) var(--gy, 50%), ${accent}25, rgba(255,255,255,0.08) 25%, transparent 65%)`,
          }}
        />

        {/* Corner decoration — interactive indicator */}
        <MoveUpRight
          className="absolute z-30 bottom-5 right-5 w-4 h-4 transition-all duration-500"
          style={{
            color: isHovered ? accent : 'rgba(255,255,255,0.18)',
            transform: isHovered ? 'translate(3px, -3px) scale(1.2)' : 'translate(0, 0) scale(1)',
          }}
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
