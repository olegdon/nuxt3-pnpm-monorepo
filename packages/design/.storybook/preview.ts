import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import vuei18n from '../../translations/vue-i18n'
import '../index.css'
import 'virtual:virtual-fontface-css/font-face.css'

const pinia = createPinia()

setup((app: any) => {
  app.use(
    // @ts-expect-error this thing has a weird interface
    createI18n(
      {
        legacy: false,
        defaultLocale: 'en-US',
        datetimeFormats: vuei18n.datetimeFormats,
        numberFormats: vuei18n.numberFormats,
        langDir: '../../translations',
        locales: [
          {
            code: 'en-US',
            files: ['en-US.ts'],
            language: 'en-US',
          },
        ],
      },
    ),
  )
  app.use(pinia)
  app.mixin({
    methods: {
      localePath() {
        return null
      },
    },
  })
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      classTarget: 'html',
      darkClass: 'dark',
      lightClass: 'light',
      stylePreview: true,
    },
  },
  decorators: [
    (story, meta) => {
      let fontFamily = 'Arial'

      if (meta.componentId.startsWith('extendedapp'))
        fontFamily = '"Niramit"'

      meta.canvasElement.appendChild(
        Object.assign(
          document.createElement('style'),
          {
            textContent: `
              .sbdocs-preview { font-family: ${fontFamily}; }
            `,
          },
        ),
      )

      return {
        components: { story },
        template: `<story />`,
      }
    },
  ],
}

export default preview
