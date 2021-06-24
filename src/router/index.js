import {createRouter, createWebHashHistory} from 'vue-router'
import store from '@/store/index'
import DefaultLayout from "@/views/layout/DefaultLayout";
import EmployeeInfo from "@/views/employee/EmployeeTable";
import EmployeeForm from "@/views/employee/EmployeeForm";
import EmployeeDetail from "@/views/employee/EmployeeDetail";
import LoginForm from "@/views/user/LoginForm";
import CertificationTable from '@/views/certification/certificationTable'
import CertificationDetail from '@/views/certification/certificationDetail'
import CertificationForm from '@/views/certification/certificationForm'
import ProfessionalTable from "@/views/professional/ProfessionalTable";
import ProfessionalForm from "@/views/professional/ProfessionalForm";
import ProfessionalDetail from "@/views/professional/ProfessionalDetail";

/**
 * 因为要是用keep-alive，因此要缓存的组件不能使用函数式引入，应该使用import直接导入
 *
 * @type {[{path: string, component: (function(): Promise<*>), name: string}]}
 */
export const routes = [
    {
        path: '/',
        name: 'Home',
        component: DefaultLayout,
        meta: {
            title: '首页',
            key: 'home',
            type: 'subMenu'
        },
        children: [
            {
                path: '/employee',
                name: 'EmployeeTable',
                component: EmployeeInfo,
                meta: {
                    title: '职工信息',
                    key: 'employee'
                }
            },
            {
                path: '/employee/form',
                name: 'EmployeeForm',
                component: EmployeeForm,
                meta: {
                    title: '职工信息表单',
                    key: 'employee_form',
                    visible: false
                }
            },
            {
                path: '/employee/detail',
                name: 'EmployeeDetail',
                component: EmployeeDetail,
                meta: {
                    title: '职工详情',
                    key: 'employee_detail',
                    visible: false
                }
            },
            {
                path: '/certification',
                name: 'Certification',
                component: CertificationTable,
                meta: {
                    title: '职工证书',
                    key: 'certification'
                }
            },
            {
                path: '/certification/form',
                name: 'CertificationForm',
                component: CertificationForm,
                meta: {
                    title: '职工证书表单',
                    key: 'certification_form',
                    visible: false
                }
            },
            {
                path: '/certification/detail',
                name: 'CertificationDetail',
                component: CertificationDetail,
                meta: {
                    title: '职工证书详情',
                    key: 'certification_detail',
                    visible: false
                }
            },
            {
                path: '/professional',
                name: 'Professional',
                component: ProfessionalTable,
                meta: {
                    title: '职工职称',
                    key: 'professional'
                }
            },
            {
                path: '/professional/form',
                name: 'ProfessionalForm',
                component: ProfessionalForm,
                meta: {
                    title: '职工职称表单',
                    key: 'professional_form',
                    visible: false
                }
            },
            {
                path: '/professional/detail',
                name: 'ProfessionalDetail',
                component: ProfessionalDetail,
                meta: {
                    title: '职称详情',
                    key: 'professional_detail',
                    visible: false
                }
            }
        ]
    },
    {
        path: '/dev',
        name: 'Development',
        component: DefaultLayout,
        meta: {
            title: '开发系统',
            key: 'dev',
            visible: false,
            type: 'subMenu'
        },
        children: [
            {
                path: '/dev/login',
                name: 'Login',
                component: LoginForm,
                meta: {
                    title: '登陆表单',
                    key: 'dev_login',
                    visible: false
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
