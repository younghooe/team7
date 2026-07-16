<script setup>
defineProps({
  attraction: Object,
})
</script>

<template>
  <article class="card">
    <img :src="attraction.image" :alt="attraction.name" />
    <div class="card-body">
      <h3>{{ attraction.name }}</h3>
      <p v-if="attraction.address">{{ attraction.address }}</p>
      <p v-else>{{ attraction.description }}</p>
    </div>
  </article>
</template>

<style scoped>
/* 기존 스타일 유지 (생략 가능) */
</style>