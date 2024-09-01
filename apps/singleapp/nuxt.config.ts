// https://nuxt.com/docs/getting-started/configuration
// https://nuxt.com/docs/api/nuxt-config

import tailwindConfig from '@devstdo/design/configs/tailwind.singleapp.config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  imports: {
    dirs: [
      'stores',
      '../../packages/services/composables',
      '../../packages/services/utils',
    ],
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@vue-macros/nuxt',
    'nuxt-schema-org',
    [
      '@devstdo/design/nuxt.ts',
      { app: 'singleapp' },
    ],
    [
      '@devstdo/modules/nuxt-app-module-config/module.ts',
      {
        app: 'singleapp',
        tailwind: tailwindConfig,
        fonts: [
          {
            name: 'Niramit',
            src: './node_modules/@devstdo/design/public/assets/fonts/niramit/*.woff2',
            dst: '@devstdo/design/public/assets/fonts/niramit/',
            type: 'sans',
          },
        ],
        image: {},
      },
    ],
  ],
  typescript: {
    shim: false,
  },
  runtimeConfig: {
    public: {
      app: {},
    },
  },
  i18n: {
    detectBrowserLanguage: false,
    customRoutes: 'page',
    defaultLocale: 'en-US',
    baseUrl: 'http://example.com',
    lazy: true,
    langDir: '../../packages/translations',
    vueI18n: '../../packages/translations/vue-i18n.ts',
    locales: [
      {
        code: 'en-US',
        files: [
          'en-US.ts',
          'singleapp/en-US.ts',
        ],
        language: 'en-US',
      },
    ],
  },
})
