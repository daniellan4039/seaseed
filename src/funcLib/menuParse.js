export function generateMenu(routes) {
    return routes.map((r, k) => {
        if (false === r.meta.visible ?? false) {
            return null
        }
        const menu = {
            title: r.meta?.title ?? 'X',
            type: r.meta?.type ?? 'menuItem',
            key: r.meta.key ?? k,
            path: r.path
        }
        const children = generateMenu(r.children ?? [])
        children.length > 0 && (menu.children = children)
        return menu
    })
}
