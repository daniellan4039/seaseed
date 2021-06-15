import {computed, h, reactive} from "vue";
import CusTableOpsBar from '@/components/table/CusTableOperationBar'
import _ from 'lodash'

const indexCol = {
    key: 'ID',
    title: '序号',
    dataIndex: 'id',
    width: 80
}

export default {
    name: 'CusTable',
    props: {
        tableDef: {
            type: Object,
            required: true
        },
        dataSource: {
            type: Array,
            default: []
        }
    },
    components: {
        CusTableOpsBar
    },
    setup(props) {
        const columnKeys = reactive([])
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
            return props.dataSource.map(i => {
                const echoMap = i?.echoMap
                if (echoMap) {
                    for (const echoMapKey in echoMap) {
                        i[echoMapKey] = echoMap[echoMapKey]
                    }
                }
                return i
            })
        })

        return {
            columnKeys,
            columnsParsed,
            tableWidth,
            dataSourceParsed
        }
    },
    render() {
        const self = this
        // eslint-disable-next-line no-unused-vars
        const table = h(
            <a-table></a-table>,
            {
                columns: self.columnsParsed,
                dataSource: self.dataSourceParsed,
                // rowClassName:"(record, index) => (index % 2 === 1 ? 'table-striped' : null)",
                ...self.tableDef?.config
            }
        )
        const opsBar = <cus-table-ops-bar></cus-table-ops-bar>
        return h(
            <div></div>,
            null,
            {
                default: () => {
                    return [
                        opsBar,
                        table
                    ]
                }
            }
        )
    }

}
