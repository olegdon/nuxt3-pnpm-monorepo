import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindConfig from '~/tailwind.config'

type Theme = Record<string, any>

function mergeTheme(base: Theme, extension: Theme = {}) {
  return Object.entries(extension).reduce<Theme>((theme, [key, value]) => {
    theme[key] = typeof value === 'object' && value !== null && !Array.isArray(value)
      ? { ...theme[key], ...value }
      : value
    return theme
  }, { ...base })
}

// Tailwind CSS 4 no longer exposes `resolveConfig`. Build the small resolved
// view consumed by the documentation stories from Tailwind's public exports.
const theme = (tailwindConfig.presets ?? []).reduce(
  (resolvedTheme, preset) => mergeTheme(resolvedTheme, preset.theme?.extend),
  { ...defaultTheme, colors: { ...colors } },
)

export default mergeTheme(theme, tailwindConfig.theme?.extend)
