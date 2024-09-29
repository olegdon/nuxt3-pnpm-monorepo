<template>
  <div class="bg-white dark:bg-black min-h-screen flex flex-col p-4">
    <BaseUiSheet class="w-full">
      <slot name="header" />
    </BaseUiSheet>

    <BaseUiSheet class="container mx-auto min-h-screen md:max-w-6xl md:mt-2">
      <slot />
    </BaseUiSheet>

    <footer class="container mx-auto p-4">
      <slot name="footer" />
    </footer>
  </div>
</template>
