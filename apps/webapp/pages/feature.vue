<script setup lang="ts">
definePageSeo({ key: 'feature' })
</script>

<template>
  <main>
    <section class="hero compact-hero">
      <p class="eyebrow">Shared feature / Core route</p>
      <h1>Built once.<br>Used across apps.</h1>
      <p class="lead">This route belongs to webapp and is inherited by extendedapp. The component inside it also powers the independent single app.</p>
    </section>
    <section class="section-block demo-grid">
      <div>
        <h2>A small, working example</h2>
        <p>Enter a name to try shared input, button and translation behavior. The app supplies the design; the component supplies the interaction.</p>
        <p class="source-label">Route <code>apps/webapp/pages/feature.vue</code>
        </p>
        <NuxtLink to="/" class="card-link">Back to home →</NuxtLink>
      </div>
      <SingleFeature />
    </section>
  </main>
</template>
