import { defineNuxtModule, installModule } from '@nuxt/kit'

export default defineNuxtModule<{ enabled: boolean }>({
  meta: { name: 'monorepo-optional-content', configKey: 'starterContent' },
  defaults: { enabled: true },
  async setup(options) {
    // Keep disabled Content out of module discovery too: SEO integrations otherwise
    // register Content handlers even when Nuxt skips its setup.
    if (options.enabled)
      await installModule('@nuxt/content')
  },
})
