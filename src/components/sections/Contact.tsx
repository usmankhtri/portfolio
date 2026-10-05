import { useState } from 'react'
import { APPLE_EASE, cn } from '../../lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '../../lib/contactSchema'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion'
import {
  CheckCircle,
  AlertCircle,
  Mail,
  ArrowUpRight,
  MapPin,
  Clock3,
  Zap,
} from 'lucide-react'
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { SceneShell } from '../ui/SceneShell'
import { useMagnetic } from '../../hooks/useMagnetic'

type Status = 'idle' | 'sending' | 'success' | 'error'

const SOCIALS = [
  { label: 'GitHub', icon: FiGithub, href: 'https://github.com/usmankhatri' },
  { label: 'LinkedIn', icon: FiLinkedin, href: 'https://www.linkedin.com/in/usmankhatri' },
  { label: 'X / Twitter', icon: FiTwitter, href: 'https://x.com/usmankhatri' },
]

const META_ROWS = [
  { icon: MapPin, label: 'BASED IN', value: 'Hyderabad, PK · UTC+5' },
  { icon: Clock3, label: 'RESPONSE', value: 'Within 24 hours' },
  { icon: Zap, label: 'STATUS', value: 'Open for freelance' },
]

/* ------------------------------------------------------------------ */
/* Animated typing dots — the availability bubble feels alive          */
/* ------------------------------------------------------------------ */
const TypingDots = () => (
  <span className="flex items-center gap-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="size-1 rounded-full bg-blue-400"
        animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
      />
    ))}
  </span>
)

/* ------------------------------------------------------------------ */
/* Signal equalizer — live audio-vibe bars                            */
/* ------------------------------------------------------------------ */
const Equalizer = () => (
  <span className="flex h-5 items-end gap-[3px]">
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.span
        key={i}
        className="w-[3px] origin-bottom rounded-full bg-gradient-to-t from-blue-600 to-blue-300"
        animate={{ scaleY: [0.25, 1, 0.5, 0.9, 0.3] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
          delay: i * 0.12,
        }}
      />
    ))}
  </span>
)

/* ------------------------------------------------------------------ */
/* INLINE FIELD — floating label + focus bloom + resting hairline +   */
/* a blue line that expands 0 → 100% the moment you click in.         */
/* ------------------------------------------------------------------ */
interface FieldProps {
  label: string
  error?: string
  textarea?: boolean
  rows?: number
  type?: string
  autoComplete?: string
  name?: string
  value?: string | number | readonly string[]
  defaultValue?: string | number | readonly string[]
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>
}

const Field = ({ label, error, textarea, rows = 5, ref, ...rest }: FieldProps) => {
  const [focused, setFocused] = useState(false)
  const hasValue = !!rest.value || !!rest.defaultValue
  const floatLabel = focused || hasValue

  return (
    <div className="relative w-full">
      <label
        className={cn(
          'pointer-events-none absolute left-0 origin-left select-none z-10 transition-all duration-300 ease-out',
          floatLabel
            ? 'top-0 scale-90 -translate-x-1 text-primary-light text-xs font-semibold'
            : textarea ? 'top-5 scale-100 text-zinc-500 text-sm' : 'top-4 scale-100 text-zinc-500 text-sm',
        )}
      >
        {label}
      </label>

      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: focused && !error ? 1 : 0, scale: focused && !error ? 1 : 0.96 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -inset-x-4 -inset-y-3 rounded-2xl"
        style={{
          background:
            'radial-gradient(140px circle at 50% 100%, rgba(96,165,250,0.16) 0%, rgba(37,99,235,0.06) 45%, transparent 70%)',
        }}
      />

      {textarea ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...(rest as Record<string, unknown>)}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false)
            rest.onBlur?.(e)
          }}
          className="w-full pt-8 pb-3 px-0 text-sm text-white bg-transparent outline-none border-none appearance-none focus:ring-0 focus:outline-none transition-colors duration-300 resize-none caret-primary-light"
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          {...(rest as Record<string, unknown>)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false)
            rest.onBlur?.(e)
          }}
          className="w-full pt-6 pb-2.5 px-0 text-sm text-white bg-transparent outline-none border-none appearance-none focus:ring-0 focus:outline-none caret-primary-light"
        />
      )}

      {/* Resting hairline — always visible */}
      <span className={cn('absolute bottom-0 left-0 right-0 h-px bg-white/12', error && 'bg-blue-500/60')} />

      {/* The expanding line — 0 → 100% width on click/focus */}
      <motion.span
        aria-hidden
        className={cn(
          'absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-blue-400 to-blue-500',
          error && 'bg-blue-500/80',
        )}
        style={error ? undefined : { boxShadow: '0 0 10px rgba(96,165,250,0.45)' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-1.5 text-xs text-blue-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* THE SECTION                                                        */
/* ------------------------------------------------------------------ */
export const Contact = () => {
  const [status, setStatus] = useState<Status>('idle')
  const submitRef = useMagnetic<HTMLButtonElement>(0.07)
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const values = watch()

  /* Mouse-follow spotlight over the board */
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const sx = useSpring(mx, { stiffness: 140, damping: 24 })
  const sy = useSpring(my, { stiffness: 140, damping: 24 })
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}% ${sy}%, rgba(37,99,235,0.1), transparent 65%)`

  const onBoardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width) * 100)
    my.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  const onSubmit = async (data: ContactFormData) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
      return
    }

    setStatus('sending')
    try {
      const emailjs = (await import('@emailjs/browser')).default
      await emailjs.send(
        serviceId,
        templateId,
        { from_name: data.name, from_email: data.email, subject: data.subject, message: data.message },
        publicKey,
      )
      setStatus('success')
      reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <SceneShell label="Contact" accent="#2563EB">
      {/* ============================================================= */}
      {/* HEADLINE — big, loud, layered                                 */}
      {/* ============================================================= */}
      <div className="relative z-10 mb-12 text-center sm:mb-16">
        {/* Section title — CONTACT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5, ease: APPLE_EASE }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-blue-500/50" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-blue-300">
            Contact
          </span>
          <span className="h-px w-10 bg-gradient-to-r from-blue-500/50 to-transparent" />
        </motion.div>

        {/* Massive ambient glow behind the type */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.4, ease: APPLE_EASE }}
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 70%)' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5, ease: APPLE_EASE }}
          className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/25 bg-blue-500/[0.07] px-5 py-2"
        >
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-blue-400" />
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-300">
            Available for new projects — 2026
          </span>
        </motion.div>

        <h2 className="mt-8 font-heading font-black tracking-tight text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-[0.95]">
          <motion.span
            className="block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: APPLE_EASE }}
          >
            READY TO
          </motion.span>
          <motion.span
            className="block text-transparent [-webkit-text-stroke:1.5px_rgba(96,165,250,0.55)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ delay: 0.22, duration: 0.8, ease: APPLE_EASE }}
          >
            MAKE IT
          </motion.span>
          <motion.span
            className="block text-gradient-blue animate-gradient-shift"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ delay: 0.34, duration: 0.8, ease: APPLE_EASE }}
          >
            REMARKABLE?
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: APPLE_EASE }}
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base px-2"
        >
          A project, a collaboration, or just an interesting idea — drop a transmission.
          I reply fast, and I build faster.
        </motion.p>
      </div>

      {/* ============================================================= */}
      {/* THE BOARD — console left, form right, all systems live        */}
      {/* ============================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.9, ease: APPLE_EASE }}
        onMouseMove={onBoardMove}
        className="group relative mx-0 sm:-mx-6 lg:-mx-12 overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220]/70 backdrop-blur-md"
      >
        {/* Engineering grid */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.05)_1px,transparent_1px)] bg-[size:48px_48px]"
        />

        {/* Mouse-follow spotlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlight }}
        />

        {/* Drifting aurora orbs */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-[8%] size-64 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, rgba(37,99,235,0) 70%)' }}
          animate={{ y: [0, -22, 0], x: [0, 14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-[10%] size-72 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #60A5FA 0%, rgba(96,165,250,0) 70%)' }}
          animate={{ y: [0, 24, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
        />

        {/* Sweeping scanline */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
          animate={{ top: ['-2%', '102%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
        />

        {/* Top edge light */}
        <div
          aria-hidden
          className="absolute left-[20%] right-[20%] top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
        />
        {/* Bottom accent hairline */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
        />

        {/* Corner ticks */}
        {[
          'top-0 left-0 border-t border-l',
          'top-0 right-0 border-t border-r',
          'bottom-0 left-0 border-b border-l',
          'bottom-0 right-0 border-b border-r',
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={cn(
              'pointer-events-none absolute z-10 size-3.5 border-blue-400/0 transition-colors duration-300 group-hover:border-blue-400/60',
              pos,
            )}
          />
        ))}

        <div className="relative grid grid-cols-1 lg:grid-cols-5">
          {/* ========================================================= */}
          {/* LEFT — the live console                                   */}
          {/* ========================================================= */}
          <div className="relative flex flex-col items-center justify-center border-b border-white/[0.06] p-6 sm:p-10 lg:col-span-2 lg:border-b-0 lg:border-r">
            {/* Signal kicker + equalizer */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: APPLE_EASE }}
              className="mb-8 flex w-full items-center justify-between"
            >
              <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase">
                Signal / Live
              </span>
              <Equalizer />
            </motion.div>

            {/* Orbiting seal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: APPLE_EASE }}
              className="relative flex size-36 items-center justify-center sm:size-40"
            >
              <div className="absolute inset-0 rounded-full border border-dashed border-blue-500/25 animate-[spin_18s_linear_infinite]" />
              <div className="absolute inset-0 rounded-full border border-blue-500/10 animate-[spin_30s_linear_infinite_reverse]" />
              <div className="absolute inset-4 rounded-full border border-blue-500/10" />
              <motion.span
                aria-hidden
                className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-blue-400"
                style={{ boxShadow: '0 0 10px rgba(96,165,250,0.9)' }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.span
                aria-hidden
                className="absolute -bottom-1 right-3 size-1.5 rounded-full bg-blue-300/80"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span
                className="flex size-14 items-center justify-center rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.05) 100%)',
                  border: '1px solid rgba(96,165,250,0.3)',
                  boxShadow: '0 0 24px rgba(37,99,235,0.15)',
                }}
              >
                <Mail className="size-6 text-blue-300" />
              </span>
            </motion.div>

            {/* The channel */}
            <motion.a
              href="mailto:hello@usman.dev"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ delay: 0.45, duration: 0.6, ease: APPLE_EASE }}
              className="group/channel relative mt-8 font-heading font-bold text-white text-lg transition-colors duration-300 sm:text-2xl"
            >
              <span className="text-gradient-blue">hello@usman.dev</span>
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-500 group-hover/channel:w-full" />
            </motion.a>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: APPLE_EASE }}
              className="mt-2.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600"
            >
              The fastest line to the studio
            </motion.p>

            {/* Meta rows */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ delay: 0.62, duration: 0.6, ease: APPLE_EASE }}
              className="mt-7 w-full space-y-2.5"
            >
              {META_ROWS.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 transition-colors duration-300 hover:border-blue-500/25"
                >
                  <span className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] text-zinc-600 uppercase">
                    <Icon className="size-3.5 text-blue-500/70" />
                    {label}
                  </span>
                  <span className="text-xs font-medium text-zinc-300">{value}</span>
                </div>
              ))}
            </motion.div>

            {/* Availability bubble */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: APPLE_EASE }}
              className="mt-6 flex w-full items-center gap-3 rounded-full border border-blue-500/25 bg-blue-500/[0.06] px-5 py-3"
            >
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-blue-400" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-zinc-300 uppercase">
                Usually replies
              </span>
              <span className="ml-auto">
                <TypingDots />
              </span>
            </motion.div>

            {/* Social tiles */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ delay: 0.78, duration: 0.6, ease: APPLE_EASE }}
              className="mt-6 grid w-full grid-cols-3 gap-3"
            >
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  aria-label={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/soc flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-3 text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:text-blue-300 hover:shadow-[0_0_16px_rgba(37,99,235,0.25)]"
                >
                  <Icon className="size-4 transition-transform duration-300 group-hover/soc:scale-110" />
                  <span className="hidden font-mono text-[9px] uppercase tracking-wider xl:block">{label}</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT — the form                                           */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: APPLE_EASE }}
            className="relative p-5 xs:p-6 sm:p-9 lg:col-span-3"
          >
            <div className="mb-8">
              <p className="font-heading font-bold text-white text-xl sm:text-2xl">
                Send a Transmission
              </p>
              <p className="mt-1.5 text-sm text-zinc-500">
                Fill the channel — I'll lock on within 24 hours.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative flex min-h-[420px] flex-col items-center justify-center gap-5 rounded-2xl border border-blue-500/20 px-4 py-16 text-center"
                  style={{ background: 'rgba(37,99,235,0.05)' }}
                >
                  <span className="relative flex size-20 items-center justify-center">
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-blue-400/50"
                      initial={{ scale: 0.6, opacity: 0.8 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.2 }}
                    />
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-blue-400/30"
                      initial={{ scale: 0.6, opacity: 0.8 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
                    />
                    <motion.span
                      className="relative flex size-16 items-center justify-center rounded-full border border-blue-400/40 bg-gradient-to-br from-blue-500 to-blue-700"
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                    >
                      <CheckCircle className="size-8 text-white" />
                    </motion.span>
                  </span>
                  <div>
                    <p className="mb-1.5 font-heading font-bold text-white text-lg sm:text-xl">
                      Transmission Received
                    </p>
                    <p className="text-xs text-zinc-400 sm:text-sm">
                      I'll get back to you within 24 hours.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                  noValidate
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field
                      label="Your Name"
                      {...register('name')}
                      value={values.name || ''}
                      error={errors.name?.message}
                      autoComplete="name"
                    />
                    <Field
                      label="Email Address"
                      type="email"
                      {...register('email')}
                      value={values.email || ''}
                      error={errors.email?.message}
                      autoComplete="email"
                    />
                  </div>

                  <Field
                    label="Subject"
                    {...register('subject')}
                    value={values.subject || ''}
                    error={errors.subject?.message}
                  />

                  <Field
                    label="Your Message"
                    textarea
                    {...register('message')}
                    value={values.message || ''}
                    error={errors.message?.message}
                  />

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2.5 rounded-xl border border-blue-500/20 bg-blue-500/8 px-4 py-3 text-xs text-blue-300 sm:text-sm"
                    >
                      <AlertCircle className="size-4 flex-shrink-0" />
                      <span>Transmission failed — please try again.</span>
                    </motion.div>
                  )}

                  <button
                    ref={submitRef}
                    type="submit"
                    disabled={status === 'sending'}
                    className="shine-sweep group relative w-full rounded-xl py-4 font-heading font-bold text-sm uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-3 will-change-transform sm:py-4.5"
                    style={{
                      background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                      boxShadow: '0 0 30px rgba(37,99,235,0.3)',
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {status === 'sending' ? (
                        <motion.span
                          key="sending"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Transmitting…
                        </motion.span>
                      ) : (
                        <motion.span
                          key="send"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: 80, y: -80, rotate: 55 }}
                          transition={{ duration: 0.5, ease: 'easeIn' }}
                          className="flex items-center gap-3"
                        >
                          Send Transmission
                          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  <p className="text-center font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                    No spam · encrypted · stays private
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </SceneShell>
  )
}