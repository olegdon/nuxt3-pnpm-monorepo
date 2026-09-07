<script setup lang="ts">
definePageSeo({ key: 'single' })
</script>

<template>
  <main class="max-w-4xl mx-auto p-6 space-y-6 font-sans">
    <h1 class="text-3xl font-bold">{{ $t('general.title') }}</h1>
    <SingleFeature />
    <NuxtLink to="/about">About this app</NuxtLink>
  </main>
</template>
