import {h} from "vue";

export default {
    name: 'CusMenu',
    props: {
        dataSource: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        setSubMenu(menuItemsTree) {
            let subMenuTree
            if (menuItemsTree instanceof Array) {
                subMenuTree = menuItemsTree.map(i => {
                    if (i.type === 'menuItem') {
                        return h(<a-menu-item></a-menu-item>, null, {
                            default: () => {
                                return [i.title]
                            }
                        })
                    } else if (i.type === 'subMenu') {
                        const subMenu = this.setSubMenu(i.children)
                        return h(<a-sub-menu></a-sub-menu>, { title: i.title }, {
                            default:() => {
                                return subMenu
                            }
                        })
                    }
                })
            }
            return subMenuTree
        }
    },
    render() {
        const { setSubMenu } = this
        const subMenus = setSubMenu(this.dataSource.items)
        return h(<a-menu>
        </a-menu>, { mode: 'inline', theme: 'dark' }, {
            default: () => {
                return subMenus
            }
        })
    }
}
