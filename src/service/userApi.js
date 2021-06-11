import {$} from '@/service/index'

const prefix = '/base'
const module = '/anno'

export const api = {
    loginUrl: `${prefix}${module}/login`
}

export function login(data) {
    return new Promise((resolve) => {
        $.post(
            api.loginUrl,
            data
        ).then(res => {
            const {isSuccess, data} = res
            if (isSuccess) {
                localStorage.setItem('HRMS_USER', JSON.stringify(data))
            }
            resolve(res)
        })
    })
}

