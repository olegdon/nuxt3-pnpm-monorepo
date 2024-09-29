<script lang="ts" setup>
</script>

<template>
  <div
    class="min-h-screen flex flex-col fill-gray-600 relative antialiased"
  >
    <header class="sticky w-full top-0 z-20 bg-white border-b border-accent-200 h-24 flex items-center">
      <div>
        <slot name="header" />
      </div>
    </header>

    <main class="grow flex flex-col justify-between">
      <slot />
    </main>

    <footer class="w-full top-0 bg-white border-t border-accent-200">
      <slot name="footer" />
    </footer>
  </div>
</template>
