import {SearchOutlined} from "@ant-design/icons-vue";
import CusEmbedTable from "@/components/form/CusEmbedTable";
// eslint-disable-next-line no-unused-vars
import {h, ref, resolveComponent} from "vue";

export default {
    name: 'CusSelectSearch',
    props: ['value', 'def'],
    emits: ['change'],
    components: {
        SearchOutlined, CusEmbedTable
    },
    setup(props) {
        const tableVisible = ref(false)
        const openMenu = ref(false)
        const onMore = () => {
            tableVisible.value = !tableVisible.value
        }
        let options = ref([])
        let fetching = ref(false)
        const {action, keyword} = props.def.meta.search ?? {action: undefined, keyword: undefined}

        const search = (arg) => {
            const parameter = {}
            parameter[keyword] = arg
            fetching = true
            openMenu.value = false
            action(parameter).then(res => {
                const {isSuccess, data} = res
                if (isSuccess) {
                    options.value = []
                    data.forEach(i => {
                        options.value.push({
                            value: i.id,
                            text: i[keyword]
                        })
                    })
                }
                fetching = false
                openMenu.value = true
            })
        }

        return {
            onMore,
            search,
            tableVisible,
            options,
            fetching,
            openMenu
        }
    },
    render() {
        const self = this

        const optionsDom = self.options.map(o => {
            return <a-select-option value={o.value}>
                {o.text}
            </a-select-option>
        })

        return h(
            resolveComponent('a-select'),
            {
                placeholder: self.def.placeholder,
                showSearch: true,
                value: self.value,
                'onChange': nv => this.$emit('change', nv),
                'onFocus': () => {
                    if (!self.options?.length > 0) {
                        self.tableVisible = true
                    }
                },
                notFoundContent: self.fetching ? undefined : null
            },
            {
                suffixIcon: () => {
                    return [
                        h(
                            resolveComponent('SearchOutlined'),
                            {
                                onClick: self.onMore
                            }
                        ),
                        h(
                            CusEmbedTable,
                            {
                                visible: self.tableVisible,
                                'onUpdate': val => {
                                    self.tableVisible = val
                                },
                                searchDef: self.def.meta.searchDef,
                                tableDef: self.def.meta.tableDef,
                                'onSelected': val => {
                                    self.options.push(val)
                                    self.$emit('change', val.value)
                                }
                            }
                        )
                    ]
                },
                default: () => optionsDom
            }
        )
    }
}
