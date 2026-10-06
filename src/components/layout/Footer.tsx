import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight, Clock3, Mail, MapPin, Zap, Phone } from 'lucide-react'
import { FiGithub, FiLinkedin, FiFacebook, FiInstagram } from 'react-icons/fi'
import { portfolioData } from '../../data/portfolioData'
import { lenisStore } from '../../lib/lenisStore'
import { Watermark } from '../ui/Watermark'
import { APPLE_EASE } from '../../lib/utils'

const { about } = portfolioData

const SOCIALS = [
  { label: 'GitHub', icon: FiGithub, href: about.github },
  { label: 'LinkedIn', icon: FiLinkedin, href: about.linkedin },
  { label: 'Facebook', icon: FiFacebook, href: about.facebook },
  { label: 'Instagram', icon: FiInstagram, href: about.instagram },
]

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Selected Works', to: '/works' },
  { label: 'Services & Pricing', to: '/services' },
  { label: 'Contact & Book Call', to: '/contact' },
]

const META_ROWS = [
  { icon: MapPin, label: 'Based in', value: 'Hyderabad, Pakistan' },
  { icon: Clock3, label: 'Timezone', value: 'UTC+5 · PKT' },
  { icon: Zap, label: 'Status', value: 'Open for freelance' },
]

const Kicker = ({ index, children }: { index: string; children: string }) => (
  <span className="mb-4 flex items-center gap-2.5">
    <span className="font-mono text-[10px] tracking-[0.3em] text-blue-400">{index}</span>
    <span className="h-px w-7 bg-gradient-to-r from-blue-500/60 to-transparent" />
    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">{children}</span>
  </span>
)

const LiveDot = () => (
  <span className="relative flex size-1.5 shrink-0">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
    <span className="relative inline-flex size-1.5 rounded-full bg-blue-400" />
  </span>
)

export const Footer = () => {
  const scrollToTop = () => {
    lenisStore.scrollToTop()
  }

  return (
    <footer
      className="relative bg-[#030712] text-zinc-400 overflow-hidden"
      style={{ paddingBottom: 'max(3rem, calc(var(--safe-bottom) + 2rem))' }}
      aria-label="Site Footer"
    >
      {/* Top seam glow beneath the contact section */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] max-w-3xl h-40 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.35) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Engineering grid */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.04)_1px,transparent_1px)] bg-[size:48px_48px]"
      />

      {/* Drifting aurora */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-[12%] size-72 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #2563EB 0%, rgba(37,99,235,0) 70%)' }}
        animate={{ y: [0, 26, 0], x: [0, -16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* ============================================================= */}
        {/* MAIN BOARD — brand / navigation / connect                     */}
        {/* ============================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]/50 backdrop-blur-md mt-12"
        >
          {/* Top edge light */}
          <div
            aria-hidden
            className="absolute left-[15%] right-[15%] top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 px-6 sm:px-8 lg:px-10 py-12">
            {/* Column 1: Brand & Bio */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <Link to="/" className="flex items-center gap-2.5 group w-fit">
                <div className="relative w-9 h-9 shrink-0">
                  <div className="brand-seal-ring absolute -inset-[2px] rounded-xl shadow-[0_0_18px_rgba(59,130,246,0.45)]" />
                  <div className="relative w-full h-full rounded-[10px] bg-[#05070F] ring-1 ring-inset ring-white/10 flex items-center justify-center">
                    <span className="font-extrabold text-xs text-gradient-blue">
                      UK<span className="text-blue-300">.</span>
                    </span>
                  </div>
                </div>
                <span className="text-base font-bold text-white font-heading group-hover:text-primary-light transition-colors">
                  Usman Khatri
                </span>
              </Link>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
                Full-Stack MERN Developer &amp; PWA Engineer building performant web apps with
                modern AI workflows — design, systems and shipping in one channel.
              </p>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 w-fit">
                <LiveDot />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300 font-heading">
                  Available for New Projects
                </span>
              </div>

              {/* Social tiles */}
              <div className="flex items-center gap-2.5 mt-1">
                {SOCIALS.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group/soc size-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-blue-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:shadow-[0_0_14px_rgba(37,99,235,0.35)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Icon className="size-4 transition-transform duration-300 group-hover/soc:scale-110" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="lg:col-span-3 flex flex-col">
              <Kicker index="01">Navigation</Kicker>
              <div className="flex flex-col gap-1 text-xs font-heading">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="group/nav flex items-center justify-between py-1.5 text-zinc-400 transition-colors duration-300 hover:text-white"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-300 group-hover/nav:w-full" />
                    </span>
                    <ArrowUpRight className="size-3 opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-hover/nav:translate-y-0 text-blue-300" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: Connect */}
            <div className="lg:col-span-3 flex flex-col">
              <Kicker index="02">Connect</Kicker>
              <a
                href={`mailto:${about.email}`}
                className="group/mail flex items-center gap-2 text-zinc-300 hover:text-white transition-colors font-mono text-xs mb-2"
                aria-label={`Send email to ${about.email}`}
              >
                <Mail className="size-3.5 text-primary-light shrink-0" />
                <span className="truncate relative">
                  {about.email}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-300 group-hover/mail:w-full" />
                </span>
              </a>

              <a
                href={`tel:${about.phone.replace(/\s+/g, '')}`}
                className="group/phone flex items-center gap-2 text-zinc-300 hover:text-white transition-colors font-mono text-xs mb-1"
                aria-label={`Call Usman Khatri at ${about.phone}`}
              >
                <Phone className="size-3.5 text-primary-light shrink-0" />
                <span className="truncate relative">
                  {about.phone}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-300 group-hover/phone:w-full" />
                </span>
              </a>

              <div className="flex flex-col gap-2.5 mt-3">
                {META_ROWS.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] px-3.5 py-2 transition-colors duration-300 hover:border-blue-500/25"
                  >
                    <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                      <Icon className="size-3 text-blue-500/70" />
                      {label}
                    </span>
                    <span className="text-[11px] text-zinc-300">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom accent hairline */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
          />
        </motion.div>
      </div>

      {/* Giant watermark — cinematic fade from the bottom */}
      <Watermark text="USMAN" />

      {/* Bottom bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-heading">
          <p>
            © {new Date().getFullYear()} Usman Khatri. All rights reserved.
          </p>

          {/* Signal status — alive footer detail */}
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
            <span className="flex items-center gap-1.5">
              Signal
              <span className="flex items-end gap-[2px] h-3">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[2px] origin-bottom rounded-full bg-blue-500/70"
                    animate={{ scaleY: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.25,
                    }}
                  />
                ))}
              </span>
              Strong
            </span>
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-blue-400/50 transition-all font-semibold"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <span className="size-6 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_12px_rgba(37,99,235,0.5)]">
              <ArrowUp className="size-3 text-white transition-transform group-hover:-translate-y-0.5" />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}