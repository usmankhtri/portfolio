import { useState, useRef } from 'react'
import { SEO } from '../components/SEO'
import { APPLE_EASE, cn } from '../lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '../lib/contactSchema'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion'
import { CheckCircle, AlertCircle, Mail, MapPin, Clock, Send, ArrowRight } from 'lucide-react'
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { StatsBar, FAQSection, TestimonialsSection, CTASection } from '../components/sections/contact/ContactSections'

type Status = 'idle' | 'sending' | 'success' | 'error'

const SOCIALS = [
  { label: 'GitHub', icon: FiGithub, href: 'https://github.com/usmankhatri' },
  { label: 'LinkedIn', icon: FiLinkedin, href: 'https://www.linkedin.com/in/usmankhatri' },
  { label: 'X / Twitter', icon: FiTwitter, href: 'https://x.com/usmankhatri' },
]

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
            ? 'top-0 scale-90 -translate-x-1 text-blue-400 text-xs font-semibold'
            : textarea ? 'top-5 scale-100 text-zinc-500 text-sm' : 'top-4 scale-100 text-zinc-500 text-sm',
        )}
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...(rest as Record<string, unknown>)}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); rest.onBlur?.(e) }}
          className="w-full pt-8 pb-3 px-0 text-sm text-white bg-transparent outline-none border-none appearance-none focus:ring-0 focus:outline-none transition-colors duration-300 resize-none caret-blue-400"
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          {...(rest as Record<string, unknown>)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); rest.onBlur?.(e) }}
          className="w-full pt-6 pb-2.5 px-0 text-sm text-white bg-transparent outline-none border-none appearance-none focus:ring-0 focus:outline-none caret-blue-400"
        />
      )}

      <span className={cn('absolute bottom-0 left-0 right-0 h-px bg-white/10', error && 'bg-red-500/50')} />
      <motion.span
        aria-hidden
        className={cn('absolute bottom-0 left-0 right-0 h-px origin-left bg-blue-500', error && 'bg-red-500')}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1.5 text-xs text-red-400">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export const ContactPage = () => {
  const [status, setStatus] = useState<Status>('idle')
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })
  const values = watch()

  const pageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: pageRef })

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.96])

  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const sx = useSpring(mx, { stiffness: 100, damping: 18 })
  const sy = useSpring(my, { stiffness: 100, damping: 18 })
  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${sx}% ${sy}%, rgba(37,99,235,0.06), transparent 70%)`

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
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
      await emailjs.send(serviceId, templateId, {
        from_name: data.name, from_email: data.email, subject: data.subject, message: data.message,
      }, publicKey)
      setStatus('success')
      reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <>
      <SEO title="Contact" description="Get in touch with Usman Khatri for freelance projects, collaborations, or just to say hello." url="/contact" />

      <div ref={pageRef} className="relative" onMouseMove={onMouseMove}>
        <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-[1]" style={{ background: spotlight }} />

        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* HERO — cinematic full-screen entrance                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
          <motion.div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full blur-[180px]"
            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)' }}
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-[500px] w-[500px] rounded-full blur-[160px]"
            style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)' }}
            animate={{ x: [0, -25, 0], y: [0, 25, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />

          <motion.div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-white/[0.03]"
            animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
          <motion.div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full border border-white/[0.02]"
            animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: 'linear' }} />

          <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.2, duration: 0.7, ease: APPLE_EASE }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.06] px-5 py-2.5"
            >
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300 font-heading">Available for new projects</span>
            </motion.div>

            <h1 className="font-heading font-black tracking-tighter text-white leading-[0.92]" style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}>
              {['LET US BUILD', 'SOMETHING', 'REMARKABLE'].map((line, li) => (
                <span key={li} className="block overflow-hidden">
                  <motion.span
                    className={cn('block', li === 1 && 'text-blue-400', li === 2 && 'text-zinc-500')}
                    initial={{ y: '112%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.15 + li * 0.1, duration: 0.85, ease: APPLE_EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: APPLE_EASE }}
              className="mt-6 max-w-xl mx-auto text-sm leading-relaxed text-zinc-500 sm:text-base"
            >
              I am always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5, ease: APPLE_EASE }} className="mt-8">
              <a href="#contact-form" className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-3 font-heading font-semibold text-sm text-white transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/10 hover:shadow-[0_0_30px_rgba(37,99,235,0.12)]">
                Get in Touch
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        <StatsBar />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* CONTACT FORM + INFO — split cinematic layout               */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section id="contact-form" className="relative z-10 py-16 sm:py-24 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mb-12 sm:mb-16 text-center">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, ease: APPLE_EASE }} className="mb-5 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-blue-500/40" />
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-blue-400 font-heading">Contact</span>
                <span className="h-px w-10 bg-blue-500/40" />
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: 0.1, duration: 0.6, ease: APPLE_EASE }}
                className="font-heading font-black tracking-tight text-white" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)' }}>
                Send a Message
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: 0.2, duration: 0.5, ease: APPLE_EASE }}
                className="mt-3 mx-auto max-w-lg text-sm leading-relaxed text-zinc-500 sm:text-base">
                Have something in mind? Fill out the form and I will get back to you.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
              {/* LEFT — info */}
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: APPLE_EASE }} className="flex flex-col gap-6 lg:col-span-2">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.06] px-4 py-2">
                  <span className="relative flex size-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300 font-heading">Open for work</span>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Mail, label: 'Email', value: 'hello@usman.dev', href: 'mailto:hello@usman.dev' },
                    { icon: MapPin, label: 'Location', value: 'Hyderabad, PK', href: null },
                    { icon: Clock, label: 'Response', value: 'Within 24 hours', href: null },
                  ].map(({ icon: Icon, label, value, href }, i) => (
                    <motion.div key={label} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: APPLE_EASE }}
                      className="flex items-start gap-4 group/card">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] transition-colors duration-300 group-hover/card:border-blue-500/25 group-hover/card:bg-blue-500/[0.06]">
                        <Icon className="size-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600 font-heading">{label}</p>
                        {href ? <a href={href} className="mt-0.5 block text-sm text-white transition-colors hover:text-blue-400">{value}</a> : <p className="mt-0.5 text-sm text-zinc-300">{value}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="h-px bg-white/[0.06]" />

                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600 font-heading">Find me on</p>
                  <div className="flex gap-3">
                    {SOCIALS.map(({ label, icon: Icon, href }, i) => (
                      <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                        initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.06, duration: 0.4, ease: APPLE_EASE }}
                        className="group flex size-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/40 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)]">
                        <Icon className="size-4 transition-transform duration-300 group-hover:scale-110" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* RIGHT — form */}
              <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.15, duration: 0.7, ease: APPLE_EASE }} className="lg:col-span-3">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex min-h-[380px] flex-col items-center justify-center gap-5 text-center">
                        <span className="relative flex size-16 items-center justify-center">
                          <motion.span aria-hidden className="absolute inset-0 rounded-full border border-emerald-400/40" initial={{ scale: 0.6, opacity: 0.8 }} animate={{ scale: 2, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.2 }} />
                          <motion.span className="relative flex size-14 items-center justify-center rounded-full border border-emerald-400/40 bg-gradient-to-br from-emerald-500 to-emerald-700" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }}>
                            <CheckCircle className="size-7 text-white" />
                          </motion.span>
                        </span>
                        <div>
                          <p className="font-heading font-bold text-white text-lg">Message Sent</p>
                          <p className="mt-1 text-sm text-zinc-400">I will get back to you soon.</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <Field label="Your Name" {...register('name')} value={values.name || ''} error={errors.name?.message} autoComplete="name" />
                          <Field label="Email" type="email" {...register('email')} value={values.email || ''} error={errors.email?.message} autoComplete="email" />
                        </div>
                        <Field label="Subject" {...register('subject')} value={values.subject || ''} error={errors.subject?.message} />
                        <Field label="Your Message" textarea {...register('message')} value={values.message || ''} error={errors.message?.message} />

                        {status === 'error' && (
                          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-xs text-red-300 sm:text-sm">
                            <AlertCircle className="size-4 shrink-0" />
                            <span>Something went wrong. Please try again.</span>
                          </motion.div>
                        )}

                        <button type="submit" disabled={status === 'sending'}
                          className="group relative mt-1 flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] py-3.5 font-heading font-semibold text-sm text-white transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:shadow-[0_0_30px_rgba(37,99,235,0.12)] active:scale-[0.98] disabled:opacity-50">
                          <AnimatePresence mode="wait">
                            {status === 'sending' ? (
                              <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Sending...
                              </motion.span>
                            ) : (
                              <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                <Send className="size-4" />
                                Send Message
                                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>

                        <p className="text-center text-[10px] uppercase tracking-[0.18em] text-zinc-600 font-heading">
                          No spam {"\u00B7"} stays private
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </div>
    </>
  )
}
