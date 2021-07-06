import {departmentApi, employeeApi, rewardApi} from "@/service";

export const tableDef = {
    key: 'reward',
    title: '职工奖惩',
    actions: {
        page: rewardApi.page,
        add: rewardApi.save,
        update: rewardApi.update,
        remove: rewardApi.remove,
        get: rewardApi.get
    },
    defaultActions: {
        add: true,
        update: true,
        remove: false,
        detail: true
    },
    routes: {
        add: '/reward/form',
        edit: '/reward/form',
        detail: '/reward/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'reward',
        set: 'setReward'
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
                key: 'apType',
                label: '奖惩类型',
                placeholder: '请选择奖惩类型',
                inputType: 'select:code',
                rules: [],
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息',
                    code: 'ap_type'
                }
            },
            {
                key: 'apTitle',
                label: '标题',
                placeholder: '请输入标题',
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
            title: '职工姓名',
            dataIndex: 'employeeId',
            width: 130,
            scopedSlots: {customRender: 'employeeId'}
        },
        {
            title: '标题',
            dataIndex: 'apTitle',
            width: 120,
            scopedSlots: {customRender: 'apTitle'}
        },
        {
            title: '奖惩类型',
            dataIndex: 'apType',
            width: 120,
            scopedSlots: {customRender: 'apType'}
        },
        {
            title: '惩罚等级',
            dataIndex: 'apLevel',
            width: 120,
            scopedSlots: {customRender: 'apLevel'}
        },
        {
            title: '奖惩金额',
            dataIndex: 'apAmount',
            width: 120,
            scopedSlots: {customRender: 'apAmount'}
        },
        {
            title: '奖惩日期',
            dataIndex: 'apTime',
            width: 140,
            scopedSlots: {customRender: 'apTime'}
        },
        {
            title: '奖惩单位',
            dataIndex: 'awardUnit',
            width: 140,
            scopedSlots: {customRender: 'awardUnit'}
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 140,
            scopedSlots: {customRender: 'createTime'}
        }
    ]
}

export const formDef = {
    key: 'rewardForm',
    formType: 'normal',
    api: rewardApi.api,
    actions: {
        save: rewardApi.save,
        update: rewardApi.update,
        get: null
    },
    store: {
        module: 'employeeStore',
        key: 'reward'
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
            key: 'apTitle',
            label: '标题',
            placeholder: '请输入标题',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'apType',
            label: '奖惩类型',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'ap_type'
            }
        },
        {
            key: 'apLevel',
            label: '奖惩级别',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'hr_award_level'
            }
        },
        {
            key: 'punishType',
            label: '惩罚类型',
            placeholder: '请选择',
            inputType: 'select:code',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息',
                code: 'hr_punish_type'
            }
        },
        {
            key: 'apAmount',
            label: '惩罚金额',
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
            key: 'apTime',
            label: '奖惩日期',
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
            key: 'deadDate',
            label: '结束日期',
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
            key: 'awardUnit',
            label: '奖惩单位',
            placeholder: '请输入单位名称',
            inputType: 'input:string',
            rules: [],
            meta: {
                submit: true,
                scope: ['form', 'detail'],
                group: '基本信息'
            }
        },
        {
            key: 'apReason',
            label: '奖惩原因',
            placeholder: '请输入原因',
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
            placeholder: '请输入备注信息',
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
