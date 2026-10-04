import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Layout } from './components/layout/Layout'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { LoadingScreen } from './components/LoadingScreen'
import { CustomCursor } from './components/CustomCursor'
import { PageTransition } from './components/layout/PageTransition'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Works } from './pages/Works'
import { ProjectDetail } from './pages/ProjectDetail'
import { ServicesPage } from './pages/ServicesPage'
import { ContactPage } from './pages/ContactPage'
import { useAppStore } from './store/useAppStore'
import { IntroFilm } from './components/intro/IntroFilm'

export default function App() {
  const location = useLocation()
  const { isLoading, hasSeenIntro, fromIntro } = useAppStore()

  // The Zustand store always initializes with isLoading: true (that's what
  // drives the cinematic intro on a real browser load). During prerendering
  // there is no browser session for that intro to play in, and crawlers
  // need the actual route content — not the loading card — in the static
  // HTML. So on the server we treat the app as already loaded, and skip the
  // purely-decorative client-only pieces (intro + custom cursor) entirely;
  // they mount normally once the client bundle takes over.
  const isServer = typeof window === 'undefined'
  const showApp = isServer || !isLoading

  const isIntro = location.pathname === '/intro'

  // First-time visitors are routed to the film (client-side only; the
  // prerendered HTML still serves real route content to crawlers). Returning
  // visitors land on the film route get sent home. `fromIntro` guards the
  // brief handoff window where hasSeenIntro has already flipped but the film
  // is still mounted to fade its bloom out.
  if (!isServer && !hasSeenIntro && !isIntro) {
    return <Navigate to="/intro" replace />
  }
  if (!isServer && isIntro && hasSeenIntro && !fromIntro) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!isServer && isLoading && !isIntro && <LoadingScreen key="cinematic-loader" />}
      </AnimatePresence>
      {!isServer && <CustomCursor />}

      <AnimatePresence mode="wait">
        {!isServer && isIntro && !hasSeenIntro && <IntroFilm key="intro-film" />}
      </AnimatePresence>

      <AnimatePresence>
        {showApp && (
          <motion.div
            key="portfolio-main"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Layout>
              <ScrollToTop />
              <AnimatePresence mode="wait" initial={false}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                  <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                  <Route path="/works" element={<PageTransition><Works /></PageTransition>} />
                  <Route path="/works/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
                  <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
                  <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                </Routes>
              </AnimatePresence>
            </Layout>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
