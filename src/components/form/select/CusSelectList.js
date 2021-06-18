import {h, ref, resolveComponent} from "vue";

export default {
    name: 'CusSelectList',
    props: ['def', 'value'],
    emits: ['change'],
    setup(props) {
        const list = props.def.meta.list
        const options = ref([])
        if (list) {
            list().then(res => {
                const {isSuccess, data} = res
                if (isSuccess) {
                    options.value = data
                }
            })
        }
        return {
            options
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
