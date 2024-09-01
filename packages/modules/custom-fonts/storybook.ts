import { useFontLoader } from './useFontLoader'

export default function (options: any) {
  return useFontLoader(
    options.fonts,
    options.settings,
  )
}
