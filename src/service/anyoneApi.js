import {$} from '@/service/index'

const prefix = '/base'
const module = '/anyone'

export const api = {
    routerUrl: `${prefix}${module}/router`,
    companyTreeUrl: `${prefix}${module}/getCompanyTree`,
}

export function getRouter () {
    return $.get(
        api.routerUrl,
        {
            params: {
                buildTree: false
            }
        }
    )
}

export function getCompanyTree (companyId, type = '1') {
    const user = JSON.parse(localStorage.getItem('HRMS_USER')??'{}')
    return new Promise((resolve, reject) => {
        $.get(
            api.companyTreeUrl,
            {
                params: {
                    id: companyId??user.companyId,
                    type: type
                }
            }
        ).then(res => {
            const {isSuccess, data, msg} = res
            if (isSuccess) {
                resolve(data)
            } else {
                reject(msg)
            }
        })
    })
}
