let lenisInstance: import('lenis').default | null = null

export const lenisStore = {
  setLenis: (instance: import('lenis').default) => {
    lenisInstance = instance
  },
  getLenis: () => lenisInstance,
  clear: () => {
    lenisInstance = null
  },
  scrollToTop: () => {
    if (lenisInstance) {
      const distance = lenisInstance.scroll ?? window.scrollY
      const duration = Math.min(3.5, 0.9 + distance / 900)
      lenisInstance.scrollTo(0, {
        duration,
        easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
        force: true,
      })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  },
}
