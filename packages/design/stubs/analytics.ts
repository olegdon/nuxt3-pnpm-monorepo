import type { Ref } from 'vue'
import { inject, ref } from 'vue'

// Preview-only adapters: no cookies, external analytics script, or network events.
export function useAnalyticsConsent() {
  return inject<Ref<'granted' | 'denied' | null>>('storybook-consent', ref(null))
}

export function useRuntimeConfig() {
  return inject('storybook-runtime', { public: { analyticsEnabled: false, gtag: { id: '' } } })
}
