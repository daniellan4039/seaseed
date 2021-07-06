import {archiveApi, departmentApi, employeeApi, companyApi, archiveRoomApi} from "@/service";

export const tableDef = {
    key: 'archive',
    title: '职工档案',
    actions: {
        page: archiveApi.page,
        add: archiveApi.save,
        update: archiveApi.update,
        remove: archiveApi.remove,
        get: archiveApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: true,
        detail: true
    },
    routes: {
        add: '/archive/form',
        edit: '/archive/form',
        detail: '/archive/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'archive',
        set: 'setArchive'
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
                key: 'manageCompanyId',
                label: '管理单位',
                placeholder: '请选择管理单位',
                inputType: 'select:list',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    list: companyApi.list,
                    text: 'name'
                }
            },
            {
                key: 'archiveNo',
                label: '档案编号',
                placeholder: '请输入档案编号',
                inputType: 'input:string',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
            {
                key: 'borrowState',
                label: '借阅状态',
                placeholder: '请选择借阅状态',
                inputType: 'select',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    options: [
                        {
                            text: '归档',
                            value: 0
                        },
                        {
                            text: '借阅中',
                            value: 1
                        },
                        {
                            text: '已归还',
                            value: 2
                        },
                    ]
                }
            },
        ]
    },
    columns: [
        {
            title: '档案编号',
            dataIndex: 'archiveNo',
            width: 120,
            scopedSlots: {customRender: 'archiveNo'}
        },
        {
            title: '职工姓名',
            dataIndex: 'employeeId',
            width: 120,
            scopedSlots: {customRender: 'employeeId'}
        },
        {
            title: '托管地',
            dataIndex: 'manageLocation',
            width: 120,
            scopedSlots: {customRender: 'manageLocation'}
        },
        {
            title: '管理单位',
            dataIndex: 'manageCompanyId',
            width: 200,
            ellipsis:true,
            scopedSlots: {customRender: 'manageCompanyId'}
        },
        {
            title: '档案室',
            dataIndex: 'archiveRoomId',
            width: 120,
            scopedSlots: {customRender: 'archiveRoomId'}
        },
        {
            title: '档案学历',
            dataIndex: 'archiveEducation',
            width: 120,
            scopedSlots: {customRender: 'archiveEducation'}
        },
        {
            title: '档案出生地',
            dataIndex: 'archiveBorn',
            width: 120,
            scopedSlots: {customRender: 'archiveBorn'}
        },
        {
            title: '档案入党日期',
            dataIndex: 'archivePartyDate',
            width: 140,
            scopedSlots: {customRender: 'archivePartyDate'}
        },
        {
            title: '档案工作日期',
            dataIndex: 'archiveJobDate',
            width: 140,
            scopedSlots: {customRender: 'archiveJobDate'}
        },
        {
            title: '转移状态',
            dataIndex: 'transState',
            width: 120,
            scopedSlots: {customRender: 'transState'}
        },
        {
            title: '借阅状态',
            dataIndex: 'borrowState',
            width: 120,
            scopedSlots: {customRender: 'borrowState'}
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 180,
            scopedSlots: {customRender: 'createTime'}
        }
    ]
}

export const formDef = {
    key: '',
    formType: 'normal',
    api: archiveApi.api,
    actions: {
        save: archiveApi.save,
        update: archiveApi.update,
        get: archiveApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'archive'
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
            key: 'manageCompanyId',
            label: '管理单位',
            placeholder: '请选择管理单位',
            inputType: 'select:list',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                list: companyApi.list,
                text: 'name'
            }
        },
        {
            key: 'isCreate',
            label: '是否新建',
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
            key: 'manageLocation',
            label: '档案管理地',
            placeholder: '请输入档案管理地',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'archiveNo',
            label: '档案编号',
            placeholder: '请输入人档案编号',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'archiveRoomId',
            label: '档案室',
            placeholder: '请选择档案室',
            inputType: 'select:list',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                list: archiveRoomApi.list,
                text: 'roomName'
            }
        },
        {
            key: 'archiveNo',
            label: '档案编号',
            placeholder: '请输入档案编号',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'archiveEducation',
            label: '档案学历',
            placeholder: '请选择档案学历',
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
            key: 'archiveBorn',
            label: '档案出生日期',
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
            key: 'archivePartyDate',
            label: '档案入党日期',
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
            key: 'archiveJobDate',
            label: '档案工作日期',
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
            key: 'manageFrom',
            label: '管理日期起',
            placeholder: '请选择日期',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },{
            key: 'manageTo',
            label: '管理日期止',
            placeholder: '请选择日期',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
    ]
}
