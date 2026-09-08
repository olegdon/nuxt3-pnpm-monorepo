import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'

interface PageSeoOptions {
  key?: string
  title?: MaybeRefOrGetter<string>
  description?: MaybeRefOrGetter<string>
  image?: MaybeRefOrGetter<string>
  robots?: string
}

export function definePageSeo(options: PageSeoOptions) {
  const { t, locale, locales, localeProperties, defaultLocale } = useI18n()
  const route = useRoute()
  const site = useSiteConfig()
  const switchLocalePath = useSwitchLocalePath()
  const alternates = computed(() => {
    if (locales.value.length < 2)
      return []
    const links = locales.value.flatMap((entry) => {
      const path = switchLocalePath(entry.code)
      return path ? [{ rel: 'alternate' as const, type: 'text/html', hreflang: entry.language || entry.code, href: new URL(path.split(/[?#]/)[0]!, site.url).href }] : []
    })
    const fallback = switchLocalePath(defaultLocale)
    if (fallback)
      links.push({ rel: 'alternate' as const, type: 'text/html', hreflang: 'x-default', href: new URL(fallback.split(/[?#]/)[0]!, site.url).href })
    return links
  })
  const title = computed(() => options.title ? toValue(options.title) : t(`pages.${options.key}.meta.title`))
  const description = computed(() => options.description ? toValue(options.description) : t(`pages.${options.key}.meta.description`))
  const canonical = computed(() => new URL(route.path, site.url).href)
  const image = computed(() => new URL(toValue(options.image) || '/social-card.png', site.url).href)

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogUrl: canonical,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogLocale: () => locale.value.replace('-', '_'),
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    robots: () => site.indexable === false ? 'noindex, nofollow' : (options.robots || 'index, follow'),
  })
  useHead(() => ({
    htmlAttrs: { lang: localeProperties.value.language || locale.value, dir: localeProperties.value.dir || 'ltr' },
    link: [
      ...alternates.value,
      { rel: 'canonical', href: canonical.value },
    ],
  }))
  useSchemaOrg([defineWebPage({
    '@id': () => `${canonical.value}#webpage`,
    'url': () => canonical.value,
    'name': () => title.value,
    'description': () => description.value,
    'inLanguage': () => locale.value,
  })])
}
