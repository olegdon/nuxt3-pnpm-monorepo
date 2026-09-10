import { expect, test } from '@playwright/test'

for (const [index, app] of ['webapp', 'singleapp', 'extendedapp'].entries()) {
  const origin = `http://127.0.0.1:${3100 + index}`
  for (const width of [375, 1440]) {
    test(`${app}: identity and navigation at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto(origin)
      await expect(page.locator(`[data-app="${app}"]`)).toBeVisible()
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
      await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Overview', exact: true })).toHaveAttribute('aria-current', 'page')
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      await page.keyboard.press('Tab')
      await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(page.locator('#main-content')).toBeFocused()
      await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
      await expect(page.locator('html')).toHaveClass(/dark/)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    })
  }
}

test('extended-only route compares overrides and inherits the core feature', async ({ page, request }) => {
  expect((await request.get('http://127.0.0.1:3100/overrides')).status()).toBe(404)
  expect((await request.get('http://127.0.0.1:3101/overrides')).status()).toBe(404)
  await page.goto('http://127.0.0.1:3102/overrides')
  await page.getByRole('button', { name: 'Decline', exact: true }).click()
  const base = page.getByRole('button', { name: 'Try base button' })
  const extended = page.getByRole('button', { name: 'Try extended button' })
  await base.click()
  await extended.click()
  await expect(page.getByRole('status').filter({ hasText: 'Base clicks: 1' })).toBeVisible()
  await expect(page.getByRole('status').filter({ hasText: 'Extended clicks: 1' })).toBeVisible()
  await page.getByRole('heading', { level: 1 }).hover()
  expect(await base.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(await extended.evaluate(el => getComputedStyle(el).backgroundColor))
  await page.getByRole('link', { name: 'See the inherited feature' }).click()
  await expect(page).toHaveURL('http://127.0.0.1:3102/feature')
  await expect(page.getByTestId('shared-feature')).toBeVisible()
  await expect(page.locator('[data-app="extendedapp"]')).toBeVisible()
  await page.getByLabel('Your name').fill('Sam')
  await page.getByRole('button', { name: 'Say hello' }).click()
  await expect(page.getByTestId('shared-feature').getByRole('status')).toHaveText('Hello Sam!')
})
