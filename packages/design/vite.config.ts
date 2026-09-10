import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const { default: tailwindcss } = await import('@tailwindcss/vite')

  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core', 'pinia', 'vue-i18n'],
        dirs: [
          './stubs',
          './composables',
        ],
        vueTemplate: true,
      }),
      Components({
        dirs: ['./components'],
        extensions: ['vue', 'ts'],
        include: [/\.vue$/, /\.vue\?vue/, /\.stories\.ts$/],
        dts: true,
        directoryAsNamespace: true,
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
  }
})
