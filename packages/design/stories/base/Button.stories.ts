import type { Meta, StoryObj } from '@storybook/vue3'
import UiButton from '~/components/base/ui/Button.vue'

const meta: Meta<typeof UiButton> = {
  title: 'Base/UI/Button',
  component: UiButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'button element',
      },
    },
    slots: {
      default: {
        template: '{{ args.default || "Button" }}',
        description: 'button text',
      },
    },
  },
} satisfies Meta<typeof UiButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
