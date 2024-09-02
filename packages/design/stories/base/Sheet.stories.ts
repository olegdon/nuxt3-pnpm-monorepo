import type { Meta, StoryObj } from '@storybook/vue3'
import UiSheet from '~/components/base/ui/Sheet.vue'

const meta: Meta<typeof UiSheet> = {
  title: 'Base/UI/Sheet',
  component: UiSheet,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A sheet component, provides a sheet to display content.',
      },
    },
  },
}

type Story = StoryObj<typeof UiSheet>

export default meta

export const Default: Story = {
  parameters: {
    slots: {
      default: {
        template: '{{ args.default || "Sheet Content" }}',
      },
    },
  },
}
