import {archiveRoomApi, companyApi} from "@/service";

export const tableDef = {
    key: 'archiveRoom',
    title: '档案室管理',
    actions: {
        page: archiveRoomApi.page,
        add: archiveRoomApi.save,
        update: archiveRoomApi.update,
        remove: archiveRoomApi.remove,
        get: archiveRoomApi.get
    },
    defaultActions: {
        add: false,
        update: false,
        remove: false,
        detail: true
    },
    routes: {
        add: '/archiveRoom/form',
        edit: '/archiveRoom/form',
        detail: '/archiveRoom/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'archiveRoom',
        set: 'setArchiveRoom'
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
                key: 'manageCompanyId',
                label: '管理单位',
                placeholder: '请输入管理单位',
                inputType: 'input:string',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
            {
                key: 'archiveCode',
                label: '档案室编号',
                placeholder: '请输入编号',
                inputType: 'input:string',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            },
            {
                key: 'roomName',
                label: '档案室名称',
                placeholder: '请输入名称',
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
            title: '档案室编号',
            dataIndex: 'archiveCode',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'archiveCode'}
        },
        {
            title: '档案室名称',
            dataIndex: 'roomName',
            width: 120,
            ellipsis: true,
            slots: {customRender: ''}
        },
        {
            title: '管理单位',
            dataIndex: 'manageCompanyId',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'manageCompanyId'}
        }
    ]
}

export const formDef = {
    key: 'archiveRoomForm',
    formType: 'normal',
    api: archiveRoomApi.api,
    actions: {
        save: archiveRoomApi.save,
        update: archiveRoomApi.update,
        get: archiveRoomApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'archiveRoom'
    },
    labelCol: 6,
    wrapperCol: 18,
    config: {},
    formItems: [
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
            }
        },
        {
            key: 'archiveCode',
            label: '档案室编号',
            placeholder: '请输入编号',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'roomName',
            label: '档案室名称',
            placeholder: '请输入名称',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'address',
            label: '位置',
            placeholder: '请输入位置',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
    ]
}
