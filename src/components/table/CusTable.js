// eslint-disable-next-line no-unused-vars
import {computed, h, reactive, ref, watch} from "vue";
import CusTableOpsBar from '@/components/table/CusTableOperationBar'
import _ from 'lodash'

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
        }
    },
    emits: ['addNew', 'edit', 'detail', 'delete'],
    components: {
        CusTableOpsBar
    },
    setup(props, ctx) {
        const columnKeys = reactive([])
        let dataSource = ref({records: [], total: 0})
        let rowIndex = ref(0)
        let loading = ref(true)
        let pageParams = reactive({
            current: 1,
            extra: {},
            model: {},
            order: 'descending',
            size: 10,
            sort: 'id'
        })
        const {page} = props.tableDef.actions
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
            return dataSource.value.records.map((i) => {
                const echoMap = i?.echoMap
                let alterRecord = {}
                _.assign(alterRecord, i)
                if (echoMap) {
                    for (const echoMapKey in echoMap) {
                        alterRecord[echoMapKey] = echoMap[echoMapKey]
                    }
                }
                alterRecord.key = i.id
                alterRecord['index'] = ++rowIndex.value
                return alterRecord
            })
        })
        const searchPage = () => {
            loading.value = true
            page(pageParams).then(res => {
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
            ctx.emit('edit', arg)
        }
        const onDeleteBtnClick = (arg) => {
            ctx.emit('delete', arg)
        }
        const onDetailBtnClick = (arg) => {
            ctx.emit('detail', arg)
        }
        const onPageChange = (page, pageSize) => {
            pageParams.current = page
            pageParams.size = pageSize
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
            onPageChange
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push({
                path: route
            })
            this.$emit('addNew', route)
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
                pagination: {
                    current: self.pageParams.current,
                    pageSize: self.pageParams.size,
                    total: self.dataSource.total??0,
                    onChange: self.onPageChange
                },
                loading: self.loading,
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
        const opsBar = <cus-table-ops-bar/>
        return h(
            'div',
            null,
            [
                opsBar,
                h(
                    table,
                    null
                )
            ]
        )
    }

}
