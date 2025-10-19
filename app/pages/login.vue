<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login } = useAuth()  // composable

const email = ref('')
const password = ref('')
const error = ref('')

const doLogin = async () => {
  error.value = ''
  try {
    const res = await login({ email: email.value, password: password.value })
    await nextTick()
    // После login токен уже в HttpOnly cookie, user — в composable
    router.push('/orders')
  } catch (err: any) {
    error.value = err?.data?.message || 'Ошибка входа'
  }
}
</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card max-width="400">
      <v-card-title>Вход</v-card-title>
      <v-card-text>
        <v-text-field label="Email" v-model="email" />
        <v-text-field label="Пароль" type="password" v-model="password" />
        <v-btn color="primary" class="mt-4" @click="doLogin">Войти</v-btn>
        <p class="red--text mt-2" v-if="error">{{ error }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>
