import {h, inject, ref, resolveComponent, watch} from "vue";

export default {
    name: 'CusSelectList',
    props: ['def', 'value', 'changeBy'],
    emits: ['change'],
    setup(props) {
        const list = props.def.meta.list
        const options = ref([])
        const formModel = inject('formModel', {})
        const paramName = props.changeBy?.param
        watch(formModel, nv => {
            let param = {}
            paramName && (param[paramName] = nv[props.changeBy.key])
            param[paramName] && init(param)
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
            formModel,
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
                'onChange': nv => this.$emit('change', nv)
            },
            {
                default: () => [
                    optionDom
                ]
            }
        )
    }
}
