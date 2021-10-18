import { createRouter, createWebHashHistory } from 'vue-router'
import createDesk from '@/router/createDesk/route'

const routes = [...createDesk]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
