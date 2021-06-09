import { createRouter, createWebHashHistory } from 'vue-router'
import EmployeeInfo from "@/views/employee/EmployeeInfo";
import EmployeeFamily from "@/views/employee/EmployeeFamily";

/**
 * 因为要是用keep-alive，因此要缓存的组件不能使用函数式引入，应该使用import直接导入
 *
 * @type {[{path: string, component: (function(): Promise<*>), name: string}]}
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/layout/DefaultLayout'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/employee/info',
        name: 'EmployeeCenter',
        component: EmployeeInfo,
        meta: {
          title: '职工中心'
        }
      },
      {
        path: '/employee/family',
        name: 'EmployeeFamily',
        component: EmployeeFamily,
        meta: {
          title: '职工家庭'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
