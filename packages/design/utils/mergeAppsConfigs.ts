export function mergeAppsConfig(...appConfigs: Record<string, any>[]): Record<string, any> {
  return appConfigs.reduce((result, appConfig) => {
    const { theme } = appConfig || {}

    if (theme?.extend) {
      for (const group in theme.extend) {
        result[group] = result[group] || {}
        Object.assign(result[group], theme.extend[group])
      }
    }

    return result
  }, {})
}
