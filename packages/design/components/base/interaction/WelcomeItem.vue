<script setup lang="ts">

</script>

<template>
  <div class="mt-8 md:mt-0 flex relative py-2 px-8">
    <i class="place-content-center place-items-center flex w-8 h-8 md:top-[calc(50% - 25px)] md:-left-6 md:absolute md:border md:rounded-lg md:w-12 md:h-12">
      <slot name="icon" />
    </i>

    <div class="flex-1 ml-4">
      <h3 class="text-xl font-bold mb-2">
        <slot name="heading" />
      </h3>
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
