import { motion } from 'framer-motion'
import { Clapperboard } from 'lucide-react'
import { portfolioData } from '../../../data/portfolioData'
import { CinematicStage } from './showcase/CinematicStage'
import { ShowcaseMarquee } from './showcase/ShowcaseMarquee'
import { EndCredits } from './showcase/EndCredits'

const projects = portfolioData.projects

export const FascinatingProjectScroll = () => {
  if (!projects.length) {
    return null
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-background"
      aria-label="Featured projects showcase"
    >
      {/* ========================================================= */}
      {/* AMBIENT BACKGROUND                                         */}
      {/* ========================================================= */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-[0.16]" />

        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle 700px at 10% 30%, rgba(37,99,235,0.10), transparent 65%), radial-gradient(circle 600px at 90% 65%, rgba(37,99,235,0.06), transparent 65%)',
          }}
        />
      </div>

      {/* ========================================================= */}
      {/* HEADER                                                      */}
      {/* ========================================================= */}

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 pt-16 sm:pt-24 pb-4 sm:pb-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.08]"
        >
          <Clapperboard className="w-3 h-3 text-blue-400" />

          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">
            Selected Works
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 0.7,
            delay: 0.05,
          }}
        >
          <h2 className="mt-3 font-heading font-extrabold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl">
            Projects that <span className="text-gradient">do the talking.</span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            A selection of systems, products, and experiences I've designed
            and built from the ground up.
          </p>
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* OPENING TITLE MARQUEE — above the first card                  */}
      {/* ========================================================= */}

      <ShowcaseMarquee
        words={['Selected Projects', 'Case Studies']}
        className="relative z-20"
      />

      {/* ========================================================= */}
      {/* THE SHOTS — one cinematic stage per project                  */}
      {/* ========================================================= */}

      <div className="relative z-10">
        {projects.map((project, index) => (
          <CinematicStage
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* ========================================================= */}
      {/* END CREDITS                                                 */}
      {/* ========================================================= */}

      <EndCredits />
    </section>
  )
}
