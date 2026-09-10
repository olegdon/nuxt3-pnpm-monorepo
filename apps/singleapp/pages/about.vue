<script setup lang="ts">
definePageSeo({ title: 'About | Single App', description: 'The standalone home of our shared welcome experience.' })
</script>

<template>
  <main>
    <section class="hero compact-hero">
      <p class="eyebrow">Independent app / Shared workspace</p>
      <h1>Standalone doesn’t<br>mean isolated.</h1>
      <p class="lead">Singleapp is a complete Nuxt 4 application with its own configuration, routes and deployment identity. It consumes workspace packages directly.</p>
    </section>
    <section class="comparison-grid section-block">
      <article class="info-card">
        <h2>Owned by this app</h2>
        <p>Its home and about routes, Nuxt configuration, site metadata and Niramit typography.</p>
        <code>apps/singleapp</code>
      </article>
      <article class="info-card">
        <h2>Shared through packages</h2>
        <p>The greeting component, UI primitives, service composables, Nuxt integrations and translations.</p>
        <code>packages/*</code>
      </article>
    </section>
    <NuxtLink to="/" class="action-secondary mt-6">Back to the welcome</NuxtLink>
  </main>
</template>
