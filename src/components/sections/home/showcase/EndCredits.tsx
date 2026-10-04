import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { APPLE_EASE } from '../../../../lib/utils'
import { portfolioData } from '../../../../data/portfolioData'
import { ShowcaseMarquee } from './ShowcaseMarquee'
import { useMagnetic } from '../../../../hooks/useMagnetic'

const techWords = portfolioData.techStack.map((tech) => tech.name)

export const EndCredits = () => {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.07)

  return (
    <div className="relative">
      {/* Credits ticker of the full tech arsenal */}
      <ShowcaseMarquee words={techWords} variant="ticker" />

      {/* Closing CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: APPLE_EASE }}
        className="relative z-20 flex flex-col items-center gap-5 px-6 pt-10 pb-16 sm:pb-20 text-center"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-heading font-semibold">End Credits</p>
        <h2
          className="font-heading font-extrabold tracking-tighter text-white"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
        >
          That's the <span className="text-gradient">reel.</span>
        </h2>
        <Link
          to="/works"
          ref={ctaRef}
          className="
            shine-sweep
            group
            inline-flex
            items-center
            gap-2.5
            px-6
            py-3
            rounded-full
            text-xs
            sm:text-sm
            font-semibold
            text-white
            will-change-transform
          "
          style={{
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            boxShadow: '0 0 35px rgba(37,99,235,0.25)',
          }}
        >
          <span>Explore All Projects</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </motion.div>
    </div>
  )
}
