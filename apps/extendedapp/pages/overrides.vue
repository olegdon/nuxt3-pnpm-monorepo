<script setup lang="ts">
definePageSeo({ title: 'Override lab — Extended App', description: 'Compare base and extended components in a route exclusive to the extended Nuxt app.' })
const baseCount = ref(0)
const extendedCount = ref(0)
</script>

<template>
  <main>
    <section class="hero compact-hero">
      <p class="eyebrow">Extended app only / Override lab</p>
      <h1>Same contract.<br>Different component.</h1>
      <p class="lead">Nuxt resolves UiButton to the extended app’s override. Explicit BaseUiButton remains available when you want the original. Try both below.</p>
    </section>
    <section class="comparison-grid section-block" aria-label="Button comparison">
      <article class="info-card">
        <span class="card-number">BASE COMPONENT</span>
        <h2>Shared default</h2>
        <p>Directly uses the base component from the design package.</p>
        <code>&lt;BaseUiButton /&gt;</code>
        <div>
          <BaseUiButton @click="baseCount++">Try base button</BaseUiButton>
        </div>
        <p role="status">Base clicks: {{ baseCount }}</p>
      </article>
      <article class="info-card">
        <span class="card-number">APP OVERRIDE</span>
        <h2>Extended default</h2>
        <p>Uses the same public component name as the inherited feature.</p>
        <code>&lt;UiButton /&gt;</code>
        <div>
          <UiButton @click="extendedCount++">Try extended button</UiButton>
        </div>
        <p role="status">Extended clicks: {{ extendedCount }}</p>
      </article>
    </section>
    <div class="resource-row section-block">
      <p>This page is owned by <code>apps/extendedapp/pages/overrides.vue</code>. It is not added to the core or single app.</p>
      <NuxtLink to="/feature" class="action-secondary">See the inherited feature →</NuxtLink>
    </div>
  </main>
</template>
