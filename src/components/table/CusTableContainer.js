// eslint-disable-next-line no-unused-vars
import {h, ref, watch} from "vue";
import {CusFormInput} from "@/components";
import CusSearchBar from "@/components/table/CusSearchBar";

export default {
    name: 'CusTableContainer',
    props: {
        def: {
            type: Object,
            required: true
        },
        modelValue: {}
    },
    emits: ['submit'],
    components: {
        CusFormInput, CusSearchBar
    },
    setup (props, ctx) {
        const searchModel = ref(props.modelValue)
        const submit = (model) => {
            searchModel.value = model
            ctx.emit('submit', model)
        }
        return {
            searchModel,
            submit
        }
    },
    render() {
        let self = this
        return h(
            <div className="cus-table-container"/>,
            null,
            {
                default: () => {
                    const header = <cus-search-bar formDef={self.def} onSubmit={self.submit} />
                    return [
                        header,
                        this.$slots.default()
                    ]
                }
            }
        )

    }
}
