<script setup lang="ts">
const { t: $t } = useI18n()
</script>

<template>
  <div class="p-4">
    <h1 class="dark:text-white">
      {{ $t('pages.home.title') }}
    </h1>
  </div>
</template>
