import type { Meta, StoryObj } from '@storybook/vue3'
import SupportSection from '~/components/base/interaction/SupportSection.vue'

const meta = {
  title: 'Patterns/Support Section',
  component: SupportSection,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'The same community-support block rendered on the core home page. Links open the real project destinations in a new tab.' } } },
} satisfies Meta<typeof SupportSection>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Narrow: Story = { render: () => ({ components: { SupportSection }, template: '<div style="max-width: 375px"><SupportSection /></div>' }) }
