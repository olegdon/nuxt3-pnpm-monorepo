export function defineWebsiteSeo() {
  const url = useRequestURL()
  const { locale } = useI18n()
  const config = useRuntimeConfig()
  const image = useImage()
  const icon = config?.public?.app?.layout?.icon || '/icon.png'
  const favicon = config?.public?.app?.layout?.favicon || '/favicon.ico'

  useHead({
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        href: image(icon, { width: 512, q: 90 }),
      },
      {
        rel: 'icon',
        sizes: '48x48',
        href: `${config.app.baseURL}${favicon}`.replace('//', '/'),
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: image(icon, { width: 192, q: 90 }),
      },
      {
        rel: 'apple-touch-icon',
        href: image(icon, { width: 180, q: 90 }),
      },
    ],
  })

  if (!import.meta.env.DEV) {
    // the server route can't access the image module, so the vercel paths are hardcoded, leading to 404 on dev
    useHead({
      link: [
        {
          rel: 'manifest',
          href: `${config.app.baseURL}/manifest.webmanifest`.replace('//', '/'),
        },
      ],
    })
  }

  useSchemaOrg([
    defineWebSite({
      name: config?.public?.app?.project?.name,
      inLanguage: locale.value,
      url: `${url.origin}${config.app.baseURL}`.replace('//', '/'),
    }),
    defineWebPage({
      url: `${url.origin}${url.pathname}`,
      potentialAction: [],
    }),
  ])
}
