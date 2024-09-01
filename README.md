#  olegdon/nuxt3-pnpm-monorepo 💚

<pre align="center">
🚀 Opinionated Nuxt, Tailwind & Storybook monorepo for checkout charlie frontend webapps
</pre>
<hr />

## Features
- [💚 Nuxt 3](https://v3.nuxtjs.org) - SSR, ESR, File-based routing, components auto importing, modules, etc.
- 🤓 Optimized for VSCode usage
- [⚡️ Vite](https://vitejs.dev/) - Instant HMR
- [✨ Vitest](https://vitest.dev/guide/) - A blazing fast unit test framework
- [🚝 Monorepo](https://pnpm.io/workspaces) - workspace setup using [pnpm](https://pnpm.io/)
- [🌬️ Tailwind 3](https://tailwindcss.com/) - the utility-first CSS framework
- [🖌️ Storybook](https://storybook.js.org/) - build UI components and pages in isolation
- 🔥 The `<script setup>` syntax
- [🍍 State Management via Pinia](https://pinia.esm.dev), see [./stores/AuthStore.ts](./stores/AuthStore.ts)
- [🧹 Vue Macros](https://vue-macros.sxzz.moe/) Explore and extend more macros and syntax sugar to Vue.
- 📥 APIs auto importing - for Composition API, VueUse, Components (localy & from design) and custom composables
- [🦾 TypeScript](https://www.typescriptlang.org/) - JavaScript, but strongly typed and better

## Architecture

### Apps

#### `~/apps/webapp`

Contains all general logic that is tightly coupled with nuxt

#### `~/apps/!(webapp)`

All platform specific applications

### Packages

#### `~/packages/design`

Design System, contains abstract vue components & logic that couples applications with design elements

#### `~/packages/modules`

Build Modules and so forth

#### `~/packages/services`

All general logic that isn't tightly coupled to vue or nuxt and could be used in other JS/Node contexts.

#### `~/packages/translations`

All Translations

## Plugins

### Nuxt Modules

- [VueUse](https://github.com/vueuse/vueuse) - collection of useful composition APIs.
- [Pinia](https://pinia.esm.dev/) - intuitive, type safe, light and flexible Store for Vue.
- [Nuxt Devtools](https://devtools.nuxtjs.org/) - Unleash Nuxt Developer Experience.

## IDE

### VS

This Template is designed to provide great DX with [VS Code](https://code.visualstudio.com/) and [Volar](https://github.com/johnsoncodehk/volar).

## Usage

TBD

## Development

There are several ways to run the monorepo project:
- `pnpm dev` from monorepo root - run all apps together as well as run storybook. Each app accessible via `http://localhost:{port}/`. List of ports can be found in `package.json`.
- `pnpm %app% dev` from monorepo root - run specific app (e.g. `pnpm webapp dev`). App accessible via `http://localhost:3000/`.
- run app from specific app folder (e.g. `cd apps/webapp && pnpm dev`).

### Note
By launching all applications or one is strictly recommended to run `pnpm install` or `pnpm i` to install all dependencies beforehand. It needs because of `renovate` plugin that constantly updates dependencies in all packages.