import store from '@/store/index'

let authRoute = []

export function getRouteFromStore() {
    authRoute = store.state.route
}

export function authorite(key) {
    return authRoute.find(a => a.code === key) !== null
}
