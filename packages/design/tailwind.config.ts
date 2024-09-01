import type { Config } from 'tailwindcss'
import containerPlugin from '@tailwindcss/container-queries'
import webappConfig from './configs/tailwind.webapp.config'
import singleappConfig from './configs/tailwind.singleapp.config'
import extendedappConfig from './configs/tailwind.extendedapp.config'

// we have to use ./ here since this config file is loaded from outside the project

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.vue',
    './stories/**/*.mdx',
    './docs/**/*.vue',
    './index.css',
  ],
  darkMode: 'class',
  presets: [webappConfig, singleappConfig, extendedappConfig],
  plugins: [
    containerPlugin,
  ],
} satisfies Config
