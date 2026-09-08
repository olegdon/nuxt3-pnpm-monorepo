<script setup lang="ts">
const config = useRuntimeConfig()
const consent = useAnalyticsConsent()
const editing = ref(false)
const visible = computed(() => !consent.value || editing.value)
function choose(value: 'granted' | 'denied') {
  consent.value = value
  editing.value = false
}
</script>

<template>
  <ClientOnly v-if="config.public.analyticsEnabled && config.public.gtag?.id">
    <aside v-if="visible" aria-label="Analytics preferences" class="fixed bottom-4 inset-x-4 mx-auto max-w-xl rounded-xl border bg-white text-black p-5 shadow-lg z-50 space-y-3">
      <p>Allow Google Analytics to help us understand which pages people use? You can change this choice at any time.</p>
      <div class="flex gap-3">
        <BaseUiButton @click="choose('denied')">Decline</BaseUiButton>
        <BaseUiButton @click="choose('granted')">Allow analytics</BaseUiButton>
      </div>
    </aside>
    <button v-else class="m-4 underline" @click="editing = true">Analytics preferences</button>
  </ClientOnly>
</template>
