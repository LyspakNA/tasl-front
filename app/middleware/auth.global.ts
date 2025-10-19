import { defineNuxtRouteMiddleware, navigateTo, useNuxtApp } from '#app'

export default defineNuxtRouteMiddleware(async (to) => {
  const publicPages = ['/login', '/register']
  if (publicPages.includes(to.path)) return

  try {
    await $fetch('/api/auth/refresh', { credentials: 'include' })
  } catch {
    return navigateTo('/login')
  }
})
