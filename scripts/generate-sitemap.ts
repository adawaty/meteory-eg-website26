import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = process.env.SITE_URL || 'https://meteory-eg.com'

const routes = [
  '/',
  '/about',
  '/products',
  '/services',
  '/projects',
  '/industries',
  '/resources',
  '/calculator',
  '/quote',
  '/login',
]

const urls = routes
  .map((p) => `${SITE_URL}${p}`)
  .map((loc) => `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${loc.endsWith('/') ? '1.0' : '0.7'}</priority>\n  </url>`)
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

const outPath = path.join(process.cwd(), 'public', 'sitemap.xml')
fs.writeFileSync(outPath, xml, 'utf8')
console.log(`Generated ${outPath} (${routes.length} routes)`) 
