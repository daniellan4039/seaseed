import {getRouter} from "@/service/anyoneApi";
import store from '@/store/index'

export function generateMenuByRoutes(routes) {
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
        const children = generateMenuByRoutes(r.children ?? [])
        children.length > 0 && (menu.children = children)
        return menu
    })
}

export function generateMenuFromRawRoute(routes) {
    return routes.map(r => {
        let menu = {}
        const children = r?.children?.find(ri => {
            return ri.meta.type === '0'
        })
        if (children) {
            menu.type = 'subMenu'
            const menuChildren = generateMenuFromRawRoute(r.children)
            menu.children = menuChildren
        } else if(r.meta.type === '0'){
            menu.type = 'menuItem'
        } else {
            return null
        }
        menu.title = r.name
        menu.key = r.code
        menu.path = r.path
        menu.meta = { checked: false, icon: r.meta.icon, color: r.meta?.color??'#7D79F6' }
        return menu
    })
}

export function getMenuFromBasePlatform() {
    return new Promise((resolve) => {
        getRouter().then(res => {
            const {isSuccess, data} = res
            if (isSuccess) {
                let routeMap = {}
                data.forEach(d => {
                    routeMap[d.code] = d.name
                })
                store.dispatch('setRouteMap', routeMap)
                store.dispatch('setRoute', data)
                resolve(data)
            } else {
                return resolve([])
            }
        })
    })


}

