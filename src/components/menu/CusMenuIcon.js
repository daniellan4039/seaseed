import { createFromIconfontCN } from "@ant-design/icons-vue";

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2501011_cut7wm6am1w.js',
    extraCommonProps: { class: 'cus-menu-icon'}
})
/**
 * slots: title
 */
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
        },
        showBorder: {
            type: Boolean,
            default: false
        },
        showHoverBorder: {
            type: Boolean,
            default: true
        },
        iconFontStyle: {
            type: Object,
            default: {
                color: 'gray',
                fontSize: '56px'
            }
        },
        iconBackgroundStyle: {
            type: Object
        },
        titleBackgroundStyle: {
            type: Object
        },
        backgroundStyle: {
            type: Object
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
        const check = this.showCheckBox ? <a-checkbox class='check' v-model={[this.checked, 'checked']}/> : null
        const title = this.$slots.title ? this.$slots.title() : <span>{this.title}</span>
        let styleClass = 'cus-menu-icon-block'
        if(this.showBorder) {
            styleClass = styleClass.concat(' cus-box-shadow')
        }
        if (this.showHoverBorder) {
            styleClass = styleClass.concat(' cus-box-shadow-enable')
        }
        return <div style={this.backgroundStyle} class={styleClass} onClick={this.onClick}>
            <div style={this.iconBackgroundStyle}><IconFont type={this.iconType} style={this.iconFontStyle}/></div>
            <div style={this.titleBackgroundStyle}>{title}</div>
            {check}
        </div>
    }
}
