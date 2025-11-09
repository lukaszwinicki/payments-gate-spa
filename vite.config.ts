import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

let vueDevTools: any

if (process.env.NODE_ENV === 'development') {
  try {
    vueDevTools = require('vite-plugin-vue-devtools').default
  } catch {
  }
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    ...(vueDevTools ? [vueDevTools()] : []),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
