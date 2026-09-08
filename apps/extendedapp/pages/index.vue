<script setup lang="ts">
definePageSeo({ key: 'extended' })
</script>

<template>
  <main class="p-6 space-y-6 font-sans">
    <h1 class="text-3xl font-bold">{{ $t('general.title') }}</h1>
    <SingleFeature />
    <NuxtLink to="/feature">Open the shared experience</NuxtLink>
  </main>
</template>
