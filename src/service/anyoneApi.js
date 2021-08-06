import {$} from '@/service/index'

const prefix = process.env.VUE_APP_BASE_PREFIX
const module = '/anyone'

export const api = {
    routerUrl: `${prefix}${module}/router`,
    companyTreeUrl: `${prefix}${module}/getCompanyTree`,
    getTokenByTicketUrl: `${prefix}/anno/getTokenByTicket`
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
