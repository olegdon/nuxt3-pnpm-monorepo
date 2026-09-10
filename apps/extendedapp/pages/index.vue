<script setup lang="ts">
definePageSeo({ key: 'extended' })
</script>

<template>
  <main>
    <section class="hero hero-grid">
      <div>
        <p class="eyebrow">03 / Nuxt layer extension</p>
        <h1>The core app.<br>With a different point of view.</h1>
        <p class="lead">This app extends webapp. It keeps the shared foundation, replaces selected pieces, and adds a route of its own.</p>
        <div class="actions">
          <NuxtLink to="/overrides" class="action-primary">Explore the override lab <span aria-hidden="true">→</span>
          </NuxtLink>
          <NuxtLink to="/feature" class="action-secondary">Open inherited feature</NuxtLink>
        </div>
      </div>
      <div class="architecture-panel">
        <div class="panel-caption">
          <span class="status-dot" /> LAYER RELATIONSHIP</div>
        <div class="tree-row">
          <code>apps/webapp</code>
          <span>Base layer</span>
        </div>
        <div class="tree-row tree-child">
          <code>↳ apps/extendedapp</code>
          <span class="app-badge">You are here</span>
        </div>
        <div class="shared-packages">
          <span>NUXT CONFIGURATION</span>
          <p>
            <code>extends: ['../webapp']</code>
          </p>
        </div>
      </div>
    </section>
    <section class="section-block" aria-labelledby="differences-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">A deliberate extension</p>
          <h2 id="differences-title">What stays. What changes.</h2>
        </div>
      </div>
      <div class="card-grid">
        <article class="info-card">
          <span class="card-number">INHERITED</span>
          <h3>The foundation</h3>
          <p>The /feature page, shared services, and Nuxt integrations come from webapp. This app does not duplicate that route.</p>
          <NuxtLink to="/feature" class="card-link">Visit inherited route →</NuxtLink>
        </article>
        <article class="info-card">
          <span class="card-number">OVERRIDDEN</span>
          <h3>The presentation</h3>
          <p>A local home page, a layer-aware layout, and a blue button override give this app its identity. Inputs still fall back to the base design.</p>
          <code>components/extendedapp</code>
        </article>
        <article class="info-card">
          <span class="card-number">EXTENDED ONLY</span>
          <h3>The override lab</h3>
          <p>Compare the base and overridden buttons side by side. This additional route belongs only to extendedapp.</p>
          <NuxtLink to="/overrides" class="card-link">Open override lab →</NuxtLink>
        </article>
      </div>
    </section>
    <section class="section-block demo-grid">
      <div>
        <p class="eyebrow">See inheritance in action</p>
        <h2>Shared behavior.<br>Overridden design.</h2>
        <p>The greeting component is unchanged. Its UiButton resolves to this app’s override, while UiInput uses the shared base.</p>
      </div>
      <SingleFeature />
    </section>
  </main>
</template>
