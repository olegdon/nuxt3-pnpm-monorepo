import { useFontLoader } from './useFontLoader.ts'

export default function (options: any) {
  return useFontLoader(
    options.fonts,
    options.settings,
  )
}
