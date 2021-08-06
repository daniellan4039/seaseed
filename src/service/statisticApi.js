import {$} from '@/service/index'

const prefix = process.env.VUE_APP_HRMS_PREFIX
const module = '/statistics'

export const api = {
    variationUrl: `${prefix}${module}/getVariation`,
    statisticUrl: `${prefix}${module}/employee`,
}

export function getVariation(from, to, companyId, departId){
    return $.get(
        api.variationUrl,
        {
            params: {
                from: from,
                to: to,
                companyId: companyId,
                departId: departId
            }
        }
    )
}

export function getEmployeeInfo(codes = '*', companyId) {
    return $.post(
        api.statisticUrl,
        {
            companyId: companyId,
            type: codes,
            getChild: false
        }
    )
}


