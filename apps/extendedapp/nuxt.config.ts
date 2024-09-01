import tailwindConfig from '@devstdo/design/configs/tailwind.extendedapp.config'

export default defineNuxtConfig({
  imports: {
    dirs: [
      'stores',
      '../../packages/services/composables',
      '../../packages/services/utils',
    ],
  },
  modules: [
    [
      '@devstdo/design/nuxt.ts',
      { app: 'extendedapp' },
    ],
    [
      '@devstdo/modules/nuxt-app-module-config/module.ts',
      {
        app: 'extendedapp',
        tailwind: tailwindConfig,
        // image: {},
        i18n: {
          baseUrl: `http://example.com`,
          locales: (runtimeConfig: any) => runtimeConfig.i18n.locales,
          defaultLocale: (runtimeConfig: any) => runtimeConfig.i18n.defaultLocale,
        },
        asyncRuntimeConfig: async () => await import(('./configs/extendedapp.ts')),
      },
    ],
  ],
  extends: [
    '../webapp',
  ],
})
