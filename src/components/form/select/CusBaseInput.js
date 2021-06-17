// eslint-disable-next-line no-unused-vars
import {h, resolveComponent} from 'vue'
import CusSelectCode from "@/components/form/select/CusSelectCode";
import CusDatePicker from "@/components/form/date/CusDatePicker";
import CusDateRange from "@/components/form/date/CusDateRange";

export default {
    name: 'CusFormInput',
    props: {
        item: {
            type: Object,
            required: true
        },
        value: {},
        modelValue: {}
    },
    components: {
        CusSelectCode
    },
    emits: ['change', 'update:modelValue'],
    render() {
        const {item, modelValue} = this
        let input
        switch (item.inputType) {
            case 'input:string':
                input = h(
                    resolveComponent('a-input'),
                    {
                        placeholder: item.placeholder,
                        value: modelValue,
                        'onChange': nv => this.$emit('update:modelValue', nv.target.value)
                    }
                )
                break
            case 'select':
                input = h(
                    resolveComponent('a-select'),
                    {
                        placeholder: item.placeholder,
                        value: modelValue,
                        'onChange': nv => this.$emit('update:modelValue', nv)
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
                        value: modelValue,
                        'onChange': val => this.$emit('update:modelValue', val)
                    }
                )
                break
            case 'input:psw':
                input = h(
                    resolveComponent('a-input-password'),
                    {
                        placeholder: item.placeholder,
                        value: modelValue,
                        'onChange': $event => this.$emit('update:modelValue', $event.target.value)
                    }
                )
                break
            case 'date:date':
                input = h(
                    CusDatePicker,
                    {
                        modelValue: modelValue,
                        'onUpdate:modelValue': val => this.$emit('update:modelValue', val)
                    }
                )
                break
            case 'date:range':
                input = h(
                    CusDateRange,
                    {
                        modelValue: modelValue,
                        'onUpdate:modelValue': val => this.$emit('update:modelValue', val)
                    }
                )
                break

        }
        return input
    }
}
