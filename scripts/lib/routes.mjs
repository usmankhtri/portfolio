// Shared route discovery for the build-time scripts (generate-sitemap.mjs and
// prerender.mjs). The static routes live here — a single source of truth for
// which URLs the site serves — and project routes are derived from
// src/data/portfolioData.ts by text scanning.
//
// This intentionally stays a light text parse rather than a full TS AST: it
// only needs to track the `projects:` array and the `id:` fields inside it,
// and portfolioData.ts is the single source of truth either way. The matchers
// are kept tolerant of single/double quotes and whitespace changes so a
// routine data edit (adding a project, reformatting) doesn't silently drop
// routes from the sitemap or the prerendered output.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/works', priority: '0.9', changefreq: 'weekly' },
  { path: '/services', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'yearly' },
]

export function readPortfolioData(root) {
  return readFileSync(resolve(root, 'src/data/portfolioData.ts'), 'utf-8')
}

function extractIds(text) {
  return [...text.matchAll(/id:\s*["']([^"']+)["']/g)].map((m) => m[1])
}

// Pull every project id from the `projects:` array. The array block runs from
// the opening `[` up to the closing `],` that immediately precedes the
// `services:` key — the structure portfolioData.ts is documented to keep.
// Falls back to scanning everything between `projects:` and `services:` if
// the exact closing-bracket pattern doesn't match, so formatting drift in the
// middle of the array cannot silently break route generation.
export function getProjectIds(dataSource) {
  const blockMatch = dataSource.match(/projects:\s*\[([\s\S]*?)\n\s*\]\s*,\s*\n\s*services:/)
  if (blockMatch) return extractIds(blockMatch[1])

  const fallbackMatch = dataSource.match(/projects:\s*\[([\s\S]*?)\n\s*services:/)
  if (fallbackMatch) return extractIds(fallbackMatch[1])

  return []
}

export function getProjectRoutes(projectIds) {
  return projectIds.map((id) => `/works/${id}`)
}

export function getAllRoutes(projectIds) {
  return [...STATIC_ROUTES.map((r) => r.path), ...getProjectRoutes(projectIds)]
}