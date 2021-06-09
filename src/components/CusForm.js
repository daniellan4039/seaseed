import {h} from "vue";

export default {
    name: 'CusForm',
    props: {
        formDef: {
            type: Object,
            required: true
        }
    },
    render() {
        return h()
    }
}
