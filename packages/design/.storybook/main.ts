export default {
  stories: ['../stories/**/*.mdx', '../stories/**/*.ts'],
  addons: [
    '@storybook/addon-docs',
    'storybook-addon-vue-slots',
  ],
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}
