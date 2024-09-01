export function useFontLoader(settings: Record<string, any>) {
  return {
    name: '@devstdo/modules/custom-fonts/nuxt.ts',
    config: (config: any) => {
      config.fonts = settings.fonts

      return config
    },
  }
}
