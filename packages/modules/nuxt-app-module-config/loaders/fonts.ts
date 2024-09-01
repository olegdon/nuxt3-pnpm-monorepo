export function useFontLoader(settings: Record<string, any>) {
  return {
    name: '@olegdon/modules/custom-fonts/nuxt.ts',
    config: (config: any) => {
      config.fonts = settings.fonts

      return config
    },
  }
}
