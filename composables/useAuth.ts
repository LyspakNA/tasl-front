import { ref } from 'vue'
import { useRouter, useNuxtApp } from '#app'

export const useAuth = () => {
  const user = ref<any>(null)
  const loading = ref(false)
  const error = ref('')

  const router = useRouter()
  const { $fetch } = useNuxtApp()

  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true
    error.value = ''
    try {
      const data = await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials,
        credentials: 'include', // важно для HttpOnly cookie
      })
      user.value = data.user
      router.push('/orders')
    } catch (err: any) {
      error.value = err?.data?.message || 'Ошибка входа'
    } finally {
      loading.value = false
    }
  }

  const register = async (credentials: { email: string; password: string }) => {
    loading.value = true
    error.value = ''
    try {
      const data = await $fetch('/api/auth/register', {
        method: 'POST',
        body: credentials,
        credentials: 'include',
      })
      user.value = data.user
      router.push('/orders')
    } catch (err: any) {
      error.value = err?.data?.message || 'Ошибка регистрации'
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
      user.value = null
      router.push('/login')
    } catch {}
  }

  const refresh = async () => {
  try {
    const { data } = await $fetch('/api/auth/refresh', {
      credentials: 'include', // обязательно, чтобы cookie уходило
    })
    user.value = data.user
    return data.user
  } catch {
    user.value = null
    throw new Error('Не авторизован')
  }
}

  return { user, loading, error, login, register, logout, refresh }
}
