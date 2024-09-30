<script setup lang="ts">
</script>

<template>
  <div class="p-4 space-y-8 dark:text-gray-300 text-black">
    <ContentDoc v-slot="{ doc }">
      <h1 class="text-4xl font-bold text-center">
        {{ doc.title }}
      </h1>

      <p class="text-center">
        {{ doc.description }}
      </p>
    </ContentDoc>

    <AppWelcome />
  </div>
</template>
