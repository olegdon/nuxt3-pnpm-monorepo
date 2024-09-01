import { fileURLToPath } from 'node:url'
import { createResolver, defineNuxtModule } from '@nuxt/kit'
import Components from 'unplugin-vue-components/vite'
import '@nuxt/schema'

// Create a resolver for the module paths
const { resolve } = createResolver(import.meta.url)

/**
 * A Nuxt module that enhances the Nuxt application by adding paths for:
 * - Composables: Exposes all composables from './composables'.
 * - Components: Allows for project-specific component usage without prefix.
 *               For example, a component named 'ExtendedappUiButton' can be
 *               directly used as 'UiButton', leading to cleaner and more
 *               efficient templates.
 */
export default defineNuxtModule({
  meta: {
    configKey: 'monorepoDesign',
    name: 'nuxt-monorepo-design',
  },

  setup(options, nuxt) {
    // Add directory for composables to the imports path
    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(fileURLToPath(new URL('./composables', import.meta.url)))
    })

    // Add ./components dir to the list
    nuxt.hook('components:dirs', (dirs: Record<string, any>) => {
      dirs.push({
        path: resolve(`./components/${options.app || 'base'}`),
      })

      dirs.push({
        path: resolve('./components'),
      })
    })

    // Extend Vite configuration to support component resolvers
    nuxt.hook('vite:extendConfig', (viteInlineConfig) => {
      // Regular expression to match specific component naming conventions
      const projectScopedComponentRegEx = /^(Ui|Interaction|Layout|Integration|View)/

      // Append the Components plugin to the Vite config plugins array
      viteInlineConfig.plugins = (viteInlineConfig.plugins || []).concat(
        Components({
          dirs: [resolve('./components')],
          resolvers: [
            (name) => {
              if (projectScopedComponentRegEx.test(name)) {
                return {
                  as: `${(options.app || 'base')[0].toUpperCase() + (options.app || 'base').substring(1)}${name}`,
                  name: 'default',
                  from: resolve(`./components/${options.app || 'base'}/${projectScopedComponentRegEx.exec(name)?.[0]?.toLowerCase()}/${name.replace(projectScopedComponentRegEx, '')}.vue`),
                }
              }
            },
          ],
          extensions: ['vue'],
          include: [/\.vue$/, /\.vue\?vue/],
          dts: '.nuxt/ui.d.ts',
          directoryAsNamespace: true,
        }),
      )
    })

    // Add type declarations to enhance IDE support for components
    nuxt.hook('prepare:types', (options) => {
      options.references.push({ path: 'ui.d.ts' })
    })
  },
})
