import {archiveTransferApi, departmentApi, employeeApi} from "@/service";

export const tableDef = {
    key: 'archiveTransfer',
    title: '档案转移',
    actions: {
        page: archiveTransferApi.page,
        add: archiveTransferApi.save,
        update: archiveTransferApi.update,
        remove: archiveTransferApi.remove,
        get: archiveTransferApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: true,
        detail: true
    },
    routes: {
        add: '/archiveTransfer/form',
        edit: '/archiveTransfer/form',
        detail: '/archiveTransfer/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'archiveTransfer',
        set: 'setArchiveTransfer'
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
                key: 'fromUnit',
                label: '调出单位',
                placeholder: '请输入调出单位',
                inputType: 'input:string',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
            {
                key: 'toUnit',
                label: '调入单位',
                placeholder: '请输入调入单位',
                inputType: 'input:string',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
            {
                key: 'transferType',
                label: '调档类型',
                placeholder: '请选择',
                inputType: 'select:code',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    code: 'hr_archive_transfer_type'
                }
            },
        ]
    },
    columns: [
        {
            title: '档案编号',
            dataIndex: 'hrArchiveId',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'hrArchiveId'}
        },
        {
            title: '职工姓名',
            dataIndex: 'employeeId',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'employeeId'}
        },
        {
            title: '调档类型',
            dataIndex: 'transferType',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'transferType'}
        },
        {
            title: '调出单位',
            dataIndex: 'fromUnit',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'fromUnit'}
        },
        {
            title: '掉入单位',
            dataIndex: 'toUnit',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'toUnit'}
        },
        {
            title: '调动时间',
            dataIndex: 'transferTime',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'transferTime'}
        }
    ]
}

export const formDef = {
    key: 'archiveTransferForm',
    formType: 'normal',
    api: archiveTransferApi.api,
    actions: {
        save: archiveTransferApi.save,
        update: archiveTransferApi.update,
        get: archiveTransferApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'archiveTransfer'
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
            key: 'transferType',
            label: '调动类型',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                code: 'hr_archive_transfer_type',
                group: '基本信息'
            }
        },
        {
            key: 'fromUnit',
            label: '调出单位',
            placeholder: '请输入调出单位',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'toUnit',
            label: '调入单位',
            placeholder: '请输入调入单位',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'transferTime',
            label: '调动时间',
            placeholder: '请输入调动时间',
            inputType: 'date:date',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'remark',
            label: '备注',
            placeholder: '请输入备注',
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
