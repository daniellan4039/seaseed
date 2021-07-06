import {departmentApi, employeeApi, positionApi} from "@/service";

export const tableDef = {
    key: 'position',
    title: '职位管理',
    actions: {
        page: positionApi.page,
        add: positionApi.save,
        update: positionApi.update,
        remove: positionApi.remove,
        get: positionApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: true,
        detail: true
    },
    routes: {
        add: '/position/form',
        edit: '/position/form',
        detail: '/position/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'position',
        set: 'setPosition'
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
                key: 'code',
                label: '职位编码',
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
                key: 'name',
                label: '职位名称',
                placeholder: '请输入',
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
            title: '职位编码',
            dataIndex: 'code',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'code'}
        },
        {
            title: '职位名称',
            dataIndex: 'name',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'name'}
        },
        {
            title: '所属组织',
            dataIndex: 'companyId',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'companyId'}
        },
        {
            title: '所属部门',
            dataIndex: 'departmentId',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'departmentId'}
        },
        {
            title: '职位定员',
            dataIndex: 'positionCount',
            width: 120,
            ellipsis: true,
            scopedSlots: {customRender: 'positionCount'}
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
    key: 'positionForm',
    formType: 'normal',
    api: positionApi.api,
    actions: {
        save: positionApi.save,
        update: positionApi.update,
        get: positionApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'position'
    },
    labelCol: 6,
    wrapperCol: 18,
    config: {},
    formItems: [
        {
            key: 'code',
            label: '职位编码',
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
            key: 'name',
            label: '职位名称',
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
            key: 'departmentId',
            label: '所属部门',
            placeholder: '请选择',
            inputType: 'select:list',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                text: 'name',
                list: departmentApi.listCompaniesByUser,
            }
        },
        {
            key: 'positionCount',
            label: '职位定员',
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
            key: 'immediateSuperior',
            label: '直接上级',
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
            key: 'directSubordinates',
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
            key: 'ownWork',
            label: '本职',
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
            key: 'responsibility',
            label: '工作职责和任务',
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
            key: 'authority',
            label: '职权',
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
            key: 'safetyRequirement',
            label: '安全规定',
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
            key: 'cooperationInner',
            label: '内部',
            placeholder: '请输入',
            inputType: 'input:area',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '工作协作关系'
            }
        },
        {
            key: 'cooperationOuter',
            label: '外部',
            placeholder: '请输入',
            inputType: 'input:area',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '工作协作关系'
            }
        },
        {
            key: 'qualificationEducation',
            label: '学历',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '任职资格',
                code: 'education'
            }
        },
        {
            key: 'qualificationSex',
            label: '性别',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '任职资格',
                code: 'sex'
            }
        },
        {
            key: 'qualificationAge',
            label: '年龄',
            placeholder: '请输入',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '任职资格'
            }
        },
        {
            key: 'qualificationProfessional',
            label: '职称',
            placeholder: '请输入',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '任职资格'
            }
        },
        {
            key: 'qualificationMajor',
            label: '专业',
            placeholder: '请输入',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '任职资格'
            }
        },
        {
            key: 'qualificationExperience',
            label: '经验',
            placeholder: '请输入',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '任职资格'
            }
        },
        {
            key: 'qualificationSkill',
            label: '相关技能',
            placeholder: '请输入',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '任职资格'
            }
        },
        {
            key: 'qualificationRemark',
            label: '其他',
            placeholder: '请输入',
            inputType: 'input:area',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '任职资格',
            }
        },
    ]
}
