import type { Meta, StoryObj } from '@storybook/vue3'
import UiSheet from '~/components/base/ui/Sheet.vue'

const meta = {
  title: 'Base/UI/Sheet',
  component: UiSheet,
  tags: ['autodocs'],
  render: args => ({
    components: { UiSheet },
    setup: () => ({ args }),
    template: '<UiSheet v-bind="args">Sheet Content</UiSheet>',
  }),
} satisfies Meta<typeof UiSheet>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
