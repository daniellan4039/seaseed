import {h} from "vue";

export default {
    name: 'CusTabs',
    props: {
        tabs: {
            type: Array,
            required: true
        },
        activeKey: String
    },
    emits: ['edit', 'update:activeKey'],
    data () {
        return {
        }
    },
    methods: {
        onTabEdit(key) {
            this.$emit('edit', key)
        },
        onChange(activeKey) {
            this.$emit('update:activeKey', activeKey)
        }
    },
    render() {
        return h(
            <a-tabs type='editable-card' hide-add tabBarStyle={{paddingLeft: '16px'}}></a-tabs>,
            {
                onEdit: this.onTabEdit,
                activeKey:this.activeKey,
                onChange: this.onChange
            },
            {
                default: () => {
                    return this.tabs?.map(i => {
                        return <a-tab-pane tab={i.title} key={i.key}></a-tab-pane>
                    })
                },
                tabBarExtraContent: () => {
                    return [
                        'extra2'
                    ]
                }
            }
        )
    }
}
