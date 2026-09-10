import { getJestConfig } from '@storybook/test-runner'

const config = getJestConfig()
const scripts = '^.+\\.[jt]sx?$'

export default {
  ...config,
  transform: {
    ...config.transform,
    // The runner's bundled SWC supports ES2022; its Node 24 default does not.
    [scripts]: [config.transform[scripts], { jsc: { target: 'es2022' } }],
  },
}
