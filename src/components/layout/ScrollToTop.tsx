import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { lenisStore } from '../../lib/lenisStore'

export const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    lenisStore.scrollToTop()
  }, [pathname])

  return null
}
