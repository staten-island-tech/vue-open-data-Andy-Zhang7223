import { createRouter, createWebHistory } from 'vue-router'
import HomeScreen from '@/views/homeScreen.vue'
import ApiData from '@/views/apiData.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'home',
    component: HomeScreen,
  },
  {
    path: '/test/:id',
    name: 'testing',
    component: ApiData,
  }
],
})

export default router
