import {computed, h, reactive, ref, resolveComponent, watch} from "vue"
import CusTableOpsBar from '@/components/table/CusTableOperationBar'
import _ from 'lodash'
import router from "@/router"
import store from '@/store/index'
import {Modal} from "ant-design-vue"
import CusTableAction from "@/components/table/CusTableAction";

const indexCol = {
    key: 'Index',
    title: '序号',
    dataIndex: 'index',
    width: 80
}
const actionCol = {
    title: '操作',
    dataIndex: 'action',
    width: 160,
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
        },
        adaptHeight: {
            type: Boolean,
            default: true
        },
        useDefaultPagination: {
            type: Boolean,
            default: false
        },
        extraActions: {
            type: Array,
            default: []
        },
        showActionCol: {
            type: Boolean,
            default: true
        }
    },
    emits: ['addNew', 'edit', 'detail', 'delete'],
    components: {
        CusTableOpsBar, CusTableAction
    },
    setup(props, ctx) {
        const actionColWrapper = reactive(actionCol)

        const columnKeys = ref([])
        props.tableDef?.columns?.forEach(c => {
            columnKeys.value.push(c.dataIndex)
        })
        let dataSource = ref({records: [], total: 0})
        let loading = ref(true)
        let pageParams = reactive({
            current: 1,
            extra: {},
            order: 'descending',
            size: 20,
            sort: 'id'
        })
        const {page, get, remove} = props.tableDef?.actions ?? { page: null, get: null, remove: null}
        const tableSize = ref('default')
        const columnsParsed = computed(() => {
            const tempCols = props.tableDef?.columns
            const x = tempCols.filter(t => {
                if (columnKeys.value.includes(t.dataIndex)) {
                    return t
                }
            })
            x.splice(0, 0, indexCol)
            if (props.tableDef.defaultActions) {
                props.showActionCol && x.push(actionColWrapper)
            }
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
                        if (echoMapKey === 'employeeId') {
                            alterRecord[echoMapKey] = echoMap[echoMapKey].realName??echoMap[echoMapKey]??'未知'
                        } else {
                            alterRecord[echoMapKey] = echoMap[echoMapKey]
                        }
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
                    remove(record.id).then(res => {
                        // eslint-disable-next-line no-unused-vars
                        const {isSuccess, data, msg} = res
                        if (isSuccess) {
                            searchPage()
                        } else {
                            Modal.warn({
                                title: '提示',
                                content: msg
                            })
                        }
                    }).catch(() => {
                        Modal.warn({
                            title: '提示',
                            content: '系统删除功能正在维护中，请稍后再试试'
                        })
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
            actionColWrapper,
            searchPage,
            onEditBtnClick,
            onDeleteBtnClick,
            onDetailBtnClick,
            onPageChange,
            navigateTo,
            addNewRecord,
            onSettingChange,
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
        const tableScroll = {x: self.tableWidth, y: 500}
        if (self.adaptHeight) {
            const height = document.getElementById('HRMS_TABLE_CONTAINER')?.clientHeight
            tableScroll.y = height - 120 - 32 - 24
            if (self.tableSize === 'small') {
                tableScroll.y += 28
            } else if (self.tableSize === 'middle') {
                tableScroll.y += 8
            }
        }
        let otherOpsSlot = {
            otherOps: () => this.$slots.otherOps ? this.$slots.otherOps() : null
        }
        if (tableScroll.y < 200) {
            (tableScroll.y = 200)
        }
        const table = h(
            resolveComponent('a-table'),
            {
                columns: self.columnsParsed,
                dataSource: self.dataSourceParsed,
                rowClassName: (record, index) => (index % 2 === 1 ? 'table-striped' : null),
                scroll: tableScroll,
                pagination: this.useDefaultPagination,
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
                                const {update, detail, remove} = self.tableDef?.defaultActions ?? {
                                    update: false,
                                    detail: false,
                                    remove: false
                                }
                                const children = []
                                update && children.push({
                                    name: '编辑',
                                    onClick: () => self.onEditBtnClick(arg)
                                })
                                detail && children.push({
                                    name: '详细',
                                    onClick: () => self.onDetailBtnClick(arg)
                                })
                                remove && children.push({
                                    name: '删除',
                                    onClick: () => self.onDeleteBtnClick(arg)
                                })
                                this.extraActions.forEach(a => {
                                    const action = {
                                        name: a.name,
                                        onClick: () => a.onClick(arg)
                                    }
                                    children.push(action)
                                })
                                const actionsBar = <cus-table-action actions={children}/>
                                return [
                                    actionsBar
                                ]
                            }
                        }
                    )
                    return this.$slots.action ? this.$slots.action(arg) : actionBar
                }
            }
        )
        const { add } = self.tableDef?.defaultActions ?? { add: false }
        const opsBar = self.opsBarVisible ?
            <cus-table-ops-bar
                tableKey={self.tableDef.key}
                onAdd={self.addNewRecord}
                columns={self.tableDef?.columns}
                onSettingChange={self.onSettingChange}
                v-model={[self.tableSize, 'density']}
                enableAdd={add}
                v-slots={otherOpsSlot}
            /> : null
        const pagination = !this.useDefaultPagination ? <div className='bottom-right'>
            <a-pagination
                current={self.pageParams.current}
                pageSize={self.pageParams.size}
                total={self.dataSource.total ?? 0}
                onChange={self.onPageChange}
                onShowSizeChange={self.onPageChange}
                showQuickJumper={true}
                showSizeChanger={true}
                size={self.tableSize}
            />
        </div> : null
        return h(
            'div',
            {
                id: 'HRMS_TABLE_CONTAINER',
                style: {
                    height: '100%',
                    maxHeight: '100%',
                    position: 'relative'
                }
            },
            [
                opsBar,
                table,
                pagination
            ]
        )
    }

}
