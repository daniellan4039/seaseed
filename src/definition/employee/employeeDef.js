export const tableDef = {
    key: 'EmployeeInfo',
    size: 'small',
    bordered: false,
    rowKey: 'EmployeeInfo',
    title: '职工中心',
    url: 'test url',
    columns: [
        {
            title: '职工编号',
            dataIndex: 'employeeNo',
            width: 100,
            scopedSlots: { customRender: 'ellipsisCustom' }
        },
        {
            title: '职工姓名',
            dataIndex: 'realName',
            scopedSlots: { customRender: 'ellipsisCustom' },
            width: 120
        },
        {
            title: '证件号码',
            dataIndex: 'certificationId',
            scopedSlots: { customRender: 'ellipsisCustom' },
            width: 170
        },
        {
            title: '所属组织',
            dataIndex: 'companyId',
            scopedSlots: { customRender: 'companyId' },
            width: 280
        },
        {
            title: '所属部门',
            dataIndex: 'departmentId',
            scopedSlots: { customRender: 'departmentId' },
            width: 170
        },
        {
            title: '职位',
            dataIndex: 'positionId',
            scopedSlots: { customRender: 'positionId' },
            width: 120
        },
        {
            title: '联系电话',
            dataIndex: 'telNum',
            width: 120,
            scopedSlots: { customRender: 'ellipsisCustom' }
        },
        {
            title: '职工状态',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' },
            width: 90
        },
        {
            title: '创建时间',
            width: 160,
            dataIndex: 'createTime',
            scopedSlots: { customRender: 'ellipsisCustom' }
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: 110,
            fixed: 'right',
            scopedSlots: { customRender: 'action' }
        }
    ]
}

export const formDef = {
    key: 'employeeForm',
    formType: 'normal',
    url: '',
    labelCol: { span: 7 },
    wrapperCol: { span: 10 },
    formRef: 'employeeFormRef',
    formItems: [
        {
            key: 'realName',
            label: '职工姓名',
            inputType: 'input:string',
            placeholder: '请输入职工姓名',
            rules: [
                {
                    required: true,
                    message: '职工姓名必填',
                    trigger: 'blur'
                }
            ]
        },
        {
            key: 'sex',
            label: '性别',
            inputType: 'select',
            placeholder: '请选择性别',
            rules: [
                {
                    required: true,
                    message: '性别必填',
                    trigger: 'blur'
                }
            ],
            meta: {
                options: [
                    {
                        text: '男',
                        value: '1'
                    },
                    {
                        text: '女',
                        value: '2'
                    },
                    {
                        text: '未知',
                        value: '0'
                    }
                ]
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
            meta: {}
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
            key: 'password',
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