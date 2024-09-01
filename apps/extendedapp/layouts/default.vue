<script setup lang="ts">
const { public: config } = useRuntimeConfig()
</script>

<template>
  <LayoutApplication>
    <template #header>
      <slot name="header" />
    </template>

    <slot />

    <template #footer>
      <slot name="footer" />
    </template>

    <template #modal>
      <slot name="modal" />
    </template>
  </LayoutApplication>
</template>
