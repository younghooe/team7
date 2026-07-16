<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <RouterView />
  </div>
</template>

<style scoped>
.app-shell {
  max-width: 1120px;
  margin: 0 auto;
  padding: 1.2rem;
}
</style>
