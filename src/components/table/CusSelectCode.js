import {h, ref} from 'vue'
import {dictionaryApi} from '@/service'

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
        let options = ref([])
        const initialize = () => {
             props.def?.meta?.code && dictionaryApi.getByCode({ codes: props.def.meta.code }).then(res => {
                const { isSuccess, data, msg } = res
                if (isSuccess) {
                    options.value = data[props.def.meta.code]
                } else {
                    Promise.reject(`HRMS: Component 'select code' initializing failed for ${props.code} : ${msg}`)
                }
            })
        }
        return {
            options,
            initialize
        }
    },
    mounted() {
        this.initialize()
    },
    render() {
        let self = this
        return h(
            <a-select></a-select>,
            {
                placeholder: self.def.placeholder,
                value: self.value,
                'onChange': nv => this.$emit('change', nv),
            },
            {
                default: () => {
                    return self.options.map(i => {
                        return h(
                            <a-select-option>{i.dictTxt}</a-select-option>,
                            {
                                value: i.dictValue
                            }
                        )
                    })
                }
            }
        )
    }
}
