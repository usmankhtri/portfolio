import { portfolioData } from '../data/portfolioData'

/** Fire-and-forget image warming. Never rejects; errors are swallowed. */
export function preloadImages(urls: string[]): Promise<void> {
  const unique = [...new Set(urls.filter(Boolean))]
  if (!unique.length || typeof Image === 'undefined') return Promise.resolve()
  const pending = unique.map(
    (url) =>
      new Promise<void>((resolve) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => resolve()
        img.src = url
      })
  )
  return Promise.all(pending).then(() => undefined)
}

const fontCache = new Map<string, Promise<void>>()

/** Force a Google Fonts family/weights into the browser cache. Never rejects. */
export function preloadFonts(family: string, weights: number[]): Promise<void> {
  const key = `${family}@${weights.join(',')}`
  if (typeof document === 'undefined' || !document.fonts) return Promise.resolve()
  if (!fontCache.has(key)) {
    fontCache.set(
      key,
      Promise.all(weights.map((w) => document.fonts.load(`${w} 32px "${family}"`))).then(() => undefined)
    )
  }
  return fontCache.get(key)!
}

/** Intro-critical fonts, capped so the film can never be blocked longer than the cap. */
export function waitForIntroFonts(timeoutMs = 400): Promise<void> {
  if (typeof document === 'undefined') return Promise.resolve()
  const fonts = preloadFonts('Outfit', [800, 900])
  return new Promise((resolve) => {
    let done = false
    const finish = () => {
      if (!done) {
        done = true
        resolve()
      }
    }
    fonts.then(finish, finish)
    window.setTimeout(finish, timeoutMs)
  })
}

/** Project covers — needed mid-film by the "The Work." scene. */
export function filmImageUrls(): string[] {
  return portfolioData.projects.map((p) => p.image)
}

/** Every raster the portfolio can show: hero/portrait + all covers and galleries. */
export function portfolioImageUrls(): string[] {
  return [
    '/3potrait.png',
    '/usman.png',
    ...portfolioData.projects.flatMap((p) => [p.image, ...p.gallery]),
  ]
}

/** The full site warms up in the background while the film plays. */
export function preloadPortfolioAssets(): void {
  void preloadImages(portfolioImageUrls())
  preloadFonts('Outfit', [700])
  preloadFonts('Plus Jakarta Sans', [500, 600, 700, 800])
  preloadFonts('Montserrat', [800, 900])
  preloadFonts('Space Grotesk', [600, 700])
  preloadFonts('JetBrains Mono', [400, 500, 600])
  preloadFonts('Poppins', [600, 700])
}
