import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import { ref } from 'vue'
import UiButton from '~/components/base/ui/Button.vue'

const meta = {
  title: 'Components/Button',
  component: UiButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'ghost', 'alternative', 'tag', 'green', 'outline'] },
    size: { control: 'inline-radio', options: ['base', 'sm'] },
    unstyled: { table: { disable: true } },
  },
  parameters: { docs: { description: { component: 'Shared button primitive. Use a button for actions and `to` for navigation. The extended app composes this component with its own colors.' } } },
  render: args => ({ components: { UiButton }, setup: () => ({ args }), template: '<UiButton v-bind="args">Continue</UiButton>' }),
} satisfies Meta<typeof UiButton>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Variants: Story = {
  render: () => ({ components: { UiButton }, template: '<div class="sb-row"><UiButton>Default</UiButton><UiButton variant="ghost">Ghost</UiButton><UiButton variant="alternative">Alternative</UiButton><UiButton variant="tag">Tag</UiButton><UiButton variant="green">Green</UiButton><UiButton variant="outline">Outline</UiButton></div>' }),
}
export const Small: Story = { args: { size: 'sm' } }
export const FullWidth: Story = { args: { block: true } }
export const Disabled: Story = {
  render: () => ({ components: { UiButton }, template: '<UiButton disabled>Unavailable</UiButton>' }),
  play: async ({ canvasElement }) => { await expect(within(canvasElement).getByRole('button')).toBeDisabled() },
}
export const Link: Story = { args: { to: '/feature' } }
export const Interactive: Story = {
  render: () => ({ components: { UiButton }, setup: () => ({ count: ref(0) }), template: '<div class="sb-row"><UiButton @click="count++">Add one</UiButton><p role="status">Count: {{ count }}</p></div>' }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Add one' }))
    await expect(canvas.getByRole('status')).toHaveTextContent('Count: 1')
  },
}
