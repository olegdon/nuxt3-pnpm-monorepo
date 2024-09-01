export function useTwLoader(settings: Record<string, any>) {
  return {
    name: '@nuxtjs/tailwindcss',
    config: (config: any) => {
      config.config.content.push(
        `../../packages/design/components/${settings.app}/**/*.vue`,
      )
      if (settings.tailwind)
        config.config.theme = settings.tailwind.theme

      config.cssPath = `../../packages/design/styles/${settings.app}.css`

      return config
    },
  }
}
