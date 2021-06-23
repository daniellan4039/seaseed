import {$} from '@/service/index'

const prefix = '/api/base'
const module = '/attachment'

export const api = {
    uploadUrl: `${prefix}${module}/anyone/upload`,
    removeUrl: `${prefix}${module}/delete`,
    getUrl: `${prefix}${module}/anyone/getUrls`
}

export function upload(data) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    return $.post(
        api.uploadUrl,
        data,
        config
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
