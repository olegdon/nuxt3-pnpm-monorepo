import process from 'node:process'
import { defineConfig } from '@playwright/test'

const apps = ['webapp', 'singleapp', 'extendedapp']

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  retries: process.env.CI ? 1 : 0,
  use: { browserName: 'chromium', trace: 'retain-on-failure' },
  webServer: [
    ...apps.map((app, i) => ({
      command: `node apps/${app}/.output/server/index.mjs`,
      url: `http://127.0.0.1:${3100 + i}`,
      reuseExistingServer: false,
      env: {
        HOST: '127.0.0.1',
        PORT: String(3100 + i),
        NUXT_PUBLIC_SITE_URL: `https://${app}.example.org`,
        NUXT_PUBLIC_SITE_INDEXABLE: 'true',
        NUXT_PUBLIC_ANALYTICS_ENABLED: 'true',
        NUXT_PUBLIC_GTAG_ID: 'G-TEST123456',
      },
    })),
    {
      command: 'node apps/singleapp/.output/server/index.mjs',
      url: 'http://127.0.0.1:3103',
      env: { HOST: '127.0.0.1', PORT: '3103', NUXT_PUBLIC_SITE_INDEXABLE: 'false', NUXT_PUBLIC_ANALYTICS_ENABLED: 'false' },
    },
  ],
})
