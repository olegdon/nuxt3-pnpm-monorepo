// https://nuxt.com/docs/getting-started/configuration
// https://nuxt.com/docs/api/nuxt-config

import tailwindConfig from '@devstdo/design/configs/tailwind.webapp.config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  alias: {
    '@devstdo/webapp': './',
  },
  devtools: { enabled: true },
  sourcemap: false,
  telemetry: false,
  experimental: {
    componentIslands: 'local',
  },
  features: {
    inlineStyles: true,
  },
  imports: {
    dirs: [
      'stores',
      '../../packages/design/stores',
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
    [
      '@nuxtjs/color-mode',
      {
        classSuffix: '',
      },
    ],
    '@nuxtjs/i18n',
    [
      '@nuxtjs/tailwindcss',
      {
        cssPath: '../../packages/design/styles/webapp.css',
        config: {
          content: [
            '../../packages/design/components/base/**/*.vue',
            '../../packages/design/styles/*.css',
            './components/**/*.{js,vue,ts}',
            './layouts/**/*.vue',
            './pages/**/*.vue',
            './nuxt.config.{js,ts}',
            './app.vue',
          ],
          theme: tailwindConfig.theme,
        },
        viewer: false,
      },
    ],
    '@vueuse/nuxt',
    '@vue-macros/nuxt',
    '@devstdo/design/nuxt.ts',
    'nuxt-schema-org',
    [
      '@devstdo/modules/custom-fonts/nuxt.ts',
      {
        fonts: [],
        settings: {
          display: 'swap',
          rel: 'prefetch',
          assetDir: '_nuxt',
        },
      },
    ],
    [
      '@nuxt/image',
      {
        ipx: {},
        presets: {},
      },
    ],
    '@nuxt/content',
    'nuxt-gtag',
  ],
  typescript: {
    shim: false,
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
        files: ['en-US.ts'],
        language: 'en-US',
      },
    ],
  },
  gtag: {
    enabled: true,
    id: 'G-6T72QZDMP9',
  },
  build: {
    transpile: [
      '@devstdo/services',
    ],
  },
  runtimeConfig: {
    public: {
      app: {},
    },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: '_nuxt/od-[hash].js',
          assetFileNames: '_nuxt/od-[hash][extname]',
          entryFileNames: '_nuxt/od-[hash].js',
          // target ~250KB per chunk in an ideal world
          experimentalMinChunkSize: 250 * 1024,
          manualChunks: (id: string) => {
            // need to avoid touching non-entrypoint files, otherwise it breaks bundling
            // because imports aren't idempotent
            if (
              !id.includes('node_modules')
              && !id.startsWith('virtual:')
              && !id.includes('src')
              && !id.includes('assets')
            ) {
              // merge pages/foo/* as chunk-pg-foo, pages/bar/* as chunk-pg-bar, etc.
              // then merge pages/* (ie no subfolder) into chunk-pg-misc
              if (id.includes('pages')) {
                const parts = id.split('/')
                const folderIndex = parts.indexOf('pages')
                if (folderIndex + 2 < parts.length) {
                  const pageGroup = parts[folderIndex + 1]
                  return `chunk-pg-${pageGroup}`
                }
                return 'chunk-pg-misc'
              }
            }
          },
        },
      },
    },
  },
  hooks: {
    'build:manifest': (manifest) => {
      // removes css files from output to avoid blocking requests
      // this is a workaround for https://github.com/nuxt/nuxt/issues/21821
      Object.keys(manifest).forEach((key: string) => {
        if (manifest[key].css)
          manifest[key].css = []
      })

      for (const key in manifest) {
        manifest[key].dynamicImports = []

        const file = manifest[key]
        if (file.assets) {
          file.assets = file.assets.filter(
            assetName => !/.+\.gif|jpe?g|png|svg$/.test(assetName),
          )
        }
      }
    },
  },
})
