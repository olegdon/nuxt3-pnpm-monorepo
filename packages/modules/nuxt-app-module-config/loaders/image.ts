export function useImageLoader(settings: Record<string, any>) {
  return {
    name: '@nuxt/image',
    config: (config: any) => {
      config.imgix.baseURL = settings?.image?.imgix?.baseURL || config.imgix.baseURL

      return config
    },
  }
}
