<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-toolbar-title>TASL Logistics</v-toolbar-title>
      <v-spacer />
      <v-btn text @click="$pinia.state.value.auth.logout()">Выйти</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
// layouts/default.vue
const auth = useAuth()
onMounted(async () => {
  await auth.login({}) // пустой запрос на `/api/auth/refresh` для проверки cookie
})

</script>