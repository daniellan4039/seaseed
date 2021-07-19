import {$} from '@/service/index'

const prefix = '/base'
const module = '/baseCompany'

export const api = {
    listUrl: `${prefix}${module}/list`,
}

export function list(data) {
    if(!data) {
        data = {
            authState: 1,
            isEnable: 1
        }
    }
    return $.post(
        api.listUrl,
        data
    )
}
