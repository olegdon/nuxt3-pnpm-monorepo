<script setup lang="ts">
definePageSeo({ key: 'feature' })
</script>

<template>
  <main class="p-6 space-y-6">
    <h1 class="text-3xl font-bold">{{ $t('feature.title') }}</h1>
    <SingleFeature />
    <NuxtLink to="/">Back to home</NuxtLink>
  </main>
</template>
