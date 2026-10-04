import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Magnetic pull — the element gently follows the cursor while hovered
 * and springs back to rest on leave. Applies to plain elements only
 * (no framer-motion `transform` on the same node).
 */
export const useMagnetic = <T extends HTMLElement>(strength = 0.3) => {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const handleEnter = () => {
      el.style.transition = 'transform 0.18s ease-out'
    }

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * strength
      const y = (e.clientY - rect.top - rect.height / 2) * strength
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
    }

    const handleLeave = () => {
      el.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
      el.style.transform = 'translate(0px, 0px)'
      window.setTimeout(() => {
        el.style.transition = ''
      }, 450)
    }

    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
      el.style.transform = ''
    }
  }, [reduced, strength])

  return ref
}