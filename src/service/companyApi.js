import {$} from '@/service/index'

const prefix = '/base'
const module = '/baseCompany'

export const api = {
    listUrl: `${prefix}${module}/list`,
}

export function list(data) {
    return $.post(
        api.listUrl,
        data
    )
}
