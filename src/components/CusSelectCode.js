import {h, reactive} from 'vue'
import { dictionaryApi } from '@/service/index'

export default {
    name: 'CusSelectCode',
    props: {
        def: {
            type: Object,
            required: true
        },
        value: {}
    },
    emits: ['change'],
    setup (props) {
        let options = reactive([])
        props.def?.meta?.code && dictionaryApi.getByCode(props.def.meta.code).then(res => {
            const { isSuccess, data, msg } = res
            if (isSuccess) {
                options = data[props.code]
            } else {
                Promise.reject(`HRMS: Component 'select code' initializing failed for ${props.code} : ${msg}`)
            }
        })
        return {
            options
        }
    },
    render() {
        const { options, def, value } = this
        return h(
            <a-select></a-select>,
            {
                placeholder: def.placeholder,
                value: value,
                'onChange': nv => this.$emit('change', nv),
            },
            {
                default: () => {
                    return options.map(i => {
                        return h(
                            <a-select-option>{i.text}</a-select-option>,
                            {
                                value: i.value
                            }
                        )
                    })
                }
            }
        )
    }
}
