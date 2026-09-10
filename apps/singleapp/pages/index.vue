<script setup lang="ts">
definePageSeo({ key: 'single' })
</script>

<template>
  <main>
    <section class="hero hero-grid">
      <div>
        <p class="eyebrow">02 / Independent application</p>
        <h1>One Nuxt app.<br>Shared foundations.</h1>
        <p class="lead">A standalone Nuxt 4 app inside a pnpm monorepo. Its own routes and configuration, with reusable packages doing the common work.</p>
        <a href="#demo" class="action-primary">Try the shared component <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div class="architecture-panel">
        <div class="panel-caption">
          <span class="status-dot" /> INDEPENDENT CONSUMER</div>
        <div class="tree-row">
          <code>apps/singleapp</code>
          <span class="app-badge">Nuxt 4</span>
        </div>
        <div class="tree-row">
          <span>Routes & configuration</span>
          <span>App-owned</span>
        </div>
        <div class="tree-row">
          <span>UI & integrations</span>
          <span>Shared packages</span>
        </div>
        <div class="shared-packages">
          <span>APP BOUNDARY</span>
          <p>Runs independently. Does not extend webapp.</p>
        </div>
      </div>
    </section>
    <section id="demo" class="section-block demo-grid">
      <div>
        <p class="eyebrow">Shared package, local identity</p>
        <h2>The same feature.<br>A standalone home.</h2>
        <p>This component also runs at the core webapp’s /feature route. Here it uses the single app’s typography and theme.</p>
        <p class="source-label">Source <code>packages/design</code>
        </p>
      </div>
      <SingleFeature />
    </section>
  </main>
</template>
