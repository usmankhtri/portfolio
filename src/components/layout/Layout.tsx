import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Navbar } from '../Navbar'
import { Footer } from './Footer'
import { BackToTopWidget } from '../ui/BackToTopWidget'
import { lenisStore } from '../../lib/lenisStore'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let lenis: import('lenis').default | undefined
    let rafId: number
    let cancelled = false

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return

      lenis = new Lenis({
        duration: 1.3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
      })

      lenisStore.setLenis(lenis)

      function raf(time: number) {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      lenis?.destroy()
      lenisStore.clear()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-background noise">
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(37,99,235,0.4) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      {children}
      <Footer />
      <BackToTopWidget />
      <Navbar />
    </div>
  )
}
