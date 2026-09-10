import type { Meta, StoryObj } from '@storybook/vue3'
import SingleFeature from '~/components/base/interaction/SingleFeature.vue'
import SupportSection from '~/components/base/interaction/SupportSection.vue'
import BaseApplication from '~/components/base/layout/Application.vue'
import ExtendedApplication from '~/components/extendedapp/layout/Application.vue'

const meta = {
  title: 'Applications/Shell',
  component: BaseApplication,
  tags: ['autodocs'],
  parameters: { fullPage: true, docs: { description: { component: 'Production application shells, rendered with an in-memory router. Navigation updates active states but does not mount Nuxt pages. App identity is fixed per story.' } } },
} satisfies Meta<typeof BaseApplication>
export default meta
type Story = StoryObj<typeof meta>
const content = '<main><section class="hero compact-hero"><p class="eyebrow">Nuxt 4 / pnpm workspace</p><h1>Shared foundations.<br>Distinct applications.</h1><p class="lead">Explore the shell, navigation and reusable feature in this app context.</p></section><div class="sb-demo-width"><SingleFeature /></div><SupportSection /></main>'
export const Core: Story = {
  parameters: { app: 'webapp' },
  render: () => ({ components: { BaseApplication, SingleFeature, SupportSection }, template: `<BaseApplication>${content}</BaseApplication>` }),
}
export const Standalone: Story = {
  parameters: { app: 'singleapp' },
  render: () => ({ components: { BaseApplication, SingleFeature, SupportSection }, template: `<BaseApplication app="singleapp">${content}</BaseApplication>` }),
}
export const Extended: Story = {
  parameters: { app: 'extendedapp' },
  render: () => ({ components: { ExtendedApplication, SingleFeature, SupportSection }, template: `<ExtendedApplication>${content}</ExtendedApplication>` }),
}
export const InheritedRoute: Story = { ...Extended, parameters: { app: 'extendedapp', route: '/feature' } }
