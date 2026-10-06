import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Briefcase, Mail } from 'lucide-react'
import { SEO } from '../components/SEO'
import { APPLE_EASE } from '../lib/utils'

export const NotFound = () => {
  return (
    <>
      <SEO
        title="404 — Page Not Found"
        description="The page you are looking for does not exist or has been moved."
        url="/404"
      />

      <main
        id="main-content"
        className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-hidden"
      >
        {/* Ambient background glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full opacity-20 blur-[130px]"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, rgba(37,99,235,0) 70%)' }}
        />

        <div className="relative z-10 max-w-xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: APPLE_EASE }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/[0.08] px-4 py-1.5"
          >
            <span className="size-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-blue-300">
              Error 404
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: APPLE_EASE }}
            className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight"
          >
            Page Not <span className="text-gradient-blue">Found.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: APPLE_EASE }}
            className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md mx-auto"
          >
            The link you followed may be broken or the page may have been moved. Let&apos;s get you back on track.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: APPLE_EASE }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              to="/"
              className="shine-sweep inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white transition-all shadow-[0_0_24px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}
            >
              <Home className="size-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white transition-all border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.03] active:scale-[0.98]"
            >
              <Briefcase className="size-4 text-blue-400" />
              <span>Explore Works</span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white transition-all border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.03] active:scale-[0.98]"
            >
              <Mail className="size-4 text-blue-400" />
              <span>Contact</span>
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  )
}
