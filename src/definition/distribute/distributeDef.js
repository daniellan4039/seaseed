import {departmentApi, distributeApi, employeeApi, positionApi} from "@/service";
import {getCompanyTree} from "@/service/anyoneApi";

export const tableDef = {
    key: 'distribute',
    title: '职工分配',
    actions: {
        page: distributeApi.page,
        add: distributeApi.save,
        update: distributeApi.update,
        remove: distributeApi.remove,
        get: distributeApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: true,
        detail: true
    },
    routes: {
        add: '/distribute/form',
        edit: '/distribute/form',
        detail: '/distribute/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'distribute',
        set: 'setDistribute'
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
                label: '职工',
                placeholder: '请输入',
                inputType: 'input:string',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
            {
                key: 'distributeCompanyId',
                label: '分配组织',
                placeholder: '请选择',
                inputType: 'select:tree',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    list: getCompanyTree,
                    text: 'name'
                }
            },
            {
                key: 'distributeDepartId',
                label: '分配部门',
                placeholder: '请选择',
                inputType: 'select:list',
                rules: [],
                changeBy: {
                    key: 'distributeCompanyId',
                    param: 'companyId'
                },
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    list: departmentApi.listDepartsOfCompany,
                    text: 'name'
                }
            },
            {
                key: 'positionId',
                label: '分配职位',
                placeholder: '请输入',
                inputType: 'select:list',
                rules: [],
                changeBy: {
                    key: 'distributeDepartId',
                    param: 'departmentId'
                },
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    list: positionApi.list
                }
            },
            {
                key: 'distributeType',
                label: '分配类型',
                placeholder: '请选择',
                inputType: 'select:code',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    code: 'hr_distribute_type'
                }
            },
            {
                key: 'distributeStatus',
                label: '分配状态',
                placeholder: '请选择',
                inputType: 'select:code',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    code: 'hr_distribute_status'
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
            slots: {customRender: 'employeeId'}
        },
        {
            title: '分配类型',
            dataIndex: 'distributeType',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'distributeType'}
        },
        {
            title: '分配组织',
            dataIndex: 'distributeCompanyId',
            width: 160,
            ellipsis: true,
            slots: {customRender: 'distributeCompanyId'}
        },
        {
            title: '分配部门',
            dataIndex: 'departId',
            width: 140,
            ellipsis: true,
            slots: {customRender: 'departId'}
        },
        {
            title: '分配职位',
            dataIndex: 'positionId',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'positionId'}
        },
        {
            title: '任职开始时间',
            dataIndex: 'startTime',
            width: 140,
            ellipsis: true,
            slots: {customRender: 'startTime'}
        },
        {
            title: '任职结束时间',
            dataIndex: 'endTime',
            width: 140,
            ellipsis: true,
            slots: {customRender: 'endTime'}
        },
        {
            title: '分配状态',
            dataIndex: 'distributeStatus',
            width: 80,
            ellipsis: true,
            slots: {customRender: 'distributeStatus'}
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 140,
            ellipsis: true,
            slots: {customRender: 'createTime'}
        }
    ]
}

export const formDef = {
    key: 'distributeForm',
    formType: 'normal',
    api: distributeApi.api,
    actions: {
        save: distributeApi.save,
        update: distributeApi.update,
        get: distributeApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'distribute'
    },
    labelCol: 6,
    wrapperCol: 18,
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
                                list: departmentApi.listDepartsOfCompany,
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
            key: 'distributeType',
            label: '分配类型',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'hr_distribute_type'
            }
        },
        {
            key: 'distributeStatus',
            label: '分配状态',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'hr_distribute_status'
            }
        },
        {
            key: 'distributeCompanyId',
            label: '分配组织',
            placeholder: '请选择',
            inputType: 'select:list',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                list: getCompanyTree,
                text: 'name'
            }
        },
        {
            key: 'distributeDepartId',
            label: '分配部门',
            placeholder: '请选择',
            inputType: 'select:list',
            rules: [],
            changeBy: {
                key: 'distributeCompanyId',
                param: 'companyId'
            },
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                list: departmentApi.listDepartsOfCompany,
            }
        },
        {
            key: 'positionId',
            label: '分配职位',
            placeholder: '请输入',
            inputType: 'select:list',
            rules: [],
            changeBy: {
                key: 'distributeDepartId',
                param: 'departmentId'
            },
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                list: positionApi.list
            }
        },
        {
            key: 'startTime',
            label: '任职开始时间',
            placeholder: '请选择时间',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'endTime',
            label: '任职结束时间',
            placeholder: '请选择时间',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        }
    ]
}
