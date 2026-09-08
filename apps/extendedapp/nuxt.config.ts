import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: ['../webapp'],
  srcDir: '.',
  // This app overrides the content page, so it needs no content database.
  starterContent: { enabled: false },
  typescript: {
    tsConfig: {
      // This overridden page is checked by webapp, where Content is enabled.
      exclude: [fileURLToPath(new URL('../webapp/pages/index.vue', import.meta.url))],
    },
  },
  monorepoDesign: { app: 'extendedapp' },
  runtimeConfig: { public: { site: { url: 'https://extended.nuxtmonostarter.com', name: 'NuxtMonoStarter Extended App' } } },
  site: {
    name: 'NuxtMonoStarter Extended App',
    url: 'https://extended.nuxtmonostarter.com',
  },
  i18n: {
    langDir: '../../../packages/translations',
    locales: [{ code: 'en-US', language: 'en-US', files: ['en-US.ts', 'singleapp/en-US.ts', 'extendedapp/en-US.ts'] }],
  },
})
