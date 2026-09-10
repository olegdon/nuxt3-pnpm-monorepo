import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import { ref, useId } from 'vue'
import UiInput from '~/components/base/ui/Input.vue'

const meta = {
  title: 'Components/Input',
  component: UiInput,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Native input with Vue v-model. Always supply a visible label. Native attributes such as disabled, required, type and aria-describedby are forwarded.' } } },
  render: args => ({
    components: { UiInput },
    setup: () => ({ args, value: ref(args.modelValue || ''), id: useId() }),
    template: '<div class="sb-field"><label :for="id">Your name</label><UiInput v-bind="args" :id="id" v-model="value" autocomplete="given-name" /><p class="sb-caption" role="status">Value: {{ value || "Not entered" }}</p></div>',
  }),
} satisfies Meta<typeof UiInput>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { args: { placeholder: 'Alex' } }
export const Prefilled: Story = { args: { modelValue: 'Taylor' } }
export const Disabled: Story = { render: () => ({ components: { UiInput }, template: '<label class="sb-field">Read-only example<UiInput disabled model-value="Unavailable" /></label>' }) }
export const Validation: Story = {
  render: () => ({ components: { UiInput }, setup: () => ({ id: useId(), errorId: useId() }), template: '<div class="sb-field"><label :for="id">Email address</label><UiInput :id="id" type="email" required aria-invalid="true" :aria-describedby="errorId" model-value="not-an-email" /><p :id="errorId" class="sb-caption">Enter an email address such as alex@example.com.</p></div>' }),
}
export const Typing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByRole('textbox', { name: 'Your name' }), 'Alex')
    await expect(canvas.getByRole('status')).toHaveTextContent('Value: Alex')
  },
}
