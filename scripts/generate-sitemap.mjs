// Generates public/sitemap.xml from the shared route list + every project id
// in src/data/portfolioData.ts. Runs on plain Node (no TS transpile needed)
// so it's safe to run on every `npm run build` without adding a dependency.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { STATIC_ROUTES, readPortfolioData, getProjectIds } from './lib/routes.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const BASE_URL = 'https://usmankhatri.dev'
const TODAY = new Date().toISOString().split('T')[0]

const projectIds = getProjectIds(readPortfolioData(root))

if (projectIds.length === 0) {
  console.warn('[generate-sitemap] No project ids found — check portfolioData.ts shape.')
}

const staticRoutes = STATIC_ROUTES

const projectRoutes = projectIds.map((id) => ({
  path: `/works/${id}`,
  priority: '0.8',
  changefreq: 'monthly',
}))

const allRoutes = [...staticRoutes, ...projectRoutes]

const urlEntries = allRoutes
  .map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
console.log(`[generate-sitemap] Wrote ${allRoutes.length} URLs to public/sitemap.xml (${projectRoutes.length} project routes).`)