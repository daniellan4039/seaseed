import { createRouter, createWebHashHistory } from 'vue-router'
import DefaultLayout from "@/views/layout/DefaultLayout";
import EmployeeInfo from "@/views/employee/EmployeeInfo";
import EmployeeForm from "@/views/employee/EmployeeForm";
import LoginForm from "@/views/user/LoginForm";

/**
 * 因为要是用keep-alive，因此要缓存的组件不能使用函数式引入，应该使用import直接导入
 *
 * @type {[{path: string, component: (function(): Promise<*>), name: string}]}
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/employee',
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
  },
  {
    path: '/dev',
    name: 'Development',
    component: DefaultLayout,
    meta: {
      title: '开发系统'
    },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: LoginForm,
        meta: {
          title: '登陆表单'
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
