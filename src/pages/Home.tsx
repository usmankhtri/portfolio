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

export const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Usman Khatri — Full-Stack Architect specializing in MERN Stack, PWA Engineering, and AI-Powered product visuals. Building high-performance digital ecosystems."
        url="/"
      />

      <main>
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