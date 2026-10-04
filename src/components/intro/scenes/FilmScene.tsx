import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { APPLE_EASE } from '../../../lib/utils'

/**
 * Shared scene frame — a clean, fast opacity crossfade. Scenes can override
 * the motion language with `enterFrom` / `exitTo` (e.g. the push-through
 * transition between scene 0 and scene 1).
 */
export function FilmScene({
  children,
  enterFrom,
  exitTo,
  duration = 0.55,
  exitDelay = 0,
}: {
  children: ReactNode
  enterFrom?: Record<string, unknown>
  exitTo?: Record<string, unknown>
  duration?: number
  exitDelay?: number
}) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 1, filter: 'blur(0px)', ...enterFrom }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{
        opacity: 0,
        scale: 1,
        filter: 'blur(0px)',
        ...exitTo,
        transition: { duration, ease: APPLE_EASE, delay: exitDelay },
      }}
      transition={{ duration, ease: APPLE_EASE }}
    >
      {children}
    </motion.div>
  )
}