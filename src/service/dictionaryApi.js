import {$} from '@/service/index'

const prefix = '/base'
const module = '/anyone'

export const api = {
    saveUrl: `${prefix}${module}/save`,
    updateUrl: `${prefix}${module}/update`,
    pageUrl: `${prefix}${module}/page`,
    listUrl: `${prefix}${module}/list`,
    removeUrl: `${prefix}${module}/remove`,
    getUrl: `${prefix}${module}/get`,
    findByCode: `${prefix}${module}/findByCodes`,
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

export function list(data) {
    return $.post(
        api.listUrl,
        data
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

export function getByCode(params) {
    return $.get(
        api.findByCode,
        {
            params: params
        }
    )
}
