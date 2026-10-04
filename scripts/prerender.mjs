// Run via `npm run build` (see package.json). Expects `vite build` (client)
// and `vite build --ssr src/entry-server.tsx --outDir dist-server` to have
// already produced dist/index.html and dist-server/entry-server.js.
//
// For every route it:
//   1. Calls the SSR `render(url)` export to get the rendered app HTML and
//      the Helmet-collected <head> tags for that specific route.
//   2. Takes the built dist/index.html as a template, strips the route-
//      agnostic SEO tags that Helmet will re-provide (title, description,
//      canonical, OG/Twitter meta) so there's exactly one of each per page,
//      and injects the route's own tags + rendered markup.
//   3. Writes the result to dist/<route>/index.html (dist/index.html itself
//      for "/") so static hosts serve real content per URL, not just one
//      shared shell.
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { readPortfolioData, getProjectIds, getAllRoutes } from './lib/routes.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distDir = resolve(root, 'dist')
const serverDir = resolve(root, 'dist-server')

const routes = getAllRoutes(getProjectIds(readPortfolioData(root)))
if (!routes.some((r) => r.startsWith('/works/'))) {
  console.warn('[prerender] No project ids found — project detail pages will not be prerendered. Check portfolioData.ts shape.')
}

// Ensure Node treats the SSR bundle's output as ESM regardless of how Vite
// decided to format it, since dist-server has no package.json of its own.
const serverPkgJson = join(serverDir, 'package.json')
if (existsSync(serverDir) && !existsSync(serverPkgJson)) {
  writeFileSync(serverPkgJson, JSON.stringify({ type: 'module' }, null, 2))
}

const serverEntry = join(serverDir, 'entry-server.js')
if (!existsSync(serverEntry)) {
  console.error(
    `[prerender] Could not find ${serverEntry}.\n` +
    `Run "vite build --ssr src/entry-server.tsx --outDir dist-server" before this script ` +
    `(this is already wired into "npm run build" — see package.json).`
  )
  process.exit(1)
}

const { render } = await import(`file://${serverEntry}`)

const templatePath = join(distDir, 'index.html')
const template = readFileSync(templatePath, 'utf-8')

// Strip the route-agnostic tags that every SEO.tsx call re-provides, so we
// don't end up with two <title> tags / duplicate canonical links per route.
// Left untouched: charset, viewport, theme-color, icons, manifest, fonts,
// preconnects, and the sitewide Person/WebSite JSON-LD (useful fallback on
// routes whose SEO.tsx call doesn't pass its own jsonLd, e.g. Home).
function stripRouteAgnosticTags(html) {
  return html
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta name="title"[^>]*\/>/, '')
    .replace(/\s*<meta name="description"[^>]*\/>/, '')
    .replace(/\s*<meta name="robots"[^>]*\/>/, '')
    .replace(/\s*<link rel="canonical"[^>]*\/>/, '')
    .replace(/\s*<meta property="og:[^>]*\/>/g, '')
    .replace(/\s*<meta name="twitter:[^>]*\/>/g, '')
}

let written = 0

for (const route of routes) {
  const { appHtml, headHtml } = render(route)

  let html = stripRouteAgnosticTags(template)
  html = html.replace('</head>', `  ${headHtml}\n  </head>`)
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const outDir = route === '/' ? distDir : join(distDir, route)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
  written += 1
  console.log(`[prerender] ${route} → ${join(outDir, 'index.html').replace(root + '/', '')}`)
}

// dist-server is a build-time intermediate artifact only — not meant to ship.
rmSync(serverDir, { recursive: true, force: true })

console.log(`[prerender] Done. Wrote ${written} static route(s).`)
