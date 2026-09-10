<template>
  <BaseLayoutApplication app="extendedapp">
    <template #header>
      <div class="layer-strip">
        <div class="page-width">webapp <span aria-hidden="true">→</span> extendedapp <span class="layer-strip-note">Shared foundation. Local overrides.</span>
        </div>
      </div>
    </template>
    <slot />
    <template #footer>
      <code>extends: ['../webapp']</code>
    </template>
  </BaseLayoutApplication>
</template>
