<script setup lang="ts">
const { t: $t } = useI18n()
const auth = useAuthStore()
const colorMode = useColorMode()

onMounted(() => {
  useListen('user:login', (identity: string) => {
    auth.signIn(identity)
  })
})
</script>

<template>
  <NuxtLayout :name="auth.identity ? 'default' : 'splash'">
    <NuxtLoadingIndicator />

    <template v-if="auth.identity" #header>
      <div class="dark:text-white p-4">
        {{ $t('general.greeting', { user: auth.identity }) }}
      </div>
    </template>

    <NuxtPage v-if="auth.identity" />

    <UiSheet v-else>
      <InteractionLogin @sign-in="(identity: string) => auth.signIn(identity)" />
    </UiSheet>

    <ClientOnly>
      <UiSheet class="fixed bottom-5 right-5">
        <div class="dark:text-white text-black">
          {{ $t('components.color.mode') }}

          <span class="font-bold">{{ colorMode.preference }}</span>
        </div>

        <div class="space-x-2">
          <UiButton
            v-for="color in ['dark', 'light', 'system']"
            :key="color"
            variant="green"
            @click="colorMode.preference = color"
          >
            {{ color }}
          </UiButton>
        </div>
      </UiSheet>
    </ClientOnly>
  </NuxtLayout>
</template>
