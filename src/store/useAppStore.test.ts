import { beforeEach, describe, expect, it } from 'vitest'
import { useAppStore } from './useAppStore'

const STORAGE_KEY = 'usman-portfolio-storage'

describe('useAppStore', () => {
  beforeEach(() => {
    localStorage.clear()
    useAppStore.setState({
      isLoading: true,
      hasSeenIntro: false,
      soundEnabled: false,
      cursorVariant: 'default',
    })
  })

  it('starts in the loading state with no intro seen', () => {
    const s = useAppStore.getState()
    expect(s.isLoading).toBe(true)
    expect(s.hasSeenIntro).toBe(false)
    expect(s.soundEnabled).toBe(false)
  })

  it('finishLoading clears the loading gate and marks the intro seen', () => {
    useAppStore.getState().finishLoading()
    const s = useAppStore.getState()
    expect(s.isLoading).toBe(false)
    expect(s.hasSeenIntro).toBe(true)
  })

  it('toggleSound flips the sound flag', () => {
    useAppStore.getState().toggleSound()
    expect(useAppStore.getState().soundEnabled).toBe(true)
    useAppStore.getState().toggleSound()
    expect(useAppStore.getState().soundEnabled).toBe(false)
  })

  it('setCursorVariant updates the cursor state', () => {
    useAppStore.getState().setCursorVariant('button')
    expect(useAppStore.getState().cursorVariant).toBe('button')
  })

  it('persists only preferences, never transient UI state', () => {
    useAppStore.getState().toggleSound()
    useAppStore.getState().finishLoading()
    useAppStore.getState().setCursorVariant('hover')

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored.state.soundEnabled).toBe(true)
    expect(stored.state.hasSeenIntro).toBe(true)
    expect(stored.state).not.toHaveProperty('isLoading')
    expect(stored.state).not.toHaveProperty('cursorVariant')
  })
})