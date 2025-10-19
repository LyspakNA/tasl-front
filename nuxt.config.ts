import { defineNuxtConfig } from 'nuxt/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2025-10-18',
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  build: { transpile: ['vuetify'] },
  modules: ['@pinia/nuxt'],
  devtools: { enabled: true },
  vite: {
    plugins: [tsconfigPaths()],
    resolve: {
      alias: {
        '@': resolve('.'),
        '~': resolve('.'),
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBase: '/api' // путь для fetch-запросов
    }
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:4000', // адрес твоего NestJS
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
})
