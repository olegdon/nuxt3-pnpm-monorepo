<script setup lang="ts">
const { data } = await useAsyncData('home-content', () => queryCollection('content').path('/').first())
const singleUrl = import.meta.dev ? 'http://localhost:3001' : 'https://single.nuxtmonostarter.com'
const extendedUrl = import.meta.dev ? 'http://localhost:3002' : 'https://extended.nuxtmonostarter.com'
const storybookUrl = import.meta.dev ? 'http://localhost:6006' : 'https://storybook.nuxtmonostarter.com'
definePageSeo({ key: 'index' })
</script>

<template>
  <main>
    <section class="hero hero-grid">
      <div>
        <p class="eyebrow">Nuxt 4 · pnpm monorepo starter</p>
        <h1>{{ data?.title || 'One workspace. Three ways to build.' }}</h1>
        <p class="lead">{{ data?.description || 'A core webapp, an independent app, and an extended app. Explore how they share code while keeping their own identity.' }}</p>
        <div class="actions">
          <NuxtLink class="action-primary" to="/feature">Explore the shared feature <span aria-hidden="true">→</span>
          </NuxtLink>
          <a class="action-secondary" href="#applications">Compare the apps</a>
        </div>
      </div>
      <div class="architecture-panel" aria-label="Workspace architecture">
        <div class="panel-caption">
          <span class="status-dot" /> WORKSPACE STRUCTURE <span>01 / 03</span>
      </div>
      <div class="tree-row">
        <code>apps/webapp</code>
        <span class="app-badge">You are here</span>
      </div>
      <div class="tree-row tree-child">
        <code>↳ extendedapp</code>
        <span>extends webapp</span>
      </div>
      <div class="tree-row">
        <code>apps/singleapp</code>
        <span>independent</span>
      </div>
      <div class="shared-packages">
        <span>SHARED BY ALL THREE</span>
        <p>design · services · modules · translations</p>
      </div>
    </div>
  </section>
  <section id="applications" class="section-block" aria-labelledby="apps-title">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Same repository. Different boundaries.</p>
        <h2 id="apps-title">Choose an app. See the relationship.</h2>
      </div>
      <span class="section-count">03 applications</span>
    </div>
    <div class="card-grid">
      <article class="info-card">
        <span class="card-number">01 / CORE</span>
        <h3>Main webapp</h3>
        <p>The starting point: a content-driven home page and a shared feature route. It also acts as the Nuxt layer for the extended app.</p>
        <code>apps/webapp</code>
        <NuxtLink to="/feature" class="card-link">Try the core feature <span aria-hidden="true">→</span>
        </NuxtLink>
      </article>
      <article class="info-card">
        <span class="card-number">02 / INDEPENDENT</span>
        <h3>Single app</h3>
        <p>A standalone Nuxt 4 application in the same workspace. It imports shared packages, with its own routes, configuration and theme.</p>
        <code>apps/singleapp</code>
        <a :href="singleUrl" class="card-link">Open single app <span aria-hidden="true">↗</span>
        </a>
      </article>
      <article class="info-card">
        <span class="card-number">03 / INHERITED</span>
        <h3>Extended app</h3>
        <p>Built on this webapp using Nuxt layers. It inherits the feature route and adds its own home, layout, button styling and override lab.</p>
        <code>extends: ['../webapp']</code>
        <a :href="extendedUrl" class="card-link">Open extended app <span aria-hidden="true">↗</span>
        </a>
      </article>
    </div>
  </section>
  <section class="resource-row section-block" aria-labelledby="shared-title">
    <div>
      <p class="eyebrow">Reuse without duplication</p>
      <h2 id="shared-title">Shared code belongs in packages.</h2>
      <p>UI in design. Composables in services. Nuxt integrations in modules. Messages in translations.</p>
    </div>
    <a :href="storybookUrl" class="action-secondary">Explore Storybook <span aria-hidden="true">↗</span>
    </a>
  </section>
  <BaseInteractionSupportSection />
</main>
</template>
