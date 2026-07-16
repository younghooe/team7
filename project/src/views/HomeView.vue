<script setup>
import SeoulMap from '../components/SeoulMap.vue'
import BoardList from '../components/BoardList.vue'
import FloatingChatButton from '../components/FloatingChatButton.vue'
</script>

<template>
  <main class="home-page">
    <header class="hero">
      <div class="hero-text">
        <p class="eyebrow">서울 관광지 리뷰 커뮤니티</p>
        <h1>따뜻한 감성으로 채우는 서울 여행</h1>
        <p class="subtitle">감성 있는 카페, 풍경, 전통 명소까지 한눈에 만나보세요.</p>
      </div>
    </header>

    <SeoulMap />
    <BoardList />
    <FloatingChatButton />
  </main>
</template>

<style scoped>
.home-page {
  display: grid;
  gap: 1.3rem;
}
.hero {
  background: linear-gradient(135deg, #fff6eb, #f7dfcf);
  border-radius: 28px;
  padding: 2rem;
  box-shadow: 0 15px 40px rgba(160, 112, 72, 0.14);
}
.hero-text h1 { margin: 0.3rem 0 0.7rem; font-size: clamp(1.8rem, 3vw, 2.6rem); color: #7b4f2f; }
.eyebrow { letter-spacing: 0.2rem; text-transform: uppercase; color: #a36a43; font-weight: 700; }
.subtitle { color: #755b49; font-size: 1rem; }
</style>
