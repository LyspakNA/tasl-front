<template>
  <nav class="flex justify-between items-center bg-gray-100 p-4 shadow">
    <NuxtLink to="/" class="font-bold text-xl">TASL</NuxtLink>
    <div class="space-x-4">
      <template v-if="auth.token">
        <NuxtLink to="/orders" class="hover:underline">Мои заказы</NuxtLink>
        <button @click="logout" class="text-red-500 hover:underline">Выйти</button>
      </template>
      <template v-else>
        <NuxtLink to="/login" class="hover:underline">Войти</NuxtLink>
        <NuxtLink to="/register" class="hover:underline">Регистрация</NuxtLink>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
const auth = useAuthStore()
function logout() {
  auth.logout()
  navigateTo('/login')
}
</script>
