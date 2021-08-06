import {$} from '@/service/index'

const prefix = process.env.VUE_APP_BASE_PREFIX
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
                localStorage.setItem('HRMS_USER_TOKEN', data.token)
            }
            resolve(res)
        })
    })
}

