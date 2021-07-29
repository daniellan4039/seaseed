import store from '@/store/index'

export function setRouteToStore(route) {
    store.dispatch('setRoute', route)
}

export function authorite(route) {
    if (route.meta.auth){
        // return store.getters.routeMap[route.meta.key]
        return true
    } else {
        return true
    }
}
