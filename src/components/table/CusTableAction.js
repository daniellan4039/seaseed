export default {
    name: 'CusTableAction',
    props: {
        actions: {
            type: Array,
            required: true
        }
    },
    emits: [],
    setup() {
    },
    render() {
        const bar = []
        if (this.actions.length > 0) {
            const firstCom = this.actions[0]
            bar.push(
                <a onClick={firstCom.onClick}>{firstCom.name}</a>
            )
            if (this.actions.length > 2) {
                bar.push(
                    <a-divider type='vertical'/>
                )
                const subList = this.actions.slice(1, this.actions.length)
                const subChildren = subList.map(c => {
                    return <a-menu-item>
                        <a onClick={c.onClick}>{c.name}</a>
                    </a-menu-item>
                })
                const menuItemSlot = {
                    default: () => [
                        subChildren,
                        this.$slots.default ? this.$slots.default() : null
                    ]
                }
                const overlaySlot = {
                    overlay: () => <a-menu v-slots={menuItemSlot} />
                }
                const more = <a-dropdown v-slots={overlaySlot}>
                    <a>更多</a>
                </a-dropdown>
                bar.push(more)
            }
        }
        return bar
    }
}
