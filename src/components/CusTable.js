import {computed, h, reactive} from "vue";
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
                width += i.width??0
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
        const { tableDef, columnsParsed, dataSourceParsed} = this
        return h(
            <a-table></a-table>,
            {
                columns: columnsParsed,
                dataSource: dataSourceParsed,
                bordered: tableDef.bordered
            })
    }

}
