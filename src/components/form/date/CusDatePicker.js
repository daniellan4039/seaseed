import {h, resolveComponent} from "vue";

export default {
    name: 'CusDatePicker',
    props: ['modelValue', 'valueFormat'],
    emits: ['update:modelValue'],
    setup (props) {
        const dateFormat = props.valueFormat ?? 'YYYY-MM-DD'
        return {
            dateFormat
        }
    },
    render() {
        return h(
            resolveComponent('a-date-picker'),
            {
                format: this.dateFormat,
                valueFormat: this.dateFormat,
                value: this.modelValue,
                onChange: val => {
                    this.$emit('update:modelValue', val)
                }
            }
        )
    }
}
