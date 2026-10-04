import type { CSSProperties } from 'react'

/** Thin orbit ring with two counter-rotating lights (CSS `ring-orbit` keyframes). */
export function Ring({ size = 430 }: { size?: number }) {
  const radius = size / 2
  return (
    <div
      aria-hidden
      className="absolute left-1/2 top-1/2 pointer-events-none rounded-full border border-white/10"
      style={{ width: size, height: size, transform: 'translate(-50%, -50%)' }}
    >
      <span
        className="absolute left-1/2 top-0 block h-2 w-2 rounded-full bg-blue-300/90 shadow-[0_0_14px_rgba(147,197,253,0.9)]"
        style={{ '--ring-radius': `${radius}px`, animation: 'ring-orbit 8s linear infinite' } as CSSProperties}
      />
      <span
        className="absolute left-1/2 top-0 block h-1.5 w-1.5 rounded-full bg-white/80"
        style={{ '--ring-radius': `${radius}px`, animation: 'ring-orbit 13s linear infinite reverse' } as CSSProperties}
      />
    </div>
  )
}