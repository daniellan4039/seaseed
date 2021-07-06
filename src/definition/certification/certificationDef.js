import {certificationApi, departmentApi, employeeApi} from "@/service";

export const tableDef = {
    key: 'certificationTable',
    title: '职工证书',
    actions: {
        page: certificationApi.page,
        add: certificationApi.save,
        update: certificationApi.update,
        remove: certificationApi.remove,
        get: certificationApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: true,
        detail: true
    },
    routes: {
        add: '/certification/form',
        edit: '/certification/form',
        detail: '/certification/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'certification',
        set: 'setCertification'
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
                key: 'certName',
                label: '证书名称',
                placeholder: '请输入证书名称',
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
            title: '证书类型',
            dataIndex: 'certType',
            width: 180,
            scopedSlots: {customRender: 'certType'}
        },
        {
            title: '证书名称',
            dataIndex: 'certName',
            width: 180,
            scopedSlots: {customRender: 'certName'}
        },
        {
            title: '证书等级',
            dataIndex: 'certLevel',
            width: 120,
            scopedSlots: {customRender: 'certLevel'}
        },
        {
            title: '证书编号',
            dataIndex: 'certNum',
            width: 170,
            scopedSlots: {customRender: 'certNum'}
        },
        {
            title: '签发日期',
            dataIndex: 'signOn',
            width: 100,
            scopedSlots: {customRender: 'signOn'}
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 140,
            scopedSlots: {customRender: 'createTime'}
        }
    ]
}

export const formDef = {
    key: 'certificationForm',
    formType: 'normal',
    api: certificationApi.api,
    actions: {
        save: certificationApi.save,
        update: certificationApi.update,
        get: certificationApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'certification'
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
            key: 'certType',
            label: '证书类型',
            placeholder: '请选择证书类型',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'hr_cert_type'
            }
        },
        {
            key: 'certLevel',
            label: '证书等级',
            placeholder: '请选择证书等级',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
            },
            dependency: [
                {
                    key: 'certType',
                    value: ['1'],
                    condition: 'include'
                }
            ]
        },
        {
            key: 'certName',
            label: '证书名称',
            placeholder: '请输入证书名称',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
            },
            dependency: [
                {
                    key: 'certType',
                    value: ['1'],
                    condition: 'include'
                }
            ]
        },
        {
            key: 'qualification',
            label: '职业资格',
            placeholder: '请输入职业资格',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'certNum',
            label: '证书编号',
            placeholder: '请输入证书编号',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'signOn',
            label: '签发日期',
            placeholder: '请选择签发日期',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'expireDate',
            label: '逾期日期',
            placeholder: '请选择逾期日期',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'signInstitution',
            label: '签发机构',
            placeholder: '请输入签发机构',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'yearAuthState',
            label: '年检状况',
            placeholder: '请输入年检状况',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'changeState',
            label: '变更状况',
            placeholder: '请输入变更状况',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'attachmentList',
            label: '附件',
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
