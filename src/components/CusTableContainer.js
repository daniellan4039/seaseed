// eslint-disable-next-line no-unused-vars
import {h} from "vue";
import {CusFormInput} from "@/components/index";

export default {
    name: 'CusTableContainer',
    props: {
        def: {
            type: Object,
            required: true
        }
    },
    components: {
        CusFormInput
    },
    render() {
        // eslint-disable-next-line no-unused-vars
        let self = this

        return h(
            <div className="cus-table-container"/>,
            null,
            {
                default: () => {
                    const formItems = self.def.formItems.map(i => {
                        return <a-col span={self.def.meta.col}>
                            <a-form-item label={i.label} labelCol={{ span: 8}} wrapperCol={{ span: 16 }}>
                                <cus-form-input item={i} />
                            </a-form-item>
                        </a-col>
                    })
                    const searchForm = <a-form>
                        <a-row gutter={self.def.meta.gutter}>
                            {formItems}
                        </a-row>
                        <a-row>
                            <a-col offset='20' span='4' class='search-actions-block'>
                                <a-space align='end'>
                                    <a-button type='primary'>搜索</a-button>
                                    <a-button>重置</a-button>
                                </a-space>
                            </a-col>
                        </a-row>
                    </a-form>
                    const header = h(
                        <div className='search-block'/>,
                        null,
                        searchForm
                    )
                    return [
                        header,
                        this.$slots.default()
                    ]
                }
            }
        )

    }
}
