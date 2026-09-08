import type { Meta, StoryObj } from '@storybook/vue3'
import LayoutSplash from '~/components/base/layout/Splash.vue'
import BaseUiSheet from '~/components/base/ui/Sheet.vue'

const meta: Meta<typeof LayoutSplash> = {
  title: 'Base/Layout/Splash',
  component: LayoutSplash,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A full screen layout with a centered element, e.g. login.',
      },
    },
  },
}

type Story = StoryObj<typeof LayoutSplash>

export default meta
export const Content: Story = {
  render: () => ({
    components: { LayoutSplash, BaseUiSheet },
    template: '<LayoutSplash><BaseUiSheet>Splash Content</BaseUiSheet></LayoutSplash>',
  }),
}
export const Default: Story = {}
