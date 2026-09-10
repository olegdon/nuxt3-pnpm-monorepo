import type { Meta, StoryObj } from '@storybook/vue3'
import UiNote from '~/components/base/ui/Note.vue'

const meta = {
  title: 'Components/Note',
  component: UiNote,
  tags: ['autodocs'],
  argTypes: { type: { control: 'inline-radio', options: ['info', 'warning', 'error'] } },
  parameters: { docs: { description: { component: 'Contextual feedback with a decorative inline icon. Add role="status" or role="alert" only when announcing a dynamic update.' } } },
  render: args => ({ components: { UiNote }, setup: () => ({ args }), template: '<div class="sb-demo-width"><UiNote v-bind="args">This preview uses shared components from the design package.</UiNote></div>' }),
} satisfies Meta<typeof UiNote>
export default meta
type Story = StoryObj<typeof meta>
export const Information: Story = { args: { type: 'info' } }
export const Warning: Story = { args: { type: 'warning' } }
export const Error: Story = { args: { type: 'error' } }
