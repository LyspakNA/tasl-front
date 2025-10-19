<template>
  <div>
    <h1>Home</h1>
    <div v-if="!user">
      <NuxtLink to="/login">Login / Register</NuxtLink>
    </div>
    <div v-else>
      <p>Welcome, {{ user.username }}</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, logout, refresh } = useAuth();
onMounted(refresh);
</script>
