import { expect, test } from '@playwright/test'

for (const [i, app] of ['webapp', 'singleapp', 'extendedapp'].entries()) {
  const origin = `http://127.0.0.1:${3100 + i}`
  const canonicalOrigin = `https://${app}.example.org`

  test(`${app}: public SSR, metadata, schema and discovery endpoints`, async ({ request }) => {
    const response = await request.get(origin)
    expect(response.status()).toBe(200)
    const html = await response.text()
    expect(html).toContain('<h1')
    expect(html).not.toContain('pages.index.meta.title')
    expect(html).toContain(`href="${canonicalOrigin}/"`)
    expect(html).toMatch(/name="description" content="[^"]+"/)
    expect(html).toContain(`${canonicalOrigin}/social-card.png`)
    const scripts = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)]
    expect(scripts.length).toBeGreaterThan(0)
    const nodes = scripts.flatMap(match => JSON.parse(match[1])['@graph'])
    expect(nodes.some(node => node['@type'] === 'WebSite' && node.url === `${canonicalOrigin}/`)).toBe(true)
    expect(nodes.some(node => node['@type'] === 'WebPage' && node.url === `${canonicalOrigin}/`)).toBe(true)
    const sitemap = await request.get(`${origin}/sitemap.xml`)
    expect(sitemap.status()).toBe(200)
    expect(sitemap.headers()['content-type']).toContain('xml')
    expect(await sitemap.text()).toContain(`<loc>${canonicalOrigin}/</loc>`)
    const robots = await request.get(`${origin}/robots.txt`)
    expect(await robots.text()).toContain(`${canonicalOrigin}/sitemap.xml`)
    expect((await request.get(`${origin}/social-card.png`)).status()).toBe(200)
    expect((await request.get(`${origin}/assets/fonts/niramit/niramit-regular.woff2`)).status()).toBe(200)
    expect((await request.get(`${origin}/missing-page`)).status()).toBe(404)
  })

  test(`${app}: shared feature, base fallback and theme`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', (message) => {
      if (/hydration|Failed to resolve component/i.test(message.text()))
        errors.push(message.text())
    })
    await page.goto(`${origin}${app === 'webapp' ? '/feature' : '/'}`)
    const feature = page.getByTestId('shared-feature')
    await expect(feature).toBeVisible()
    await page.getByRole('button', { name: 'Decline', exact: true }).click()
    await feature.getByLabel('Your name').fill('Alex')
    await feature.getByRole('button', { name: 'Say hello' }).click()
    await expect(feature.getByRole('status')).toHaveText('Hello Alex!')
    const image = feature.getByRole('img')
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
    await expect(feature.getByRole('textbox')).toHaveCSS('border-top-width', '1px')
    if (app === 'singleapp')
      await expect(page.locator('main')).toHaveCSS('font-family', /Niramit/)
    if (app === 'extendedapp') {
      const button = feature.getByRole('button', { name: 'Say hello' })

      await feature.getByRole('heading').hover()
      await expect(button).toHaveCSS('background-color', 'rgb(42, 80, 202)')
      await button.hover()
      await expect(button).toHaveCSS('background-color', 'rgb(35, 59, 133)')
    }
    expect(errors).toEqual([])
  })
}

test('navigation updates metadata and consent controls analytics', async ({ page }) => {
  let scripts = 0
  await page.route('**/www.googletagmanager.com/**', (route) => {
    scripts++
    return route.fulfill({ contentType: 'application/javascript', body: '' })
  })
  await page.goto('http://127.0.0.1:3101/')
  await expect(page.getByRole('button', { name: 'Decline', exact: true })).toBeVisible()
  expect(scripts).toBe(0)
  await page.getByRole('button', { name: 'Decline', exact: true }).click()
  await page.getByRole('link', { name: 'About this app' }).click()
  await expect(page).toHaveTitle('About | Single App')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://singleapp.example.org/about')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', 'The standalone home of our shared welcome experience.')
  await expect.poll(async () => {
    const graph = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!)['@graph']
    return graph.find((node: any) => node['@type'] === 'WebPage')?.url
  }).toBe('https://singleapp.example.org/about')
  expect(scripts).toBe(0)
  await page.getByRole('button', { name: 'Analytics preferences', exact: true }).click()
  await page.getByRole('button', { name: 'Allow analytics', exact: true }).click()
  await expect.poll(() => scripts).toBe(1)
  const pageViews = () => page.evaluate(() => ((window as any).dataLayer || []).filter((event: any) => event[0] === 'event' && event[1] === 'page_view').map((event: any) => event[2]))
  await expect.poll(async () => (await pageViews()).length).toBe(1)
  expect((await pageViews())[0].page_title).toBe('About | Single App')
  await page.getByRole('link', { name: 'Back to the welcome' }).click()
  await expect(page).toHaveTitle('Single App — NuxtMonoStarter')
  await expect.poll(async () => (await pageViews()).length).toBe(2)
  expect((await pageViews())[1].page_title).toBe('Single App — NuxtMonoStarter')
  await page.getByRole('button', { name: 'Analytics preferences', exact: true }).click()
  await page.getByRole('button', { name: 'Decline', exact: true }).click()
  await page.getByRole('link', { name: 'About this app' }).click()
  await expect(page).toHaveTitle('About | Single App')
  expect((await pageViews()).length).toBe(2)
})

test('preview stays non-indexable and analytics is disabled', async ({ page, request }) => {
  await page.goto('http://127.0.0.1:3103/')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  expect(await (await request.get('http://127.0.0.1:3103/robots.txt')).text()).toContain('Disallow: /')
  await expect(page.locator('script[data-gtag]')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Allow analytics' })).toHaveCount(0)
})
