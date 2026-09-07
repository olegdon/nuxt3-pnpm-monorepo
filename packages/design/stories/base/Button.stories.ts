import type { Meta, StoryObj } from '@storybook/vue3'
import UiButton from '~/components/base/ui/Button.vue'

const meta = {
  title: 'Base/UI/Button',
  component: UiButton,
  tags: ['autodocs'],
  render: args => ({
    components: { UiButton },
    setup: () => ({ args }),
    template: '<UiButton v-bind="args">Button</UiButton>',
  }),
} satisfies Meta<typeof UiButton>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
