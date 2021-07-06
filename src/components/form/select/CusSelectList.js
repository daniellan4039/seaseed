import {h, ref, resolveComponent, watch} from "vue";

export default {
    name: 'CusSelectList',
    props: ['def', 'value', 'dependentKey'],
    emits: ['change'],
    setup(props) {
        const list = props.def.meta.list
        const options = ref([])
        const refDependentKey = ref(props.dependentKey)

        watch(refDependentKey, nv => {
            init(nv)
        })

        const init = (value) => {
            if (list) {
                list(value).then(res => {
                    const {isSuccess, data} = res
                    if (isSuccess) {
                        options.value = data
                    }
                })
            }
        }

        init(null)

        return {
            options,
            init
        }
    },
    render() {
        const self = this
        const optionDom = self.options.map(i => {
            return <a-select-option value={i.id}>
                {i[self.def.meta.text]}
            </a-select-option>
        })
        return h(
            resolveComponent('a-select'),
            {
                placeholder: self.def.placeholder,
                showSearch: true,
                value: self.value,
                'onChange':nv => this.$emit('change', nv)
            },
            {
                default: () => optionDom
            }
        )
    }
}
