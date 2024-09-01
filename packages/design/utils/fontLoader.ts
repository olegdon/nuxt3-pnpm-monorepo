import storybookFontConfigLoader from '@devstdo/modules/custom-fonts/storybook'

const {
  fontVitePlugin,
  fontAssetCssName,
  fontTailwindConfig,
  fontHeaderLinks,
} = storybookFontConfigLoader({
  fonts: [
    {
      name: 'Niramit',
      src: './public/assets/fonts/niramit/*.woff2',
      dst: '/assets/fonts/niramit/',
      type: 'sans',
    },
    {
      name: 'Roboto',
      src: './public/assets/fonts/roboto/*.woff2',
      dst: '/assets/fonts/roboto/',
      type: 'sans',
    },
  ],
  settings: {
    display: 'swap',
  },
})

export default {
  fontVitePlugin,
  fontAssetCssName,
  fontTailwindConfig,
  fontHeaderLinks,
}
