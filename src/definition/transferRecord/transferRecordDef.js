import {companyApi, transferRecordApi} from "@/service";

export const tableDef = {
    key: 'transferRecord',
    title: '职工调度',
    actions: {
        page: transferRecordApi.page,
        add: transferRecordApi.save,
        update: transferRecordApi.update,
        remove: transferRecordApi.remove,
        get: transferRecordApi.get
    },
    defaultActions: {
        add: false,
        update: true,
        remove: true,
        detail: true
    },
    routes: {
        add: '/transferRecord/form',
        edit: '/transferRecord/form',
        detail: '/transferRecord/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'transferRecord',
        set: 'setTransferRecord'
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
                key: 'transferTimeFrom',
                label: '调出时间起',
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
                key: 'transferTimeTo',
                label: '调出时间止',
                placeholder: '请选择时间',
                inputType: 'date:date',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
            {
                key: 'receiveCompany',
                label: '调出单位',
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
                key: 'receiveStatus',
                label: '是否接收',
                placeholder: '请选择',
                inputType: 'select',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    options: [
                        {
                            value: 1,
                            text: '是'
                        },
                        {
                            value: 0,
                            text: '否'
                        }
                    ]
                }
            },
        ]
    },
    columns: [
        {
            title: '职工编号',
            dataIndex: 'employeeNo',
            width: 100,
            ellipsis: true,
            slots: {customRender: ''}
        },
        {
            title: '职工姓名',
            dataIndex: 'employeeId',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'employeeId'}
        },
        {
            title: '证件号码',
            dataIndex: 'certificationId',
            width: 200,
            ellipsis: true,
            slots: {customRender: ''}
        },
        {
            title: '联系电话',
            dataIndex: 'telNum',
            width: 140,
            ellipsis: true,
            slots: {customRender: 'telNum'}
        },
        {
            title: '调出单位',
            dataIndex: 'receiveCompany',
            width: 200,
            ellipsis: true,
            slots: {customRender: '200'}
        },
        {
            title: '调出时间',
            dataIndex: 'transferTime',
            width: 140,
            ellipsis: true,
            slots: {customRender: 'transferTime'}
        },
        {
            title: '是否已接收',
            dataIndex: 'receiveStatus',
            width: 80,
            ellipsis: true,
            slots: {customRender: '80'}
        },
    ]
}

export const formDef = {
    key: 'transferRecordForm',
    formType: 'normal',
    api: transferRecordApi.api,
    actions: {
        save: transferRecordApi.save,
        update: transferRecordApi.update,
        get: transferRecordApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'transferRecord'
    },
    labelCol: 6,
    wrapperCol: 18,
    config: {},
    formItems: [
        {
            key: 'receiveCompany',
            label: '调出单位',
            placeholder: '请选择',
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
            key: 'transferTime',
            label: '调出时间',
            placeholder: '请选择时间',
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
