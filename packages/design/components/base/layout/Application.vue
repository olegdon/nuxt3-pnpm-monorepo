<template>
  <div class="bg-white dark:bg-black min-h-screen flex flex-col p-4">
    <BaseUiSheet class="sticky w-full top-0 z-10">
      <slot name="header" />
    </BaseUiSheet>

    <BaseUiSheet class="container mx-auto min-h-screen md:max-w-6xl md:mt-2">
      <slot />
    </BaseUiSheet>
  </div>
</template>
