import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as { id: number; email: string } | null
  }),
  actions: {
    login(token: string, user: any) {
      this.token = token
      this.user = user
    },
    logout() {
      this.token = null
      this.user = null
    },
    isAuthenticated() {
      return !!this.token
    }
  }
})
