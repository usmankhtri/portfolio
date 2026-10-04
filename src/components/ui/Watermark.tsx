import { cn } from '../../lib/utils'

interface WatermarkProps {
  text: string
  className?: string
  fadeTo?: string
}

export const Watermark = ({ text, className, fadeTo = '#030712' }: WatermarkProps) => (
  <div className={cn('relative overflow-hidden pointer-events-none select-none', className)} aria-hidden="true">
    <p
      className="pt-4 pb-2 text-center font-heading font-extrabold whitespace-nowrap tracking-tighter leading-none"
      style={{
        fontSize: 'clamp(5.5rem, 16vw, 15rem)',
        backgroundImage:
          'linear-gradient(180deg, rgba(147,197,253,0.55) 0%, rgba(96,165,250,0.3) 55%, rgba(37,99,235,0.12) 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {text}
    </p>
    {/* Cinematic bottom fade into the section background */}
    <div
      className="absolute inset-x-0 bottom-0 h-20 sm:h-24"
      style={{ backgroundImage: `linear-gradient(to bottom, transparent 0%, ${fadeTo} 100%)` }}
    />
  </div>
)
