import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main:     resolve(__dirname, 'index.html'),
        music:    resolve(__dirname, 'music.html'),
        apps:     resolve(__dirname, 'apps.html'),
        projects: resolve(__dirname, 'projects.html'),
      },
    },
  },
})
