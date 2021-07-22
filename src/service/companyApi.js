import {$} from '@/service/index'

const prefix = '/base'
const module = '/baseCompany'

export const api = {
    listUrl: `${prefix}${module}/list`,
}

export function list(data) {
    if(!data) {
        const user = JSON.parse(localStorage.getItem('HRMS_USER')??'{}')
        data = {
            parentId: user.companyId
        }
    }
    return $.post(
        api.listUrl,
        data
    )
}
