import {baseLogApi, departmentApi, employeeApi} from "@/service";

export const tableDef = {
    key: 'baseLog',
    title: '系统日志',
    actions: {
        page: baseLogApi.page,
        add: baseLogApi.save,
        update: baseLogApi.update,
        remove: baseLogApi.remove,
        get: baseLogApi.get
    },
    defaultActions: {
        add: false,
        update: false,
        remove: false,
        detail: true
    },
    routes: {
        add: '/baseLog/form',
        edit: '/baseLog/form',
        detail: '/baseLog/detail'
    },
    store: {
        module: null,
        key: 'baseLog',
        set: 'setBaseLog'
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
                key: 'description',
                label: '操作内容',
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
                key: 'userId',
                label: '操作者',
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
                key: 'startTime',
                label: '操作时间',
                placeholder: '请选择时间',
                inputType: 'date:date',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            }
        ]
    },
    columns: [
        {
            title: '操作人',
            dataIndex: 'realName',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'realName'}
        },
        {
            title: '操作内容',
            dataIndex: 'description',
            width: 200,
            ellipsis: true,
            slots: {customRender: 'request'}
        },
        {
            title: '操作时间',
            dataIndex: 'startTime',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'startTime'}
        }
    ]
}

export const formDef = {
    key: 'baseLogForm',
    formType: 'normal',
    api: baseLogApi.api,
    actions: {
        save: baseLogApi.save,
        update: baseLogApi.update,
        get: baseLogApi.get
    },
    store: {
        module: null,
        key: 'baseLog'
    },
    labelCol: 6,
    wrapperCol: 18,
    config: {
        bordered: true,
        layout: 'vertical',
        column: 3
    },
    formItems: [
        {
            key: 'realName',
            label: '操作人',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'description',
            label: '操作内容',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息'
            }
        },
        {
            key: 'startTime',
            label: '操作时间',
            meta: {
                submit: true,
                scope: ['detail'],
                group: '基本信息',
                detailSpan: 2
            }
        }
    ]
}
