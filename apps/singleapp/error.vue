<script setup lang="ts">
import type { NuxtError } from '#app'
const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const message = computed(() => t(`error.message.${props.error.statusCode === 404 ? 404 : 500}`))
definePageSeo({ title: message, description: message, robots: 'noindex, follow' })
</script>

<template>
  <SiteShell>
    <main class="max-w-xl mx-auto p-8 space-y-6">
      <h1 class="text-3xl font-bold">{{ error.statusCode }} — {{ message }}</h1>
      <UiButton @click="clearError({ redirect: '/' })">{{ t('error.back') }}</UiButton>
    </main>
  </SiteShell>
</template>
