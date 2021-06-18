import store from "@/store";
import {h, ref, resolveComponent} from "vue";

export default {
    name: 'CusDescription',
    props: ['formDef'],
    emits: [],
    setup(props) {
        //get model from store
        const defaultModel = ref({})
        if (props.formDef.store) {
            const module = props.formDef.store?.module
            const key = props.formDef.store?.key
            module && key && (defaultModel.value = store.state[module][key])
            const echoMap = defaultModel.value?.echoMap
            for (let echoMapKey in echoMap) {
                defaultModel.value[echoMapKey] = echoMap[echoMapKey]
            }
        }
        const pageMap = ref({})
        props.formDef.formItems?.map(fi => {
            if (fi.meta?.scope.includes('detail')) {
                const groupName = fi.meta?.group ?? '基本信息'
                if (groupName) {
                    const length = pageMap.value[groupName]?.length
                    !length && (pageMap.value[groupName] = [])
                    pageMap.value[groupName].push({
                        label: fi.label,
                        value: defaultModel?.value?.[fi.key] ?? '未知'
                    })
                }
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
                    <a-descriptions-item/>,
                    {
                        label: i.label
                    },
                    {
                        default: () => i.value
                    }
                )
            })
            const desBlock = h(
                resolveComponent('a-descriptions'),
                {
                    title: pageMapKey
                },
                {
                    default: () => desItems
                }
            )
            desPanes.push(desBlock)
        }
        return <div>
            {desPanes}
        </div>
    }
}
