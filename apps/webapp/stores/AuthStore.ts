import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAuthStore = defineStore('AuthStore', () => {
  const identity = ref<string | null>(null)

  function signIn(identityInput: string) {
    identity.value = identityInput
  }

  return { identity, signIn }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
