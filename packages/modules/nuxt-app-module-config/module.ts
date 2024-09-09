import { defineNuxtModule } from '@nuxt/kit'
import { useFontLoader } from './loaders/fonts'
import { usei18nLoader } from './loaders/i81n'
// import { useImageLoader } from './loaders/image'
import { useTwLoader } from './loaders/tw'

function deepMerge(obj1: any, obj2: any) {
  const output = { ...obj1 }
  for (const key in obj2) {
    if (typeof obj2[key] === 'object' && obj2[key] !== null && Object.prototype.hasOwnProperty.call(obj1, key) && typeof obj1[key] === 'object')
      output[key] = deepMerge(obj1[key], obj2[key])

    else
      output[key] = obj2[key]
  }
  return output
}

export default defineNuxtModule({
  async setup(options, nuxt) {
    if (options.asyncRuntimeConfig) {
      nuxt.options.runtimeConfig.public = deepMerge(
        nuxt.options.runtimeConfig.public,
        await options.asyncRuntimeConfig(),
      )
    }

    const loaders = []

    loaders.push(usei18nLoader(options, nuxt.options.runtimeConfig.public))
    loaders.push(useFontLoader(options))
    loaders.push(useTwLoader(options))
    // loaders.push(useImageLoader(options))

    loaders.forEach((loader: any) => {
      if (!loader.direct) {
        const module: any = nuxt.options.modules.find(
          ([moduleName]: any) => moduleName === loader.name,
        )
        if (module && module[1]) {
          // Modify or extend the module config here
          module[1] = loader.config(module[1], nuxt.options.runtimeConfig.public)
        }
      }
      else {
        loader.config((<any> nuxt.options)[loader.name], nuxt.options.runtimeConfig.public)
      }
    })
  },
})
