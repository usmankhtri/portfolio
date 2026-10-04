// Resolves brand icons for the tech catalog in portfolioData.ts. Keeping the
// icon components out of the data file (which is also text-scanned by the
// build scripts) means the catalog stays serializable and the presentation
// mapping lives in exactly one place.
import type { ComponentType, CSSProperties } from 'react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
  SiGraphql,
  SiPython,
  SiGit,
  SiRedis,
  SiVite,
  SiRedux,
  SiFramer,
  SiHtml5,
  SiCss,
  SiGooglegemini,
  SiPwa,
} from 'react-icons/si'
import { Boxes, BrainCircuit, Atom } from 'lucide-react'

const TECH_ICONS: Record<string, ComponentType<{ className?: string; style?: CSSProperties }>> = {
  TypeScript: SiTypescript,
  'React 19': SiReact,
  'Next.js 15': SiNextdotjs,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  'Tailwind CSS': SiTailwindcss,
  'JavaScript (ES6+)': SiJavascript,
  Python: SiPython,
  Docker: SiDocker,
  GraphQL: SiGraphql,
  Redis: SiRedis,
  'Framer Motion': SiFramer,
  Vite: SiVite,
  'Git & GitHub': SiGit,
  HTML5: SiHtml5,
  CSS3: SiCss,
  'Redux Toolkit': SiRedux,
  'AI Workflows (Gemini API)': SiGooglegemini,
  Redux: SiRedux,
  Zustand: Atom,
  PWA: SiPwa,
  'AI Prompt Engineering': BrainCircuit,
  Express: SiExpress,
}

export const getTechIcon = (name: string) => TECH_ICONS[name] ?? Boxes