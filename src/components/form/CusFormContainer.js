import {h} from "vue";

export default {
    name: 'CusFormContainer',
    props: {
        title: {
            type: String
        },
        description: String
    },
    render() {

        return h(
            <div/>,
            {
                class: 'cus-form-container'
            },
            {
                default: () => {
                    const header = this.title && this.description ? h(
                        'div',
                        {
                            class: 'form-header'
                        },
                        {
                            default: () => {
                                const defaultContent = [
                                    <a-typography-title level={4} content={this.title}/>,
                                    <a-typography-paragraph content={this.description} />
                                ]
                                return this.$slots.title ? this.$slots.title() : defaultContent
                            }
                        }
                    ): null
                    return [
                        header,
                        this.$slots.default()
                    ]
                }
            }
        )
    }
}
