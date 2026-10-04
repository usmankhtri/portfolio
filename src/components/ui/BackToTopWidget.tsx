import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { lenisStore } from '../../lib/lenisStore'

const RADIUS = 22
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export const BackToTopWidget = () => {
  const [visible, setVisible] = useState(false)
  const [launching, setLaunching] = useState(false)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const strokeDashoffset = useTransform(progress, (v) => (1 - v) * CIRCUMFERENCE)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    setLaunching(true)
    lenisStore.scrollToTop()
    window.setTimeout(() => setLaunching(false), 700)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={launching ? { opacity: 1, scale: 1, y: [-3, -28, 0] } : { opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          onClick={handleClick}
          whileTap={{ scale: 0.88 }}
          aria-label="Back to top"
          className="group fixed right-5 z-[80] size-12 rounded-full bg-[#0A1728]/90 border border-blue-500/40 backdrop-blur-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.45)] hover:border-blue-400/70 hover:shadow-[0_0_30px_rgba(37,99,235,0.65)] transition-all cursor-pointer"
          style={{ bottom: 'max(1.25rem, calc(var(--safe-bottom) + 0.5rem))' }}
        >
          {/* Scroll progress ring */}
          <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <circle
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
            />
            <motion.circle
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ strokeDashoffset }}
            />
          </svg>

          {/* Launching pulse ring */}
          <AnimatePresence>
            {launching && (
              <motion.span
                key="launch-ring"
                className="absolute inset-0 rounded-full border border-blue-400/70 pointer-events-none"
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ opacity: 0, scale: 1.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>

          <ArrowUp className="size-5 text-primary-light transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}