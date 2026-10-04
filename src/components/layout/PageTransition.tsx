import { motion } from 'framer-motion'
import { APPLE_EASE } from '../../lib/utils'
import type { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
      transition={{ duration: 0.55, ease: APPLE_EASE }}
    >
      {children}
    </motion.div>
  )
}
