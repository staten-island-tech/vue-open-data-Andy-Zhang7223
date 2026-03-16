import { createRouter, createWebHistory } from 'vue-router'
import HomeScreen from '@/views/homeScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'home',
    component: HomeScreen,
  }],
})

export default router
