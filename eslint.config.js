// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  test: false,
  ignores: [
    'dist',
    'node_modules',
    '.output',
    '.nuxt',
    'storybook-static',
  ],
})
