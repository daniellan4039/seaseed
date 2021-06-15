import {SearchOutlined} from "@ant-design/icons-vue";
import CusEmbedTable from "@/components/form/CusEmbedTable";
import {h, ref} from "vue";

export default {
    name: 'CusSelectSearch',
    props: ['value', 'def'],
    emits: ['change'],
    components: {
        SearchOutlined, CusEmbedTable
    },
    // eslint-disable-next-line no-unused-vars
    setup(props) {
        const tableVisible = ref(false)
        const onMore = () => {
            tableVisible.value = !tableVisible.value
        }

        return {
            onMore,
            tableVisible
        }
    },
    render() {
        const self = this
        const slots = {
            suffixIcon: () => [
                <SearchOutlined onClick={self.onMore}/>,
                h(
                    <cus-embed-table/>,
                    {
                        visible: self.tableVisible,
                        'onUpdate': val => {
                            self.tableVisible = val
                        },
                        searchDef: self.def.meta.searchDef,
                        tableDef: self.def.meta.tableDef
                    }
                )
            ]
        }
        return <a-select show-search v-slots={slots} placeholder={self.def.placeholder}>
            <a-select-option value='sss'>sss</a-select-option>
        </a-select>
    }
}
