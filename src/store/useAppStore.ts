import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CursorVariant = 'default' | 'hover' | 'text' | 'button'

export interface AppState {
  isLoading: boolean
  hasSeenIntro: boolean
  /** True for the brief window after the film hands off into the home hero. */
  fromIntro: boolean
  soundEnabled: boolean
  cursorVariant: CursorVariant
  finishLoading: () => void
  /** Film handoff: mark the intro seen, drop the loading gate, flag the arrival. */
  beginHandoff: () => void
  /** Consumed by the hero after its arrival animation has started. */
  acknowledgeIntro: () => void
  toggleSound: () => void
  setCursorVariant: (variant: CursorVariant) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isLoading: true,
      hasSeenIntro: false,
      fromIntro: false,
      soundEnabled: false,
      cursorVariant: 'default',
      finishLoading: () => set({ isLoading: false, hasSeenIntro: true }),
      beginHandoff: () => set({ fromIntro: true, hasSeenIntro: true, isLoading: false }),
      acknowledgeIntro: () => set({ fromIntro: false }),
      toggleSound: () => set((state: AppState) => ({ soundEnabled: !state.soundEnabled })),
      setCursorVariant: (variant: CursorVariant) => set({ cursorVariant: variant }),
    }),
    {
      name: 'usman-portfolio-storage',
      partialize: (state: AppState) => ({
        hasSeenIntro: state.hasSeenIntro,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
)
