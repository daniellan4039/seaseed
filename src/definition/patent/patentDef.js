import {departmentApi, employeeApi, patentApi} from "@/service";

export const tableDef = {
    key: 'patent',
    title: '职工专利',
    actions: {
        page: patentApi.page,
        add: patentApi.save,
        update: patentApi.update,
        remove: patentApi.remove,
        get: patentApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: true,
        detail: true
    },
    routes: {
        add: '/patent/form',
        edit: '/patent/form',
        detail: '/patent/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'patent',
        set: 'setPatent'
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
                key: 'patentNum',
                label: '专利号',
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
                key: 'patentTitle',
                label: '专利名称',
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
                key: 'patentCountry',
                label: '国别',
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
            title: '职工姓名',
            dataIndex: 'employeeId',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'employeeId'}
        },
        {
            title: '专利号',
            dataIndex: 'patentNum',
            width: 120,
            ellipsis: true,
            slots: {customRender: ''}
        },
        {
            title: '专利名称',
            dataIndex: 'patentTitle',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'patentTitle'}
        },
        {
            title: '国别',
            dataIndex: 'patentCountry',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'patentCountry'}
        },
        {
            title: '获取日期',
            dataIndex: 'awardOn',
            width: 140,
            ellipsis: true,
            slots: {customRender: 'awardOn'}
        },
        {
            title: '创建日期',
            dataIndex: 'createTime',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'createTime'}
        }
    ]
}

export const formDef = {
    key: 'patentForm',
    formType: 'normal',
    api: patentApi.api,
    actions: {
        save: patentApi.save,
        update: patentApi.update,
        get: patentApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'patent'
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
            key: 'patentNum',
            label: '专利号',
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
            key: 'patentTitle',
            label: '专利名称',
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
            key: 'patentCountry',
            label: '国别',
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
            label: '获取日期',
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
