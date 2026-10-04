import { describe, expect, it } from 'vitest'
import { Boxes } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import { getTechIcon } from './techIcons'

describe('techIcons', () => {
  it('resolves a dedicated icon for every entry in the tech catalog', () => {
    expect(portfolioData.techStack.length).toBeGreaterThan(0)
    for (const tech of portfolioData.techStack) {
      expect(getTechIcon(tech.name), `${tech.name} is missing a dedicated icon`).not.toBe(Boxes)
    }
  })
})