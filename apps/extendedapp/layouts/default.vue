<script setup lang="ts">
</script>

<template>
  <LayoutApplication>
    <template #header>
      <div class="text-center w-full">
        {{ $t('general.header') }}
      </div>
    </template>

    <slot />

    <template #footer>
      <div class="text-center w-full">
        {{ $t('general.footer') }}
      </div>
    </template>
  </LayoutApplication>
</template>
