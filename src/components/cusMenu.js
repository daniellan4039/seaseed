// eslint-disable-next-line no-unused-vars
import {h, watch, reactive} from "vue";
import {UserOutlined} from "@ant-design/icons-vue";

export default {
    name: 'CusMenu',
    props: {
        /**
         * 菜单数据源，不能为空，其下的items是个数组，且每个对象必须包含以下内容：title:string, type:string, key:string, children:array,
         * 其中type只能是：'menuItem'或者'subMenu'
         */
        dataSource: {
            type: Object,
            required: true
        },
        /**
         * 表示是否折叠
         */
        collapsed: {
            type: Boolean,
            default: () => false
        },
        /**
         * 表示选中的MenuItem集合
         */
        selectedKeys: {
            type: Array,
            default: () => ([])
        },
        /**
         * 应该打开的SubMenu集合，用于控制哪些subMenu应该处于打开状态
         */
        shouldOpenKeys: Array,
        /*
        用于控制是否永远只打开一个SubMenu
         */
        openOne: Boolean
    },
    emits: ['change:select', 'update:selectedKeys'],
    components: {
        UserOutlined,
    },
    data() {
        return {
            /*
            保存当前打开的SubMenu
             */
            openKeys: [],
            /*
            点击的SubMenu的key, 它和openVector两个联合一起控制是否只打开一个SubMenu
             */
            clickKey: null,
            /*
            打开或者关闭SubMenu矢量，truethy表示打开，falsely表示关闭
             */
            openVector: null
        }
    },
    watch: {
        /*
        应该打开的SubMenu
         */
        shouldOpenKeys(nv) {
            const key = nv?.[0]
            this.clickKey = key
            key ? (this.openVector = 1) : (this.openVector = 0)
        },
        selectedKeys(nv) {
            if (this.openOne??false){
                const parentKey = this.findParentMenuItem(null, nv?.[0], this.dataSource.items)?.key
                this.clickKey = parentKey
                parentKey ? (this.openVector = 1) : (this.openVector = 0)
            }
        }
    },
    computed: {
        /*
        用于控制只打开一个SubMenu, 当openVector为真值，只取clickKey并将它放到数组里
        当openVector为假值，取openKeys。
         */
        menuOpenKey: {
            get() {
                if (this.openOne ?? false) {
                    return this.openVector ? [this.clickKey] : []
                } else {
                    return this.openKeys
                }
            },
            set(value) {
                this.clickKey = value
            }
        }
    },
    // eslint-disable-next-line no-unused-vars
    setup (props) {
        // watch(props.selectedKeys, val => {
        //     console.log(val)
        // })
    },
    methods: {
        /**
         * 根据提供的数据源，生成菜单树结构
         *
         * @param menuItemsTree
         * @returns {any[]}
         */
        setSubMenu(menuItemsTree) {
            let subMenuTree
            if (menuItemsTree instanceof Array) {
                subMenuTree = menuItemsTree.map(i => {
                    if (i.type === 'menuItem') {
                        return h(<a-menu-item></a-menu-item>, {key: i?.key, title: i?.title}, {
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
         * SubMenu 点击触发的事件，将当前SubMenu的key存储在clickKey里面
         * @param key
         */
        onSubMenuClick({key}) {
            this.clickKey = key
        },
        /**
         * Menu下的submenu打开/关闭的事件，
         * 会整体报告所有打开的和关闭的submenu的keys
         * 通过将当前打开的菜单的keys长度减去上次打开的菜单的keys的长度，
         * 计算得到一个向量，正数表示当前行为是在打开菜单，负数表示在关闭
         * 一个菜单。
         * @param arg
         */
        onMenuOpenChange(arg) {
            this.openVector = arg.length ?? 0 - this.openKeys.length ?? 0
            this.openKeys = arg
        },
        /**
         * 当某个菜单(MenuItem)被选中时触发
         *
         * @param arg
         */
        onSelect(arg) {
            this.$emit('change:select', arg)
            this.$emit('update:selectedKeys', [arg.key])
        },
        findParentMenuItem(parentItem, itemKey, subItems) {
            return subItems.find(i => {
                if (i.type === 'menuItem' && i.key === itemKey) {
                    return parentItem
                } else if (i.type === 'subMenu') {
                    return this.findParentMenuItem(i, itemKey, i.children)
                }
            })
        },
    },
    render() {
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
