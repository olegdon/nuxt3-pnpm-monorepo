<script setup lang="ts">
/**
 * the app file handles a lot of the page wide logic, ideally application wide logic
 * should be implemented here
 */
// const { t: $t } = useI18n()
// const { public: config } = useRuntimeConfig()

function logClientBoundaryError(error: any) {
  // eslint-disable-next-line no-console
  console.debug(error)
  clearError(error)
}
</script>

<template>
  <NuxtLayout>
    <NuxtErrorBoundary @error="logClientBoundaryError">
      <NuxtPage />
    </NuxtErrorBoundary>

    <template #modal>
      <div>Test</div>
    </template>
  </NuxtLayout>
</template>
