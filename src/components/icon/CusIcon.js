import { createFromIconfontCN } from "@ant-design/icons-vue";

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2501011_cut7wm6am1w.js',
    extraCommonProps: { class: 'cus-menu-icon'}
})

export default {
    name: 'CusIcon',
    props: {
        iconType: {
            type: String,
            default: 'iconzhigongzhongxin'
        },
        iconStyle: {
            type: Object,
            default: {
                fontSize: '100px',
                color: '#e0614a'
            }
        },
        title: {
            type: String,
            default: 'Title'
        }
    },
    emits: [],
    components: {
        IconFont
    },
    setup() {
    },
    render() {
        const titleSlot = this.$slots.title ? this.$slots.title() : <span>{this.title}</span>
        return <div style={{textAlign: 'center'}} class='flex-v-center'>
            <IconFont type={this.iconType} style={this.iconStyle}/>
            <div>
                {titleSlot}
            </div>
        </div>
    }
}
