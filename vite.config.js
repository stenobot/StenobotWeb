import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  base: '/',
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  build: {
    rollupOptions: {
      input: {
        main:     resolve(__dirname, 'index.html'),
        blog:     resolve(__dirname, 'blog/index.html'),
        music:    resolve(__dirname, 'music/index.html'),
        apps:     resolve(__dirname, 'apps/index.html'),
        projects: resolve(__dirname, 'projects/index.html'),
      },
    },
  },
})
