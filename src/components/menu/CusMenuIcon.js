import { createFromIconfontCN } from "@ant-design/icons-vue";

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2501011_cut7wm6am1w.js',
    extraCommonProps: { class: 'cus-menu-icon'}
})

export default {
    name: 'CusMenuIcon',
    props: {
        iconType: {
            type: String,
            default: 'iconzhigongzhongxin'
        },
        title: {
            type: String,
            default: '职工信息'
        },
        showCheckBox: {
            type: Boolean,
            default: false
        },
        checked: {
            type: Boolean,
            default: false
        },
        route: {
            type: String,
        }
    },
    emits: ['update:checked', 'click'],
    components: { IconFont },
    setup(props, ctx) {
        const onClick = () => {
            ctx.emit('update:checked', !props.checked)
            ctx.emit('click', props.route)
        }
        return {
            onClick
        }
    },
    render() {
        const check = this.showCheckBox ? <a-checkbox class='check' v-model={[this.checked, 'checked']}></a-checkbox> : null
        return <div class='cus-menu-icon-block' onClick={this.onClick}>
            <IconFont type={this.iconType} />
            <span>{this.title}</span>
            {check}
        </div>
    }
}
