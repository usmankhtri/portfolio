import { cn } from '../../../../lib/utils'

interface ShowcaseMarqueeProps {
  words: string[]
  variant?: 'title' | 'ticker'
  className?: string
}

export const ShowcaseMarquee = ({
  words,
  variant = 'title',
  className,
}: ShowcaseMarqueeProps) => {
  const items = [...words, ...words, ...words, ...words]

  return (
    <div className={cn('relative overflow-hidden', className)} aria-hidden="true">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex overflow-hidden group">
        <div
          className={cn(
            'flex items-center shrink-0 min-w-full animate-marquee group-hover:[animation-play-state:paused]',
            variant === 'title' ? 'gap-10 sm:gap-14 py-6 sm:py-8' : 'gap-8 py-3',
          )}
        >
          {items.map((word, i) => (
            <div key={`${word}-${i}`} className="flex items-center gap-10 sm:gap-14 shrink-0">
              <span
                className={cn(
                  'whitespace-nowrap leading-none select-none',
                  variant === 'title'
                    ? 'font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight'
                    : 'text-[10px] sm:text-xs tracking-[0.2em] text-zinc-400/80',
                )}
                style={
                  variant === 'title'
                    ? {
                        backgroundImage:
                          'linear-gradient(180deg, rgba(191,219,254,0.95) 0%, rgba(147,197,253,0.55) 55%, rgba(96,165,250,0.28) 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        WebkitTextStroke: '1px rgba(147,197,253,0.32)',
                      }
                    : undefined
                }
              >
                {word}
              </span>
              <span
                className={cn(
                  'select-none leading-none',
                  variant === 'title'
                    ? 'font-display text-2xl sm:text-3xl text-primary-light/45'
                    : 'text-primary-light/60 text-xs',
                )}
              >
                •
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
