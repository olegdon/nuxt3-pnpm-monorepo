import { spawn } from 'node:child_process'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { preview } from 'vite'

const server = await preview({
  configFile: false,
  root: fileURLToPath(new URL('..', import.meta.url)),
  build: { outDir: 'storybook-static' },
  preview: { host: '127.0.0.1', port: 6107, strictPort: true },
})
const origin = 'http://127.0.0.1:6107'
let browser
try {
  const runner = fileURLToPath(new URL('./test-storybook.js', import.meta.resolve('@storybook/test-runner')))
  const code = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [runner, '--index-json', '--url', origin, '--maxWorkers=2'], { stdio: 'inherit' })
    child.once('error', reject)
    child.once('exit', code => resolve(code ?? 1))
  })
  if (code !== 0)
    throw new Error(`Storybook interaction tests exited with ${code}`)

  browser = await chromium.launch()
  const page = await browser.newPage()
  const failures = []
  page.on('pageerror', error => failures.push(error.message))
  page.on('console', (message) => {
    if (/Failed to resolve component|not defined on instance|Not found .* in .* locale/i.test(message.text()))
      failures.push(message.text())
  })
  const index = await (await fetch(`${origin}/index.json`)).json()
  const stories = Object.values(index.entries).filter(entry => entry.type === 'story')
  for (const story of stories) {
    failures.length = 0
    await page.goto(`${origin}/iframe.html?id=${story.id}&viewMode=story`)
    await page.locator('.sb-preview').waitFor()
    await page.waitForFunction(() => Array.from(document.querySelectorAll('#storybook-root img')).every(image => image.complete && image.naturalWidth > 0))
    if (failures.length)
      throw new Error(`${story.id}: ${failures.join('\n')}`)
  }
  await page.goto(`${origin}/?path=/story/patterns-shared-feature--playground`)
  await page.frameLocator('#storybook-preview-iframe').getByRole('heading', { name: 'A shared welcome' }).waitFor()
  await page.getByRole('button', { name: 'Consumer theme for shared components Core webapp', exact: true }).click()
  await page.getByText('Extended app', { exact: true }).click()
  const frame = page.frames().find(frame => frame.url().includes('/iframe.html'))
  if (!frame)
    throw new Error('Missing Storybook preview frame')
  await frame.waitForFunction(() => document.querySelector('[data-testid="shared-feature"] button')?.classList.contains('ui-button-extended'))
  await frame.getByText('Shared behavior, with the extended app’s button override.').waitFor()
  await page.getByRole('button', { name: 'Color mode Light', exact: true }).click()
  await page.getByText('Dark', { exact: true }).click()
  await frame.waitForFunction(() => getComputedStyle(document.querySelector('.sb-preview')).backgroundColor === 'rgb(14, 23, 19)')
  console.log(`Verified rendering and images in ${stories.length} stories, plus live app/theme switching.`)
}
finally {
  await browser?.close()
  await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve()))
}
