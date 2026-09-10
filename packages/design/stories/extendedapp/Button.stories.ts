import type { Meta, StoryObj } from '@storybook/vue3'
import BaseButton from '~/components/base/ui/Button.vue'
import ExtendedButton from '~/components/extendedapp/ui/Button.vue'

const meta = {
  title: 'Extended App/Button',
  component: ExtendedButton,
  tags: ['autodocs'],
  parameters: { app: 'extendedapp', docs: { description: { component: 'Real extended-app override. Default, ghost and alternative replace base styling; the remaining variants fall back to the shared button. Native attributes and events pass through.' } } },
  argTypes: { variant: { control: 'select', options: ['default', 'ghost', 'alternative', 'tag', 'green', 'outline'] } },
  render: args => ({ components: { ExtendedButton }, setup: () => ({ args }), template: '<ExtendedButton v-bind="args">Continue</ExtendedButton>' }),
} satisfies Meta<typeof ExtendedButton>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Alternative: Story = { args: { variant: 'alternative' } }
export const BaseFallback: Story = { args: { variant: 'outline' } }
export const Disabled: Story = { render: () => ({ components: { ExtendedButton }, template: '<ExtendedButton disabled>Unavailable</ExtendedButton>' }) }
export const Comparison: Story = {
  render: () => ({ components: { BaseButton, ExtendedButton }, template: '<div class="comparison-grid"><div class="info-card"><h3>Explicit base</h3><code>BaseUiButton</code><BaseButton>Base action</BaseButton></div><div class="info-card"><h3>App override</h3><code>UiButton</code><ExtendedButton>Extended action</ExtendedButton></div></div>' }),
}
