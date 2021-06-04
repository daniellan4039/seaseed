import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/layout/DefaultLayout')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
