// Used exclusively by scripts/prerender.mjs via `vite build --ssr`. Not
// referenced by index.html / the browser bundle at all — the client always
// boots through entry-client via main.tsx.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

export function render(url: string) {
  const helmetContext: Record<string, unknown> = {}

  const appHtml = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </StaticRouter>
    </StrictMode>
  )

  const helmet = helmetContext.helmet as Record<string, { toString(): string }> | undefined

  // Concatenated into <head>...</head> by the prerender script, replacing
  // the equivalent static tags already baked into index.html for that route.
  const headHtml = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ].join('\n    ')
    : ''

  return { appHtml, headHtml }
}
