import type { Meta, StoryObj } from '@storybook/vue3'
import LayoutSplash from '~/components/base/layout/Splash.vue'

const meta = {
  title: 'Applications/Splash',
  component: LayoutSplash,
  tags: ['autodocs'],
  parameters: { fullPage: true, docs: { description: { component: 'A centered full-height layout for loading and recovery states.' } } },
  render: () => ({ components: { LayoutSplash }, template: '<LayoutSplash><div class="info-card"><h2>Preparing your workspace</h2><p role="status">Loading shared resources…</p></div></LayoutSplash>' }),
} satisfies Meta<typeof LayoutSplash>
export default meta
type Story = StoryObj<typeof meta>
export const Loading: Story = {}
