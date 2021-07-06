// eslint-disable-next-line no-unused-vars
import {departmentApi, employeeApi, professionalApi} from "@/service";

export const tableDef = {
    key: 'professional',
    title: '职工职称',
    actions: {
        page: professionalApi.page,
        add: professionalApi.add,
        update: professionalApi.update,
        remove: professionalApi.remove,
        get: professionalApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: true,
        detail: true
    },
    routes: {
        add: '/professional/form',
        edit: '/professional/form',
        detail: '/professional/detail'
    },
    store: {
        module: 'employee',
        key: 'professional',
        set: 'setProfessional'
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
                key: 'title',
                label: '职称名称',
                placeholder: '请输入职称名称',
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
                label: '专业名称',
                placeholder: '请输入专业名称',
                inputType: 'input:string',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
            {
                key: 'professionalLevel',
                label: '职称等级',
                placeholder: '请输入职称等级',
                inputType: 'select:code',
                rules: [],
                meta: {
                    code: 'hr_professional_level',
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
            {
                key: 'awardUnit',
                label: '授予机构',
                placeholder: '请输入授予机构',
                inputType: 'input:string',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
            {
                key: 'awardOn',
                label: '授予日期',
                placeholder: '请输入授予日期',
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
            scopedSlots: {customRender: 'employeeId'}
        },
        {
            title: '职称名称',
            dataIndex: 'title',
            width: 120,
            scopedSlots: {customRender: 'title'}
        },
        {
            title: '职称类型',
            dataIndex: 'majorType',
            width: 120,
            scopedSlots: {customRender: 'majorType'}
        },
        {
            title: '职称等级',
            dataIndex: 'professionalLevel',
            width: 120,
            scopedSlots: {customRender: 'professionalLevel'}
        },
        {
            title: '授予日期',
            dataIndex: 'awardOn',
            width: 140,
            scopedSlots: {customRender: 'awardOn'}
        },
        {
            title: '授予机构',
            dataIndex: 'awardUnit',
            width: 120,
            scopedSlots: {customRender: 'awardUnit'}
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            width: 150,
            scopedSlots: {customRender: 'createdAt'}
        }
    ]
}

export const formDef = {
    key: 'professionalForm',
    formType: 'normal',
    api: professionalApi.api,
    actions: {
        save: professionalApi.save,
        update: professionalApi.update,
        get: professionalApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'professional'
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
            key: 'professionalNum',
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
            key: 'code',
            label: '职称编码',
            placeholder: '请输入职称编码',
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
            label: '职称名称',
            placeholder: '请输入职称名称',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'professionalLevel',
            label: '职称等级',
            placeholder: '请输入职称等级',
            inputType: 'select:code',
            rules: [],
            meta: {
                code: 'hr_professional_level',
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'majorType',
            label: '职称类型',
            placeholder: '请输入职称类型',
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
            placeholder: '请输入专业',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'isHighestEducation',
            label: '是否最高职称',
            placeholder: '请选择是否最高职称',
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
            key: 'awardUnit',
            label: '授予单位',
            placeholder: '请输入授予单位',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'awardOn',
            label: '授予日期',
            placeholder: '请选择授予日期',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'hireDate',
            label: '聘用日期',
            placeholder: '请选择聘用日期',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'reviewUnit',
            label: '评审单位',
            placeholder: '请输入评审单位',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        }
    ]
}
