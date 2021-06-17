import {computed, h, reactive, ref, watch} from "vue";
import CusTableOpsBar from '@/components/table/CusTableOperationBar'
import _ from 'lodash'
import router from "@/router";
import store from '@/store/index'
import {Modal} from "ant-design-vue";

const indexCol = {
    key: 'Index',
    title: '序号',
    dataIndex: 'index',
    width: 80
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
        const columnKeys = reactive([])
        let dataSource = ref({records: [], total: 0})
        let loading = ref(true)
        let pageParams = reactive({
            current: 1,
            extra: {},
            order: 'descending',
            size: 10,
            sort: 'id'
        })
        const {page, get} = props.tableDef.actions
        const columnsParsed = computed(() => {
            const tempCols = [indexCol, ...props.tableDef?.columns]
            if (columnKeys.length === 0) {
                return tempCols
            } else {
                return _.pick(tempCols, columnKeys)
            }
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

        return {
            columnKeys,
            columnsParsed,
            tableWidth,
            dataSourceParsed,
            dataSource,
            pageParams,
            loading,
            searchPage,
            onEditBtnClick,
            onDeleteBtnClick,
            onDetailBtnClick,
            onPageChange,
            navigateTo,
            addNewRecord
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
                ...self.tableDef?.config
            },
            {
                ...this.$slots,
                action: (arg) => {
                    const actionBar = <span>
                        <a onClick={() => self.onEditBtnClick(arg)}>编辑</a>
                        <a-divider type='vertical'/>
                        <a onClick={() => self.onDetailBtnClick(arg)}>详情</a>
                        <a-divider type='vertical'/>
                        <a onClick={() => self.onDeleteBtnClick(arg)}>删除</a>
                    </span>
                    return this.$slots.action ? this.$slots.action(arg) : actionBar
                }
            }
        )
        const opsBar = self.opsBarVisible ? <cus-table-ops-bar onAdd={self.addNewRecord}/> : null
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
