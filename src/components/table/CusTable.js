import {computed, h, reactive, ref, watch} from "vue";
import CusTableOpsBar from '@/components/table/CusTableOperationBar'
import _ from 'lodash'
import router from "@/router";
import store from '@/store/index'
import {Modal} from "ant-design-vue";

// eslint-disable-next-line no-unused-vars
const indexCol = {
    key: 'Index',
    title: '序号',
    dataIndex: 'index',
    width: 80
}
const actionCol = {
    title: '操作',
    dataIndex: 'action',
    width: 130,
    fixed: 'right',
    slots: {customRender: 'action'}
}

export default {
    name: 'CusTable',
    props: {
        tableDef: {
            type: Object,
            required: true
        },
        opsBarVisible: {
            type: Boolean,
            default: true
        },
        config: {
            type: Object,
            default: null
        },
        searchModel: {
            type: Object,
            default: {}
        },
        refresh: {
            type: Number,
            default: 0
        }
    },
    emits: ['addNew', 'edit', 'detail', 'delete'],
    components: {
        CusTableOpsBar
    },
    setup(props, ctx) {
        const columnKeys = ref([])
        props.tableDef.columns.forEach(c => {
            columnKeys.value.push(c.dataIndex)
        })
        let dataSource = ref({records: [], total: 0})
        let loading = ref(true)
        let pageParams = reactive({
            current: 1,
            extra: {},
            order: 'descending',
            size: 10,
            sort: 'id'
        })
        const {page, get, remove} = props.tableDef.actions
        const tableSize = ref('default')
        const columnsParsed = computed(() => {
            const tempCols = props.tableDef?.columns
            const x = tempCols.filter(t => {
                if (columnKeys.value.includes(t.dataIndex)) {
                    return t
                }
            })
            x.splice(0,0,indexCol)
            x.push(actionCol)
            return x
        })
        const tableWidth = computed(() => {
            let width = 0
            columnsParsed.value.forEach(i => {
                width += i.width ?? 0
            })
            return width
        })
        const dataSourceParsed = computed(() => {
            return dataSource.value.records.map((i, k) => {
                const echoMap = i?.echoMap
                let alterRecord = {}
                _.assign(alterRecord, i)
                if (echoMap) {
                    for (const echoMapKey in echoMap) {
                        alterRecord[echoMapKey] = echoMap[echoMapKey]
                    }
                }
                alterRecord.key = i.id
                alterRecord['index'] = (pageParams.current - 1) * pageParams.size + k + 1
                alterRecord.raw = i
                return alterRecord
            })
        })

        const searchPage = () => {
            loading.value = true
            let searchParams = {}
            _.assign(searchParams, pageParams, {model: props.searchModel})
            page(searchParams).then(res => {
                const {isSuccess, data} = res
                isSuccess && (dataSource.value = data)
                loading.value = false
            })
        }

        watch(pageParams, () => {
            searchPage()
        })

        // event methods
        const onEditBtnClick = (arg) => {
            const {record} = arg
            get({id: record.raw.id}).then(res => {
                const {isSuccess, data} = res
                if (isSuccess) {
                    store.dispatch(props.tableDef.store.set, data)
                    navigateTo(props.tableDef.routes.edit)
                    ctx.emit('edit', arg)
                } else {
                    Modal.warn({
                        title: '提示',
                        content: '服务器正在维护中，请稍后，如果急需处理，请联系管理员'
                    })
                }
            })

        }
        const onDeleteBtnClick = (arg) => {
            const {record} = arg
            Modal.confirm({
                title: '提示',
                content: '你确定要将这条记录从系统中删除吗？',
                onOk() {
                    remove({id: record.id}).then(res => {
                        // eslint-disable-next-line no-unused-vars
                        const {isSuccess, data} = res
                    })
                },
                onCancel() {
                }
            })
            ctx.emit('delete', arg)
        }
        const onDetailBtnClick = (arg) => {
            const {record} = arg
            get({id: record.raw.id}).then(res => {
                const {isSuccess, data} = res
                if (isSuccess) {
                    store.dispatch(props.tableDef.store.set, data)
                    navigateTo(props.tableDef.routes.detail)
                    ctx.emit('edit', arg)
                } else {
                    Modal.warn({
                        title: '提示',
                        content: '服务器正在维护中，请稍后，如果急需处理，请联系管理员'
                    })
                }
            })
        }
        const onPageChange = (page, pageSize) => {
            pageParams.current = page
            pageParams.size = pageSize
        }
        const navigateTo = (route) => {
            router.push({
                path: route
            })
            ctx.emit('addNew', route)
        }
        const addNewRecord = () => {
            store.dispatch(props.tableDef.store.set, null)
            navigateTo(props.tableDef.routes.add)
        }
        const onSettingChange = (columns) => {
            columnKeys.value = columns
        }

        return {
            columnKeys,
            columnsParsed,
            tableWidth,
            dataSourceParsed,
            dataSource,
            pageParams,
            loading,
            tableSize,
            searchPage,
            onEditBtnClick,
            onDeleteBtnClick,
            onDetailBtnClick,
            onPageChange,
            navigateTo,
            addNewRecord,
            onSettingChange
        }
    },
    watch: {
        refresh() {
            this.searchPage()
        }
    },
    mounted() {
        this.searchPage()
    },
    render() {
        const self = this

        const table = h(
            <a-table/>,
            {
                columns: self.columnsParsed,
                dataSource: self.dataSourceParsed,
                rowClassName: (record, index) => (index % 2 === 1 ? 'table-striped' : null),
                scroll: {x: self.tableWidth},
                pagination: {
                    current: self.pageParams.current,
                    pageSize: self.pageParams.size,
                    total: self.dataSource.total ?? 0,
                    onChange: self.onPageChange
                },
                loading: self.loading,
                ...self.config,
                ...self.tableDef?.config,
                size: self.tableSize
            },
            {
                ...this.$slots,
                action: (arg) => {
                    const actionBar = h(
                        'span',
                        null,
                        {
                            default: () => {
                                const {update, detail, remove} = self.tableDef.defaultActions
                                const children = []
                                update && children.push(<a onClick={() => self.onEditBtnClick(arg)}>编辑</a>)
                                detail && children.push(<a-divider type='vertical'/>) && children.push(<a onClick={() => self.onDetailBtnClick(arg)}>详情</a>)
                                remove && children.push(<a onClick={() => self.onDeleteBtnClick(arg)}>删除</a>)
                                return children
                            }
                        }
                    )
                    return this.$slots.action ? this.$slots.action(arg) : actionBar
                }
            }
        )
        const opsBar = self.opsBarVisible ?
            <cus-table-ops-bar
                tableKey={self.tableDef.key}
                onAdd={self.addNewRecord}
                columns={self.tableDef?.columns}
                onSettingChange={self.onSettingChange}
                v-model={[self.tableSize, 'density']}
            /> :
            null
        return h(
            'div',
            null,
            [
                opsBar,
                h(
                    table,
                    null,
                )
            ]
        )
    }

}
