import { createRouter, createWebHistory } from 'vue-router'
import HomeScreen from '@/views/homeScreen.vue'
import BoroughData from '@/views/boroughData.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeScreen,
    },
    {
      path: '/link/:Borough',
      name: 'testing',
      component: BoroughData,
    },
  ],
})

export default router
