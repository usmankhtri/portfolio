import { useRef, useCallback } from 'react'
import type { ReactNode, MouseEvent } from 'react'
import { cn } from '../../lib/utils'

interface SpotGlowProps {
  children: ReactNode
  className?: string
  /** radius of the spotlight in px */
  radius?: number
  /** hex color without alpha, e.g. "#60A5FA" */
  color?: string
  /** 0–100 alpha for the glow */
  alpha?: number
}

/**
 * Spotlight hover — a soft radial light follows the cursor across the
 * card surface. Purely decorative, pointer-events never blocked.
 */
export const SpotGlow = ({
  children,
  className,
  radius = 260,
  color = '#60A5FA',
  alpha = 9,
}: SpotGlowProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--sx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--sy', `${e.clientY - rect.top}px`)
  }, [])

  const alphaHex = alpha.toString(16).padStart(2, '0')

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn('group/spot relative', className)}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100 z-10"
        style={{
          background: `radial-gradient(${radius}px circle at var(--sx, 50%) var(--sy, 50%), ${color}${alphaHex} 0%, transparent 65%)`,
        }}
      />
    </div>
  )
}