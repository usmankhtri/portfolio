import { motion } from 'framer-motion'
import { APPLE_EASE, cn } from '../lib/utils'
import { Code2, Smartphone, Wand2, Database, Layers, Cpu, ArrowUpRight, Sparkles } from 'lucide-react'
import { SEO } from '../components/SEO'
import { SpotlightCard } from '../components/ui/SpotlightCard'
import { SectionDivider } from '../components/ui/SectionDivider'
import { Contact } from '../components/sections/Contact'
import { portfolioData } from '../data/portfolioData'
import { Link } from 'react-router-dom'
import { useMagnetic } from '../hooks/useMagnetic'

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code2, Smartphone, Wand2, Database, Layers, Cpu,
}

const { services } = portfolioData

const process = [
  { step: '01', title: 'Discover', desc: 'Deep-dive into your goals, users, and technical requirements.' },
  { step: '02', title: 'Architect', desc: 'Design the system structure, API contracts, and UI/UX flow.' },
  { step: '03', title: 'Build', desc: 'Iterative development with weekly demos and fast feedback loops.' },
  { step: '04', title: 'Ship', desc: 'Performance-optimized, accessible, and fully production-ready.' },
]

export const ServicesPage = () => {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.06)

  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Services by Usman Khatri',
    description: 'Full-Stack Development, PWA Engineering, and AI Integration Services',
    itemListElement: services.map((s, i) => ({
      '@type': 'Offer',
      position: i + 1,
      name: s.title,
      description: s.description,
    })),
  }

  return (
    <>
      <SEO
        title="Services & Architecture"
        description="Full-Stack MERN development, PWA engineering, and AI integration services by Usman Khatri."
        url="/services"
        jsonLd={servicesJsonLd}
      />

      <main id="main-content" className="min-h-screen pt-16 sm:pt-20 pb-0 overflow-hidden">
        {/* Ambient background */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none fixed -top-40 right-[15%] size-[500px] rounded-full opacity-20 blur-[140px]"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, rgba(37,99,235,0) 70%)' }}
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* ============================================================= */}
          {/* HEADER                                                        */}
          {/* ============================================================= */}
          <div className="relative pt-10 sm:pt-16 pb-12 sm:pb-20">
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: APPLE_EASE }}
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
              style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, rgba(37,99,235,0) 70%)' }}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: APPLE_EASE }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-blue-500/50" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-blue-300">
                What I Do
              </span>
              <span className="h-px w-10 bg-gradient-to-r from-blue-500/50 to-transparent" />
            </motion.div>

            <h1 className="font-heading font-black tracking-tighter text-white leading-[0.95]" style={{ fontSize: 'clamp(1.75rem, 5.2vw, 6rem)' }}>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '112%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8, ease: APPLE_EASE }}
                >
                  SERVICES
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-gradient-blue animate-gradient-shift"
                  initial={{ y: '112%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.22, duration: 0.8, ease: APPLE_EASE }}
                >
                  BUILT FOR SCALE.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: APPLE_EASE }}
              className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base"
            >
              From architecture to animation, I deliver complete, production-ready digital products that balance engineering precision with exceptional user experience.
            </motion.p>
          </div>

          <SectionDivider />

          {/* ============================================================= */}
          {/* SERVICES GRID                                                 */}
          {/* ============================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-12 sm:py-16">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Code2
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.7, ease: APPLE_EASE }}
                >
                  <SpotlightCard className="group/card relative p-6 sm:p-8 h-full flex flex-col gap-5 sm:gap-6 overflow-hidden">
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
                          'pointer-events-none absolute z-10 size-3.5 border-blue-400/0 transition-colors duration-300 group-hover/card:border-blue-400/60',
                          pos,
                        )}
                      />
                    ))}

                    {/* Engineering grid on hover */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                    />

                    <div className="relative z-10">
                      <div
                        className="size-10 sm:size-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}
                      >
                        <Icon className="size-5 sm:size-6 text-primary-light" />
                      </div>
                    </div>

                    <div className="relative z-10 flex-1">
                      <h2 className="font-heading font-bold text-white text-base sm:text-lg mb-2 sm:mb-3 tracking-tight">{service.title}</h2>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{service.description}</p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between pt-3 sm:pt-4 border-t border-white/5">
                      <span className="font-mono text-[10px] text-zinc-600">0{i + 1}</span>
                      <span
                        className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full font-heading"
                        style={{ background: 'rgba(37,99,235,0.08)', color: '#60A5FA', border: '1px solid rgba(37,99,235,0.15)' }}
                      >
                        {service.highlight}
                      </span>
                    </div>
                  </SpotlightCard>
                </motion.div>
              )
            })}
          </div>

          <SectionDivider />

          {/* ============================================================= */}
          {/* PROCESS                                                       */}
          {/* ============================================================= */}
          <div className="py-12 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              className="mb-10 sm:mb-14"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500/50" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
                  02
                </span>
                <span className="h-px w-8 bg-gradient-to-r from-blue-500/50 to-transparent" />
              </div>
              <h2 className="font-heading font-bold text-white tracking-tight" style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>
                My Process
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {process.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: APPLE_EASE }}
                >
                  <div className="group/proc relative p-5 sm:p-6 rounded-2xl h-full border border-white/[0.06] bg-[#0B1220]/50 backdrop-blur-sm transition-colors duration-300 hover:border-blue-500/25 hover:bg-[#0B1220]/70">
                    {/* Top hairline */}
                    <div
                      aria-hidden
                      className="absolute left-[15%] right-[15%] top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover/proc:opacity-100 transition-opacity duration-300"
                    />

                    <div className="font-display text-4xl sm:text-5xl text-primary/20 mb-3 sm:mb-4" aria-hidden>{item.step}</div>
                    <h3 className="font-heading font-bold text-white text-base sm:text-lg mb-2">{item.title}</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>

                    {i < process.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 z-10 w-6 h-px bg-primary/30" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <SectionDivider />

          {/* ============================================================= */}
          {/* CTA BOARD                                                     */}
          {/* ============================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B1220]/60 backdrop-blur-md py-16 sm:py-20 text-center my-12 sm:my-16"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.04)_1px,transparent_1px)] bg-[size:48px_48px]"
            />
            <div
              aria-hidden
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-30 blur-[80px]"
              style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, transparent 70%)' }}
            />
            <div aria-hidden className="absolute left-[20%] right-[20%] top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-md mb-6">
                <Sparkles className="size-3 text-blue-400" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300 font-heading">
                  Ready to start?
                </span>
              </div>

              <h2
                className="font-heading font-black tracking-tighter text-white mb-4"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}
              >
                Let's build something{' '}
                <span className="text-gradient-blue">remarkable.</span>
              </h2>

              <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Let's scope your project and build something remarkable together.
              </p>

              <Link
                ref={ctaRef}
                to="/contact"
                className="shine-sweep group inline-flex items-center gap-3 px-10 py-4 rounded-xl font-heading font-bold text-xs sm:text-sm text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] will-change-transform"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  boxShadow: '0 0 32px rgba(37,99,235,0.4)',
                }}
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </motion.div>
        </div>

        <SectionDivider />

        {/* Contact section */}
        <Contact />
      </main>
    </>
  )
}