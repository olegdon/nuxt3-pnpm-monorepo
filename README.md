# NuxtMonoStarter

A pnpm workspace with Nuxt 4, Tailwind CSS 4, Pinia, VueUse, i18n, Nuxt Image, Content and Storybook.

## Applications and shared code

- `apps/webapp` is the public website. It owns its Content collection and embeds the shared feature at `/feature`.
- `apps/singleapp` runs the same feature independently, with its own theme and deployment identity.
- `apps/extendedapp` extends webapp and overrides its home page, layout and button. It inherits `/feature`. Content is disabled because its pages do not query the collection.
- `packages/design` contains the shared UI and the reusable `SingleFeature` experience.
- `packages/services` contains shared composables, including reactive SEO and consent state.
- `packages/modules` contains shared Nuxt runtime integrations such as consent-aware analytics.
- `packages/design` registers base components and higher-priority app overrides, and supplies Tailwind themes and public fonts/images. Explicit `Base*` names let overrides compose the base components without recursion.
- `packages/services` contains reusable utilities and isolated event-bus factories.
- `packages/translations` owns locale messages and formatting options.
- `packages/modules` contains the optional Content installer. Disabled Content is kept out of module discovery so SEO integrations cannot register handlers for an absent database.

Nuxt app files use the Nuxt 4 `app/` layout. Server routes, public assets and Content configuration remain outside it. Paths in shared configuration resolve from their owning package. Locale directories follow Nuxt i18n's layer-relative conventions.

## Development

Use Node 24 (at least 24.11) or Node 22 (at least 22.19), and pnpm **11.25.0**, matching `packageManager` and CI. After changing Node versions, reinstall dependencies so native binaries match your runtime.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The development ports are webapp 3000, singleapp 3001, extendedapp 3002 and Storybook 6006. To run one consumer, use `pnpm singleapp dev`, `pnpm webapp dev`, `pnpm extendedapp dev` or `pnpm design dev`.

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm design build
pnpm exec playwright install chromium
pnpm test:e2e
```

Browser tests start fresh production servers on ports 3100–3103. They verify public SSR, metadata, schema, sitemaps/robots, component fallback, app themes, image delivery, navigation and consent. Google requests are intercepted; tests do not send real analytics. Build artifacts must exist before running them.

## Deployment settings

Copy the app's `.env.example` for local configuration. Set the equivalent environment variables on the deployment platform. Built Node servers do not automatically read `.env` files.

| Variable | Purpose | Default |
| --- | --- | --- |
| `NUXT_PUBLIC_SITE_URL` | Canonical absolute URL for this deployment; shared by canonicals, social images, schema and alternate-language links | App's nuxtmonostarter.com host |
| `NUXT_PUBLIC_SITE_NAME` | Site/schema display name | App-specific name |
| `NUXT_PUBLIC_SITE_INDEXABLE` | Set `true` only for public production deployments | `false` |
| `NUXT_PUBLIC_ANALYTICS_ENABLED` | Opt in to the analytics UI and tracking in a production build | `false` |
| `NUXT_PUBLIC_GTAG_ID` | GA4 measurement ID for this app | Empty |

Use separate GA4 streams or properties where independent reporting is desired. The consent UI loads Google's script only after approval. Declining or revoking consent disables subsequent events. Consent is stored in a host-scoped cookie for 180 days. Ads consent remains denied. The custom page-view tracker excludes query strings and hashes; do not add names, login identities or other personal data to events.

**Disable GA4 enhanced measurement's browser-history page views** for these streams: this application sends its own page views, and enabling both causes duplicate events. Verify the intended property's DebugView before production rollout. The bundled social card is a neutral starter image; replace it with your branding and keep its 1200 × 630 dimensions or update the metadata.

Robots, sitemap, canonical, Open Graph and schema use the app's site configuration. Preview deployments remain noindex until explicitly enabled. There is no blanket public HTML cache rule and no authentication claim: the identity store/login component is only a UI example. Add server-enforced authentication and private/no-store response policy before building private features.

Build on the target deployment OS/architecture because Image and Content use native packages. Vercel uses the pinned pnpm version from `vercel.json`; set each Vercel project's root directory to its app and include workspace files outside that root. pnpm filters handle workspace builds; the unused Turbo configuration was removed.

## Extending the design system

Place common components in `packages/design/components/base`, and matching app overrides in `components/extendedapp` (or another registered app). Use the same public component name, such as `UiButton`, in consumers. App styles each load one Tailwind config, common CSS and font declarations; Storybook intentionally combines the app palettes for previewing all components. Native Vue `defineModel` replaces the previous Vue Macros dependency.

See `AUDIT.md` for the original findings and validation limits.

## Remaining external checks

The application tests intercept Google requests; they do not validate a real GA4 property, consent policy text, or Search Console. Configure your own deployment values and verify GA4 DebugView and crawler/indexing behavior on the deployed host.

`pnpm peers check` currently reports transitive optional `unctx` peer mismatches for `oxc-parser` and `unplugin` in some upstream module dependency contexts. They are not hidden with relaxed peer rules or forced major-version overrides. Recheck them when upgrading those modules. Production builds, types and browser behavior are checked separately.
