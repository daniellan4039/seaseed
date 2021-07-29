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
import ContractForm from '@/views/contract/ContractForm'
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
import Thesis from "@/views/thesis/Thesis";
import ThesisForm from "@/views/thesis/ThesisForm";
import ThesisDetail from "@/views/thesis/ThesisDetail";
import Train from "@/views/train/Train";
import TrainForm from "@/views/train/TrainForm";
import TrainDetail from "@/views/train/TrainDetail";
import DistributeTable from "@/views/distribute/DistributeTable";
import DistributeForm from "@/views/distribute/DistributeForm";
import DistributeDetail from "@/views/distribute/DistributeDetail";
import Dictionary from "@/views/dictionary/Dictionary";
import DictionaryForm from "@/views/dictionary/DictionaryForm";
import DictionaryDetail from "@/views/dictionary/DictionaryDetail";
import AcademicTable from "@/views/academic/AcademicTable";
import AcademicForm from "@/views/academic/AcademicForm";
import AcademicDetail from "@/views/academic/AcademicDetail";
import ArchiveRoomForm from "@/views/archiveRoom/ArchiveRoomForm";
import EmployeeBatchImport from "@/views/employee/EmployeeBatchImport";
import TransferRecordTable from "@/views/transferRecord/TransferRecordTable";
import TransferRecordForm from "@/views/transferRecord/TransferRecordForm";
import TransferRecordDetail from "@/views/transferRecord/TransferRecordDetail";
import EmployeeAddForm from "@/views/employee/EmployeeAddForm";
import Home from "@/views/home/Home";
import MenuSetting from "@/views/home/MenuSetting";
import Statistic from "@/views/statistic/Statistic";
import {authorite} from "@/funcLib/authorite";
import {Modal} from "ant-design-vue";
import ArchiveBorrowForm from "@/views/archiveBorrow/ArchiveBorrowForm";
import BaseLogTable from "@/views/baseLog/BaseLogTable";
import BaseLogDetail from "@/views/baseLog/BaseLogDetail";

/**
 * 因为要是用keep-alive，因此要缓存的组件不能使用函数式引入，应该使用import直接导入
 *
 * @type {[{path: string, component: (function(): Promise<*>), name: string}]}
 */

export const routes = [
    {
        path: '/',
        component: DefaultLayout,
        meta: {
            auth: false,
            title: '职工信息查询',
            key: 'home',
            type: 'subMenu'
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                component: Home,
                meta: {
                    auth: false,
                    title: '首页',
                    key: 'hrms:home',
                    visible: true
                }
            },
            {
                path: '/employee',
                name: 'EmployeeTable',
                component: EmployeeInfo,
                meta: {
                    auth: true,
                    title: '职工信息',
                    key: 'hrms:employee:center'
                }
            },
            {
                path: '/employee/formEdit',
                name: 'EmployeeForm',
                component: EmployeeForm,
                meta: {
                    auth: true,
                    title: '职工信息表单',
                    key: 'hrms:employee:center:update',
                    visible: false
                }
            },
            {
                path: '/employee/formNew',
                name: 'EmployeeFormNew',
                component: EmployeeAddForm,
                meta: {
                    auth: true,
                    title: '职工信息表单',
                    key: 'hrms:employee:center:addNew',
                    visible: false
                }
            },
            {
                path: '/employee/detail',
                name: 'EmployeeDetail',
                component: EmployeeDetail,
                meta: {
                    auth: true,
                    title: '职工详情',
                    key: 'hrms:employee:center:detail',
                    visible: false
                }
            },
            {
                path: '/certification',
                name: 'Certification',
                component: CertificationTable,
                meta: {
                    auth: true,
                    title: '职工证书',
                    key: 'hrms:employee:certification'
                }
            },
            {
                path: '/certification/form',
                name: 'CertificationForm',
                component: CertificationForm,
                meta: {
                    auth: true,
                    title: '职工证书表单',
                    key: 'hrms:employee:certification:add',
                    visible: false
                }
            },
            {
                path: '/certification/detail',
                name: 'CertificationDetail',
                component: CertificationDetail,
                meta: {
                    auth: true,
                    title: '职工证书详情',
                    key: 'hrms:employee:certification:detail',
                    visible: false
                }
            },
            {
                path: '/professional',
                name: 'Professional',
                component: ProfessionalTable,
                meta: {
                    auth: true,
                    title: '职工职称',
                    key: 'hrms:employee:profession'
                }
            },
            {
                path: '/professional/form',
                name: 'ProfessionalForm',
                component: ProfessionalForm,
                meta: {
                    auth: true,
                    title: '职工职称表单',
                    key: 'hrms:employee:professional:add',
                    visible: false
                }
            },
            {
                path: '/professional/detail',
                name: 'ProfessionalDetail',
                component: ProfessionalDetail,
                meta: {
                    auth: true,
                    title: '职称详情',
                    key: 'hrms:employee:professional:get',
                    visible: false
                }
            },
            {
                path: '/family',
                name: 'Family',
                component: Family,
                meta: {
                    auth: true,
                    title: '职工家人',
                    key: 'hrms:employee:family'
                }
            },
            {
                path: '/family/form',
                name: 'FamilyForm',
                component: FamilyForm,
                meta: {
                    auth: true,
                    title: '职工家人',
                    key: 'hrms:employee:family:add',
                    visible: false
                }
            },
            {
                path: '/family/detail',
                name: 'FamilyDetail',
                component: FamilyDetail,
                meta: {
                    auth: true,
                    title: '职工家人详情',
                    key: 'hrms:employee:family:get',
                    visible: false
                }
            },
            {
                path: '/resume',
                name: 'Resume',
                component: Resume,
                meta: {
                    auth: true,
                    title: '职工履历',
                    key: 'hrms:employee:resume'
                }
            },
            {
                path: '/resume/form',
                name: 'ResumeForm',
                component: ResumeForm,
                meta: {
                    auth: true,
                    title: '职工履历表单',
                    key: 'hrms:employee:resume:add',
                    visible: false
                }
            },
            {
                path: '/resume/detail',
                name: 'ResumeDetail',
                component: ResumeDetail,
                meta: {
                    auth: true,
                    title: '职工履历',
                    key: 'hrms:employee:resume:get',
                    visible: false
                }
            },
            {
                path: '/archive',
                name: 'Archive',
                component: Archive,
                meta: {
                    auth: true,
                    title: '职工档案',
                    key: 'hrms:employee:archive'
                }
            },
            {
                path: '/archive/form',
                name: 'ArchiveForm',
                component: ArchiveForm,
                meta: {
                    auth: true,
                    title: '职工档案表单',
                    key: 'hrms:employee:archive:add',
                    visible: false
                }
            },
            {
                path: '/archive/detail',
                name: 'ArchiveDetail',
                component: ArchiveDetail,
                meta: {
                    auth: true,
                    title: '职工档案详情',
                    key: 'hrms:employee:archive:detail',
                    visible: false
                }
            },
            {
                path: '/reward',
                name: 'Reward',
                component: Reward,
                meta: {
                    auth: true,
                    title: '奖惩信息',
                    key: 'hrms:employee:reward'
                }
            },
            {
                path: '/reward/form',
                name: 'RewardForm',
                component: RewardForm,
                meta: {
                    auth: true,
                    title: '奖惩信息表单',
                    key: 'hrms:employee:reward:add',
                    visible: false
                }
            },
            {
                path: '/reward/detail',
                name: 'RewardDetail',
                component: RewardDetail,
                meta: {
                    auth: true,
                    title: '奖惩详情',
                    key: 'hrms:employee:award:get',
                    visible: false
                }
            },
            {
                path: '/archiveBorrow',
                name: 'ArchiveBorrow',
                component: ArchiveBorrow,
                meta: {
                    auth: true,
                    title: '档案借阅',
                    key: 'hrms:basemanage:archive_borrow'
                }
            },
            {
              path: '/archiveBorrow/form',
              name: 'ArchiveBorrowForm',
              component: ArchiveBorrowForm,
              meta: {
                title: '档案借阅表单',
                key: 'hrms:basemanage:archive_borrow:form',
                visible: false,
                auth: false
              }
            },
            {
                path: '/archiveBorrow/detail',
                name: 'ArchiveBorrowDetail',
                component: ArchiveBorrowDetail,
                meta: {
                    auth: true,
                    title: '档案借阅详情',
                    key: 'hrms:basemanage:archive_borrow:get',
                    visible: false
                }
            },
            {
                path: '/archiveRoom',
                name: 'ArchiveRoom',
                component: ArchiveRoom,
                meta: {
                    auth: true,
                    title: '档案室',
                    key: 'hrms:basemanage:archive_room',
                }
            },
            {
                path: '/archiveRoom/form',
                name: 'ArchiveRoomForm',
                component: ArchiveRoomForm,
                meta: {
                    auth: true,
                    title: '档案室',
                    key: 'hrms:basemanage:archive_room:add',
                    visible: true
                }
            },
            {
                path: '/archiveRoom/detail',
                name: 'ArchiveRoomDetail',
                component: ArchiveRoomDetail,
                meta: {
                    auth: true,
                    title: '档案室详情',
                    key: 'hrms:basemanage:archive_room:get',
                    visible: false
                }
            },
            {
                path: '/archiveTransfer',
                name: 'ArchiveTransfer',
                component: ArchiveTransfer,
                meta: {
                    auth: true,
                    title: '档案转移',
                    key: 'hrms:basemanage:archive_transfer',
                    visible: true
                }
            },
            {
                path: '/archiveTransfer/form',
                name: 'ArchiveTransferForm',
                component: ArchiveTransferForm,
                meta: {
                    auth: true,
                    title: '档案转移表单',
                    key: 'hrms:basemanage:archive_transfer:add',
                    visible: false
                }
            },
            {
                path: '/archiveTransfer/detail',
                name: 'ArchiveTransferDetail',
                component: ArchiveTransferDetail,
                meta: {
                    auth: true,
                    title: '档案转移详情',
                    key: 'hrms:basemanage:archive_transfer:get',
                    visible: false
                }
            },
            {
                path: '/contract',
                name: 'Contract',
                component: Contract,
                meta: {
                    auth: true,
                    title: '合同',
                    key: 'hrms:employee:contract',
                    visible: true
                }
            },
            {
                path: '/contract/form',
                name: 'ContractForm',
                component: ContractForm,
                meta: {
                    auth: true,
                    title: '合同表单',
                    key: 'hrms:employee:contract:add',
                    visible: false
                }
            },
            {
                path: '/contract/detail',
                name: 'ContractDetail',
                component: ContractDetail,
                meta: {
                    auth: true,
                    title: '合同详情',
                    key: 'hrms:employee:contract:get',
                    visible: false
                }
            },
            {
                path: '/education',
                name: 'Education',
                component: Education,
                meta: {
                    auth: true,
                    title: '教育',
                    key: 'hrms:employee:education',
                    visible: true
                }
            },
            {
                path: '/education/form',
                name: 'EducationForm',
                component: EducationForm,
                meta: {
                    auth: true,
                    title: '教育表单',
                    key: 'hrms:employee:education:add',
                    visible: false
                }
            },
            {
                path: '/education/detail',
                name: 'EducationDetail',
                component: EducationDetail,
                meta: {
                    auth: true,
                    title: '教育详情',
                    key: 'hrms:employee:education:get',
                    visible: false
                }
            },
            {
                path: '/language',
                name: 'Language',
                component: Language,
                meta: {
                    auth: true,
                    title: '语言',
                    key: 'hrms:employee:language',
                    visible: true
                }
            },
            {
                path: '/language/form',
                name: 'LanguageForm',
                component: LanguageForm,
                meta: {
                    auth: true,
                    title: '职工语言',
                    key: 'hrms:employee:language:add',
                    visible: false
                }
            },
            {
                path: '/language/detail',
                name: 'LanguageDetail',
                component: LanguageDetail,
                meta: {
                    auth: true,
                    title: '语言详情',
                    key: 'hrms:employee:language:get',
                    visible: false
                }
            },
            {
                path: '/patent',
                name: 'Patent',
                component: Patent,
                meta: {
                    auth: true,
                    title: '专利',
                    key: 'hrms:employee:patent',
                    visible: true
                }
            },
            {
                path: '/patent/form',
                name: 'PatentForm',
                component: PatentForm,
                meta: {
                    auth: true,
                    title: '专利表单',
                    key: 'hrms:employee:patent:add',
                    visible: false
                }
            },
            {
                path: '/patent/detail',
                name: 'PatentDetail',
                component: PatentDetail,
                meta: {
                    auth: true,
                    title: '专利详细',
                    key: 'hrms:employee:patent:get',
                    visible: false
                }
            },
            {
                path: '/position',
                name: 'Position',
                component: Position,
                meta: {
                    auth: true,
                    title: '职位',
                    key: 'hrms:basemanage:position',
                    visible: true
                }
            },
            {
                path: '/position/form',
                name: 'PositionForm',
                component: PositionForm,
                meta: {
                    auth: true,
                    title: '职位表单',
                    key: 'hrms:basemanage:position:add',
                    visible: false
                }
            },
            {
                path: '/position/detail',
                name: 'PositionDetail',
                component: PositionDetail,
                meta: {
                    auth: true,
                    title: '职位详情',
                    key: 'hrms:basemanage:position:get',
                    visible: false
                }
            },
            {
                path: '/soldier',
                name: 'Soldier',
                component: Soldier,
                meta: {
                    auth: true,
                    title: '复转军人',
                    key: 'hrms:employee:soldier',
                    visible: true
                }
            },
            {
                path: '/soldier/form',
                name: 'SoldierForm',
                component: SoldierForm,
                meta: {
                    auth: true,
                    title: '复转军人表单',
                    key: 'hrms:employee:soldier:view:save',
                    visible: false
                }
            },
            {
                path: '/Soldier/detail',
                name: 'SoldierDetail',
                component: SoldierDetail,
                meta: {
                    auth: true,
                    title: '复转军人详细',
                    key: 'hrms:employee:soldier:get',
                    visible: false
                }
            },
            {
                path: '/thesis',
                name: 'Thesis',
                component: Thesis,
                meta: {
                    auth: true,
                    title: '学术论文',
                    key: 'hrms:employee:thesis',
                    visible: true
                }
            },
            {
                path: '/thesis/form',
                name: 'ThesisForm',
                component: ThesisForm,
                meta: {
                    auth: true,
                    title: '学术论文表单',
                    key: 'hrms:employee:thesis:view:save',
                    visible: false
                }
            },
            {
                path: '/thesis/detail',
                name: 'ThesisDetail',
                component: ThesisDetail,
                meta: {
                    auth: true,
                    title: '学术论文详情信息',
                    key: 'hrms:employee:thesis:get',
                    visible: false
                }
            },
            {
                path: '/train',
                name: 'Train',
                component: Train,
                meta: {
                    auth: true,
                    title: '培训经历',
                    key: 'hrms:employee:train',
                    visible: true
                }
            },
            {
                path: '/train/form',
                name: 'TrainForm',
                component: TrainForm,
                meta: {
                    auth: true,
                    title: '培训表单',
                    key: 'hrms:employee:train:add',
                    visible: false
                }
            },
            {
                path: '/train/detail',
                name: 'TrainDetail',
                component: TrainDetail,
                meta: {
                    auth: true,
                    title: '培训详情',
                    key: 'hrms:employee:train:get',
                    visible: false
                }
            },
            {
                path: '/distribute',
                name: 'Distribute',
                component: DistributeTable,
                meta: {
                    auth: true,
                    title: '职工分配',
                    key: 'hrms:employee:distribution',
                    visible: true
                }
            },
            {
                path: '/distribute/form',
                name: 'DistributeForm',
                component: DistributeForm,
                meta: {
                    auth: true,
                    title: '职工分配表单',
                    key: 'hrms:employee:distribution:add',
                    visible: false
                }
            },
            {
                path: '/distribute/detail',
                name: 'DistributeDetail',
                component: DistributeDetail,
                meta: {
                    auth: true,
                    title: '职工分配详细',
                    key: 'hrms:employee:distribution:get',
                    visible: false
                }
            },
            {
                path: '/dictionary',
                name: 'Dictionary',
                component: Dictionary,
                meta: {
                    auth: true,
                    title: '基础数据',
                    key: 'hrms:basemanage:basedata',
                    visible: true
                }
            },
            {
                path: '/dictionary/form',
                name: 'DictionaryForm',
                component: DictionaryForm,
                meta: {
                    auth: true,
                    title: '基础数据表单',
                    key: 'hrms:basemanage:basedata:add',
                    visible: false
                }
            },
            {
                path: '/dictionary/detail',
                name: 'DictionaryDetail',
                component: DictionaryDetail,
                meta: {
                    auth: true,
                    title: '基础数据详细',
                    key: 'hrms:basemanage:basedata:get',
                    visible: false
                }
            },
            {
                path: '/academic',
                name: 'Academic',
                component: AcademicTable,
                meta: {
                    auth: true,
                    title: '科研成果',
                    key: 'hrms:employee:academic',
                    visible: true
                }
            },
            {
                path: '/academic/form',
                name: 'AcademicForm',
                component: AcademicForm,
                meta: {
                    auth: true,
                    title: '科研成果表单',
                    key: 'hrms:employee:academic:view:save',
                    visible: true
                }
            },
            {
                path: '/academic/detail',
                name: 'AcademicDetail',
                component: AcademicDetail,
                meta: {
                    auth: true,
                    title: '科研成果详细',
                    key: 'hrms:employee:science:get',
                    visible: true
                }
            },
            {
                path: '/employee/import',
                name: 'EmployeeImport',
                component: EmployeeBatchImport,
                meta: {
                    auth: true,
                    title: '职工导入',
                    key: 'hrms:employee:import',
                    visible: true
                }
            },
            {
                path: '/transferRecord',
                name: 'TransferRecord',
                component: TransferRecordTable,
                meta: {
                    auth: true,
                    title: '职工调度',
                    key: 'hrms:employee:transfer',
                    visible: true
                }
            },
            {
                path: '/transferRecord/Form',
                name: 'EmployeeTransferRecordForm',
                component: TransferRecordForm,
                meta: {
                    auth: true,
                    title: '职工调度表单',
                    key: 'hrms:employee:transfer:form',
                    visible: false
                }
            },
            {
                path: '/transferRecord/detail',
                name: 'TransferRecordDetail',
                component: TransferRecordDetail,
                meta: {
                    auth: true,
                    title: '职工调度详情',
                    key: 'hrms:employee:transfer:detail',
                    visible: false
                }
            },
            {
                path: '/menuSet',
                name: 'MenuSet',
                component: MenuSetting,
                meta: {
                    auth: true,
                    title: '菜单设置',
                    key: 'hrms:menuset',
                    visible: true
                }
            },
            {
                path: '/employee/self',
                name: 'EmployeeSelf',
                component: EmployeeDetail,
                meta: {
                    auth: false,
                    title: '个人信息',
                    key: 'hrms:employee:self-service',
                    visible: true
                }
            },
            {
              path: '/baseLog',
              name: 'BaseLog',
              component: BaseLogTable,
              meta: {
                title: '操作日志',
                key: 'hrms:baseLog:table',
                visible: true,
                auth: true
              }
            },
            {
              path: '/baseLog/detail',
              name: 'BaseLogDetail',
              component: BaseLogDetail,
              meta: {
                title: '操作日志详细',
                key: 'hrms:baseLog:detail',
                visible: true,
                auth: true
              }
            }
        ]
    },
    {
        path: '/statistic',
        name: 'Statistic',
        component: Statistic,
        meta: {
            auth: true,
            title: '工作信息',
            key: 'dashboard',
            visible: true
        },
        children: [
            {
                path: '/dashboard/statistic',
                name: 'DashboardStatistic',
                component: Statistic,
                meta: {
                    auth: true,
                    title: '统计看板',
                    key: 'dashboard_statistic',
                    visible: true
                }
            },
        ]
    },
    {
        path: '/dev',
        name: 'Development',
        component: DefaultLayout,
        meta: {
            auth: false,
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
                    auth: false,
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

router.beforeEach((to, from) => {
    if(authorite(to)){
        store.dispatch('setCurrentPath', to)
        return true
    } else {
        Modal.error({
            title: '警告',
            content: '你还没授权使用此功能，请咨询你的管理员！'
        })
        return {
            path: from.path
        }
    }

})

export default router
