import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { APPLE_EASE } from '../../lib/utils'

interface SceneHeaderProps {
  eyebrow?: string
  title: ReactNode
  sub?: string
  className?: string
}

/**
 * Unified scene header — one shared block (hairline rule + eyebrow,
 * title, sub-copy) so every section speaks the same language.
 */
export const SceneHeader = ({ eyebrow, title, sub, className }: SceneHeaderProps) => (
  <div className={cn('mb-12 sm:mb-16', className)}>
    {eyebrow && (
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: APPLE_EASE }}
        className="flex items-center gap-3 mb-4"
      >
        <span className="w-10 h-px bg-primary-light/50" />
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary-light">
          {eyebrow}
        </span>
      </motion.div>
    )}

    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: APPLE_EASE }}
      className="font-heading font-extrabold tracking-tighter text-white"
      style={{ fontSize: 'clamp(1.5rem, 3.8vw, 3.4rem)' }}
    >
      {title}
    </motion.h2>

    {sub && (
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: APPLE_EASE, delay: 0.1 }}
        className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl mt-4"
      >
        {sub}
      </motion.p>
    )}
  </div>
)