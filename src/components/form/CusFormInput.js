// eslint-disable-next-line no-unused-vars
import {h, resolveComponent} from 'vue'
import CusSelectCode from "@/components/form/select/CusSelectCode";
import CusSelectSearch from "@/components/form/select/CusSelectSearch";

export default {
    name: 'CusFormInput',
    props: {
        item: {
            type: Object,
            required: true
        },
        value: {}
    },
    components: {
        CusSelectCode
    },
    emits: ['change'],
    render() {
        const {item, value} = this
        let input
        switch (item.inputType) {
            case 'input:string':
                input = h(
                    resolveComponent('a-input'),
                    {
                        placeholder: item.placeholder,
                        value: value,
                        'onChange': nv => this.$emit('change', nv.target.value)
                    }
                )
                break
            case 'select':
                input = h(
                    resolveComponent('a-select'),
                    {
                        placeholder: item.placeholder,
                        value: value,
                        'onChange': nv => this.$emit('change', nv)
                    },
                    {
                        default: () => {
                            return item?.meta.options?.map(o => {
                                return h(
                                    // <a-select-option>{o.text}</a-select-option>,
                                    resolveComponent('a-select-option'),
                                    {
                                        value: o.value
                                    },
                                    {
                                        default: () => o.text
                                    }
                                )
                            })
                        }
                    }
                )
                break
            case 'select:code':
                input = h(
                    CusSelectCode,
                    {
                        def: item,
                        value: value,
                        'onChange': val => this.$emit('change', val)
                    }
                )
                break
            case 'select:search':
                input = h(
                    CusSelectSearch,
                    {
                        def: item,
                        value: value,
                        'onChange': val => {
                            this.$emit('change', val)
                        }
                    }
                )
                break
            case 'input:psw':
                input = h(
                    resolveComponent('a-input-password'),
                    {
                        placeholder: item.placeholder,
                        value: value,
                        'onChange': $event => this.$emit('change', $event.target.value)
                    }
                )
                break

        }
        return input
    }
}
