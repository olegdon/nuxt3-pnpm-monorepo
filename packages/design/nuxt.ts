import { existsSync, readdirSync } from 'node:fs'
import { addComponent, addComponentsDir, addImportsDir, addVitePlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtModule<{ app: 'webapp' | 'singleapp' | 'extendedapp' }>({
  meta: { name: 'nuxt-monorepo-design', configKey: 'monorepoDesign' },
  defaults: { app: 'webapp' },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    addImportsDir(resolve('./composables'))
    addComponent({ name: 'SiteShell', filePath: resolve('./components/base/layout/SiteShell.vue') })
    addComponent({ name: 'AnalyticsConsent', filePath: resolve('./components/base/interaction/AnalyticsConsent.vue') })
    addComponent({ name: 'SingleFeature', filePath: resolve('./components/base/interaction/SingleFeature.vue') })
    // Stable explicit names (BaseUiButton) remain available to app overrides.
    for (const file of readdirSync(resolve('./components/base'), { recursive: true })) {
      if (typeof file !== 'string' || !file.endsWith('.vue'))
        continue
      const name = `Base${file.replace(/\.vue$/, '').split(/[/\\]/).map(part => part[0]!.toUpperCase() + part.slice(1)).join('')}`
      addComponent({ name, filePath: resolve('./components/base', file) })
    }
    addComponentsDir({ path: resolve('./components/base'), priority: 1 })
    const overrides = resolve(`./components/${options.app}`)
    if (existsSync(overrides))
      addComponentsDir({ path: overrides, priority: 10 })

    nuxt.options.css.push(resolve(`./styles/${options.app}.css`))
    addVitePlugin(tailwindcss())
    nuxt.hook('nitro:config', (config) => {
      config.publicAssets ||= []
      config.publicAssets.push({ dir: resolve('./public'), maxAge: 60 * 60 * 24 * 7 })
    })
  },
})
