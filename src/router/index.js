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
import ArchiveTransfer from "@/views/archiveTransfer/ArchiveTransfer";
import ArchiveTransferForm from "@/views/archiveTransfer/ArchiveTransferForm";
import ArchiveTransferDetail from "@/views/archiveTransfer/ArchiveTransferDetail";
import Contract from "@/views/contract/Contract";
import ContractForm from "@/views/contract/ContractForm";
import ContractDetail from "@/views/contract/ContractDetail";
import Education from "@/views/education/education";
import EducationForm from "@/views/education/educationForm"
import EducationDetail from "@/views/education/educationDetail"
import Language from "@/views/language/Language";
import LanguageForm from "@/views/language/LanguageForm";
import LanguageDetail from "@/views/language/LanguageDetail";
import Patent from "@/views/patent/Patent";
import PatentForm from "@/views/patent/PatentForm";
import PatentDetail from "@/views/patent/PatentDetail";
import Position from "@/views/position/Position";
import PositionForm from "@/views/position/PositionForm";
import PositionDetail from "@/views/position/PositionDetail";
import Soldier from "@/views/soldier/Soldier";
import SoldierForm from "@/views/soldier/SoldierForm";
import SoldierDetail from "@/views/soldier/SoldierDetail";

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
            },
            {
              path: '/archiveTransfer',
              name: 'ArchiveTransfer',
              component: ArchiveTransfer,
              meta: {
                title: '档案转移',
                key: 'archiveTransfer',
                visible: true
              }
            },
            {
              path: '/archiveTransfer/form',
              name: 'ArchiveTransferForm',
              component: ArchiveTransferForm,
              meta: {
                title: '档案转移表单',
                key: 'archiveTransferForm',
                visible: false
              }
            },
            {
                path: '/archiveTransfer/detail',
                name: 'ArchiveTransferDetail',
                component: ArchiveTransferDetail,
                meta: {
                    title: '档案转移详情',
                    key: 'archiveTransferDetail',
                    visible: false
                }
            },
            {
              path: '/contract',
              name: 'Contract',
              component: Contract,
              meta: {
                title: '合同',
                key: 'contract',
                visible: true
              }
            },
            {
              path: '/contract/form',
              name: 'ContractForm',
              component: ContractForm,
              meta: {
                title: '合同表单',
                key: 'contract_form',
                visible: false
              }
            },
            {
              path: '/contract/detail',
              name: 'ContractDetail',
              component: ContractDetail,
              meta: {
                title: '合同详情',
                key: 'contract_detail',
                visible: false
              }
            },
            {
                path: '/education',
                name: 'Education',
                component: Education,
                meta: {
                    title: '教育',
                    key: 'education',
                    visible: true
                }
            },
            {
                path: '/education/form',
                name: 'ContractForm',
                component: EducationForm,
                meta: {
                    title: '教育表单',
                    key: 'education_form',
                    visible: false
                }
            },
            {
                path: '/education/detail',
                name: 'EducationDetail',
                component: EducationDetail,
                meta: {
                    title: '教育详情',
                    key: 'education_detail',
                    visible: false
                }
            },
            {
              path: '/language',
              name: 'Language',
              component: Language,
              meta: {
                title: '语言',
                key: 'language',
                visible: true
              }
            },
            {
              path: '/language/form',
              name: 'LanguageForm',
              component: LanguageForm,
              meta: {
                title: '职工语言',
                key: 'languageForm',
                visible: false
              }
            },
            {
              path: '/language/detail',
              name: 'LanguageDetail',
              component: LanguageDetail,
              meta: {
                title: '语言详情',
                key: 'language_detail',
                visible: false
              }
            },
            {
              path: '/patent',
              name: 'Patent',
              component: Patent,
              meta: {
                title: '专利',
                key: 'patent',
                visible: true
              }
            },
            {
              path: '/patent/form',
              name: 'PatentForm',
              component: PatentForm,
              meta: {
                title: '专利表单',
                key: 'patent_form',
                visible: false
              }
            },
            {
              path: '/patent/detail',
              name: 'PatentDetail',
              component: PatentDetail,
              meta: {
                title: '专利详细',
                key: 'patent_detail',
                visible: false
              }
            },
            {
              path: '/position',
              name: 'Position',
              component: Position,
              meta: {
                title: '职位',
                key: 'position',
                visible: true
              }
            },
            {
              path: '/position/form',
              name: 'PositionForm',
              component: PositionForm,
              meta: {
                title: '职位表单',
                key: 'position_form',
                visible: false
              }
            },
            {
              path: '/position/detail',
              name: 'PositionDetail',
              component: PositionDetail,
              meta: {
                title: '职位详情',
                key: 'position_detail',
                visible: false
              }
            },
            {
              path: '/soldier',
              name: 'Soldier',
              component: Soldier,
              meta: {
                title: '复转军人',
                key: 'soldier',
                visible: true
              }
            },
            {
              path: '/soldier/form',
              name: 'SoldierForm',
              component: SoldierForm,
              meta: {
                title: '复转军人表单',
                key: 'soldier_form',
                visible: false
              }
            },
            {
              path: '/Soldier/detail',
              name: 'SoldierDetail',
              component: SoldierDetail,
              meta: {
                title: '复转军人详细',
                key: 'Soldier_detail',
                visible: false
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
