import { defineNuxtModule } from '@nuxt/kit'
import { useFontLoader } from './useFontLoader'

export default defineNuxtModule({
  async setup(options, nuxt) {
    if (!options?.fonts?.length)
      return

    const { fontVitePlugin, fontAssetCssName } = useFontLoader(
      options.fonts,
      options.settings,
    )
    // 1. Add Tailwind Config
    const tailwindModule: any = nuxt.options.modules.find(
      ([module]: any) => module === '@nuxtjs/tailwindcss',
    )
    if (tailwindModule && tailwindModule[1]) {
      // Modify or extend the tailwind config here - @todo fix this, as its not working...for whatever reason
      // tailwindModule[1].config.theme.extend.fontFamily = fontTailwindConfig
    }

    // 2. Add a vite plugin
    nuxt.hook('vite:extendConfig', (viteInlineConfig) => {
      viteInlineConfig.plugins = (viteInlineConfig.plugins || []).concat(fontVitePlugin)
    })

    // 3. Add a CSS file & header links
    nuxt.hook('ready', (app) => {
      app.options.css.push(fontAssetCssName)
      // we leave the header links out for now, prefetching might not make sense for our uses cases
      // app.options.app.head.link = app.options.app.head.link.concat(fontHeaderLinks)
    })
  },
})
