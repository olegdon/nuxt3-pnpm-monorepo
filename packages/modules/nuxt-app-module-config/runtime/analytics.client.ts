import { injectHead } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  if (!config.public.analyticsEnabled || !config.public.gtag?.id)
    return

  const head = nuxtApp.vueApp.runWithContext(() => injectHead())
  const consent = useAnalyticsConsent()
  const { gtag, initialize, disableAnalytics, enableAnalytics } = useGtag()
  let initialized = false
  let lastPath = ''

  function trackPage() {
    if (consent.value !== 'granted')
      return
    // Exclude arbitrary query strings and hashes, which can contain personal data.
    const path = window.location.pathname
    if (path === lastPath)
      return
    lastPath = path
    gtag('event', 'page_view', {
      page_location: `${window.location.origin}${path}`,
      page_title: document.title,
    })
  }

  watch(consent, (value) => {
    if (value === 'granted') {
      if (!initialized) {
        nuxtApp.runWithContext(() => initialize())
        initialized = true
      }
      enableAnalytics()
      gtag('consent', 'update', { analytics_storage: 'granted' })
      nextTick(trackPage)
    }
    else if (initialized) {
      gtag('consent', 'update', { analytics_storage: 'denied' })
      disableAnalytics()
      lastPath = ''
    }
  }, { immediate: true })

  // Nuxt pauses head updates during navigation; page:finish can precede the flush.
  head.hooks?.hook('dom:rendered', trackPage)
})
