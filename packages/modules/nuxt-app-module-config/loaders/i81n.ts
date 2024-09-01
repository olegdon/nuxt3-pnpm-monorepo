function _resolveFunctionOrValue(value: any, config: any, settings: any) {
  if (typeof value === 'function')
    return value(config, settings)

  return value
}

export function usei18nLoader(settings: Record<string, any>, runtimeConfig: Record<string, any>) {
  return {
    name: 'i18n',
    direct: true,
    config: (config: Record<string, any>) => {
      if (settings?.i18n?.defaultLocale)
        config.defaultLocale = _resolveFunctionOrValue(settings?.i18n?.defaultLocale, runtimeConfig, settings.app)

      if (settings?.i18n?.locales)
        config.locales = _resolveFunctionOrValue(settings?.i18n?.locales || [], runtimeConfig, settings.app)

      config.baseUrl = _resolveFunctionOrValue(settings?.i18n?.baseUrl, runtimeConfig, settings.app)
      config.strategy = settings?.i18n?.strategy
      config.differentDomains = settings?.i18n?.differentDomains

      return config
    },
  }
}
