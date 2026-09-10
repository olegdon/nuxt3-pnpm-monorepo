import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import SingleFeature from '~/components/base/interaction/SingleFeature.vue'

const meta = {
  title: 'Patterns/Shared Feature',
  component: SingleFeature,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'The actual greeting component used by all three apps. The preview registers base or extended UiButton according to the consumer. NuxtImg serves the original static asset here; Nuxt app checks verify IPX.' } } },
  render: () => ({ components: { SingleFeature }, template: '<div class="sb-demo-width"><SingleFeature /></div>' }),
} satisfies Meta<typeof SingleFeature>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {}
export const Core: Story = { parameters: { app: 'webapp' } }
export const Standalone: Story = { parameters: { app: 'singleapp' } }
export const Extended: Story = { parameters: { app: 'extendedapp' } }
export const NamedGreeting: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByRole('textbox', { name: 'Your name' }), 'Alex')
    await userEvent.click(canvas.getByRole('button', { name: 'Say hello' }))
    await expect(canvas.getByRole('status')).toHaveTextContent('Hello Alex!')
  },
}
export const EmptyGreeting: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Say hello' }))
    await expect(canvas.getByRole('status')).toHaveTextContent('Hello visitor!')
  },
}
