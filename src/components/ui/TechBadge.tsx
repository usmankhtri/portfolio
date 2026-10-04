import { motion } from 'framer-motion'
import { APPLE_EASE, cn } from '../../lib/utils'

interface TechBadgeProps {
  label: string
  className?: string
  index?: number
}

export const TechBadge = ({ label, className, index = 0 }: TechBadgeProps) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: APPLE_EASE }}
      whileHover={{ scale: 1.08, y: -2 }}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-heading tracking-wide',
        'bg-primary/8 border border-primary/15 text-primary-light',
        'transition-all duration-200 hover:bg-primary/15 hover:border-primary/30',
        className,
      )}
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-primary-light opacity-70 flex-shrink-0"
        aria-hidden
      />
      {label}
    </motion.span>
  )
}
