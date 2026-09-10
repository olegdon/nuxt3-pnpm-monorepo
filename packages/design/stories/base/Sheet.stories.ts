import type { Meta, StoryObj } from '@storybook/vue3'
import UiSheet from '~/components/base/ui/Sheet.vue'

const meta = {
  title: 'Components/Sheet',
  component: UiSheet,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'A lightweight container. Styling belongs to its composition; `to` turns it into a real navigation link. The interactive prop supplies visual treatment only.' } } },
  render: args => ({ components: { UiSheet }, setup: () => ({ args }), template: '<UiSheet v-bind="args" class="info-card sb-demo-width"><h3>Shared packages</h3><p>Reuse UI and services across independently configured apps.</p></UiSheet>' }),
} satisfies Meta<typeof UiSheet>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Padded: Story = { args: { padded: true } }
export const Linked: Story = { args: { to: '/feature' } }
