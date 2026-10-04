import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges class names and drops falsy values', () => {
    expect(cn('a', false, null, undefined, 0, 'b')).toBe('a b')
  })

  it('resolves conflicting Tailwind classes with tailwind-merge', () => {
    expect(cn('px-4', 'px-2')).toBe('px-2')
    expect(cn('text-sm', ['text-base'], { 'flex': true })).toBe('text-base flex')
  })

  it('returns empty string for empty input', () => {
    expect(cn()).toBe('')
  })
})