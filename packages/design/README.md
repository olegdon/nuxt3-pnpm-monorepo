# Design system and Storybook

Shared Vue components, Nuxt app overrides, Tailwind 4 themes and public assets. Nuxt consumers register `@devstdo/design/nuxt.ts` directly or inherit it from webapp. Select `monorepoDesign.app` in each app's configuration.

## Catalog

- Components: Button variants, sizes, links and disabled states; labeled Input with editable, prefilled and validation examples; Sheet containers and links; Note feedback states.
- Patterns: the real shared greeting in all three consumers, community SupportSection, and AnalyticsConsent with isolated preview state.
- Applications: core, standalone and extended shells, inherited-route navigation and a loading splash.
- Extended App: the actual button override, variant fallback and a side-by-side comparison with BaseUiButton.
- Foundations: semantic light/dark colors and app palettes; typography pages show only declared font weights.

Use the toolbar to change light/dark mode and the consumer theme. Shared Feature / Playground also swaps the actual button override and translated description live. Fixed consumer examples retain their app identity. Resize the canvas to inspect mobile layouts.

## Commands

```sh
pnpm design dev         # Development catalog on port 6006
pnpm design build       # Build the static catalog
pnpm design test        # Story/interaction tests against a running catalog
pnpm design test:built  # Serve the existing build on 6107, test, then stop
pnpm design ci:test     # Build and run the self-contained checks
```

Install Chromium with `pnpm exec playwright install chromium` before browser checks. `test:built` runs 42 story tests, checks every story for unresolved components and broken images, and verifies live app/theme switching. CI runs it after the static build and browser installation. No `pnpm dlx` dependencies are downloaded by the test scripts.

The Jest runner's SWC transform targets ES2022 because its bundled SWC version cannot parse the ES2023 target selected by default under Node 24. This configuration affects test transformation only.

## Nuxt preview boundaries

`.storybook/nuxt-components.ts` supplies a memory-router link adapter and an image adapter that serves the real static asset. Storybook does not run IPX or Nuxt page routing. `.storybook/preview.ts` installs per-app Pinia/i18n instances and reactive consumer selection. It registers public UiButton/UiInput/UiSheet aliases as well as explicit base components.

`stubs/analytics.ts` provides injected, per-story consent state and runtime configuration. It is imported only by the Storybook Vite pipeline, which does not scan the production services directory. No analytics script or cookie is used in these previews. Nuxt integration tests remain responsible for SSR, IPX, SEO, real cookies and route inheritance.

The support block is shared with the core home page; its story does not duplicate the app markup. SiteShell's Nuxt metadata/loading integration remains app-tested rather than replaced by a misleading Storybook simulation.
