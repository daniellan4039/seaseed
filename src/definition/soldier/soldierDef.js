import {departmentApi, employeeApi, soldierApi} from "@/service";

export const tableDef = {
    key: 'soldier',
    title: '复转军人',
    actions: {
        page: soldierApi.page,
        add: soldierApi.save,
        update: soldierApi.update,
        remove: soldierApi.remove,
        get: soldierApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: true,
        detail: true
    },
    routes: {
        add: '/soldier/form',
        edit: '/soldier/form',
        detail: '/soldier/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'soldier',
        set: 'setSoldier'
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
                key: 'soldierType',
                label: '类型',
                placeholder: '请选择',
                inputType: 'select:code',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    code: 'hr_soldier_type'
                }
            },
            {
                key: 'soldierLevel',
                label: '级别',
                placeholder: '请选择',
                inputType: 'select:code',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    code: 'hr_soldier_level'
                }
            },
            {
                key: 'joinAtFrom',
                label: '入伍时间起',
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
                key: 'joinAtTo',
                label: '入伍时间止',
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
                key: 'leaveAtFrom',
                label: '退伍时间起',
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
                key: 'leaveAtTo',
                label: '退伍时间止',
                placeholder: '请选择',
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
            ellipsis: true,
            slots: {customRender: 'employeeId'}
        },
        {
            title: '类型',
            dataIndex: 'soldierType',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'soldierType'}
        },
        {
            title: '军人级别',
            dataIndex: 'soldierLevel',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'soldierLevel'}
        },
        {
            title: '入伍时间',
            dataIndex: 'joinAt',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'joinAt'}
        },
        {
            title: '退伍时间',
            dataIndex: 'leaveAt',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'leaveAt'}
        }
    ]
}

export const formDef = {
    key: 'soldierForm',
    formType: 'normal',
    api: soldierApi.api,
    actions: {
        save: soldierApi.save,
        update: soldierApi.update,
        get: soldierApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'soldier'
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
            key: 'soldierType',
            label: '类型',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'hr_soldier_type'
            }
        },
        {
            key: 'soldierLevel',
            label: '级别',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'hr_soldier_level'
            }
        },
        {
            key: 'joinAt',
            label: '入伍时间',
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
            key: 'leaveAt',
            label: '退伍时间',
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
            key: 'attachmentList',
            label: '附件列表',
            placeholder: '',
            inputType: 'upload',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
    ]
}
