import { createRouter, createWebHashHistory } from 'vue-router'
import EmployeeInfo from "@/views/employee/EmployeeInfo";
import EmployeeForm from "@/views/employee/EmployeeForm";

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
        path: '/employee/table',
        name: 'EmployeeTable',
        component: EmployeeInfo,
        meta: {
          title: '职工中心'
        }
      },
      {
        path: '/employee/form',
        name: 'EmployeeForm',
        component: EmployeeForm,
        meta: {
          title: '职工信息表单'
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
