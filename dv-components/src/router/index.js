import SelectDemo from '../views/SelectDemo'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/selectDemo',
    name: 'SelectDemo',
    component: SelectDemo,
    meta: {
      title: '选择器',
      key: 'SelectDemo',
      visible: true,
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router