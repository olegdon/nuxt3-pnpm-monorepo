export function defineWebsiteSeo() {
  const site = useSiteConfig()
  const { locale } = useI18n()
  useHead({ link: [{ rel: 'icon', href: '/favicon.ico' }] })
  useSchemaOrg([defineWebSite({
    '@id': () => `${new URL('/', site.url).href}#website`,
    'name': () => site.name,
    'url': () => new URL('/', site.url).href,
    'inLanguage': () => locale.value,
  })])
}
