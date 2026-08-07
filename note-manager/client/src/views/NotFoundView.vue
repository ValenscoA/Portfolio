<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="page-card">
    <p class="eyebrow">404</p>
    <h1>Page not found</h1>
    <p>The page you requested does not exist.</p>
    <RouterLink class="text-link" to="/">Return to notes</RouterLink>
  </section>
</template>
