export default {
  staticDirs: ['../public'],
  stories: ['../stories/**/*.mdx', '../stories/**/*.ts'],
  addons: [
    '@storybook/addon-docs',
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
