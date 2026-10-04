/**
 * Parallax starfield — soft twinkle, two depth layers, module-level so the
 * layout is stable across renders (no per-render randomness).
 */
const STARFIELD = Array.from({ length: 64 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.8 + 1,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 3,
  depth: i % 2,
}))

export function Starfield() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {STARFIELD.map((s, i) => (
        <span
          key={i}
          className="star absolute rounded-full bg-blue-100/70"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            opacity: 0.15 + s.depth * 0.4,
          }}
        />
      ))}
    </div>
  )
}