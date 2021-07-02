import {$} from '@/service/index'

const prefix = '/base'
const module = '/anyone'

export const api = {
    routerUrl: `${prefix}${module}/router`,
}

export function getRouter () {
    return $.get(
        api.routerUrl,
    )
}
