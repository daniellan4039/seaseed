// eslint-disable-next-line no-unused-vars
import {h} from "vue";
import {CusFormInput} from "@/components";
import CusSearchBar from "@/components/table/CusSearchBar";

export default {
    name: 'CusTableContainer',
    props: {
        def: {
            type: Object,
            required: true
        }
    },
    components: {
        CusFormInput, CusSearchBar
    },
    render() {
        let self = this
        return h(
            <div className="cus-table-container"/>,
            null,
            {
                default: () => {
                    const header = <cus-search-bar formDef={self.def} />
                    return [
                        header,
                        this.$slots.default()
                    ]
                }
            }
        )

    }
}
