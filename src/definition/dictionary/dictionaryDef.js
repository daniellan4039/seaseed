import {dictionaryApi} from "@/service";

export const tableDef = {
    key: 'dictionary',
    title: '基础数据',
    actions: {
        page: dictionaryApi.page,
        add: dictionaryApi.save,
        update: dictionaryApi.update,
        remove: dictionaryApi.remove,
        get: dictionaryApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: true,
        detail: true
    },
    routes: {
        add: '/dictionary/form',
        edit: '/dictionary/form',
        detail: '/dictionary/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'dictionary',
        set: 'setDictionary'
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
        formItems: []
    },
    columns: [
        {
            title: '编码值',
            dataIndex: 'dictValue',
            width: 80,
            ellipsis: true,
            scopedSlots: {customRender: 'dictValue'}
        },
        {
            title: '名称',
            dataIndex: 'dictTxt',
            width: 160,
            ellipsis: true,
            scopedSlots: {customRender: 'dictTxt'}
        },
        {
            title: '备注',
            dataIndex: 'remark',
            width: 180,
            ellipsis: true,
            scopedSlots: {customRender: 'remark'}
        },
        {
            title: '排序',
            dataIndex: 'dictSort',
            width: 80,
            ellipsis: true,
            scopedSlots: {customRender: 'dictSort'}
        },
        {
            title: '只读',
            dataIndex: 'readonly',
            width: 80,
            ellipsis: true,
            scopedSlots: {customRender: ''}
        },
        {
            title: '启动',
            dataIndex: 'enable',
            width: 80,
            ellipsis: true,
            scopedSlots: {customRender: 'enable'}
        }
    ]
}

export const formDef = {
    key: 'dictionaryForm',
    formType: 'normal',
    api: dictionaryApi.api,
    actions: {
        save: dictionaryApi.save,
        update: dictionaryApi.update,
        get: dictionaryApi.get
    },
    store: {
        module: 'employeeStore',
        key: 'dictionary'
    },
    labelCol: 6,
    wrapperCol: 18,
    config: {},
    formItems: [
        {
            key: 'dictValue',
            label: '编码值',
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
            key: 'dictTxt',
            label: '名称',
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
            key: 'dictSort',
            label: '排序',
            placeholder: '请输入',
            inputType: 'input:num',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'dictTags',
            label: '标签',
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
            key: 'dictExt',
            label: '扩充字段',
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
            key: 'remark',
            label: '备注',
            placeholder: '请输入',
            inputType: 'input:area',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'readOnly',
            label: '是否只读',
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
        }
    ]
}
