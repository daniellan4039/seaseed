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
                    const header = h(
                        <div className='search-block'></div>,
                        null,
                        {
                            default: () => {
                                // const formItems = self.def.formItems.map(i => {
                                //     return <a-col span={self.def.meta.col ?? 4}>
                                //         <a-form-item label={i.label}>
                                //             <cus-form-input item={i}></cus-form-input>
                                //         </a-form-item>
                                //     </a-col>
                                // })
                                //
                                // const searchForm = <a-form>
                                //     <a-row gutter={self.def.meta.gutter ?? 16}>
                                //         <formItems></formItems>
                                //     </a-row>
                                // </a-form>

                                // eslint-disable-next-line no-unused-vars
                                const formItems = self.def.formItems.map(i => {
                                    return h(
                                        <a-col></a-col>,
                                        {
                                            span: self.def.meta.col ?? 4
                                        },{
                                            default: () => {
                                                return h(
                                                    <a-form-item></a-form-item>,
                                                    {
                                                        label: i.label
                                                    },
                                                    {
                                                        default: () => {
                                                            return h(
                                                                <cus-form-input></cus-form-input>,
                                                                {
                                                                    item: i
                                                                }
                                                            )
                                                        }
                                                    }
                                                )
                                            }
                                        }
                                    )
                                })

                                const searchForm = h(
                                    <div></div>,
                                    {
                                        gutter: self.def.meta.gutter
                                    },
                                    {
                                        default: () => 'sdfsfsf'
                                    }
                                )

                                return searchForm
                            }
                        }
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
