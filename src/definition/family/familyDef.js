import {departmentApi, employeeApi, familyApi} from "@/service";

export const tableDef = {
    key: 'family',
    title: '职工家庭',
    actions: {
        page: familyApi.page,
        add: familyApi.save,
        update: familyApi.update,
        remove: familyApi.remove,
        get: familyApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: true,
        detail: true
    },
    routes: {
        add: '/family/form',
        edit: '/family/form',
        detail: '/family/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'family',
        set: 'setFamily'
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
                key: 'name',
                label: '家人姓名',
                placeholder: '请输入家人姓名',
                inputType: 'input:string',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
            {
                key: 'relation',
                label: '家人关系',
                placeholder: '请选择关系',
                inputType: 'select:code',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    code: 'family_relation'
                }
            },
            {
                key: 'workUnit',
                label: '家人所在单位',
                placeholder: '请输入家人所在单位',
                inputType: 'input:string',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
            {
                key: 'politicsStatus',
                label: '政治面貌',
                placeholder: '请选择政治面貌',
                inputType: 'select:code',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    code: 'politics_status'
                }
            },
            {
                key: 'telNum',
                label: '联系电话',
                placeholder: '请输入联系电话',
                inputType: 'input:string',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
        ],

    },
    columns: [
        {
            title: '职工姓名',
            dataIndex: 'employeeId',
            width: 120,
            scopedSlots: {customRender: 'employeeId'}
        },
        {
            title: '家人姓名',
            dataIndex: 'name',
            width: 120,
            scopedSlots: {customRender: 'name'}
        },
        {
            title: '家人关系',
            dataIndex: 'relation',
            width: 120,
            scopedSlots: {customRender: 'relation'}
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 80,
            scopedSlots: {customRender: 'sex'}
        },
        {
            title: '出生日期',
            dataIndex: 'birthday',
            width: 140,
            scopedSlots: {customRender: 'birthday'}
        },
        {
            title: '职务',
            dataIndex: 'duty',
            width: 120,
            scopedSlots: {customRender: 'duty'}
        },
        {
            title: '工作单位',
            dataIndex: 'workUnit',
            width: 140,
            scopedSlots: {customRender: 'workUnit'}
        },
        {
            title: '政治面貌',
            dataIndex: 'politics_status',
            width: 120,
            scopedSlots: {customRender: 'politics_status'}
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 120,
            scopedSlots: {customRender: 'createTime'}
        }
    ]
}

export const formDef = {
    key: '',
    formType: 'normal',
    actions: {
        save: familyApi.save,
        update: familyApi.update,
        get: familyApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'family'
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
            key: 'relation',
            label: '家人关系',
            placeholder: '请选择关系',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'family_relation'
            }
        },
        {
            key: 'sex',
            label: '性别',
            placeholder: '请选择性别',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'sex'
            }
        },
        {
            key: 'birthday',
            label: '出生日期',
            placeholder: '请选择出生日期',
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
            label: '工作职务',
            placeholder: '请输入工作职务',
            inputType: 'input:string',
            rules: [],
            meta: {
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
            key: 'politicsStatus',
            label: '政治面貌',
            placeholder: '请选择政治面貌',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'politics_status'
            }
        },
        {
            key: 'certificationType',
            label: '证件类型',
            placeholder: '请选择证件类型',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'certification_type'
            }
        },
        {
            key: 'certificationId',
            label: '证件号码',
            placeholder: '请输入证件号码',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'emergencyContact',
            label: '是否紧急联系人',
            placeholder: '请选择是否紧急联系人',
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
            key: 'telNum',
            label: '联系电话',
            placeholder: '请输入联系电话',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            },
            dependency: [
                {
                    key: 'emergencyContact',
                    value: [1],
                    condition: 'include'
                }
            ]
        },
    ]
}
