import { createRouter, createWebHashHistory } from 'vue-router'
import FormDemo from '@/views/formDemo/FormDemo'

const routes = [
  {
    path: '/formDemo',
    name: 'FormDemo',
    component: FormDemo,
    meta: {
      title: 'Form表单'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
