import {departmentApi, educationApi, employeeApi} from "@/service";

export const tableDef = {
    key: 'education',
    title: '职工学历',
    actions: {
        page: educationApi.page,
        add: educationApi.save,
        update: educationApi.update,
        remove: educationApi.remove,
        get: educationApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: true,
        detail: true
    },
    routes: {
        add: '/education/form',
        edit: '/education/form',
        detail: '/education/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'education',
        set: 'setEducation'
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
            {
                key: 'school',
                label: '学校全程',
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
                key: 'education',
                label: '学历',
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
                key: 'major',
                label: '专业',
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
                key: 'study_type',
                label: '学习形式',
                placeholder: '请选择',
                inputType: 'select:code',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    code: 'study_type'
                }
            },
            {
                key: 'schoolTag',
                label: '学校性质',
                placeholder: '请选择',
                inputType: 'select:code',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    code: 'school_tag'
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
            title: '学校',
            dataIndex: 'schoole',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'schoole'}
        },
        {
            title: '入校时间',
            dataIndex: 'enteredOn',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'enteredOn'}
        },
        {
            title: '毕业时间',
            dataIndex: 'graduatedOn',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: ''}
        },
        {
            title: '学历',
            dataIndex: 'education',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'education'}
        },
        {
            title: '专业',
            dataIndex: 'major',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'major'}
        },
        {
            title: '学习形式',
            dataIndex: 'studyType',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'studyType'}
        },
        {
            title: '学校性质',
            dataIndex: 'schoolTag',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'schoolTag'}
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'createTime'}
        }
    ]
}

export const formDef = {
    key: 'educationForm',
    formType: 'normal',
    api: educationApi.api,
    actions: {
        save: educationApi.save,
        update: educationApi.update,
        get: educationApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'education'
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
            key: 'school',
            label: '学校',
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
            key: 'enteredOn',
            label: '入校日期',
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
            key: 'graduatedOn',
            label: '毕业日期',
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
            key: 'education',
            label: '学历',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'education'
            }
        },
        {
            key: 'degree',
            label: '学位',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'degree'
            }
        },
        {
            key: 'major',
            label: '专业',
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
            key: 'schoolTag',
            label: '学校性质',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'school_tag'
            }
        },
        {
            key: 'studyType',
            label: '学习形式',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'study_type'
            }
        },
        {
            key: 'isFirstEducation',
            label: '是否第一学历学历',
            placeholder: '请选择',
            inputType: 'select',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                options: [
                    {
                        value: 1,
                        text: '是'
                    },
                    {
                        value: 0,
                        text: '否'
                    }
                ]
            }
        },
        {
            key: 'isHighestEducation',
            label: '是否最高学历',
            placeholder: '请选择',
            inputType: 'select',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                options: [
                    {
                        value: 1,
                        text: '是'
                    },
                    {
                        value: 0,
                        text: '否'
                    }
                ]
            }
        },
        {
            key: 'degreeCertFileList',
            label: '毕业证书',
            placeholder: '',
            inputType: 'upload:text',
            rules: [],
            meta: {
                submit: true,
                scope: ['form'],
                group: '基本信息'
            }
        },
        {
            key: 'degreeVerifiFileList',
            label: '学位证书',
            placeholder: '',
            inputType: 'upload:text',
            rules: [],
            meta: {
                submit: true,
                scope: ['form'],
                group: '基本信息'
            }
        }
    ]
}
