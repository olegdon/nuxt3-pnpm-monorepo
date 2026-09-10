<script setup lang="ts">
const headingId = useId()
</script>

<template>
  <section class="resource-row section-block support-section" :aria-labelledby="headingId">
    <div>
      <p class="eyebrow">Community supported</p>
      <h2 :id="headingId">Support NuxtMonoStarter</h2>
      <p>If this starter helps you build, you can support its development with a coffee or contribute on GitHub.</p>
    </div>
    <div class="actions">
      <a href="https://buymeacoffee.com/devstdo" class="action-primary" target="_blank" rel="noopener noreferrer">Buy me a coffee <span aria-hidden="true">↗</span></a>
      <a href="https://github.com/olegdon/nuxt3-pnpm-monorepo" class="action-secondary" target="_blank" rel="noopener noreferrer">Contribute on GitHub <span aria-hidden="true">↗</span></a>
    </div>
  </section>
</template>
