export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'text/plain')
  return `User-agent: *

User-agent: sistrix
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: magpie-crawler
Disallow: /

User-agent: ia_archiver
Disallow: /

User-Agent: omgili
Disallow: /

User-Agent: omgilibot
Disallow: /

User-agent: Baiduspider
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: DataForSeoBot
Disallow: /

User-agent: Yeti
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: sentibot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: SirdataBot
Disallow: /

User-agent: LCC
Disallow: /

User-agent: TurnitinBot
Disallow: /

User-agent: BLEXBot
Disallow: /

User-agent: dotbot
Disallow: /

User-Agent: ImagesiftBot
Disallow: /

Sitemap: ${getRequestURL(event).origin}/sitemap.xml
  `
})
