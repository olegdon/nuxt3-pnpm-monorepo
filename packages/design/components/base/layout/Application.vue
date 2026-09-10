<script setup lang="ts">
const props = withDefaults(defineProps<{ app?: 'webapp' | 'singleapp' | 'extendedapp' }>(), { app: 'webapp' })
const identity = computed(() => ({
  webapp: { label: 'Core webapp', detail: 'The foundation', route: '/feature', link: 'Shared feature' },
  singleapp: { label: 'Single app', detail: 'Independent by design', route: '/about', link: 'About this app' },
  extendedapp: { label: 'Extended app', detail: 'Built on the core', route: '/feature', link: 'Inherited feature' },
})[props.app])
</script>

<template>
  <div class="app-frame font-sans" :data-app="app">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <header class="site-header">
      <div class="page-width header-row">
        <NuxtLink to="/" class="brand" aria-label="NuxtMonoStarter home">
          <span class="brand-mark" aria-hidden="true">N<span>m</span>
          </span> NuxtMonoStarter<span class="app-badge">{{ identity.label }}</span>
        </NuxtLink>
        <nav aria-label="Main navigation" class="site-nav">
          <NuxtLink to="/" exact-active-class="is-active">Overview</NuxtLink>
          <NuxtLink :to="identity.route" active-class="is-active">{{ identity.link }}</NuxtLink>
          <NuxtLink v-if="app === 'extendedapp'" to="/overrides" active-class="is-active">Override lab</NuxtLink>
          <a href="https://github.com/olegdon/nuxt3-pnpm-monorepo">GitHub <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
      <slot name="header" />
    </header>
    <div id="main-content" class="page-width page-body" tabindex="-1">
      <slot />
    </div>
    <footer class="site-footer page-width">
      <p>Nuxt 4 <span aria-hidden="true">/</span> pnpm workspaces <span aria-hidden="true">/</span> {{ identity.detail }}</p>
      <slot name="footer">
        <code>apps/{{ app }}</code>
      </slot>
    </footer>
  </div>
</template>
