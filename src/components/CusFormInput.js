// eslint-disable-next-line no-unused-vars
import {h} from 'vue'
import CusSelectCode from "@/components/CusSelectCode";

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
                    <a-input/>,
                    {
                        placeholder: item.placeholder,
                        value: value,
                        'onChange': nv => this.$emit('change', nv.target.value)
                    }
                )
                break
            case 'select':
                input = h(
                    <a-select/>,
                    {
                        placeholder: item.placeholder,
                        value: value,
                        'onChange': nv => this.$emit('change', nv)
                    },
                    {
                        default: () => {
                            return item?.meta.options?.map(o => {
                                return h(
                                    <a-select-option>{o.text}</a-select-option>,
                                    {
                                        value: o.value
                                    }
                                )
                            })
                        }
                    }
                )
                break
            case 'select:code':
                input = h(
                    <cus-select-code/>,
                    {
                        def: item,
                        value: value,
                        'onChange': val => this.$emit('change', val)
                    }
                )
                break
            case 'input:psw':
                input = h(
                    <a-input-password/>,
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
