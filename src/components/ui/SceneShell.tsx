import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { APPLE_EASE } from '../../lib/utils'

interface SceneShellProps {
  label: string
  accent?: string
  children: ReactNode
  className?: string
}

/**
 * Cinematic scene shell — every homepage section is a "scene":
 * a single accent bloom and a curtain clip-path reveal on scroll-in.
 */
export const SceneShell = ({
  label,
  accent = '#2563EB',
  children,
  className,
}: SceneShellProps) => {
  const reduced = useReducedMotion()

  return (
    <section
      className={cn('relative py-10 sm:py-12 md:py-14 bg-background overflow-hidden', className)}
      aria-label={label}
    >
      {/* Single accent bloom — the scene's ambient light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 720px at 85% 12%, ${accent}14 0%, transparent 65%), radial-gradient(circle 560px at 8% 88%, ${accent}0A 0%, transparent 60%)`,
        }}
      />

      {/* Soft fade reveal — reliable on every viewport/section size */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.8, ease: APPLE_EASE }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 xs:px-6 sm:px-10 lg:px-12"
      >
        {children}
      </motion.div>
    </section>
  )
}