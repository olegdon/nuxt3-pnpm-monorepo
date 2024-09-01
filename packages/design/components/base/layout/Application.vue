<script lang="ts" setup>
</script>

<template>
  <div class="bg-stone-200 dark:bg-stone-800 min-h-screen flex flex-col">
    <BaseUiSheet class="sticky w-full top-0 z-10">
      <slot name="header" />
    </BaseUiSheet>

    <BaseUiSheet class="container mx-auto min-h-screen md:max-w-6xl md:mt-2">
      <slot />
    </BaseUiSheet>
  </div>
</template>
