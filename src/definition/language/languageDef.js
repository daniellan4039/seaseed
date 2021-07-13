import {departmentApi, employeeApi, languageApi} from "@/service";

export const tableDef = {
    key: 'language',
    title: '职工语言',
    actions: {
        page: languageApi.page,
        add: languageApi.save,
        update: languageApi.update,
        remove: languageApi.remove,
        get: languageApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: true,
        detail: true
    },
    routes: {
        add: '/language/form',
        edit: '/language/form',
        detail: '/language/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'language',
        set: 'setLanguage'
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
                key: 'language',
                label: '语言',
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
                key: 'level',
                label: '等级',
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
                key: 'awardOnTo',
                label: '授予日期起',
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
                key: 'awardOnFrom',
                label: '授予日期止',
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
            title: '语言',
            dataIndex: 'language',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'language'}
        },
        {
            title: '等级',
            dataIndex: 'level',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'level'}
        },
        {
            title: '授予日期',
            dataIndex: 'awardOn',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'awardOn'}
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'createTime'}
        }
    ]
}

export const formDef = {
    key: 'languageForm',
    formType: 'normal',
    api: languageApi.api,
    actions: {
        save: languageApi.save,
        update: languageApi.update,
        get: languageApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'language'
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
            key: 'language',
            label: '语言',
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
            key: 'level',
            label: '等级',
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
            key: 'awardOn',
            label: '授予日期',
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
                scope: ['form'],
                group: '基本信息'
            }
        }
    ]
}
