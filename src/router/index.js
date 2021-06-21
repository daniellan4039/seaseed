import {createRouter, createWebHashHistory} from 'vue-router'
import DefaultLayout from "@/views/layout/DefaultLayout";
import EmployeeInfo from "@/views/employee/EmployeeTable";
import EmployeeForm from "@/views/employee/EmployeeForm";
import EmployeeDetail from "@/views/employee/EmployeeDetail";
import LoginForm from "@/views/user/LoginForm";
import store from '@/store/index'

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
            title: '首页',
            key: 'home'
        },
        children: [
            {
                path: '/employee',
                name: 'EmployeeTable',
                component: EmployeeInfo,
                meta: {
                    title: '职工中心',
                    key: 'employee'
                }
            },
            {
                path: '/employee/form',
                name: 'EmployeeForm',
                component: EmployeeForm,
                meta: {
                    title: '职工信息表单',
                    key: 'employee_form'
                }
            },
            {
                path: '/employee/detail',
                name: 'EmployeeDetail',
                component: EmployeeDetail,
                meta: {
                    title: '职工详情',
                    key: 'employee_detail'
                }
            },
        ]
    },
    {
        path: '/dev',
        name: 'Development',
        component: DefaultLayout,
        meta: {
            title: '开发系统',
            key: 'dev'
        },
        children: [
            {
                path: '/login',
                name: 'Login',
                component: LoginForm,
                meta: {
                    title: '登陆表单',
                    key: 'dev_login'
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to) => {
    store.dispatch('setCurrentPath', to)
})

export default router
