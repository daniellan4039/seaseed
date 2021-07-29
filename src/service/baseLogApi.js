import {$} from '@/service/index'

const prefix = '/base'
const module = '/baseLog'

export const api = {
    pageUrl: `${prefix}${module}/page`,
    getUrl: `${prefix}${module}/get`
}

export function page(data) {
    data['model']['bizIdFrom'] = 200_000_000
    data['model']['bizIdTo'] = 300_000_000
    return $.post(
        api.pageUrl,
        data
    )
}

export function get(params) {
    return $.get(
        api.getUrl,
        {
            params: params
        }
    )
}
