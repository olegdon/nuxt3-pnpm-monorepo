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

    <h2 class="text-xl text-black dark:text-white text-center">
      {{ $t('pages.home.examples.title') }}
    </h2>

    <p class="text-black dark:text-white text-center">
      {{ $t('pages.home.examples.description') }}
    </p>

    <div class="flex w-2/3 items-center justify-around space-x-4 mx-auto">
      <a href="https://storybook.nuxtmonostarter.com" target="_blank" rel="noopener">Storybook UI instance</a>
      <a href="https://single.nuxtmonostarter.com" target="_blank" rel="noopener">Single Nuxt 3 application instance</a>
      <a href="https://extended.nuxtmonostarter.com" target="_blank" rel="noopener">Extended Nuxt 3 application instance</a>
    </div>
  </div>
</template>
