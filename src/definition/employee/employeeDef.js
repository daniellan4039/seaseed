import {employeeApi, departmentApi} from "@/service";

export const tableDef = {
    key: 'EmployeeInfo',
    title: '职工中心',
    actions: {
        page: employeeApi.page,
        add: employeeApi.save,
        update: employeeApi.update,
        remove: employeeApi.remove,
        get: employeeApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: false,
        detail: true
    },
    routes: {
        add: '/employee/form',
        edit: '/employee/form',
        detail: '/employee/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'employee',
        set: 'setEmployee'
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
                key: 'realName',
                label: '职工姓名',
                inputType: 'input:string',
                placeholder: '请输入职工姓名',
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
            {
                key: 'departmentId',
                label: '所在部门',
                placeholder: '请选择所在部门',
                inputType: 'select:list',
                rules: [],
                meta: {
                    list: departmentApi.listDepartsOfCompany,
                    text: 'name',
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            }
        ]
    },
    columns: [
        {
            title: '职工编号',
            dataIndex: 'employeeNo',
            width: 100,
            slots: {customRender: 'employeeNo'},
            ellipsis: true
        },
        {
            title: '职工姓名',
            dataIndex: 'realName',
            slots: {customRender: 'realName'},
            width: 120,
            ellipsis: true
        },
        {
            title: '职工性别',
            dataIndex: 'sex',
            slots: {customRender: 'sex'},
            width: 80,
            ellipsis: true
        },
        {
            title: '证件号码',
            dataIndex: 'certificationId',
            slots: {customRender: 'certificationId'},
            width: 170,
            ellipsis: true
        },
        {
            title: '所属组织',
            dataIndex: 'companyId',
            slots: {customRender: 'companyId'},
            width: 250,
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
            ellipsis: true,
            slots: {customRender: 'telNum'}
        },
        {
            title: '职工状态',
            dataIndex: 'status',
            slots: {customRender: 'status'},
            width: 90
        },
        {
            title: '创建时间',
            width: 180,
            dataIndex: 'createTime',
            slots: {customRender: 'createTime'}
        }
    ]
}

export const formDef = {
    key: 'employeeForm',
    formType: 'normal',
    api: employeeApi.api,
    actions: {
        save: employeeApi.save,
        update: employeeApi.update,
        get: employeeApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'employee'
    },
    labelCol: 6,
    wrapperCol: 18,
    config: {},
    formItems: [
        {
            key: 'realName',
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
            key: 'sex',
            label: '性别',
            inputType: 'select:code',
            placeholder: '请选择性别',
            rules: [
                {
                    required: true,
                    message: '性别必填',
                    trigger: 'blur',
                    type: 'string'
                }
            ],
            meta: {
                code: 'sex',
                scope: ['form', 'detail'],
                group: '基本信息'
            },
        },
        {
            key: 'identityCard',
            label: '身份证',
            placeholder: '请输入身份证号码',
            inputType: 'input:string',
            rules: [],
            meta: {
                scope: ['form', 'detail'],
                group: '基本信息'
            },
            dependency: [
                {
                    key: 'sex',
                    value: [
                        '1'
                    ],
                    condition: 'include'
                }
            ]
        },
        {
            key: 'telNum',
            label: '联系号码',
            placeholder: '请输入手机号或者电话号码',
            inputType: 'input:string',
            rules: [],
            meta: {
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'status',
            label: '状态',
            placeholder: '请选择状态',
            inputType: 'select:code',
            rules: [],
            meta: {
                code: 'hr_employee_status',
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'departmentId',
            label: '部门',
            placeholder: '请选择所属部门',
            inputType: 'select:list',
            rules: [],
            meta: {
                text: 'name',
                list: departmentApi.listDepartsOfCompany,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'password',
            label: '密码',
            placeholder: '请输入密码',
            inputType: 'input:psw',
            rules: [],
            meta: {
                scope: ['form'],
                group: '基本信息'
            }
        },
        {
            key: 'password2',
            label: '确认密码',
            placeholder: '请再次输入密码',
            inputType: 'input:psw',
            rules: [],
            meta: {
                submit: false,
                scope: ['form'],
                group: '基本信息'
            }
        },
        {
            key: 'polistics',
            label: '政治面貌',
            placeholder: '',
            inputType: '',
            rules: [],
            meta: {
                submit: false,
                group: '基本信息'
            }
        },
        {
            key: 'nickName',
            label: '昵称',
            placeholder: '',
            inputType: '',
            rules: [],
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'employeeNo',
            label: '职工编号',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'certificationType',
            label: '证件类型',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'certificationId',
            label: '证件号码',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'birthday',
            label: '出生日期',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'age',
            label: '年龄',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'birthplace',
            label: '出生地',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'oneChildCert',
            label: '是否独生子女',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'bloodType',
            label: '血型',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'residenceType',
            label: '户口类型',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'healthStatus',
            label: '健康状况',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'entryChannel',
            label: '入职渠道',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'isAssignable',
            label: '是否可调配',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'nation',
            label: '民族',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'nativePlace',
            label: '籍贯',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'education',
            label: '学历',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },

        {
            key: 'marriageStatus',
            label: '婚姻状况',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'toHereDate',
            label: '到本单位日期',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'telNum',
            label: '联系电话',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'nativeLocation',
            label: '户口所在地',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息',
                span: 2
            }
        },
        {
            key: 'contactAddress',
            label: '通讯地址',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息',
                span: 2
            }
        },
        {
            key: 'email',
            label: '邮箱',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'nativeAddress',
            label: '户口所在地详细地址',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息',
                span: 2
            }
        },
        {
            key: 'hobbit',
            label: '爱好',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息',
                span: 2
            }
        }
    ],
    meta: {
        columns: 5
    }
}
