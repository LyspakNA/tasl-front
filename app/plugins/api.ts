// plugins/api.ts
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: 'http://localhost:3000/api', // адрес backend
    headers: { 'Content-Type': 'application/json' }
  })

  // Добавляем токен для авторизованных запросов
  api.interceptors.request.use((config) => {
    const auth = useAuthStore()
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
  })

  return { provide: { api } }
})
