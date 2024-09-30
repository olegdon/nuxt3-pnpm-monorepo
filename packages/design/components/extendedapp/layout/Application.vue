<script lang="ts" setup>
</script>

<template>
  <div
    class="min-h-screen flex flex-col fill-gray-600 relative antialiased"
  >
    <header class="sticky top-0 z-20 bg-extendedapp-primary-300 border-b border-accent-200 h-24 flex items-center">
      <slot name="header" />
    </header>

    <main class="grow flex flex-col justify-between">
      <slot />
    </main>

    <footer class="w-full top-0 bg-extendedapp-primary-200 border-t border-accent-200 h-12 flex items-center">
      <slot name="footer" />
    </footer>
  </div>
</template>
