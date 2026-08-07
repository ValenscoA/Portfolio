<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/">Note Manager</RouterLink>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>
