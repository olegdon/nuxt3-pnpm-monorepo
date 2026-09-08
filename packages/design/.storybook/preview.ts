import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import messages from '../../translations/en-US'
import '../index.css'

const pinia = createPinia()

setup((app) => {
  app.use(createI18n({ legacy: false, locale: 'en-US', messages: { 'en-US': messages } }))
  app.use(pinia)
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
  },
  decorators: [
    (story, meta) => {
      let fontFamily = 'Arial'

      if (meta.componentId.startsWith('extendedapp'))
        fontFamily = 'Baton, Arial, sans-serif'
      else if (meta.componentId.startsWith('singleapp'))
        fontFamily = 'Niramit, Arial, sans-serif'

      return {
        components: { story },
        setup: () => ({ fontFamily }),
        template: '<div :style="{ fontFamily }"><story /></div>',
      }
    },
  ],
}

export default preview
