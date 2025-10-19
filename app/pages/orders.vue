<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from '#app'

const { user, refresh, logout } = useAuth()
const orders = ref<any[]>([])
const loading = ref(true)
const error = ref('')
const router = useRouter()

// Пример данных заказов — можно заменить fetch к backend
const fetchOrders = async () => {
  try {
    loading.value = true
    // Проверка авторизации через refresh
    await refresh()

    // Здесь реально нужно делать fetch к orders API
    orders.value = [
      { id: 1, item: 'Товар 1', amount: 100 },
      { id: 2, item: 'Товар 2', amount: 200 },
    ]
  } catch (err: any) {
    error.value = err?.data?.message || 'Не удалось загрузить заказы'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOrders()
})

const handleLogout = async () => {
  await logout()
}
</script>

<template>
  <v-container>
    <v-row justify="space-between" class="mb-4">
      <v-col cols="auto">
        <h2>Заказы</h2>
        <p v-if="user">Привет, {{ user.email }}</p>
      </v-col>
      <v-col cols="auto">
        <v-btn color="error" @click="handleLogout">Выйти</v-btn>
      </v-col>
    </v-row>

    <v-alert type="error" v-if="error">{{ error }}</v-alert>
    <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>

    <v-row v-if="!loading">
      <v-col v-for="order in orders" :key="order.id" cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>Заказ #{{ order.id }}</v-card-title>
          <v-card-text>
            {{ order.item }} — {{ order.amount }} ₽
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
