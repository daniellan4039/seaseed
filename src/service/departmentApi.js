import {$} from '@/service/index'

const prefix = '/base'
const module = '/baseDepartment'

export const api = {
    saveUrl: `${prefix}${module}/save`,
    updateUrl: `${prefix}${module}/update`,
    pageUrl: `${prefix}${module}/page`,
    listUrl: `${prefix}${module}/listCompanyDepartment`,
    removeUrl: `${prefix}${module}/remove`,
    getUrl: `${prefix}${module}/get`
}

export function save(data) {
    return $.post(
        api.saveUrl,
        data
    )
}

export function update(data) {
    return $.post(
        api.updateUrl,
        data
    )
}

export function page(data) {
    return $.post(
        api.pageUrl,
        data
    )
}

export function list(params) {
    return $.get(
        api.listUrl,
        {
            params: params
        }
    )
}

export function listCompaniesByUser() {
    const currentUser = JSON.parse(localStorage.getItem('HRMS_USER'))
    return $.get(
        api.listUrl,
        {
            params: { companyId: currentUser.companyId}
        }
    )
}

export function remove(data) {
    return $.post(
        api.removeUrl,
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
