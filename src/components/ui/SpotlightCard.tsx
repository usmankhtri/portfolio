import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
}

export const SpotlightCard = ({
  children,
  className,
  spotlightColor = 'rgba(37,99,235,0.12)',
}: SpotlightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !gradientRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    gradientRef.current.style.opacity = '1'
    gradientRef.current.style.background =
      `radial-gradient(400px circle at ${x}px ${y}px, ${spotlightColor}, transparent 70%)`
  }

  const handleMouseLeave = () => {
    if (!gradientRef.current) return
    gradientRef.current.style.opacity = '0'
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn(
        'relative rounded-2xl overflow-hidden border border-white/5 bg-[rgba(10,23,40,0.5)] backdrop-blur-xl transition-border duration-300 hover:border-white/10',
        className,
      )}
    >
      {/* Spotlight overlay */}
      <div
        ref={gradientRef}
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      <div className="relative z-20">{children}</div>
    </motion.div>
  )
}
