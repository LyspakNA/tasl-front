<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { definePageMeta } from 'nuxt/dist/pages/runtime'
const auth = useAuthStore()
// pages/profile.vue
definePageMeta({
  requiresAuth: true
})

</script>


<template>
  <v-container>
    <h1>Добро пожаловать, {{ auth.user?.email }}</h1>
    <v-btn color="primary" class="mt-4" :to="'/dashboard/orders'">Перейти к заказам</v-btn>
  </v-container>
</template>
