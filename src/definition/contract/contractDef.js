import {contractApi, departmentApi, employeeApi} from "@/service";
// eslint-disable-next-line no-unused-vars
import {getCompanyTree} from "@/service/anyoneApi";

export const tableDef = {
    key: 'contract',
    title: '职工合同',
    actions: {
        page: contractApi.page,
        add: contractApi.save,
        update: contractApi.update,
        remove: contractApi.remove,
        get: contractApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: true,
        detail: true
    },
    routes: {
        add: '/contract/form',
        edit: '/contract/form',
        detail: '/contract/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'contract',
        set: 'setContract'
    },
    config: {
        bordered: true,
        size: 'small'
    },
    searchParams: {
        meta: {
            gutter: 16,
            col: 6
        },
        formItems: [
            {
                key: 'employee',
                label: '职工姓名',
                placeholder: '请输入职工姓名',
                inputType: 'input:string',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
        ]
    },
    columns: [
        {
            title: '职工',
            dataIndex: 'employeeId',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'employeeId'}
        },
        {
            title: '合同类别',
            dataIndex: 'contractClass',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'contractClass'}
        },
        {
            title: '合同类型',
            dataIndex: 'contractType',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'contractType'}
        },
        {
            title: '合同有效期起',
            dataIndex: 'periodFrom',
            width: 140,
            ellipsis: true,
            scopedSlots: {customRender: 'periodFrom'}
        },
        {
            title: '合同有效期止',
            dataIndex: 'periodTo',
            width: 140,
            ellipsis: true,
            scopedSlots: {customRender: 'periodTo'}
        },
        {
            title: '试用期止',
            dataIndex: 'trialEnd',
            width: 140,
            ellipsis: true,
            scopedSlots: {customRender: 'trialEnd'}
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 80,
            ellipsis: true,
            scopedSlots: {customRender: 'status'}
        }
    ]
}

export const formDef = {
    key: 'contractForm',
    formType: 'normal',
    api: contractApi.api,
    actions: {
        save: contractApi.save,
        update: contractApi.update,
        get: contractApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'contract'
    },
    labelCol: 8,
    wrapperCol: 7,
    config: {},
    formItems: [
        {
            key: 'employeeId',
            label: '职工姓名',
            placeholder: '请输入职工姓名',
            inputType: 'select:search',
            rules: [],
            meta: {
                search: {
                    action: employeeApi.list,
                    keyword: 'realName'
                },
                searchDef: {
                    formItems: [
                        {
                            key: 'realName',
                            label: '姓名',
                            placeholder: '请输入职工姓名',
                            inputType: 'input:string',
                            rules: [],
                            meta: {}
                        },
                        {
                            key: 'departmentId',
                            label: '部门',
                            placeholder: '请输入职工姓名',
                            inputType: 'select:list',
                            rules: [],
                            meta: {
                                text: 'name',
                                list: departmentApi.listCompaniesByUser,
                            }
                        },
                    ]
                },
                tableDef: {
                    actions: {
                        page: employeeApi.page
                    },
                    text: 'realName',
                    columns: [
                        {
                            title: '职工编号',
                            dataIndex: 'empNum',
                            width: 80,
                            slots: {customRender: 'empNum'}
                        },
                        {
                            title: '职工姓名',
                            dataIndex: 'realName',
                            width: 100,
                            slots: {customRender: 'realName'},
                            ellipsis: true
                        },
                        {
                            title: '所属部门',
                            dataIndex: 'departmentId',
                            slots: {customRender: 'departmentId'},
                            width: 170
                        },
                        {
                            title: '职位',
                            dataIndex: 'positionId',
                            slots: {customRender: 'positionId'},
                            width: 120
                        },
                        {
                            title: '联系电话',
                            dataIndex: 'telNum',
                            width: 120,
                            slots: {customRender: 'telNum'}
                        }
                    ]
                },
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'contractNum',
            label: '合同编号',
            placeholder: '请输入合同编号',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'contractClass',
            label: '合同类别',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'hr_contract_class'
            }
        },
        {
            key: 'contractType',
            label: '合同类型',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'hr_contract_type'
            }
        },
        {
            key: 'periodFrom',
            label: '合同有效期起',
            placeholder: '请选择',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'periodTo',
            label: '合同有效期止',
            placeholder: '请选择',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'trialEnd',
            label: '试用期止',
            placeholder: '请选择',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'status',
            label: '合同状态',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'hr_contract_status'
            }
        },
        {
            key: 'signUnit',
            label: '签发单位',
            placeholder: '请选择',
            inputType: 'select:tree',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                list: getCompanyTree
            }
        },
        {
            key: 'manageUnit',
            label: '管理单位',
            placeholder: '请选择',
            inputType: 'select:tree',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                list: getCompanyTree
            }
        },
    ]
}
