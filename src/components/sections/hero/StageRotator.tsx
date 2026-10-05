import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { APPLE_EASE } from '../../../lib/utils'
import { ROLES } from './heroRoles'

/** Spotlight Stage theme — the active role's letters step in one by one with a
 *  light-sweep glow, over a hairline that draws in with a traveling light. */
export const StageRotator = () => {
  const prefersReducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % ROLES.length), 3400)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  const word = ROLES[index]
  const letters = word.split('')
  const lineDelay = prefersReducedMotion ? 0 : 0.3 + letters.length * 0.04

  return (
    <div className="flex items-center justify-center">
      <div className="relative h-9 sm:h-10 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={word}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative flex items-center justify-center whitespace-nowrap pb-[5px]"
          >
            {letters.map((char, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block font-semibold text-sm xs:text-base sm:text-xl md:text-2xl text-gradient-blue tracking-wide"
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 14, filter: 'blur(8px)', textShadow: '0 0 0px rgba(96,165,250,0)' }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        textShadow: '0 0 12px rgba(96,165,250,0.28)',
                      }
                }
                transition={{ duration: 0.5, ease: APPLE_EASE, delay: prefersReducedMotion ? 0 : i * 0.04 }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}

            {/* Underline — hairline base + drawing accent + traveling light */}
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: lineDelay }}
            >
              {/* Faint full-width hairline */}
              <span className="absolute inset-0 rounded-full bg-white/8" />

              {/* Accent draws in from the left */}
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full origin-left"
                style={{
                  background: 'linear-gradient(90deg, #2563EB, #93C5FD)',
                  boxShadow: '0 0 10px rgba(147,197,253,0.55)',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.65, ease: APPLE_EASE, delay: lineDelay }}
              />

              {/* Traveling light dot */}
              <motion.span
                aria-hidden
                className="absolute top-1/2 -translate-y-1/2 size-[5px] rounded-full bg-blue-100"
                style={{ boxShadow: '0 0 8px rgba(147,197,253,1)' }}
                initial={{ left: '0%', opacity: 0 }}
                animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1.15,
                  ease: 'easeInOut',
                  delay: prefersReducedMotion ? 0 : lineDelay + 0.75,
                }}
              />
            </motion.span>
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}