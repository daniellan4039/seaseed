import {departmentApi, employeeApi, resumeApi} from "@/service";

export const tableDef = {
    key: 'resume',
    title: '职工简历',
    actions: {
        page: resumeApi.page,
        add: resumeApi.save,
        update: resumeApi.update,
        remove: resumeApi.update,
        get: resumeApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: false,
        detail: true
    },
    routes: {
        add: '/resume/form',
        edit: '/resume/form',
        detail: '/resume/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'resume',
        set: 'setResume'
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
                key: 'workUnit',
                label: '工作单位',
                placeholder: '请输入工作单位',
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
            title: '职工姓名',
            dataIndex: 'employeeId',
            width: 120,
            scopedSlots: {customRender: 'employeeId'}
        },
        {
            title: '工作单位',
            dataIndex: 'workUnit',
            width: 150,
            scopedSlots: {customRender: 'workUnit'}
        },
        {
            title: '工作性质',
            dataIndex: 'fullPartJob',
            width: 120,
            scopedSlots: {customRender: 'fullPartJob'}
        },
        {
            title: '工作日期起',
            dataIndex: 'workFrom',
            width: 140,
            scopedSlots: {customRender: 'workFrom'}
        },
        {
            title: '工作日期止',
            dataIndex: 'workTo',
            width: 120,
            scopedSlots: {customRender: 'workTo'}
        },
        {
            title: '职务',
            dataIndex: 'duty',
            width: 120,
            scopedSlots: {customRender: 'duty'}
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 150,
            scopedSlots: {customRender: 'createTime'}
        }
    ]
}

export const formDef = {
    key: '',
    formType: 'normal',
    actions: {
        save: resumeApi.save,
        update: resumeApi.update,
        get: resumeApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'resume'
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
            key: 'workUnit',
            label: '工作单位',
            placeholder: '请输入工作单位',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'workFrom',
            label: '工作日期起',
            placeholder: '请选择日期',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'workTo',
            label: '工作日期止',
            placeholder: '请选择日期',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'duty',
            label: '职务',
            placeholder: '请输入职务',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'department',
            label: '部门',
            placeholder: '请输入部门名称',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'superior',
            label: '证明人',
            placeholder: '请输入证明人姓名',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'superiorTel',
            label: '证明人姓名',
            placeholder: '请输入证明人姓名',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'leavingReason',
            label: '离职原因',
            placeholder: '请输入离职原因',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'mainResume',
            label: '是否主要履历',
            placeholder: '请选择',
            inputType: 'select',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                options: [
                    {
                        text: '是',
                        value: 1
                    },
                    {
                        text: '否',
                        value: 0
                    }
                ]
            }
        },
        {
            key: 'fullPartJob',
            label: '工作性质',
            placeholder: '请选择工作性质',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'hr_full_part_job'
            }
        },
        {
            key: 'special',
            label: '特殊工种',
            placeholder: '请选择特殊工种',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'special_work'
            }
        },
    ]
}
