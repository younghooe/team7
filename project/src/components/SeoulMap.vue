<!-- src/components/SeoulMap.vue -->
<script setup>
import { useRouter } from 'vue-router'
import districts from '../data/districts.json'

const router = useRouter()

// 자치구 버튼 클릭 시 한글 자치구명으로 이동하도록 합니다.
// encodeURIComponent로 URL 안전하게 인코딩합니다.
const goToDistrict = (d) => {
  // d.name은 예: "강남구"
  const name = encodeURIComponent(d.name)
  router.push(`/district/${name}`)
}
</script>

<template>
  <section class="map-card">
    <div class="map-header">
      <h2>자치구별 추천 관광지</h2>
      <p>원하는 자치구 블럭을 눌러 관광지를 확인하세요.</p>
    </div>

    <div class="district-grid" role="grid" aria-label="서울 자치구 그리드">
      <!-- districts.json의 각 항목을 반복하여 버튼을 렌더링 -->
      <button
        v-for="district in districts"
        :key="district.path"
        class="cell"
        type="button"
        @click="goToDistrict(district)"
        :aria-label="district.name + ' 보기로 이동'"
      >
        {{ district.name }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.map-card {
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 1.2rem;
  box-shadow: 0 10px 28px rgba(120,88,61,0.08);
}
.map-header { margin-bottom: 0.9rem; }
.map-header h2 { margin: 0 0 0.25rem; color: #7b4f2f; }
.map-header p { color: #7d6d5a; font-size: 0.95rem; }

.district-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
}

/* 정사각형 셀 */
.cell {
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff5ee;
  border: 1px solid #edd1ba;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  color: #7b4f2f;
  transition: background-color 150ms ease, transform 120ms ease, box-shadow 120ms;
  user-select: none;
  padding: 0.25rem;
}
.cell:hover {
  background: #ffe8d6;
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(133, 90, 63, 0.08);
}
</style>