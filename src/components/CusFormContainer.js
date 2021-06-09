import {h} from "vue";

export default {
    name: 'CusForm',
    props: {
        title: {
            type: String,
            required: true
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
                    const header = h(
                        <div/>,
                        {
                            class: 'form-header'
                        },
                        [
                            <a-typography-title level={4} content={this.title}/>,
                            <a-typography-paragraph content={this.description} />
                        ]
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
