import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { APPLE_EASE } from '../../../lib/utils'
import { ChevronDown, Zap, Globe, Code2, Palette, MessageSquareQuote } from 'lucide-react'
import { portfolioData } from '../../../data/portfolioData'

const { about } = portfolioData

const FAQS = [
  {
    q: 'What is your typical project workflow?',
    a: 'Discovery \u2192 Wireframes \u2192 Design system \u2192 Development \u2192 Testing \u2192 Launch. I keep you in the loop at every stage with weekly check-ins and live previews.',
  },
  {
    q: 'How long does a typical project take?',
    a: "Depends on scope. A focused MVP can take 4\u20136 weeks. A full-scale SaaS platform usually runs 8\u201314 weeks. I'll give you a realistic timeline after our first call.",
  },
  {
    q: 'Do you work with startups or only established companies?',
    a: "Both. I love the energy of early-stage startups and the complexity of established products. If the project is interesting, I'm in.",
  },
  {
    q: 'What technologies do you specialize in?',
    a: 'React, TypeScript, Next.js, Node.js, Tailwind CSS, and AI integrations. I pick the right stack for each project rather than forcing a one-size-fits-all approach.',
  },
  {
    q: 'Do you provide ongoing support after launch?',
    a: 'Yes. I offer maintenance retainers and am available for iterative improvements. Most clients stay on a monthly plan post-launch.',
  },
  {
    q: 'How do you handle pricing?',
    a: 'I offer both fixed-price and hourly rates depending on project scope. Small projects get a flat fee. Larger engagements are scoped in phases with clear milestones.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'Usman turned our vague idea into a polished product that our users genuinely love. The attention to detail is unreal.',
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    color: '#2563EB',
  },
  {
    quote: "Fast, reliable, and actually enjoyable to work with. He doesn't just code \u2014 he thinks about the product.",
    name: 'Ali Raza',
    role: 'CTO, TechFlow',
    color: '#60A5FA',
  },
  {
    quote: "The best freelancer I've worked with. Period. He delivered ahead of schedule and the quality was production-ready.",
    name: 'Marcus Webb',
    role: 'Product Lead, Orbital',
    color: '#818CF8',
  },
]

const STATS = [
  { value: '4+', label: 'Years Experience', icon: Zap },
  { value: '30+', label: 'Projects Shipped', icon: Globe },
  { value: '24h', label: 'Response Time', icon: Code2 },
  { value: '100%', label: 'Satisfaction', icon: Palette },
]

const SectionHead = ({ tag, title, sub }: { tag: string; title: React.ReactNode; sub: string }) => (
  <div className="mb-12 sm:mb-16 text-center">
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: APPLE_EASE }}
      className="mb-5 flex items-center justify-center gap-3"
    >
      <span className="h-px w-10 bg-blue-500/40" />
      <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-blue-400 font-heading">{tag}</span>
      <span className="h-px w-10 bg-blue-500/40" />
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: 0.1, duration: 0.6, ease: APPLE_EASE }}
      className="font-heading font-black tracking-tight text-white"
      style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)' }}
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: 0.2, duration: 0.5, ease: APPLE_EASE }}
      className="mt-3 mx-auto max-w-lg text-sm leading-relaxed text-zinc-500 sm:text-base"
    >
      {sub}
    </motion.p>
  </div>
)

const AccordionItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: APPLE_EASE }}
      className="group"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-300"
      >
        <span className="font-heading font-semibold text-white text-sm sm:text-base group-hover:text-blue-400 transition-colors duration-300">
          {q}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: APPLE_EASE }} className="shrink-0">
          <ChevronDown className="size-4 text-zinc-500" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: APPLE_EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-zinc-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-px bg-white/[0.06]" />
    </motion.div>
  )
}

export const StatsBar = () => (
  <section className="relative z-10 py-6 sm:py-8">
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        {STATS.map(({ value, label, icon: Icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: APPLE_EASE }}
            className="group relative flex flex-col items-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-5 sm:py-6 transition-all duration-500 hover:border-blue-500/25 hover:bg-blue-500/[0.04]"
          >
            <div className="flex size-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] transition-colors duration-500 group-hover:border-blue-500/30 group-hover:bg-blue-500/[0.08]">
              <Icon className="size-4 text-blue-400" />
            </div>
            <span className="font-heading text-2xl font-bold text-white sm:text-3xl">{value}</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500 font-heading">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export const FAQSection = () => (
  <section className="relative z-10 py-16 sm:py-24">
    <div className="mx-auto max-w-3xl px-5 sm:px-8">
      <SectionHead tag="FAQ" title={<>Common Questions</>} sub="Everything you need to know before we start working together." />
      <div>
        {FAQS.map((faq, i) => (
          <AccordionItem key={i} index={i} {...faq} />
        ))}
      </div>
    </div>
  </section>
)

export const TestimonialsSection = () => (
  <section className="relative z-10 py-16 sm:py-24 overflow-hidden">
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHead tag="Kind Words" title={<>What People Say</>} sub="Feedback from founders and teams I have worked with." />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {TESTIMONIALS.map(({ quote, name, role, color }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: APPLE_EASE }}
            className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]"
          >
            <div aria-hidden className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" style={{ background: `radial-gradient(circle, ${color}20, transparent 70%)` }} />
            <div className="relative">
              <MessageSquareQuote className="mb-4 size-5" style={{ color }} />
              <p className="text-sm leading-relaxed text-zinc-300 sm:text-[15px]">{quote}</p>
            </div>
            <div className="relative mt-6 flex items-center gap-3">
              <div className="size-9 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold font-heading" style={{ background: `${color}15`, color }}>
                {name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{name}</p>
                <p className="text-[11px] text-zinc-500">{role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export const CTASection = () => (
  <section className="relative z-10 py-20 sm:py-32">
    <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: APPLE_EASE }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)' }}
      />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: APPLE_EASE }}
        className="mb-4 text-[11px] font-bold uppercase tracking-[0.4em] text-blue-400 font-heading"
      >
        Let us Talk
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6, ease: APPLE_EASE }}
        className="font-heading font-black tracking-tight text-white"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
      >
        Have a project in mind?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5, ease: APPLE_EASE }}
        className="mt-4 mx-auto max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base"
      >
        I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.5, ease: APPLE_EASE }}
        className="mt-8"
      >
        <a
          href={`mailto:${about.email}`}
          className="group inline-flex items-center gap-2.5 rounded-xl px-8 py-4 font-heading font-bold text-sm uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', boxShadow: '0 0 40px rgba(37,99,235,0.25)' }}
        >
          Say Hello
          <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">{String.fromCharCode(8594)}</span>
        </a>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-5 text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-heading"
      >
        {about.email} {"\u00B7"} Usually replies within 24 hours
      </motion.p>
    </div>
  </section>
)
