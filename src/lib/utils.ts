import { useSyncExternalStore } from 'react'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function useIsDesktop(minWidth = 768) {
  const isDesktop = useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') {
        return () => {}
      }
      const mq = window.matchMedia(`(min-width: ${minWidth}px)`)
      mq.addEventListener('change', callback)
      return () => mq.removeEventListener('change', callback)
    },
    () => (typeof window !== 'undefined' ? window.matchMedia(`(min-width: ${minWidth}px)`).matches : false),
    () => false,
  )

  return isDesktop
}
