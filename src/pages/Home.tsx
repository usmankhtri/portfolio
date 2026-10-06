import { SEO } from '../components/SEO'
import { HeroStage } from '../components/sections/hero/HeroStage'
import { TechScene } from '../components/sections/home/TechScene'
import { CreativeStatsBar } from '../components/sections/home/CreativeStatsBar'
import { AboutScene } from '../components/sections/home/AboutScene'
import { FascinatingProjectScroll } from '../components/sections/home/FascinatingProjectScroll'
import { Services } from '../components/sections/Services'
import { Contact } from '../components/sections/Contact'
import { SectionDivider } from '../components/ui/SectionDivider'
import { SceneShell } from '../components/ui/SceneShell'
import { portfolioData } from '../data/portfolioData'

const { about } = portfolioData

const homeJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Usman Khatri Portfolio',
    url: 'https://usmankhatri.vercel.app',
    description: 'Portfolio of Usman Khatri — Full-Stack Architect & Digital Ecosystem Engineer.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://usmankhatri.vercel.app/works?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Usman Khatri',
    url: 'https://usmankhatri.vercel.app',
    image: 'https://usmankhatri.vercel.app/usman.png',
    jobTitle: 'Full-Stack Architect',
    description: about.bio,
    telephone: '+92 331 4915447',
    email: `mailto:${about.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressCountry: 'PK',
    },
    sameAs: [about.github, about.linkedin, about.facebook, about.instagram],
    knowsAbout: about.skills,
  },
]

export const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Usman Khatri — Full-Stack Architect specializing in MERN Stack, PWA Engineering, and AI-Powered product visuals. Building high-performance digital ecosystems."
        url="/"
        jsonLd={homeJsonLd}
      />

      <main id="main-content">
        {/* SCENE 01 — Opening Title */}
        <HeroStage />

        <SectionDivider />

        {/* SCENE 02 — Impact (stats line) */}
        <SceneShell label="Impact" accent="#3B82F6" className="py-10 sm:py-12">
          <CreativeStatsBar />
        </SceneShell>

        <SectionDivider />

        {/* SCENE 03 — About Me */}
        <AboutScene />

        <SectionDivider />

        {/* SCENE 04 — Tech Stack */}
        <TechScene />

        <SectionDivider />

        {/* SCENE 05 — Selected Works (showreel) */}
        <FascinatingProjectScroll />

        <SectionDivider />

        {/* SCENE 06 — Services */}
        <Services />

        <SectionDivider />

        {/* SCENE 07 — Contact */}
        <Contact />
      </main>
    </>
  )
}