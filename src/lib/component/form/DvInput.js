import {PInput} from '../assembler'
import {h, resolveComponent} from "vue";

export default {
    name: 'DvInput',
    props: {
        name: String,
        placeholder: {
            type: String,
            default: '请输入'
        },
        value: String,
        disabled: {
            type: Boolean,
            default: false
        },
        readOnly: Boolean,
        /**
         * number, password, search
         */
        type: String,
        suffix: String,
        prefix: String,
        allowClear: {
            type: Boolean,
            default: false
        }
    },
    components: {
        PInput
    },
    setup() {
    },
    render() {
        return h(resolveComponent('p-input'), {
            value: this.value,
            placeholder: this.placeholder,
            disabled: this.disabled,

        })
    }
}
