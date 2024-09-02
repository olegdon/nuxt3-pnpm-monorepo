import type { Meta, StoryObj } from '@storybook/vue3'
import UiComponent from '~/components/base/ui/Input.vue'

const meta: Meta<typeof UiComponent> = {
  title: 'Base/UI/Input',
  component: UiComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'input element',
      },
    },
  },
}

type Story = StoryObj<typeof UiComponent>

export default meta

export const Default: Story = {
  args: {
    placeholder: 'Placeholder text',
  },
}
