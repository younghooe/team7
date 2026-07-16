<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TouristCard from '../components/TouristCard.vue'
import { getAttractionsByDistrict } from '../services/attractionService'

const route = useRoute()

const districtName = computed(() => {
  const map = {
    gangnam: '강남구',
    gangdong: '강동구',
    gangbuk: '강북구',
    gangseo: '강서구',
    gwanak: '관악구',
    gwangjin: '광진구',
    guro: '구로구',
    geumcheon: '금천구',
    nowon: '노원구',
    dobong: '도봉구',
    dongdaemun: '동대문구',
    dongjak: '동작구',
    mapo: '마포구',
    seodaemun: '서대문구',
    seocho: '서초구',
    seongdong: '성동구',
    seongbuk: '성북구',
    songpa: '송파구',
    yangcheon: '양천구',
    yeongdeungpo: '영등포구',
    yongsan: '용산구',
    eupyeong: '은평구',
    jongno: '종로구',
    junggu: '중구',
    jungnang: '중랑구',
  }

  return map[route.params.name] || route.params.name
})

const attractions = computed(() => getAttractionsByDistrict(districtName.value))
</script>

<template>
  <section class="district-page">
    <router-link to="/" class="back-link">← 홈으로 돌아가기</router-link>
    <header class="district-header">
      <h1>{{ districtName }}</h1>
      <p>이 지역의 따뜻한 여행 포인트를 만나보세요.</p>
    </header>

    <div v-if="attractions.length" class="card-grid">
      <TouristCard v-for="attraction in attractions" :key="attraction.id" :attraction="attraction" />
    </div>
    <p v-else>아직 등록된 관광지가 없습니다.</p>
  </section>
</template>

<style scoped>
.district-page { display: grid; gap: 1.2rem; }
.back-link { color: #7e3f26; text-decoration: none; font-weight: 600; }
.district-header { background: linear-gradient(135deg, #fff7ec, #f4e0d2); border-radius: 24px; padding: 1.2rem; }
.district-header h1 { margin: 0 0 0.4rem; color: #7b4f2f; }
.card-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
@media (max-width: 768px) { .card-grid { grid-template-columns: 1fr; } }
</style>
