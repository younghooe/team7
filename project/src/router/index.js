// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// 새로 생성할 뷰를 가져옵니다.
import DistrictAttractionsView from '../views/DistrictAttractionsView.vue'
import CommunityView from '../views/CommunityView.vue'

// 라우트 설정: /district/:district 로 들어오는 요청을 새 뷰로 연결합니다.
// URL 예: /district/강남구
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/district/:district', name: 'districtAttractions', component: DistrictAttractionsView },
  { path: '/community', name: 'community', component: CommunityView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router