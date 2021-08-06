import store from "@/store";
import {h, ref, resolveComponent} from "vue";

export default {
    name: 'CusDescription',
    props: ['formDef'],
    emits: [],
    setup(props) {
        const defaultModel = ref({})
        const pageMap = ref({})

        if (props.formDef.store) {
            const module = props.formDef.store?.module
            const key = props.formDef.store?.key
            if (module && key) {
                defaultModel.value = store.state[module][key]
            } else if(!module && key) {
                defaultModel.value = store.state[key]
            }
            const echoMap = defaultModel.value?.echoMap
            for (let echoMapKey in echoMap) {
                if (echoMapKey === 'employeeId') {
                    defaultModel.value[echoMapKey] = echoMap[echoMapKey].realName
                } else {
                    defaultModel.value[echoMapKey] = echoMap[echoMapKey]
                }
            }
        }

        props.formDef.formItems?.forEach(fi => {
            if (fi.meta?.scope?.includes('detail')) {
                const groupName = fi.meta?.group ?? '基本信息'
                const length = pageMap.value[groupName]?.length
                !length && (pageMap.value[groupName] = [])
                let label = defaultModel?.value?.[fi.key] ?? '未知'
                if (typeof label === 'boolean') {
                    label = label ? '是' : '否'
                }
                pageMap.value[groupName].push({
                    label: fi.label,
                    value: label,
                    span: fi.meta?.detailSpan ?? 1
                })
            }
        })
        return {
            defaultModel,
            pageMap
        }
    },
    render() {
        const {pageMap} = this
        const desPanes = []
        for (let pageMapKey in pageMap) {
            const desItems = pageMap[pageMapKey].map(i => {
                return h(
                    resolveComponent('a-descriptions-item'),
                    {
                        label: i.label,
                        span: i.span
                    },
                    {
                        default: () => i.value
                    }
                )
            })
            const desBlock = h(
                resolveComponent('a-descriptions'),
                {
                    title: pageMapKey,
                    size: 'small',
                    column: 1,
                    bordered: true,
                    // column: this.formDef?.meta?.columns ?? 3,
                    ...this.formDef?.config
                },
                {
                    default: () => desItems
                }
            )
            desPanes.push(desBlock)
        }
        return <div class='des-block'>
            {desPanes}
        </div>
    }
}
