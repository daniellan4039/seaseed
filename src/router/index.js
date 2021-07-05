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
import Family from "@/views/family/Family";
import FamilyForm from "@/views/family/FamilyForm";
import FamilyDetail from "@/views/family/FamilyDetail";
import Resume from "@/views/resume/Resume";
import ResumeForm from "@/views/resume/ResumeForm";
import ResumeDetail from "@/views/resume/ResumeDetail";
import Archive from "@/views/archive/Archive";
import ArchiveForm from "@/views/archive/ArchiveForm";
import ArchiveDetail from "@/views/archive/ArchiveDetail";
import Reward from "@/views/reward/Reward";
import RewardForm from "@/views/reward/RewardForm";
import RewardDetail from "@/views/reward/RewardDetail";
import ArchiveBorrow from "@/views/archiveBorrow/ArchiveBorrow";
import ArchiveBorrowDetail from "@/views/archiveBorrow/ArchiveBorrowDetail";
import ArchiveRoom from "@/views/archiveRoom/ArchiveRoom";
import ArchiveRoomDetail from "@/views/archiveRoom/ArchiveRoomDetail";

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
            title: '职工信息查询',
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
            },
            {
                path: '/family',
                name: 'Family',
                component: Family,
                meta: {
                    title: '职工家人',
                    key: 'family'
                }
            },
            {
                path: '/family/form',
                name: 'FamilyForm',
                component: FamilyForm,
                meta: {
                    title: '职工家人',
                    key: 'family_form',
                    visible: false
                }
            },
            {
                path: '/family/detail',
                name: 'FamilyDetail',
                component: FamilyDetail,
                meta: {
                    title: '职工家人详情',
                    key: 'family_detail',
                    visible: false
                }
            },
            {
                path: '/resume',
                name: 'Resume',
                component: Resume,
                meta: {
                    title: '职工履历',
                    key: 'resume'
                }
            },
            {
                path: '/resume/form',
                name: 'ResumeForm',
                component: ResumeForm,
                meta: {
                    title: '职工履历',
                    key: 'resume_form',
                    visible: false
                }
            },
            {
                path: '/resume/detail',
                name: 'ResumeDetail',
                component: ResumeDetail,
                meta: {
                    title: '职工履历',
                    key: 'resume_detail',
                    visible: false
                }
            },
            {
                path: '/archive',
                name: 'Archive',
                component: Archive,
                meta: {
                    title: '职工档案',
                    key: 'archive'
                }
            },
            {
                path: '/archive/form',
                name: 'ArchiveForm',
                component: ArchiveForm,
                meta: {
                    title: '职工档案表单',
                    key: 'archive_form',
                    visible: false
                }
            },
            {
                path: '/archive/detail',
                name: 'ArchiveDetail',
                component: ArchiveDetail,
                meta: {
                    title: '职工档案详情',
                    key: 'archive_detail',
                    visible: false
                }
            },
            {
                path: '/reward',
                name: 'Reward',
                component: Reward,
                meta: {
                    title: '奖惩信息',
                    key: 'reward'
                }
            },
            {
                path: '/reward/form',
                name: 'RewardForm',
                component: RewardForm,
                meta: {
                    title: '奖惩信息表单',
                    key: 'reward_form',
                    visible: false
                }
            },
            {
                path: '/reward/detail',
                name: 'RewardDetail',
                component: RewardDetail,
                meta: {
                    title: '奖惩详情',
                    key: 'reward_detail',
                    visible: false
                }
            },
            {
              path: '/archiveBorrow',
              name: 'ArchiveBorrow',
              component: ArchiveBorrow,
              meta: {
                title: '档案借阅',
                key: 'archive_borrow'
              }
            },
            {
              path: '/archiveBorrow/detail',
              name: 'ArchiveBorrowDetail',
              component: ArchiveBorrowDetail,
              meta: {
                title: '档案借阅详情',
                key: 'archive_borrow_detail',
                  visible: false
              }
            },
            {
              path: '/archiveRoom',
              name: 'ArchiveRoom',
              component: ArchiveRoom,
              meta: {
                title: '档案室',
                key: 'archive_room',
              }
            },
            {
              path: '/archiveRoom/detail',
              name: 'ArchiveRoomDetail',
              component: ArchiveRoomDetail,
              meta: {
                title: '档案室详情',
                key: 'archiveRoomDetail',
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
