import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/typing-test',
      name: 'typing-test',
      component: () => import('../views/TypingTestView.vue'),
    },
  ],
})

export default router
