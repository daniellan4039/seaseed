import {employeeApi} from "@/service";

export const tableDef = {
    key: 'EmployeeInfo',
    title: '职工中心',
    actions: {
      page: employeeApi.page
    },
    config: {
        size: 'small',
        bordered: true
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
                placeholder: '请输入职工姓名'
            },
            {
                key: 'departmentId',
                label: '所在部门',
                placeholder: '请选择所在部门',
                inputType: 'select',
                rules: [],
                meta: {
                    options: [
                        {
                            text: '软件部',
                            value: '1'
                        }
                    ]
                }
            },
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
            width: 280
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
        },
        {
            title: '职工状态',
            dataIndex: 'status',
            slots: {customRender: 'status'},
            width: 90
        },
        {
            title: '创建时间',
            width: 160,
            dataIndex: 'createTime',
            slots: {customRender: 'createTime'}
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: 140,
            fixed: 'right',
            slots: {customRender: 'action'}
        }
    ]
}

export const formDef = {
    key: 'employeeForm',
    formType: 'normal',
    actions: {
        save: employeeApi.save,
        update: employeeApi.update
    },
    labelCol: 8,
    wrapperCol: 7,
    config: {},
    formRef: 'employeeFormRef',
    formItems: [
        {
            key: 'realName',
            label: '职工姓名',
            inputType: 'select:search',
            placeholder: '请输入职工姓名',
            rules: [
                {
                    required: true,
                    message: '职工姓名必填',
                    trigger: 'blur',
                    type: 'string'
                }
            ],
            meta: {
                searchDef: {
                    formItems: [
                        {
                            key: 'realName',
                            label: '姓名',
                            placeholder: '请输入职工姓名',
                            inputType: 'input:string',
                            rules: [],
                            meta: {}
                        }
                    ]
                },
                tableDef: {
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
                            slots: {customRender: 'realName'}
                        },
                    ]
                }
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
                code: 'sex'
            },
        },
        {
            key: 'identityCard',
            label: '身份证',
            placeholder: '请输入身份证号码',
            inputType: 'input:string',
            rules: [],
            meta: {}
        },
        {
            key: 'telNum',
            label: '联系号码',
            placeholder: '请输入手机号或者电话号码',
            inputType: 'input:string',
            rules: [],
            meta: {}
        },
        {
            key: 'employeeStatus',
            label: '状态',
            placeholder: '请选择状态',
            inputType: 'select:code',
            rules: [],
            meta: {
                code: 'hr_employee_status'
            }
        },
        {
            key: 'departmentId',
            label: '部门',
            placeholder: '请选择所属部门',
            inputType: 'select:code',
            rules: [],
            meta: {}
        },
        {
            key: 'password',
            label: '密码',
            placeholder: '请输入密码',
            inputType: 'input:psw',
            rules: [],
            meta: {}
        },
        {
            key: 'password2',
            label: '确认密码',
            placeholder: '请再次输入密码',
            inputType: 'input:psw',
            rules: [],
            meta: {
                submit: false
            }
        },
    ]
}
