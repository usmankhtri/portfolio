import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { cn } from '../lib/utils'
import { Home, User, Briefcase, Wrench, Mail, ArrowUpRight, Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: User },
  { name: 'Works', path: '/works', icon: Briefcase },
  { name: 'Services', path: '/services', icon: Wrench },
  { name: 'Contact', path: '/contact', icon: Mail },
]

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  /* Scroll progress — the thin blue line racing across the top */
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 })

  useEffect(() => {
    let lastY = window.scrollY

    const handleScroll = () => {
      // Don't auto-hide when mobile menu is open
      if (mobileMenuOpen) return

      const currentY = window.scrollY
      setScrolled(currentY > 20)

      // Hide navbar when scrolling down past 60px, show when scrolling up
      if (currentY < 60) {
        setVisible(true)
      } else if (currentY > lastY + 8) {
        setVisible(false)
      } else if (currentY < lastY - 8) {
        setVisible(true)
      }

      lastY = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileMenuOpen])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {/* Scroll progress — flush with the very top of the viewport */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 right-0 z-[calc(var(--z-navbar)+1)] h-[2px] origin-left bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300"
        style={{ scaleX: progress, boxShadow: '0 0 12px rgba(59,130,246,0.8)' }}
      />

      <header className="fixed top-2 sm:top-4 left-0 w-full z-[var(--z-navbar)] flex justify-center px-2 xs:px-4 sm:px-6 pointer-events-none">
        <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'pointer-events-auto w-full max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl rounded-full font-["Outfit",sans-serif] flex items-center justify-between px-2.5 py-1.5 xs:px-3.5 xs:py-2 sm:px-5 sm:py-2.5 border overflow-hidden transition-all duration-300',
          scrolled
            ? 'bg-[#030712]/92 border-blue-500/30 shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(37,99,235,0.25)] backdrop-blur-2xl'
            : 'bg-[#030712]/80 border-white/10 shadow-lg backdrop-blur-xl'
        )}
      >
        {/* Top accent hairline when scrolled */}
        <span
          aria-hidden
          className={cn(
            'absolute top-0 left-1/2 -translate-x-1/2 h-px w-[55%] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent transition-opacity duration-300',
            scrolled ? 'opacity-100' : 'opacity-0'
          )}
        />
        {/* LOGO / BRAND */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2 group focus-visible:outline-none rounded-full shrink-0"
        >
          {/* UK. brand seal — gradient text inside a slowly rotating conic ring */}
          <div className="relative w-8 h-8 xs:w-8 xs:h-8 sm:w-9 sm:h-9 shrink-0 transition-transform duration-300 group-hover:scale-105">
            <div className="brand-seal-ring absolute -inset-[2px] rounded-xl shadow-[0_0_18px_rgba(59,130,246,0.45)]" />
            <div className="relative w-full h-full rounded-[10px] bg-[#05070F] ring-1 ring-inset ring-white/10 flex items-center justify-center">
              <span className="font-extrabold text-[10px] xs:text-xs sm:text-sm text-gradient-blue">
                UK<span className="text-blue-300">.</span>
              </span>
            </div>
          </div>
          <span className="hidden min-[880px]:inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
            Usman Khatri
            <span className="relative flex size-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-blue-400" />
            </span>
          </span>
        </Link>

        {/* DESKTOP / TABLET NAV ITEMS */}
        <div className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-[#060C1A]/80 border border-blue-500/20 rounded-full p-1 backdrop-blur-md overflow-hidden">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'relative px-2.5 py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded-full text-[11px] lg:text-xs font-bold transition-all duration-200 flex items-center gap-1.5 lg:gap-2 group overflow-hidden',
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-blue-600/35 border border-blue-500/60 shadow-[0_0_12px_rgba(37,99,235,0.35)]"
                  />
                )}
                <Icon
                  className={cn(
                    'w-3.5 h-3.5 lg:w-4 lg:h-4 relative z-10 transition-colors duration-200',
                    isActive ? 'text-blue-400' : 'text-zinc-400 group-hover:text-blue-400'
                  )}
                />
                <span className="relative z-10 whitespace-nowrap">{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* CTA BUTTON / MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Link
            to="/contact"
            className="shine-sweep hidden min-[600px]:flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 xs:px-3.5 xs:py-1.5 sm:px-4 sm:py-2 rounded-full text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_16px_rgba(37,99,235,0.4)] hover:shadow-[0_0_24px_rgba(37,99,235,0.6)] border border-blue-400/40 active:scale-95 group shrink-0"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-[#060C1A] border border-blue-500/30 text-zinc-300 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-blue-400" /> : <Menu className="w-5 h-5 text-zinc-300" />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE BACKDROP & DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="pointer-events-auto fixed inset-0 z-[calc(var(--z-navbar)-1)] bg-black/70 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            {/* Mobile Menu Card */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto absolute top-full left-3 right-3 xs:left-4 xs:right-4 mt-2 sm:mt-3 p-4 sm:p-5 rounded-3xl bg-[#030712]/98 border border-blue-500/40 shadow-[0_24px_50px_rgba(0,0,0,0.9),0_0_24px_rgba(37,99,235,0.25)] backdrop-blur-2xl flex flex-col gap-2 font-['Outfit',sans-serif] md:hidden z-50 max-h-[85vh] overflow-y-auto"
              style={{ paddingBottom: 'max(1.25rem, calc(var(--safe-bottom) + 1rem))' }}
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between px-2 pb-2 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-blue-400" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300">
                    Open for freelance
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">Navigation</span>
              </div>

              {/* Navigation links */}
              <div className="flex flex-col gap-1.5 pt-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'min-h-[48px] flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all',
                        isActive
                          ? 'bg-blue-600/35 border border-blue-500/60 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                          : 'text-zinc-300 hover:text-white hover:bg-white/[0.04] active:bg-blue-950/40'
                      )}
                    >
                      <div className="flex items-center gap-3.5">
                        <Icon className={cn('w-4 h-4', isActive ? 'text-blue-400' : 'text-zinc-400')} />
                        <span>{item.name}</span>
                      </div>
                      <ArrowUpRight className={cn('w-3.5 h-3.5 opacity-60', isActive ? 'text-blue-300' : 'text-zinc-500')} />
                    </Link>
                  )
                })}
              </div>

              {/* Primary action */}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[48px] flex items-center justify-between px-5 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-black uppercase tracking-wider mt-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/40 active:scale-[0.98] transition-transform"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </header>
    </>
  )
}