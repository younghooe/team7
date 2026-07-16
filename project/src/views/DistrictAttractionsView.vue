<!-- src/views/DistrictAttractionsView.vue -->
<script setup>
/*
  DistrictAttractionsView.vue
  - 현재 URL의 :district 파라미터를 읽어 해당 자치구를 필터합니다.
  - src/data/seoulAttractions.json을 우선 동적 import하고 없으면 public/data/SeoulAttractions.json을 fetch합니다.
  - 필터 기준: 항목의 addr1 또는 '주소' 필드에 자치구명이 포함된 항목만 사용합니다.
  - 카드 클릭 시 상세 페이지로 이동하는 기능을 제거했습니다.
*/

import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router' // useRouter 제거

const route = useRoute()

// URL 파라미터에서 자치구명 가져오기 (디코딩)
const districtParamRaw = route.params.district || route.params.name || ''
const districtName = decodeURIComponent(String(districtParamRaw))

const loading = ref(true)
const error = ref(null)
// 전체 로드된 관광지 데이터 배열
const allAttractions = ref([])

// 데이터 로드: src에 있으면 import, 없으면 public에서 fetch
onMounted(async () => {
  loading.value = true
  try {
    try {
      const mod = await import('../data/seoulAttractions.json')
      const raw = mod.default ?? mod
      allAttractions.value = raw.items ?? raw
    } catch (e) {
      const resp = await fetch('/data/SeoulAttractions.json')
      if (!resp.ok) throw new Error('공공 데이터 파일을 불러오는데 실패했습니다.')
      const raw = await resp.json()
      allAttractions.value = raw.items ?? raw
    }
  } catch (e) {
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
})

// 필터링: addr1 또는 '주소' 필드에 districtName 포함 여부로 필터
const filteredAttractions = computed(() => {
  if (!districtName || !Array.isArray(allAttractions.value)) return []
  const name = districtName.trim()
  return allAttractions.value.filter((item) => {
    const addr = (item.addr1 ?? item['주소'] ?? item.addr ?? '').toString()
    return addr.includes(name)
  })
})

// 상세 페이지 이동 관련 함수 및 router.push 사용 제거
</script>

<template>
  <section class="district-attractions">
    <header class="header">
      <button class="back" @click="$router.back()">← 뒤로</button>

      <div class="title-row">
        <h1 class="page-title">{{ districtName }}의 관광지</h1>
        <span class="count-badge">총 {{ filteredAttractions.length }}곳</span>
      </div>
    </header>

    <div v-if="loading" class="status">로딩 중...</div>
    <div v-else-if="error" class="status error">오류: {{ error }}</div>
    <div v-else>
      <div v-if="filteredAttractions.length === 0" class="no-items">
        등록된 관광지가 없습니다.
      </div>

      <div v-else class="cards">
        <article
          v-for="item in filteredAttractions"
          :key="item.contentid ?? item.title ?? item.id"
          class="card"
          role="button"
          tabindex="0"
        >
          <div class="image-wrap">
            <img v-if="item.firstimage" :src="item.firstimage" :alt="item.title" />
            <div v-else class="no-image">이미지 없음</div>
          </div>

          <div class="meta">
            <h2 class="title">{{ item.title ?? item.name }}</h2>
            <p class="addr">{{ item.addr1 ?? item['주소'] ?? '주소 정보 없음' }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.district-attractions { padding: 1rem; max-width: 1000px; margin: 0 auto; }

/* 헤더: 뒤로가기 버튼과 제목 그룹 정렬 유지 */
.header {
  display:flex;
  align-items:center;
  gap:12px;
  margin-bottom:12px;
}

/* 뒤로가기 버튼 기존 스타일 유지 */
.back { background:none; border:none; cursor:pointer; color:#7b4f2f; font-weight:700; }

.title-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  min-width: 0;
}

/* 제목과 배지 스타일 (기존 요구사항 유지) */
.page-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  line-height: 1;
}
.count-badge {
  background: #FFE8D6;
  color: #7b4f2f;
  padding: 4px 10px;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  margin-top: 2px;
}

.status { color:#666; padding:1rem 0; }
.status.error { color: #c33; }

.no-items { padding:2rem; text-align:center; color:#555; font-weight:600; }

/* 카드 그리드 */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(240px,1fr));
  gap: 14px;
}
.card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  /* cursor 제거: 더 이상 클릭 네비게이션 아님 */
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
  display:flex;
  flex-direction:column;
  transition: transform .12s ease, box-shadow .12s ease;
}
/* hover/focus 비주얼은 유지 */
.card:focus, .card:hover { transform: translateY(-6px); box-shadow: 0 14px 30px rgba(0,0,0,0.08); }

.image-wrap { width:100%; height:160px; display:flex; align-items:center; justify-content:center; background:#fbf6f1; }
.image-wrap img { width:100%; height:100%; object-fit:cover; display:block; }
.no-image { color:#7b4f2f; font-weight:700; }

.meta { padding: 0.8rem 1rem; }
.title { margin:0 0 0.5rem; color:#333; font-size:1.05rem; }
.addr { margin:0; color:#666; font-size:0.95rem; }

@media (max-width: 480px) {
  .page-title { font-size: 1.15rem; white-space: normal; }
  .count-badge { padding: 4px 8px; font-size: 0.9rem; margin-top: 0; }
}
</style>