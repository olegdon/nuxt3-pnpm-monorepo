<script setup lang="ts">
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
  </NuxtLayout>
</template>
