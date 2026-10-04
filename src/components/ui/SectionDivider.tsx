import { cn } from '../../lib/utils'

interface SectionDividerProps {
  className?: string
}

/* ------------------------------------------------------------------ */
/* Section divider — one quiet, perfect seam: a hairline that fades at */
/* both edges with a single diamond accent at its center. Nothing      */
/* moves, nothing glows — it simply separates.                         */
/* ------------------------------------------------------------------ */

export const SectionDivider = ({ className }: SectionDividerProps) => (
  <div
    className={cn('relative h-14 w-full overflow-hidden pointer-events-none select-none', className)}
    aria-hidden="true"
  >
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-[min(64rem,82%)] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

    <div
      className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-br from-blue-300 to-blue-600"
      style={{ boxShadow: '0 0 10px rgba(96,165,250,0.35)' }}
    />
  </div>
)