<script setup lang="ts">
const { t } = useI18n()
const inputId = useId()
const name = ref('')
const greeting = ref('')
function greet() {
  greeting.value = t('general.greeting', { user: name.value.trim() || t('feature.visitor') })
}
</script>

<template>
  <UiSheet class="p-6 space-y-4" data-testid="shared-feature">
    <h2 class="text-2xl font-semibold">{{ t('feature.title') }}</h2>
    <p>{{ t('feature.description') }}</p>
    <NuxtImg
      src="/social-card.png"
      :alt="t('feature.imageAlt')"
      width="600"
      height="315"
      sizes="100vw sm:600px"
      format="webp"
      class="rounded-lg w-full max-w-xl"
    />
    <form class="flex flex-wrap items-end gap-3" @submit.prevent="greet">
      <div>
        <label :for="inputId" class="block mb-2">{{ t('feature.name') }}</label>
        <UiInput :id="inputId" v-model="name" autocomplete="given-name" />
      </div>
      <UiButton type="submit">{{ t('feature.action') }}</UiButton>
    </form>
    <p role="status" aria-live="polite">{{ greeting }}</p>
  </UiSheet>
</template>
