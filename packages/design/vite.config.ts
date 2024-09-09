import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { defineConfig } from 'vite'
import fontLoader from './utils/fontLoader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueMacros(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
      dirs: [
        './stubs',
        './stores',
        './composables',
        '../services/composables',
        '../services/utils',
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
    fontLoader.fontVitePlugin,
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
})
