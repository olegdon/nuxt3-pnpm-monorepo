import type { CookieOptions } from '#app'
import { computed, reactive } from 'vue'

// Compatibility helper for callers that expect an object with writable fields.
export function useSimpleCookie<T extends Record<string, unknown>>(name: string, defaults: T, settings: Omit<CookieOptions<T>, 'readonly'> = {}) {
  const cookie = useCookie<T>(name, { default: () => ({ ...defaults }), sameSite: 'lax', path: '/', ...settings })
  return reactive(Object.fromEntries(Object.keys(defaults).map(key => [key, computed({
    get: () => (cookie.value || defaults)[key],
    set: (value) => { cookie.value = { ...(cookie.value || defaults), [key]: value } },
  })]))) as T
}
