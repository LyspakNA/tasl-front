<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useNuxtApp } from '#app'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const { $api } = useNuxtApp()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const register = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Пароли не совпадают'
    return
  }

  try {
    const res = await $api.post('/auth/register', {
      email: email.value,
      password: password.value
    })
    auth.login(res.data.token, res.data.user)
    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Ошибка регистрации'
  }
}
</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card max-width="400">
      <v-card-title>Регистрация</v-card-title>
      <v-card-text>
        <v-text-field label="Email" v-model="email" />
        <v-text-field label="Пароль" type="password" v-model="password" />
        <v-text-field label="Повторите пароль" type="password" v-model="confirmPassword" />
        <v-btn color="primary" class="mt-4" @click="register">Зарегистрироваться</v-btn>
        <p class="red--text mt-2" v-if="error">{{ error }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>
