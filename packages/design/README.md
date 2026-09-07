# Design system

Shared Vue components, app-specific overrides, Tailwind 4 themes and public assets.

Run `pnpm design dev` for Storybook and `pnpm design build` to verify its production bundle. Nuxt consumers use `@devstdo/design/nuxt.ts` through the shared base layer and select `monorepoDesign.app` in their configuration. See the workspace README for the component override contract.
