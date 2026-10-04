import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  image?: string
  article?: boolean
  url?: string
  /** One or more schema.org JSON-LD objects, rendered as separate <script> tags. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

const BASE_URL = 'https://usmankhatri.dev'
const DEFAULT_IMAGE = `${BASE_URL}/usman.png`
const SITE_NAME = 'Usman Khatri | Full-Stack Architect'

export const SEO = ({ title, description, image, article, url, jsonLd }: SEOProps) => {
  const fullTitle = title === 'Home' ? SITE_NAME : `${title} | ${SITE_NAME}`
  const canonical = url ? `${BASE_URL}${url}` : BASE_URL
  const ogImage = image || DEFAULT_IMAGE
  const jsonLdEntries = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@usmankhatri" />

      {/* Robots & indexing */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Per-route JSON-LD structured data (in addition to the global
          Person/WebSite schema baked into index.html) */}
      {jsonLdEntries.map((entry, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  )
}
