<script setup lang="ts">
const { t: $t } = useI18n()
const auth = useAuthStore()
const colorMode = useColorMode()

onMounted(() => {
  useListen('user:login', (identity: string) => {
    auth.signIn(identity)
  })
})

function logClientBoundaryError(error: any) {
  // eslint-disable-next-line no-console
  console.debug(error)
  clearError(error)
}
</script>

<template>
  <NuxtLayout :name="auth.identity ? 'default' : 'splash'">
    <NuxtLoadingIndicator />

    <template v-if="auth.identity" #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="61" height="42" fill="none">
            <path
              fill="#00DC82"
              d="M33.987 41.221h22.425a4.054 4.054 0 0 0 4.057-4.06 4.06 4.06 0 0 0-.545-2.03l-15.06-26.1a4.057 4.057 0 0 0-5.541-1.486 4.06 4.06 0 0 0-1.485 1.486l-3.851 6.678-7.529-13.058a4.06 4.06 0 0 0-7.028 0L.69 35.13a4.06 4.06 0 0 0 3.511 6.09h14.077c5.577 0 9.69-2.451 12.52-7.233L37.67 22.08l3.68-6.372 11.046 19.14H37.67zm-15.939-6.378-9.823-.003L22.95 9.322l7.348 12.76-4.92 8.527c-1.88 3.103-4.014 4.234-7.33 4.234"
            />
          </svg>

          <span class="uppercase bg-gradient-to-b from-emerald-400 to-emerald-600 bg-clip-text text-center font-bold leading-none text-transparent text-2xl">
            {{ $t('general.app') }}
          </span>
        </div>

        <div class="dark:text-white p-4">
          {{ $t('general.greeting', { user: auth.identity }) }}
        </div>
      </div>
    </template>

    <NuxtErrorBoundary @error="logClientBoundaryError">
      <NuxtPage v-if="auth.identity" />

      <!-- auth -->
      <UiSheet v-else class="highlight-nuxt dark:highlight-nuxt--dark p-6">
        <InteractionLogin @sign-in="(identity: string) => auth.signIn(identity)" />
      </UiSheet>
    </NuxtErrorBoundary>

    <template #footer>
      <div class="text-center text-black dark:text-white">
        &copy; {{ new Date().getFullYear() }} devstdo.com
      </div>
    </template>

    <!-- color scheme toggle -->
    <ClientOnly>
      <UiSheet class="fixed bottom-5 right-5 highlight-nuxt dark:highlight-nuxt--dark p-6 space-y-4">
        <div class="dark:text-white text-black">
          {{ $t('components.color.mode') }}

          <span class="font-bold">{{ colorMode.preference }}</span>
        </div>

        <div class="space-x-2">
          <UiButton
            v-for="color in ['dark', 'light', 'system']"
            :key="color"
            variant="green"
            size="sm"
            @click="colorMode.preference = color"
          >
            {{ color }}
          </UiButton>
        </div>
      </UiSheet>
    </ClientOnly>
  </NuxtLayout>
</template>
