import process from 'node:process'
import { fileURLToPath } from 'node:url'

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2026-09-06',
  telemetry: false,
  devtools: { enabled: true },
  srcDir: '.',
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@devstdo/design/nuxt.ts',
    '@nuxt/image',
    'nuxt-schema-org',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-gtag',
    '@devstdo/modules/nuxt-app-module-config/module.ts',
    '@devstdo/modules/optional-content.ts',
  ],
  imports: { dirs: [resolve('../../packages/services/composables'), resolve('../../packages/services/utils')] },
  monorepoDesign: { app: 'webapp' },
  colorMode: { classSuffix: '' },
  i18n: {
    detectBrowserLanguage: false,
    strategy: 'no_prefix',
    defaultLocale: 'en-US',
    langDir: '../../../packages/translations',
    vueI18n: '../../../packages/translations/vue-i18n.ts',
    locales: [{ code: 'en-US', language: 'en-US', files: ['en-US.ts', 'singleapp/en-US.ts'] }],
  },
  site: {
    name: 'NuxtMonoStarter',
    url: 'https://www.nuxtmonostarter.com',
    indexable: process.env.NUXT_PUBLIC_SITE_INDEXABLE === 'true',
  },
  schemaOrg: { reactive: true },
  sitemap: { credits: false, sitemaps: false },
  robots: {
    credits: false,
    groups: [{
      userAgent: ['GPTBot', 'Google-Extended', 'CCBot', 'magpie-crawler', 'ia_archiver', 'omgili', 'omgilibot', 'Baiduspider', 'AhrefsBot', 'DataForSeoBot', 'Yeti', 'SemrushBot', 'sentibot', 'MJ12bot', 'Bytespider', 'SirdataBot', 'LCC', 'TurnitinBot', 'BLEXBot', 'dotbot', 'ImagesiftBot'],
      disallow: ['/'],
    }],
  },
  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    id: '',
    initMode: 'manual',
    config: { send_page_view: false },
    initCommands: [['consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }]],
  },
  runtimeConfig: { public: {
    site: { url: 'https://www.nuxtmonostarter.com', name: 'NuxtMonoStarter', indexable: false },
    analyticsEnabled: false,
    gtag: { id: '' },
  } },
  typescript: { strict: true },
})
