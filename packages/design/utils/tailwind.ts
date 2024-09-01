import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '~/tailwind.config'

const config: any = resolveConfig(tailwindConfig)

export default config.theme
