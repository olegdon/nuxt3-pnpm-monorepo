<script setup lang="ts">
defineWebsiteSeo()
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <slot />
    <AnalyticsConsent />
  </div>
</template>
