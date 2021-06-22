import {h, resolveComponent} from "vue";
import {MoreOutlined} from '@ant-design/icons-vue'

export default {
    name: 'CusTabs',
    props: {
        tabs: {
            type: Array,
            required: true
        },
        activeKey: String
    },
    emits: ['edit', 'update:activeKey', 'update:tabs'],
    computed: {
        doTabClosable() {
            return this.tabs.length !== 1
        }
    },
    methods: {
        onTabEdit(key) {
            this.$emit('edit', key)
        },
        onChange(activeKey) {
            this.$emit('update:activeKey', activeKey)
        },
        onExtraMenuSelect({key}) {
            let tab
            switch (key) {
                case 'close':
                    tab = this.tabs?.find(i => i.key === this.activeKey)
                    this.$emit('update:tabs', [tab])
                    break
            }
        }
    },
    render() {
        return h(
            resolveComponent('a-tabs'),
            {
                onEdit: this.onTabEdit,
                activeKey: this.activeKey,
                onChange: this.onChange,
                type: 'editable-card',
                hideAdd: true,
                tabBarStyle: {paddingLeft: '16px'}
            },
            {
                default: () => {
                    return this.tabs?.map(i => {
                        return <a-tab-pane tab={i.title} key={i.key} closable={this.doTabClosable} />
                    })
                },
                tabBarExtraContent: () => {
                    return [
                        h(<a-dropdown/>, null, {
                            default: () => {
                                return <div style='margin: 0 20px; cursor: pointer'>
                                    <MoreOutlined/>
                                </div>
                            },
                            overlay: () => {
                                return h(
                                    <a-menu>
                                        <a-menu-item key='close'>关闭其他页面</a-menu-item>
                                        <a-menu-item key='fresh'>刷新当前页面</a-menu-item>
                                    </a-menu>,
                                    {
                                        onClick: this.onExtraMenuSelect
                                    }
                                )
                            }
                        })
                    ]
                }
            }
        )
    }
}
