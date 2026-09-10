import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import AnalyticsConsent from '~/components/base/interaction/AnalyticsConsent.vue'

const meta = {
  title: 'Patterns/Analytics Consent',
  component: AnalyticsConsent,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Real consent UI with an isolated, in-memory consent adapter. Storybook neither loads analytics nor writes cookies. Each story starts with its own state.' } } },
  render: () => ({ components: { AnalyticsConsent }, template: '<div style="position: relative; transform: translateZ(0); min-height: 320px; max-width: 720px"><p class="sb-caption">Preview only: no tracking or cookies.</p><AnalyticsConsent /></div>' }),
} satisfies Meta<typeof AnalyticsConsent>
export default meta
type Story = StoryObj<typeof meta>
export const Undecided: Story = {}
export const Granted: Story = { parameters: { consent: 'granted' } }
export const Denied: Story = { parameters: { consent: 'denied' } }
export const Disabled: Story = { parameters: { analyticsEnabled: false } }
export const ChangePreference: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Decline', exact: true }))
    await userEvent.click(canvas.getByRole('button', { name: 'Analytics preferences', exact: true }))
    await userEvent.click(canvas.getByRole('button', { name: 'Allow analytics', exact: true }))
    await expect(canvas.getByRole('button', { name: 'Analytics preferences', exact: true })).toBeVisible()
    await expect(canvas.queryByRole('button', { name: 'Allow analytics', exact: true })).not.toBeInTheDocument()
  },
}
