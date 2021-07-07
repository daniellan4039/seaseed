import {academicApi, departmentApi, employeeApi} from "@/service";

export const tableDef = {
    key: 'academic',
    title: '学术成果',
    actions: {
        page: academicApi.page,
        add: academicApi.save,
        update: academicApi.update,
        remove: academicApi.remove,
        get: academicApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: true,
        detail: true
    },
    routes: {
        add: '/academic/form',
        edit: '/academic/form',
        detail: '/academic/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'academic',
        set: 'setAcademic'
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
                key: 'title',
                label: '成果名称',
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
                key: 'achieveTimeFrom',
                label: '获取时间起',
                placeholder: '请输入',
                inputType: 'date:date',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
            {
                key: 'achieveTimeTo',
                label: '获取时间止',
                placeholder: '请选择时间',
                inputType: 'date:date',
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
            title: '职工姓名',
            dataIndex: 'employeeId',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'employeeId'}
        },
        {
            title: '成果名称',
            dataIndex: 'title',
            width: 250,
            ellipsis: true,
            scopedSlots: {customRender: 'title'}
        },
        {
            title: '获取时间',
            dataIndex: 'achieveTime',
            width: 140,
            ellipsis: true,
            scopedSlots: {customRender: 'achieveTime'}
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 140,
            ellipsis: true,
            scopedSlots: {customRender: 'createTime'}
        }
    ]
}

export const formDef = {
    key: 'academicForm',
    formType: 'normal',
    api: academicApi.api,
    actions: {
        save: academicApi.save,
        update: academicApi.update,
        get: academicApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'academic'
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
            key: 'title',
            label: '成果名称',
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
            key: 'achieveTime',
            label: '获取时间',
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
            key: 'attachmentList',
            label: '附件列表',
            placeholder: '',
            inputType: 'upload:text',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        }
    ]
}
