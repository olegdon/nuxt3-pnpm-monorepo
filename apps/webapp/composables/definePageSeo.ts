/**
 * composable for page rendering, handles general things like setting seo things
 * and returning commonly used page functions
 */
const i18NCache: Record<string, string> = {}
const staticCache: Record<string, string> = {}

function getPlaceholderData($t: any, placeholders = {}): Record<string, string> {
  if (!i18NCache.year) {
    const { month, year } = (d => ({ month: d.getMonth() + 1, year: d.getFullYear() }))(new Date())

    i18NCache.year = String(year)
    i18NCache.month = $t(`general.date.month.${month}`)
  }

  return { ...i18NCache, ...placeholders, ...staticCache }
}

function fillPlaceholders(template: string, placeholders: Record<string, string>): string {
  return template.replace(/[%{](\w+)[%}]/g, (match, key): string => placeholders[key] || match)
}

export function definePageSeo({ title, description, image, placeholders, robots, key, schemaContent }: any) {
  const { t: $t } = useI18n()

  placeholders = getPlaceholderData($t, placeholders)

  title = title ? fillPlaceholders(String(title), placeholders) : (key ? $t(`pages.${key}.meta.title`, placeholders) : null)

  onServerPrefetch(() => {
    // const config = useRuntimeConfig()

    description = description ? fillPlaceholders(String(description), placeholders) : (key ? $t(`pages.${key}.meta.description`, placeholders) : null)
    robots = robots || 'index, follow'

    const i18nHead = useLocaleHead({
      addSeoAttributes: {
        canonicalQueries: [],
      },
      addDirAttribute: true,
    })

    const url = i18nHead.value?.link?.filter(({ rel }: any) => rel === 'canonical')[0] || {}

    if (schemaContent) {
      // @TODO add logic for schema content
    }

    useServerSeoMeta({
      description,
      ogDescription: description,
      ogType: 'website',
      // ogImage: image || config.public.i18n.baseUrl + config.public?.app?.layout?.logo || null,
      ogTitle: title,
      ogUrl: url.href,
      ogLocale: i18nHead.value.htmlAttrs?.lang,
      robots,
    })

    useHead({
      link: [url],
      htmlAttrs: i18nHead.value.htmlAttrs,
    })
  })

  useSeoMeta({
    title,
  })
}
