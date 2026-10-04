import { describe, expect, it } from 'vitest'
import { STATIC_ROUTES, getAllRoutes, getProjectIds, readPortfolioData } from './routes.mjs'

const SAMPLE = `
export const portfolioData = {
  hero: {},
  projects: [
    { id: "alpha", title: "A" },
    { id: "beta", title: "B" },
  ],
  services: [],
}
`

const root = process.cwd()

describe('getProjectIds', () => {
  it('extracts ids from a canonical projects array', () => {
    expect(getProjectIds(SAMPLE)).toEqual(['alpha', 'beta'])
  })

  it('tolerates single-quoted ids', () => {
    const src = SAMPLE.replace('"alpha"', "'alpha'")
    expect(getProjectIds(src)).toEqual(['alpha', 'beta'])
  })

  it('falls back gracefully when the closing-bracket format drifts', () => {
    const src = SAMPLE.replace('  ],\n  services:', '  ]\n  services:')
    expect(getProjectIds(src)).toEqual(['alpha', 'beta'])
  })

  it('returns an empty list for an unknown shape instead of crashing', () => {
    expect(getProjectIds('const x = 1')).toEqual([])
  })
})

describe('getAllRoutes', () => {
  it('combines static routes with one route per project id', () => {
    expect(getAllRoutes(['a', 'b'])).toEqual([
      '/', '/about', '/works', '/services', '/contact', '/works/a', '/works/b',
    ])
  })

  it('keeps static routes when there are no projects', () => {
    expect(getAllRoutes([])).toEqual(STATIC_ROUTES.map((r) => r.path))
  })
})

describe('integration with the real portfolio data', () => {
  it('discovers the actual project ids from src/data/portfolioData.ts', () => {
    const ids = getProjectIds(readPortfolioData(root))
    expect(ids.length).toBeGreaterThan(0)
    expect(ids).toContain('kindahabit')
    expect(ids).toContain('devstudio')
  })
})