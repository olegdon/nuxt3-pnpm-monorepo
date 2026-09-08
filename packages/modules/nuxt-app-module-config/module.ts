import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: { name: 'nuxt-monorepo-app-config' },
  setup() {
    const { resolve } = createResolver(import.meta.url)
    addPlugin(resolve('./runtime/analytics.client'))
  },
})
