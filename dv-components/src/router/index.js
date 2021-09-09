import SelectDemo from '../views/SelectDemo'
import { createRouter, createWebHashHistory } from 'vue-router'
import FormDemo from '@/views/formDemo/FormDemo'

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
  },
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
