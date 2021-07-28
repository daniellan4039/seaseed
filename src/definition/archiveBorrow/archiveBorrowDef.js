import {archiveBorrowApi, departmentApi, employeeApi} from "@/service";

export const tableDef = {
    key: 'archiveBorrow',
    title: '档案借阅',
    actions: {
        page: archiveBorrowApi.page,
        add: archiveBorrowApi.save,
        update: archiveBorrowApi.update,
        remove: archiveBorrowApi.remove,
        get: archiveBorrowApi.get
    },
    defaultActions: {
        add: false,
        update: false,
        remove: false,
        detail: true
    },
    routes: {
        add: '/archiveBorrow/form',
        edit: '/archiveBorrow/form',
        detail: '/archiveBorrow/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'archiveBorrow',
        set: 'setArchiveBorrow'
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
                key: 'hrArchiveId',
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
            }
        ]
    },
    columns: [
        {
            title: '档案编号',
            dataIndex: 'archiveId',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'archiveId'}
        },
        {
            title: '借阅人',
            dataIndex: 'borrowEmployeeId',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'borrowEmployeeId'}
        },
        {
            title: '借阅日期',
            dataIndex: 'borrowTime',
            width: 140,
            ellipsis: true,
            slots: {customRender: 'borrowTime'}
        },
        {
            title: '计划归还日期',
            dataIndex: 'planReturnTime',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'returnTime'}
        },
        {
            title: '实际归还日期',
            dataIndex: 'returnTime',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'returnTime'}
        },
        {
            title: '审核人',
            dataIndex: 'auditEmployeeId',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'auditEmployeeId'}
        },
        {
            title: '审核状态',
            dataIndex: 'auditStatus',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'auditStatus'}
        },
        {
            title: '审核时间',
            dataIndex: 'auditTime',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'auditTime'}
        },
        {
            title: '借阅原因',
            dataIndex: 'borrowReason',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'borrowReason'}
        }
    ]
}

export const formDef = {
    key: '',
    formType: 'normal',
    api: archiveBorrowApi.api,
    actions: {
        save: archiveBorrowApi.save,
        update: archiveBorrowApi.update,
        get: archiveBorrowApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'archiveBorrow'
    },
    labelCol: 6,
    wrapperCol: 18,
    config: {},
    formItems: [
        {
            key: 'borrowEmployeeId',
            label: '借阅职工',
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
            key: 'borrowTime',
            label: '借阅时间',
            placeholder: '请输入借阅水岸',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'planReturnTime',
            label: '计划归还时间',
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
            key: 'returnTime',
            label: '实际归还时间',
            placeholder: '请选择日期',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: [ 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'borrowReason',
            label: '借阅原因',
            placeholder: '请输入原因',
            inputType: 'input:area',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        }
    ]
}
