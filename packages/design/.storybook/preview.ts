import type { Preview, StoryContext } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { defineComponent, h, reactive, ref, watch } from 'vue'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import messages from '../../translations/en-US'
import extendedMessages from '../../translations/extendedapp/en-US'
import featureMessages from '../../translations/singleapp/en-US'
import BaseApplication from '../components/base/layout/Application.vue'
import BaseButton from '../components/base/ui/Button.vue'
import BaseInput from '../components/base/ui/Input.vue'
import BaseSheet from '../components/base/ui/Sheet.vue'
import ExtendedButton from '../components/extendedapp/ui/Button.vue'
import { ClientOnly, NuxtImg, NuxtLink } from './nuxt-components'
import '../index.css'
import './preview.css'

// Storybook keeps the Vue app mounted when toolbar globals change.
// Keep presentation settings reactive and separate for each story canvas.
const settingsByStory = new Map<string, { appName: string, dark: boolean }>()
function settingsFor(context?: StoryContext) {
  const id = context?.id || 'default'
  if (!settingsByStory.has(id))
    settingsByStory.set(id, reactive({ appName: 'webapp', dark: false }))
  const settings = settingsByStory.get(id)!
  settings.appName = context?.parameters.app || context?.globals.app || 'webapp'
  settings.dark = context?.globals.theme === 'dark'
  return settings
}

setup((app, context) => {
  const settings = settingsFor(context)
  const i18n = createI18n({ legacy: false, locale: 'en-US', messages: { 'en-US': {} } })
  app.use(i18n)
  const stop = watch(() => settings.appName, (appName) => {
    i18n.global.setLocaleMessage('en-US', {
      ...messages,
      pages: { ...messages.pages, ...featureMessages.pages },
      feature: { ...featureMessages.feature, ...(appName === 'extendedapp' ? extendedMessages.feature : {}) },
    })
  }, { immediate: true })
  app.onUnmount(stop)
  app.use(createPinia())
  const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/:pathMatch(.*)*', component: { render: () => null } }] })
  app.use(router)
  router.push(context?.parameters.route || '/')
  app.component('NuxtLink', NuxtLink)
  app.component('NuxtLinkLocale', NuxtLink)
  app.component('NuxtImg', NuxtImg)
  app.component('ClientOnly', ClientOnly)
  app.component('UiButton', defineComponent({
    inheritAttrs: false,
    setup: (_, { attrs, slots }) => () => h(settings.appName === 'extendedapp' ? ExtendedButton : BaseButton, attrs, slots),
  }))
  app.component('UiInput', BaseInput)
  app.component('UiSheet', BaseSheet)
  app.component('BaseLayoutApplication', BaseApplication)
  app.provide('storybook-consent', ref(context?.parameters.consent ?? null))
  app.provide('storybook-runtime', { public: { analyticsEnabled: context?.parameters.analyticsEnabled ?? true, gtag: { id: 'STORYBOOK-DEMO' } } })
})

const preview: Preview = {
  globalTypes: {
    theme: { description: 'Color mode', toolbar: { icon: 'circlehollow', items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }], dynamicTitle: true } },
    app: { description: 'Consumer theme for shared components', toolbar: { icon: 'component', items: [{ value: 'webapp', title: 'Core webapp' }, { value: 'singleapp', title: 'Single app' }, { value: 'extendedapp', title: 'Extended app' }], dynamicTitle: true } },
  },
  initialGlobals: { theme: 'light', app: 'webapp' },
  parameters: {
    layout: 'fullscreen',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    options: { storySort: { order: ['Introduction', 'Foundations', 'Components', 'Patterns', 'Applications', 'Extended App', 'Base', 'Single App'] } },
  },
  decorators: [
    (story, context) => {
      const settings = settingsFor(context)
      return {
        components: { story },
        setup: () => ({ settings, fullPage: context.parameters.fullPage, embedded: context.viewMode === 'docs' }),
        template: `<div :class="{ dark: settings.dark }"><div class="sb-preview app-frame" :class="{ 'sb-full-page': fullPage, 'sb-docs': embedded }" :data-app="settings.appName"><story /></div></div>`,
      }
    },
  ],
}

export default preview
