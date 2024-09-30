<script setup lang="ts">
</script>

<template>
  <BaseInteractionWelcomeItem>
    <template #icon>
      <BaseUiIconDocumentation />
    </template>

    <template #heading>
      {{ $t('components.welcome.documentation.title') }}
    </template>

    Nuxt 3
    <a href="https://v3.nuxtjs.org" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.
  </BaseInteractionWelcomeItem>

  <BaseInteractionWelcomeItem>
    <template #icon>
      <BaseUiIconTooling />
    </template>

    <template #heading>
      {{ $t('components.welcome.tooling.title') }}
    </template>

    Optimized for VSCode usage. This Template is designed to provide great DX with VS Code and Volar.

    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a> +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener">Volar</a>

    <br>

    More instructions are available in <code>README.md</code>.
  </BaseInteractionWelcomeItem>

  <BaseInteractionWelcomeItem>
    <template #icon>
      <BaseUiIconEcosystem />
    </template>

    <template #heading>
      {{ $t('components.welcome.ecosystem.title') }}
    </template>

    Tools and libraries being used in this project:
    <a href="https://v3.nuxtjs.org" target="_blank" rel="noopener">Nuxt 3</a>,
    <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a>,
    <a href="https://pnpm.io/" target="_blank" rel="noopener">Pnpm</a>,
    <a href="https://pnpm.io/workspaces" target="_blank" rel="noopener">Workspace</a>,
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://content.nuxt.com/" target="_blank" rel="noopener">Nuxt Content</a>,
    <a href="https://i18n.nuxtjs.org/" target="_blank" rel="noopener">Support different locales</a>,
    <a href="https://tailwindcss.com/" target="_blank" rel="noopener">Tailwind 3</a>,
    <a href="https://vue-macros.sxzz.moe/" target="_blank" rel="noopener">Vue Macros</a>,
    <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener">TypeScript - JavaScript, but strongly typed and better</a>,

    and APIs auto importing - for Composition API, VueUse, Components (locally & from design) and custom composables
  </BaseInteractionWelcomeItem>

  <BaseInteractionWelcomeItem>
    <template #icon>
      <BaseUiIconCommunity />
    </template>

    <template #heading>
      {{ $t('components.welcome.repository.title') }}
    </template>

    Feel free to fork <a href="https://github.com/olegdon/nuxt3-pnpm-monorepo" target="_blank" rel="noopener">this repository</a> and customize it to your needs. Let's build something great together!

    For issues or feature requests, please use <a href="https://github.com/olegdon/nuxt3-pnpm-monorepo/issues" target="_blank" rel="noopener">GitHub Issues</a>.
  </BaseInteractionWelcomeItem>

  <BaseInteractionWelcomeItem>
    <template #icon>
      <BaseUiIconSupport />
    </template>

    <template #heading>
      {{ $t('components.welcome.support.title') }}
    </template>

    As an independent project, NuxtMonoStarter depends on community support to stay sustainable. You can contribute by
    <a href="https://buymeacoffee.com/devstdo" target="_blank" rel="noopener">buying me a coffee</a>.
  </BaseInteractionWelcomeItem>
</template>
