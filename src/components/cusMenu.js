import {h} from "vue";
import {UserOutlined} from "@ant-design/icons-vue";

export default {
    name: 'CusMenu',
    props: {
        dataSource: {
            type: Object,
            default: () => ({})
        },
        collapsed: {
            type: Boolean,
            default: () => false
        },
        selectedKeys: Array
    },
    emits: ['change:select', 'update:selectedKeys'],
    data() {
        return {
            openKeys: [],
            clickKey: null,
            openVector: null
        }
    },
    components: {
        UserOutlined,
    },
    methods: {
        setSubMenu(menuItemsTree) {
            let subMenuTree
            if (menuItemsTree instanceof Array) {
                subMenuTree = menuItemsTree.map(i => {
                    if (i.type === 'menuItem') {
                        return h(<a-menu-item></a-menu-item>, { key:i?.key, title: i?.title }, {
                            default: () => {
                                return [
                                    <UserOutlined/>,
                                    <span>{i.title}</span>]
                            }
                        })
                    } else if (i.type === 'subMenu') {
                        const subMenu = this.setSubMenu(i.children)
                        return h(<a-sub-menu></a-sub-menu>, {onTitleClick: this.onSubMenuClick, key: i?.key}, {
                            default: () => {
                                return subMenu
                            },
                            title: () => {
                                return [
                                    <UserOutlined/>,
                                    <span>{i.title}</span>]
                            }
                        })
                    }
                })
            }
            return subMenuTree
        },
        /**
         * SubMenu 点击触发的事件，只会有一个当前点击的key
         * @param key
         */
        onSubMenuClick({key}) {
            this.clickKey = key
        },
        /**
         * Menu下的submenu打开/关闭的事件，
         * 会整体报告所有打开的和关闭的submenu的keys
         * @param arg
         */
        onMenuOpenChange(arg) {
            this.openVector = arg.length ?? 0 - this.openKeys.length ?? 0
            this.openKeys = arg
        },
        /**
         * 当某个菜单被选中时触发
         *
         * @param arg
         */
        onSelect(arg) {
            this.$emit('change:select', arg)
            this.$emit('update:selectedKeys', [arg.key])
        }
    },
    computed: {
        menuOpenKey() {
            if (this.openVector) {
                return [this.clickKey]
            } else {
                return []
            }
        }
    },
    render() {
        // eslint-disable-next-line no-unused-vars
        const {setSubMenu, onMenuOpenChange, menuOpenKey, onSelect, collapsed} = this
        const subMenus = setSubMenu(this.dataSource.items)
        return h(<a-menu></a-menu>,
            {
                mode: 'inline',
                theme: 'dark',
                onOpenChange: onMenuOpenChange,
                openKeys: menuOpenKey,
                onSelect: onSelect,
                inlineCollapsed: collapsed,
                selectedKeys: this.selectedKeys
            },
            {
                default: () => {
                    return subMenus
                }
            })
    }
}
