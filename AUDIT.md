# Nuxt monorepo audit — 2026-09-06

The repository already runs Nuxt 4.1.3. The main work is completing its integrations and making application boundaries reliable, then upgrading the framework and modules together. This document records the original review snapshot. Implementation on `feat/audit-features` follows this audit; see the workspace README for the current architecture, commands and deployment settings.

## Validation and limitations

- ESLint passed using the installed local executable.
- `singleapp` production build passed with Nuxt 4.1.3, Vite 7.1.9 and Vue 3.5.22. Its largest client chunk is 221.67 kB / 80.19 kB gzip. This is a bundle observation, not a measured user-performance result.
- The built standalone app returned HTTP 200. Its head has a welcome-page title but no description, canonical or Open Graph tags. Its robots file is empty. `/sitemap.xml` returns HTML with HTTP 200, not XML.
- `webapp` and `extendedapp` builds stop when loading better-sqlite3: installed binary ABI 137 versus the running Node's ABI 147. Reinstall/rebuild native dependencies under the chosen Node runtime before judging further build failures. This is an environment failure, not proof of a source defect in Content.
- `pnpm --version` failed its package-manager signature verification because registry fetching failed. This does not establish tampering. Do not bypass verification; restore registry access and verify the pinned toolchain.
- No application test files were found. Browser navigation, hydration, Core Web Vitals, production CDN behavior and GA4 account configuration were not validated.

## Prioritized findings

### 1. P1 — Standalone configuration silently skips shared integrations

Evidence: `apps/singleapp/nuxt.config.ts:16`, `packages/modules/nuxt-app-module-config/module.ts:35`, and its `loaders` directory.

The standalone app declares Tailwind and Image dependencies but does not register either module. It passes Tailwind/font/image options to the custom configuration module, which only searches for existing tuple entries and mutates them. Consequently Tailwind and custom fonts are never installed; Image loading is commented out. The welcome component has its own styles, masking the missing design integration.

The i18n loader also unconditionally overwrites `baseUrl`, `strategy` and `differentDomains` with undefined when no override is supplied. Running it against the standalone configuration reproduced this loss of defaults.

Replace module-array mutation with explicit configuration and supported Nuxt Kit module installation. Only override defined options. Make the standalone demo render shared UI, translations, a font and an optimized image so these dependencies are actually exercised.

### 2. P1 — SEO URL construction produces invalid values

Evidence: `apps/webapp/composables/defineWebsiteSeo.ts:51` and `definePageSeo.ts:53`.

Replacing `//` with `/` turns `https://www.nuxtmonostarter.com/` into `https:/www.nuxtmonostarter.com/`. Concatenating the origin with an absent logo produces `https://www.nuxtmonostarter.comundefined`; the final `|| null` cannot catch that truthy string. Both expressions were reproduced directly.

Use a validated per-app site origin and URL construction that preserves the scheme. Omit absent images or supply a real public default asset. `icon.png` and `manifest.webmanifest` are referenced but have no corresponding implementation in this repository. Ensure all declared icon, social-image and manifest URLs return the intended content.

### 3. P1 — Page SEO does not follow client navigation

Evidence: `apps/webapp/composables/definePageSeo.ts:30`, `apps/webapp/pages/index.vue:7`.

Description, canonical, language attributes and OG tags are registered inside `onServerPrefetch`, with most metadata using `useServerSeoMeta`. They do not update when a page is entered through client navigation. The page also passes literal translation keys as title/description, which the helper treats as final strings. After the login-gated page mounts, the title can become `pages.index.meta.title`.

Register reactive `useSeoMeta`/`useHead` data during setup, with translated values or a single explicit translation-key API. Bind the full relevant locale-head output, including alternate links when more locales are introduced. Remove the module-level translated month/year cache: it becomes stale and would mix locales on a long-lived server.

### 4. P1 — Public content is gated behind demo login

Evidence: `apps/webapp/app.vue:55`, `apps/webapp/stores/AuthStore.ts:2`.

Identity starts as null and is only set client-side. Anonymous SSR therefore renders the login screen instead of the page content, even though metadata defaults to index/follow. If this is intended as a public starter/marketing site, render public routes without the login gate. If it is an authenticated app, explicitly separate public pages from private routes and apply appropriate indexing policy. The current identity store is a UI demo, not server-enforced authentication.

### 5. P1 — Framework and DevTools pins miss published security updates

All apps pin Nuxt 4.1.3; kit/schema packages also pin 4.1.3, and DevTools is pinned to 2.6.5. The current official release inspected is [Nuxt 4.5.2](https://github.com/nuxt/nuxt/releases/tag/v4.5.2). Nuxt's [July security notice](https://nuxt.com/blog/v4-5-security) calls for patched Nuxt and DevTools versions, including DevTools 3.3.1.

Upgrade Nuxt, kit/schema and compatible modules as a coordinated change, refreshing the dependency lock and checking the resolved DevTools version. Verify registry tags at implementation time. Do not independently force the app's Vite version: Nuxt 4.5 changes its build-tool baseline. Older root-level Nuxt directory layouts alone are not proof of broken Nuxt 4 compatibility; migrate to `app/` deliberately with path and type checks.

### 6. P2 — Layer inheritance carries deployment identity and overhead

Evidence: `apps/extendedapp/nuxt.config.ts:31`, `apps/webapp/nuxt.config.ts`, and both apps' `app.vue` files.

Extendedapp inherits Content/SQLite, sitemap, analytics, cache rules and custom bundling from webapp, although its overridden page only renders NuxtWelcome. Its replacement root does not call the webapp's website/page SEO helpers. Config inheritance does not compose the overridden root component's setup code.

The standalone app is an independent consumer of workspace packages; it is not currently a reusable feature composed into webapp. If the same feature should run independently and inside webapp, extract its UI, composables and optional routes into a feature layer/package consumed by both. Avoid extending the entire deployable standalone app, which would also inherit its root and deployment policy.

### 7. P2 — Analytics lacks app/environment isolation and a consent flow

Evidence: `apps/webapp/nuxt.config.ts:136`.

GA4 is always enabled with a hard-coded ID and is inherited by extendedapp. There is no consent implementation or app event contract; standalone has no analytics module. Development and derivative-app traffic can enter the same stream. Whether one shared property is intentional cannot be determined from source.

Provide per-app runtime IDs and an explicit production enablement flag. Define consent behavior and initialize tracking accordingly. Choose one page-view mechanism and verify exactly one event per initial load and client navigation. The [module documentation](https://nuxt.com/modules/gtag) documents manual initialization, environment disabling and GA4 history-based enhanced measurement. Verify actual GA4 settings and DebugView; installation alone does not validate tracking. Do not send the demo login identity as an analytics parameter.

### 8. P2 — Manifest rewriting undermines framework asset handling

Evidence: `apps/webapp/nuxt.config.ts:155–213`.

The build hook deletes every manifest CSS list and dynamic-import list. Forced page grouping and a 250 kB minimum-chunk heuristic further override Nuxt/Vite defaults. This discards information used for asset hints/style handling and may create missing styles or loading waterfalls. Exact runtime impact remains unverified because the webapp build is blocked.

Remove the historical workarounds in a separately validated change, then compare cold loads and navigation with framework defaults. Check styles on every route, network waterfalls, transfer sizes and hydration warnings before introducing measured optimizations. Keep sourcemaps available privately for production diagnostics if appropriate.

### 9. P2 — Shared component overrides have no dependable fallback

Evidence: `packages/design/nuxt.ts:29–77`.

Nuxt component scanning and a second Vite component resolver both own the same naming scheme. The resolver constructs a path in the selected app's component directory without checking existence or falling back to base. There is no `components/singleapp` directory, and extendedapp overrides only a subset of base components. Current welcome pages do not adequately exercise this contract.

Prefer Nuxt's component registration with explicit priorities: base components first, then app overrides under the same public names. Verify an overridden button and a non-overridden input in all consumers, including Storybook. Resolve package paths relative to `import.meta.url`; [Nuxt's layer guidance](https://nuxt.com/docs/4.x/guide/going-further/layers/) explains why consumer-relative paths are fragile.

### 10. P2 — CI does not establish monorepo correctness

Evidence: `.github/workflows/nodejs.yml`, `.github/actions/build/action.yml`, `vercel.json`, `package.json`, `turbo.json`.

CI builds only webapp. The design job installs Playwright but does not build Storybook or execute its tests. Application test scripts have no corresponding tests, and there is no typecheck gate. Local packageManager pins pnpm 12.3.4; Vercel explicitly starts pnpm 11.25.0; CI globally installs an unpinned pnpm. Turbo configuration exists without a Turbo dependency or root command using it, so it provides no build caching benefit.

Unify and pin the toolchain. Require frozen installs, lint, typechecking, all three builds, Storybook build and focused integration checks. Reduce workflow permissions to contents:read unless a job needs writes. Either wire Turbo with dependency-aware builds and persistent uncached dev tasks or remove the unused configuration; pnpm filters are sufficient at this project size.

### 11. P2 — Service utilities are not SSR-safe or self-contained

Evidence: `packages/services/composables/useSimpleCookie.ts:11`, `useEventBus.ts`, `packages/services/package.json`, `packages/design/composables/useDialogModal.ts`.

Calling `useSimpleCookie` in Node throws `document is not defined`: `if (!document)` already accesses the missing global. It also stringifies cookie settings generically, does not safely parse malformed values and should be replaced by Nuxt's cookie composable for app use. The event bus is a module singleton and provides no scope cleanup; the current login listener is client-mounted, so a demonstrated cross-request user-data leak is not claimed, but server reuse would share the emitter. The dialog helper attaches new listeners on every open without removing them, multiplying callbacks.

Separate framework-neutral utilities from Nuxt/Vue composables. Declare runtime imports in their owning package: services imports `mitt` but only design declares it, and `micromark` is a service devDependency. Hoisting and disabled peer checks conceal dependency-boundary errors. Add package exports and explicit framework peers where appropriate; then validate without relying on shameful hoisting.

## Target structure and implementation order

Keep `apps/webapp`, `apps/singleapp` and `apps/extendedapp` as deployable entry points. Extract a small shared Nuxt layer for genuinely common framework setup. Keep design components/tokens in design, translations in their workspace package, and pure services separate from framework adapters. If standalone represents an embeddable product feature, create a feature layer consumed by standalone and webapp. Keep public origin, GA4 ID, robots/indexability, caching and optional Content configuration app-owned. Extendedapp may continue extending webapp when inheriting that product is intentional.

1. Restore a reproducible Node/pnpm installation and rebuild SQLite. Upgrade the coordinated Nuxt dependency group; add all-app build/type gates.
2. Replace module-array mutation and duplicate component resolution. Use one Tailwind pipeline. The installed Nuxt Tailwind module labels its v4 support experimental; the official [Tailwind Nuxt integration](https://tailwindcss.com/docs/installation/framework-guides/nuxt) uses `@tailwindcss/vite`. Align Storybook and app CSS, explicitly scan shared source directories, and isolate app themes rather than merging every app's theme into production by default.
3. Introduce typed per-app site settings and repair SEO helpers. Use one robots implementation: webapp currently has both an empty static file and a server route. Make sitemap URLs, canonicals and schema IDs agree on the configured origin. Add accurate WebSite/WebPage and organization identity where applicable; `schemaContent` is currently a TODO. Only describe content actually visible on the page.
4. Establish public/private route policy. Replace blanket public cache headers with explicit public-route caching; mark personalized responses private/no-store if server authentication is introduced. The current demo does not prove a cache data leak, but `/**` is an unsafe default for future authenticated responses.
5. Add consent-aware analytics and validate page views/events in the intended property. Test production and preview policies independently.
6. Measure production performance after correctness: HTML/JS/CSS transfer, LCP/INP/CLS, image/font delivery and route waterfalls. Content's database is unnecessary overhead for the current extended welcome page. Avoid speculative chunk tuning before measurement.

Acceptance checks: clean frozen install; all apps and Storybook build; shared component fallback and app theme work; standalone and embedded feature behave consistently; initial SSR and client navigation have correct translated metadata; canonical/OG/schema URLs are absolute and assets return 200; sitemap is XML and only includes indexable URLs; robots matches each environment; analytics follows consent and sends one page view per navigation; no hydration warnings or repeated dialog/event handlers.
